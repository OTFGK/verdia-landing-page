import React from 'react';
import { ShoppingBasket, ArrowRight, Zap } from 'lucide-react';

interface FloatingCartProps {
  itemCount: number;
  totalPrice: number;
  activeZone: string;
  onOpenCart: () => void;
}

export const FloatingCart: React.FC<FloatingCartProps> = ({
  itemCount,
  totalPrice,
  activeZone,
  onOpenCart,
}) => {
  if (itemCount === 0) return null;

  return (
    <aside
      aria-label="Carrito de compras flotante"
      className="fixed bottom-6 right-6 z-40 bg-white/95 backdrop-blur-xl border-2 border-[#B0D165] p-3 rounded-2xl shadow-2xl flex items-center gap-4 max-w-md transition-all hover:scale-102 hover:shadow-[0_20px_35px_-5px_rgba(31,79,21,0.25)]"
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-[#1F4F15] flex items-center justify-center text-white shadow-md">
          <ShoppingBasket className="w-6 h-6 text-[#B0D165]" />
        </div>
        <span
          className="absolute -top-1 -right-1 bg-[#DD5510] text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs"
          id="cart-item-badge"
        >
          {itemCount}
        </span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm sm:text-base text-[#1F4F15] font-black" id="cart-total-text">
            {itemCount} {itemCount === 1 ? 'producto' : 'productos'} · S/ {totalPrice.toFixed(2)}
          </span>
        </div>
        <p className="text-[11px] text-[#DD5510] font-bold flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-[#DD5510]" />
          <span>Entrega estimada: 24-28 min a {activeZone}</span>
        </p>
      </div>

      <button
        type="button"
        onClick={onOpenCart}
        className="bg-[#1F4F15] hover:bg-[#1F4F15]/90 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ml-1 flex items-center gap-1.5 cursor-pointer active:scale-95"
      >
        <span>Ver</span>
        <ArrowRight className="w-4 h-4 text-[#B0D165]" />
      </button>
    </aside>
  );
};
