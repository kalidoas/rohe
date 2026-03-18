"use client";

import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

function ThankYouContent() {
  const { reset } = useStore();
  const router = useRouter();

  const handleReturn = () => {
    reset();
    router.push('/');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-4 selection:bg-gold/20">
      <motion.div
        initial="initial"
        animate="animate"
        variants={{ animate: { transition: { staggerChildren: 0.15 } } }}
        className="max-w-2xl w-full"
      >
        <motion.div variants={fadeInUp} className="bg-cream border border-gold/20 shadow-2xl p-10 sm:p-12 text-center rounded-sm">
          <div className="w-16 h-16 rounded-full border border-gold flex items-center justify-center text-gold mx-auto mb-8 bg-cream">
            <Check strokeWidth={1} className="w-8 h-8" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal mb-6">Merci pour votre commande !</h1>
          <div className="w-20 h-[1px] bg-gold opacity-60 mx-auto mb-8" />

          <p className="text-charcoal/80 leading-relaxed mb-10 max-w-xl mx-auto">
            Votre commande a été confirmée. Nous avons préparé un message WhatsApp pour vous, veuillez l&apos;envoyer pour valider l&apos;expédition.
          </p>

          <button
            onClick={handleReturn}
            className="w-full sm:w-auto bg-gold text-charcoal py-4 px-10 uppercase tracking-[0.2em] font-medium hover:bg-light-gold transition-colors shadow-lg"
          >
            Retour à l&apos;accueil
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ThankYou() {
  return <ThankYouContent />;
}
