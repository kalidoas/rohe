"use client";

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function renderWithSansNumbers(text: string) {
  return text.split(/(\d+)/g).map((part, i) => {
    if (!part) return null;
    if (/^\d+$/.test(part)) {
      return (
        <span key={i} className="font-sans font-semibold not-italic tracking-normal">
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Nom trop court"),
  customerPhone: z.string().regex(/^(06|07)\d{8}$/, "Numéro invalide (ex: 0612345678)"),
  city: z.string().min(2, "Ville requise"),
  address: z.string().min(10, "Adresse trop courte (10 caractères min)"),
});

export default function Checkout() {
  const { cartItems, orderType, getTotal, reset } = useStore();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    city: '',
    address: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const total = getTotal();

  useEffect(() => {
    if (cartItems.length === 0 && !isSubmitting) {
      router.push('/');
    }
  }, [cartItems, router, isSubmitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      const parsed = checkoutSchema.safeParse(formData);
      if (!parsed.success) {
        const newErrors: Record<string, string> = {};
        parsed.error.issues.forEach((issue) => {
          const key = issue.path?.[0];
          if (typeof key === 'string' || typeof key === 'number') {
            newErrors[key.toString()] = issue.message;
          }
        });
        setErrors(newErrors);
        return;
      }
      
      setIsSubmitting(true);

      const resolvedOrderType = orderType ?? (cartItems.length > 1 ? 'pack' : 'single');
      
      const payload = {
        ...parsed.data,
        orderType: resolvedOrderType,
        items: cartItems.map(item => ({
          productId: item.id,
          productName: item.name,
          price: item.price
        })),
        totalPrice: total,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const errorText = await res.text().catch(() => '');
        console.error('Order API error:', res.status, errorText);
        if (res.status >= 500 || res.status === 0) {
          alert("Une erreur est survenue. Veuillez réessayer.");
        }
        setIsSubmitting(false);
        return;
      }

      reset();
      router.push('/thank-you');
      
    } catch (err: unknown) {
      console.error('Checkout submit error:', err);
      alert("Une erreur est survenue. Veuillez réessayer.");
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0 && !isSubmitting) return null; // Avoid render flash while redirecting

  return (
    <>
      <Navbar cartCount={cartItems.length} />
      
      <main className="flex-grow pt-24 pb-20 bg-cream selection:bg-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-taupe hover:text-charcoal transition-colors uppercase tracking-widest text-xs font-medium">
              <ArrowLeft className="w-4 h-4" /> Retour à la boutique
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Form Column */}
            <div className="lg:col-span-7">
              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal mb-8">Informations de livraison</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block uppercase tracking-widest text-[10px] text-taupe font-bold">Nom complet *</label>
                    <input 
                      type="text" 
                      value={formData.customerName}
                      onChange={e => setFormData({...formData, customerName: e.target.value})}
                      className={`w-full bg-white border ${errors.customerName ? 'border-red-400' : 'border-border'} p-4 focus:outline-none focus:border-gold transition-colors`}
                      placeholder="Votre nom complet"
                    />
                    {errors.customerName && <p className="text-red-500 text-xs">{errors.customerName}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block uppercase tracking-widest text-[10px] text-taupe font-bold">
                      Téléphone (
                      <span className="font-sans font-semibold not-italic tracking-normal">06</span> /{' '}
                      <span className="font-sans font-semibold not-italic tracking-normal">07</span>) *
                    </label>
                    <input 
                      type="tel" 
                      value={formData.customerPhone}
                      onChange={e => setFormData({...formData, customerPhone: e.target.value})}
                      className={`w-full bg-white border ${errors.customerPhone ? 'border-red-400' : 'border-border'} p-4 focus:outline-none focus:border-gold transition-colors`}
                      placeholder="06 XX XX XX XX"
                    />
                    {errors.customerPhone && <p className="text-red-500 text-xs">{errors.customerPhone}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block uppercase tracking-widest text-[10px] text-taupe font-bold">Ville *</label>
                  <input 
                    type="text" 
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                    className={`w-full bg-white border ${errors.city ? 'border-red-400' : 'border-border'} p-4 focus:outline-none focus:border-gold transition-colors`}
                    placeholder="Ex: Casablanca"
                  />
                  {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block uppercase tracking-widest text-[10px] text-taupe font-bold">Adresse complète *</label>
                  <textarea 
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    rows={3}
                    className={`w-full bg-white border ${errors.address ? 'border-red-400' : 'border-border'} p-4 focus:outline-none focus:border-gold transition-colors resize-none`}
                    placeholder="N° rue, quartier, appartement..."
                  />
                  {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
                </div>

                <div className="bg-charcoal text-cream p-6 rounded-sm my-8 flex items-center gap-4 border-l-4 border-gold shadow-lg">
                  <div className="w-4 h-4 rounded-full bg-gold shrink-0 border-[3px] border-[#393732] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-charcoal rounded-full" />
                  </div>
                  <div>
                    <p className="font-serif text-lg tracking-wide">Paiement à la livraison</p>
                    <p className="text-cream/60 text-xs uppercase tracking-widest mt-1">Vous payez uniquement à la réception de votre commande</p>
                  </div>
                </div>

                <p className="text-gold text-sm tracking-widest uppercase mb-6 text-center lg:text-left font-bold">
                  ✦ Livraison gratuite partout au Maroc
                </p>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold text-charcoal py-5 uppercase tracking-[0.2em] font-medium hover:bg-light-gold transition-colors flex items-center justify-center shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Traitement...</>
                  ) : (
                    "Confirmer ma Commande"
                  )}
                </button>
              </form>
            </div>

            {/* Order Summary Sticky Column */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-28 bg-white border border-border p-8 sm:p-10 shadow-xl">
                <h2 className="font-serif text-2xl text-charcoal mb-6 border-b border-border pb-4">Votre sélection</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-start pb-4 border-b border-border/50">
                      <div>
                        <p className="font-serif text-lg text-charcoal leading-snug">{renderWithSansNumbers(item.name)}</p>
                        <p className="text-[10px] uppercase tracking-widest text-taupe mt-1">{item.brand}</p>
                      </div>
                      <span className="font-medium text-charcoal whitespace-nowrap ml-4">
                        <span className="font-sans font-semibold not-italic tracking-normal">{item.price}</span> DH
                      </span>
                    </div>
                  ))}
                  {orderType === 'pack' && cartItems.length < 4 && (
                    <p className="text-xs text-taupe italic">
                      Vous pouviez sélectionner jusqu&apos;à{' '}
                      <span className="font-sans font-semibold not-italic tracking-normal">4</span> parfums.
                    </p>
                  )}
                </div>

                <div className="text-center py-4 bg-warm-white border border-border/50 mb-6">
                  <span className="text-gold text-xs uppercase tracking-[0.2em] font-bold">✦ Livraison Gratuite</span>
                </div>

                <div className="flex justify-between items-end border-t border-charcoal pt-6 mb-2">
                  <span className="uppercase tracking-[0.2em] font-bold text-sm text-charcoal">Total</span>
                  <span className="font-serif text-3xl font-medium text-charcoal">
                    <span className="font-sans font-semibold not-italic tracking-normal">{total}</span> DH
                  </span>
                </div>
                {orderType === 'pack' && (
                  <p className="text-right text-[10px] text-taupe uppercase tracking-widest">Prix forfaitaire pour pack</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
