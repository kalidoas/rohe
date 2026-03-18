"use client";

import { useEffect, useState } from 'react';
import { useStore, Product } from '@/store/useStore';
import { ProductCard } from '@/components/ProductCard';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { X, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

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

const PRODUCTS = [
  { id:1, name:"Baccarat Rouge 540", brand:"Maison Francis Kurkdjian", notes:"Jasmin · Safran · Cèdre ambreux", price:59.99, image:"https://i.pinimg.com/736x/9c/69/bd/9c69bdeb69e4747111207cc127eb4cb5.jpg" },
  { id:2, name:"Sauvage", brand:"Dior", notes:"Bergamote · Poivre Sichuan · Ambroxan", price:59.99, image:"https://i.pinimg.com/736x/dc/79/f8/dc79f81f063dbe58500ea1a2712b5a54.jpg" },
  { id:3, name:"Black Opium", brand:"Yves Saint Laurent", notes:"Café · Vanille · Fleur de Cerisier", price:59.99, image:"https://i.pinimg.com/736x/84/2e/9e/842e9ecb2c40163f6f72099cf849ff94.jpg" },
  { id:4, name:"La Vie Est Belle", brand:"Lancôme", notes:"Iris · Praline · Patchouli", price:59.99, image:"https://i.pinimg.com/1200x/83/69/86/83698689d010952350fe2f17c367dfb8.jpg" },
  { id:5, name:"Coco Mademoiselle", brand:"Chanel", notes:"Orange · Rose · Patchouli", price:59.99, image:"https://i.pinimg.com/1200x/52/ab/df/52abdfefbc5f1c465e85b291be61a468.jpg" },
  { id:6, name:"Oud Wood", brand:"Tom Ford", notes:"Oud · Santal · Vétiver fumé", price:59.99, image:"https://i.pinimg.com/736x/35/f1/6c/35f16cb4efb2e6cd11a267b4caf123fc.jpg" },
  { id:7, name:"Aventus", brand:"Creed", notes:"Ananas · Bouleau fumé · Musc", price:59.99, image:"https://i.pinimg.com/1200x/e0/79/c9/e079c988a859ec6d4cfbd76548ce5404.jpg" },
  { id:8, name:"Flower Bomb", brand:"Viktor & Rolf", notes:"Jasmin · Rose · Patchouli", price:59.99, image:"https://i.pinimg.com/736x/23/ff/eb/23ffeb5d80f89335ed67b6f06a4d586d.jpg" },
];

export default function Home() {
  const { cartItems, selectedPack, togglePackItem, orderPack, orderSingle } = useStore();
  const router = useRouter();

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const handleOrderPack = () => {
    orderPack();
    router.push('/checkout');
  };

  const handleOrderSingle = (product: Product) => {
    orderSingle(product);
    router.push('/checkout');
  };

  const handleTogglePack = (product: Product) => {
    const isSelected = selectedPack.some(p => p.id === product.id);

    if (!isSelected && selectedPack.length >= 4) {
      setToast({
        type: 'warning',
        message: 'Votre pack de 4 parfums est déjà complet !',
      });
      return;
    }

    const willReachExactFour = !isSelected && selectedPack.length === 3;
    togglePackItem(product);

    if (willReachExactFour) {
      setToast({
        type: 'success',
        message: 'Félicitations ! Vous avez complété votre pack de 4 parfums.',
      });
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <>
      <Navbar cartCount={cartItems.length} />

      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-xl">
          <div
            className={`border px-5 py-4 shadow-2xl backdrop-blur-md rounded-sm text-center ${
              toast.type === 'success'
                ? 'bg-cream text-charcoal border-gold/30'
                : 'bg-charcoal text-cream border-gold/40'
            }`}
          >
            <span className="text-sm sm:text-base tracking-wide">{toast.message}</span>
          </div>
        </div>
      )}
      
      <main className="flex-grow pt-20">
        
        {/* HERO SECTION */}
        <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
          {/* Background Image Setup */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/img/background.png" 
              alt="ROHE Parfumerie Background" 
              className="w-full h-full object-cover"
            />
            {/* Dark overlay to make text readable */}
            <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-[2px]"></div>
          </div>

          <motion.div 
            initial="initial" animate="animate" variants={{ animate: { transition: { staggerChildren: 0.2 } } }}
            className="z-10 relative flex flex-col items-center w-full max-w-4xl"
          >
            <motion.span variants={fadeInUp} className="uppercase text-gray-900 tracking-[0.2em] text-sm font-semibold mb-12 block drop-shadow-lg">
              Parfumerie de Luxe · Maroc
            </motion.span>

            {/* Offer Card - Made Larger */}
            <motion.div variants={fadeInUp} className="bg-white/90 backdrop-blur-md text-gray-900 p-8 sm:p-12 w-full max-w-2xl mx-auto shadow-2xl relative border border-white/20 rounded-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="text-center mb-6">
                <p className="text-sm md:text-base font-semibold text-gray-600 mb-2" dir="rtl">
                  🚨 عرض خيالي من ROHE PARFUMERIE 🚨
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3" dir="rtl">
                  باك 4 عطور فاخرة
                </h2>

                <div className="flex items-center justify-center gap-3 mb-2" dir="ltr">
                  <span className="text-xl md:text-2xl text-gray-400 line-through font-medium">239 DH</span>
                  <span className="text-3xl md:text-4xl font-extrabold text-[#D4AF37]">159 DH</span>
                </div>

                <p className="text-lg font-bold text-gray-800" dir="rtl">
                  فقط للأوائل! ⏳
                </p>
              </div>
              
              <div className="text-gray-900 text-lg sm:text-xl tracking-wide font-semibold mb-10 space-y-4 inline-block text-right" dir="rtl">
                <p>
                  ✔️ <span className="font-sans font-semibold not-italic tracking-normal">4</span> روائح واعرين (ختار الي بغيتي ✅).
                </p>
                <p>✔️ الدفع عند الاستلام 📦</p>
                <p>✔️ التوصيل فابور 🚚</p>
              </div>

              <p className="text-gray-900 text-lg font-semibold mb-8" dir="rtl">زرب قبل ما يسالي الستوك! كليكي على &quot;اطلب الآن&quot; 👇</p>
              
              <button 
                onClick={() => { document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="w-full bg-gold text-charcoal text-2xl font-bold py-5 hover:bg-light-gold transition-transform hover:scale-[1.02] shadow-xl"
              >
                COMMANDER DB !
              </button>
            </motion.div>
          </motion.div>
          
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-cream to-transparent"></div>
        </section>

        {/* PRODUCTS SECTION */}
        <section id="collection" className="py-24 px-4 sm:px-6 lg:px-8 bg-cream">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="uppercase text-taupe tracking-[0.3em] text-xs font-bold mb-4 block">Notre Collection</span>
              <h2 className="text-4xl sm:text-5xl font-serif text-charcoal mb-6">
                Parfums <i className="italic text-taupe">Choisis</i>
              </h2>
              <div className="w-12 h-[1px] bg-gold mx-auto mb-8" />
              <p className="text-charcoal font-medium tracking-wide">
                Sélectionnez jusqu&apos;à 4 parfums pour votre pack ({selectedPack.length}/4)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {PRODUCTS.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  isSelected={selectedPack.some(p => p.id === product.id)}
                  onTogglePack={() => handleTogglePack(product)}
                  onAddSingle={() => handleOrderSingle(product)}
                />
              ))}
            </div>

            {/* Pack Summary Footer */}
            <div className={`fixed sm:relative bottom-0 left-0 right-0 sm:bottom-auto bg-charcoal text-cream p-4 sm:p-8 sm:rounded-sm shadow-[0_-10px_40px_rgba(0,0,0,0.1)] sm:shadow-xl transition-transform duration-500 z-40 ${selectedPack.length > 0 ? 'translate-y-0' : 'translate-y-full sm:translate-y-0 sm:hidden'}`}>
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-center mb-4">
                    <span className="uppercase tracking-[0.2em] text-gold text-sm font-medium">Votre Pack Découverte</span>
                    <span className="font-serif text-xl">
                      <span className="font-sans font-semibold not-italic tracking-normal">{selectedPack.length}</span>/{' '}
                      <span className="font-sans font-semibold not-italic tracking-normal">4</span> parfums
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedPack.map(p => (
                      <div key={p.id} className="bg-cream/10 border border-cream/20 px-3 py-1.5 flex items-center gap-2 text-sm max-w-full">
                        <span className="truncate">{renderWithSansNumbers(p.name)}</span>
                        <button onClick={() => togglePackItem(p)} className="hover:text-gold transition-colors text-cream/60">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {selectedPack.length === 0 && <span className="text-taupe text-sm italic">Aucun parfum sélectionné</span>}
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">
                  <button 
                    onClick={handleOrderPack}
                    disabled={selectedPack.length === 0}
                    className="w-full sm:w-auto bg-gold text-charcoal px-8 py-4 uppercase tracking-[0.2em] font-medium hover:bg-light-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-2"
                  >
                    Commander ce Pack — <span className="font-sans font-semibold not-italic tracking-normal">159</span> DH
                  </button>
                  <span className="text-gold text-xs uppercase tracking-widest">✦ Livraison gratuite</span>
                </div>

              </div>
            </div>
            
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="py-24 bg-charcoal text-cream px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif mb-6">Une question ? <i className="italic text-gold">Nous sommes là</i></h2>
            <p className="text-cream/70 font-light tracking-wide mb-10 leading-relaxed">
              Notre équipe d&apos;experts parfumeurs est à votre disposition pour vous conseiller et vous accompagner dans votre choix. N&apos;hésitez pas à nous contacter directement.
            </p>
            <a 
              href="tel:0604283228" 
              className="inline-flex items-center gap-4 text-2xl font-serif text-gold hover:text-light-gold transition-colors border border-gold/30 px-8 py-4 rounded-sm hover:-translate-y-1 bg-gold/5"
            >
              <Phone className="w-6 h-6" />
              <span className="font-sans font-semibold not-italic tracking-normal">0604-283-228</span>
            </a>
          </div>
        </section>
        
      </main>
      <Footer />
    </>
  );
}
