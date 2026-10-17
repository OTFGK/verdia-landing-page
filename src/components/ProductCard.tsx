import React, { useState } from 'react';
import { ShoppingCart, Check, Package, Plus, Minus, Info } from 'lucide-react';
import { Product } from '../types.ts';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onOpenDetails,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdjustQuantity = (delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  };

  // Exact badge color mapping based on strict palette
  const getBadgeStyle = () => {
    switch (product.badgeType) {
      case 'cosechado':
        return 'bg-[#1F4F15] text-white';
      case 'dulce':
        return 'bg-[#DD5510] text-white';
      case 'huerto':
        return 'bg-[#B0D165] text-[#1F4F15] font-black';
      case 'pesticidas':
        return 'bg-[#1F4F15] text-white';
      case 'maduracion':
        return 'bg-[#FFBD46] text-[#613914] font-black';
      case 'listo':
        return 'bg-[#1F4F15] text-white';
      case 'oferta':
        return 'bg-[#DD5510] text-white font-black';
      default:
        return 'bg-[#1F4F15] text-white';
    }
  };

  const isCombo = product.category === 'combos';

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="bg-white rounded-2xl p-3.5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group border border-[#F1D7DE] hover:border-[#B0D165] relative cursor-pointer"
    >
      {/* Discount banner if applicable */}
      {product.originalPrice && (
        <div className="absolute top-0 right-0 bg-[#DD5510] text-white px-3 py-1 rounded-bl-xl font-display text-[11px] font-black uppercase tracking-wider z-10 shadow-sm">
          🔥 Ahorra 15%
        </div>
      )}

      <div>
        {/* Product Image Container */}
        <div className="relative h-48 w-full rounded-xl overflow-hidden bg-[#F8FAFC] mb-3 border border-[#F1D7DE]/60">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Graceful fallback image
              e.currentTarget.src = 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80';
            }}
          />

          {/* Top Left Badge */}
          <span
            className={`absolute top-2.5 left-2.5 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-sm tracking-wider ${getBadgeStyle()}`}
          >
            {product.badge}
          </span>

          {/* Bottom Left Origin Badge */}
          <span className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-sm text-[#613914] font-bold text-[11px] px-2.5 py-0.5 rounded-md shadow-xs border border-[#F1D7DE]">
            {product.origin}
          </span>

          {/* Info pill on hover */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 text-[#613914] hover:text-[#1F4F15] hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            title="Ver trazabilidad y lote de cosecha"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content */}
        <h3 className="font-display text-base font-bold text-[#1F4F15] group-hover:text-[#1F4F15] transition-colors leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-[#613914]/80 mt-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Pricing & Actions */}
      <div className="mt-4 pt-2 border-t border-[#F1D7DE]/60 flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-black text-[#1F4F15]">
              S/ {product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#613914]/50 line-through">
                S/ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#613914]/70">
            {product.unit}
          </span>
        </div>

        {/* Action Row */}
        {isCombo ? (
          <button
            type="button"
            onClick={handleAdd}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer ${
              justAdded
                ? 'bg-[#B0D165] text-[#1F4F15]'
                : 'bg-[#1F4F15] hover:bg-[#1F4F15]/90 text-white hover:shadow-md active:scale-98'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 text-[#1F4F15]" />
                <span>¡Combo Añadido!</span>
              </>
            ) : (
              <>
                <Package className="w-4 h-4 text-[#B0D165]" />
                <span>Añadir Combo Completo</span>
              </>
            )}
          </button>
        ) : (
          <div className="flex items-center gap-2 pt-0.5">
            {/* Quantity Stepper */}
            <div className="flex items-center bg-[#F8FAFC] border border-[#F1D7DE] rounded-xl p-1">
              <button
                type="button"
                onClick={(e) => handleAdjustQuantity(-1, e)}
                className="w-6 h-6 flex items-center justify-center rounded-lg text-[#613914] hover:bg-[#F1D7DE]/60 font-bold text-xs transition-colors cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-7 text-center text-xs font-black text-[#1F4F15]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={(e) => handleAdjustQuantity(1, e)}
                className="w-6 h-6 flex items-center justify-center rounded-lg text-[#613914] hover:bg-[#F1D7DE]/60 font-bold text-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Add Button */}
            <button
              type="button"
              onClick={handleAdd}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-black tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                justAdded
                  ? 'bg-[#B0D165] text-[#1F4F15]'
                  : 'bg-[#1F4F15] hover:bg-[#1F4F15]/90 text-white hover:shadow-md active:scale-98'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#1F4F15]" />
                  <span>¡Listo!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5 text-[#B0D165]" />
                  <span>Añadir</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
