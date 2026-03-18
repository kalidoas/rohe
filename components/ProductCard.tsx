"use client";

import { Product } from '@/store/useStore';
import { Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isSelected?: boolean;
  onTogglePack?: () => void;
  onAddSingle: () => void;
}

export function ProductCard({ product, isSelected, onTogglePack, onAddSingle }: ProductCardProps) {
  return (
    <div 
      className={`group relative bg-white border transition-all duration-300 rounded-sm cursor-pointer hover:-translate-y-1 hover:shadow-xl ${
        isSelected ? 'border-gold border-l-4 shadow-md' : 'border-border'
      }`}
      onClick={onTogglePack}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 z-10 bg-charcoal text-gold text-xs uppercase tracking-wider px-3 py-1 font-medium flex items-center gap-1 shadow-md">
          <Check className="w-3 h-3" /> Sélectionné
        </div>
      )}
      <div className="h-64 sm:h-72 overflow-hidden bg-warm-white relative">
        <img 
          src={product.image || `/placeholder.jpg`} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
      </div>
      
      <div className="p-5 flex flex-col items-center text-center">
        <span className="uppercase text-[0.6rem] tracking-[0.3em] text-taupe mb-2 block font-medium">
          {product.brand}
        </span>
        <h3 className="font-serif text-[1.1rem] text-charcoal mb-1">
          {product.name}
        </h3>
        <p className="text-[0.72rem] text-taupe mb-4 italic">
          {product.notes}
        </p>
        
        <div className="w-full h-[1px] bg-border mb-4 opacity-50" />
        
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-medium text-charcoal">
            <span className="font-sans font-semibold not-italic tracking-normal">{product.price}</span> DH
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddSingle();
            }}
            className="text-xs uppercase tracking-widest text-gold hover:text-charcoal font-medium transition-colors"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
