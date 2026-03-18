import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export function Navbar({ cartCount }: { cartCount: number }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-cream/80 backdrop-blur-md border-b border-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-baseline gap-2 group">
            <span className="font-serif text-3xl font-bold tracking-[0.2em] text-charcoal uppercase">
              rohe
            </span>
            <span className="font-serif text-xl italic text-taupe group-hover:text-gold transition-colors">
              Parfumerie
            </span>
          </Link>
          
          <Link href="/checkout" className="group flex items-center gap-3">
            <span className="uppercase text-sm tracking-widest text-charcoal font-medium hidden sm:block">Panier</span>
            <div className="relative">
              <ShoppingBag className="w-6 h-6 text-charcoal group-hover:text-gold transition-colors" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-charcoal text-cream text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-in zoom-in">
                  <span className="font-sans font-semibold not-italic tracking-normal">{cartCount}</span>
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
