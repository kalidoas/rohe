import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, city, address, orderType, items, totalPrice } = body;

    // Generate reference
    const timestamp = Date.now().toString().slice(-5);
    const randomAuth = Math.random().toString(36).substring(2, 5).toUpperCase();
    const reference = `ROHE-${timestamp}${randomAuth}`;

    // Database save
    await prisma.order.create({
      data: {
        reference,
        customerName,
        customerPhone,
        city,
        address,
        orderType,
        items,
        totalPrice,
      }
    });

    // Send Telegram notification
    try {
      const itemsString = items
        .map((i: { productName: string; price?: number }, idx: number) => {
          const pricePart = typeof i.price === 'number' ? ` — ${i.price} DH` : '';
          return `${idx + 1}. ${i.productName}${pricePart}`;
        })
        .join('\n');

      const formattedMessage = [
        `🛍️ <b>Nouvelle commande ROHE</b>`,
        ``,
        `🧾 <b>Réf:</b> ${reference}`,
        ``,
        `👤 <b>Client:</b> ${customerName}`,
        `📞 <b>Tél:</b> ${customerPhone}`,
        `🏙️ <b>Ville:</b> ${city}`,
        `📍 <b>Adresse:</b> ${address}`,
        ``,
        `🧴 <b>Produits:</b>`,
        `${itemsString}`,
        ``,
        `💰 <b>Total:</b> ${totalPrice} DH`,
        `🚚 <b>Livraison:</b> GRATUITE`,
      ].join('\n');

      if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: formattedMessage,
            parse_mode: 'HTML',
          }),
        });

        if (!res.ok) {
          const text = await res.text().catch(() => '');
          console.error('Telegram notify failed:', res.status, text);
        }
      } else {
        console.warn('Telegram credentials missing. Notification skipped.');
      }
    } catch (telegramError) {
      console.error('Telegram Error:', telegramError);
      // Even if Telegram fails, order is saved. Let's not throw to the frontend.
    }

    return NextResponse.json({ success: true, orderId: reference }, { status: 201 });

  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json({ error: "Interal Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_TOKEN || 'rohe-secret-token'}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ error: "Interal Server Error" }, { status: 500 });
  }
}
