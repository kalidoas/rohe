import { NextResponse } from "next/server";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWh4jUlae061-DDPfPS7ZtL39gVfJtYys",
  authDomain: "dashboard-rohe.firebaseapp.com",
  projectId: "dashboard-rohe",
  storageBucket: "dashboard-rohe.firebasestorage.app",
  messagingSenderId: "358217598221",
  appId: "1:358217598221:web:908c1ca7aeaa594f899c44"
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await addDoc(collection(db, "orders"), {
      client: body.client || body.name || "",
      phone: body.phone || "",
      city: body.city || "",
      address: body.address || "",
      parfums: body.parfums || body.cartItems?.map((i: any) => i.name) || [],
      montant: 159,
      statut: "En attente",
      note: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Firebase error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}