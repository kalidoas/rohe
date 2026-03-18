import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream py-12 border-t border-gold/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6">
          <span className="font-serif text-3xl font-bold tracking-[0.2em] uppercase">
            rohe
          </span>
        </div>
        <p className="text-sm font-light tracking-wider opacity-80 mb-6">
          © <span className="font-sans font-semibold not-italic tracking-normal">2025</span> ROHE Parfumerie · Maroc · Tous droits réservés
        </p>
        <div className="flex justify-center gap-6 opacity-60">
          <a href="#" className="hover:text-gold transition-colors text-xs uppercase tracking-widest">Mentions Légales</a>
          <Link href="/contact" className="hover:text-gold transition-colors text-xs uppercase tracking-widest">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
