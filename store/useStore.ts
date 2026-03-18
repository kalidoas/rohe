import { create } from 'zustand';

export type Product = {
  id: number;
  name: string;
  brand: string;
  notes: string;
  price: number;
  image?: string;
};

type StoreState = {
  selectedPack: Product[];
  cartItems: Product[];
  orderType: 'pack' | 'single' | null;
  togglePackItem: (product: Product) => void;
  orderPack: () => void;
  orderSingle: (product: Product) => void;
  getTotal: () => number;
  reset: () => void;
};

export const useStore = create<StoreState>((set, get) => ({
  selectedPack: [],
  cartItems: [],
  orderType: null,

  togglePackItem: (product) => {
    set((state) => {
      const isSelected = state.selectedPack.some((p) => p.id === product.id);
      if (isSelected) {
        return { selectedPack: state.selectedPack.filter((p) => p.id !== product.id) };
      }
      if (state.selectedPack.length < 4) {
        return { selectedPack: [...state.selectedPack, product] };
      }
      return state; // Max 4 items
    });
  },

  orderPack: () => {
    const { selectedPack } = get();
    if (selectedPack.length > 0 && selectedPack.length <= 4) {
      set({ cartItems: selectedPack, orderType: 'pack' });
    }
  },

  orderSingle: (product) => {
    set({ cartItems: [product], orderType: 'single' });
  },

  getTotal: () => {
    const state = get();
    if (state.orderType === 'pack') return 159;
    if (state.orderType === 'single') return 59.99;
    return 0;
  },

  reset: () => {
    set({ selectedPack: [], cartItems: [], orderType: null });
  },
}));
