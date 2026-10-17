import React, { useState } from 'react';
import { X, Check, ShoppingCart, ShieldCheck, Clock, MapPin, Award, Plus, Minus, Heart } from 'lucide-react';
import { Product } from '../types.ts';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#F1D7DE] overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#613914] flex items-center justify-center shadow-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Side */}
          <div className="relative h-64 md:h-full min-h-[260px] bg-[#F8FAFC]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-black uppercase tracking-wider bg-[#1F4F15] text-white px-2.5 py-1 rounded-full shadow-xs">
                {product.badge}
              </span>
              <p className="font-display text-sm font-bold mt-1 text-white">
                📍 {product.farm} ({product.origin})
              </p>
            </div>
          </div>

          {/* Details Side */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#DD5510] font-bold mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{product.harvestTime}</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-black text-[#1F4F15] leading-tight">
                {product.name}
              </h3>

              <p className="text-xs sm:text-sm text-[#613914]/85 mt-2 leading-relaxed">
                {product.description}
              </p>

              {/* Harvest Certificate Box */}
              <div className="mt-4 p-3.5 bg-[#F1D7DE]/30 rounded-2xl border border-[#F1D7DE] flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1F4F15]">
                  <Award className="w-4 h-4 text-[#B0D165]" />
                  <span>Certificado de Cosecha Directa</span>
                </div>
                <div className="text-[11px] text-[#613914] space-y-1">
                  <p>
                    <strong>Agricultor responsable:</strong> {product.farmer}
                  </p>
                  <p>
                    <strong>Valle de origen:</strong> {product.origin}
                  </p>
                  <p>
                    <strong>Cadena de frío:</strong> Almacenamiento a 4°C sin gases aceleradores
                  </p>
                  {product.nutritionTip && (
                    <p className="text-[#1F4F15] font-semibold pt-1">
                      🌱 {product.nutritionTip}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing & Add to Cart */}
            <div className="mt-6 pt-4 border-t border-[#F1D7DE] flex flex-col gap-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-display text-2xl font-black text-[#1F4F15]">
                    S/ {product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-[#613914]/50 line-through ml-2">
                      S/ {product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#613914]/70 font-semibold uppercase">
                  {product.unit}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Counter */}
                <div className="flex items-center bg-[#F8FAFC] border border-[#F1D7DE] rounded-xl p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[#613914] hover:bg-[#F1D7DE]/50 font-bold"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-sm text-[#1F4F15]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[#613914] hover:bg-[#F1D7DE]/50 font-bold"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add button */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                    added
                      ? 'bg-[#B0D165] text-[#1F4F15]'
                      : 'bg-[#1F4F15] hover:bg-[#1F4F15]/90 text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-[#1F4F15]" />
                      <span>¡Añadido a la canasta!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 text-[#B0D165]" />
                      <span>Añadir (S/ {(product.price * quantity).toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
