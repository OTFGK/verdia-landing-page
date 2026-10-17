import React, { useState } from 'react';
import { Search, X, ShoppingCart, ArrowRight } from 'lucide-react';
import { Product } from '../types.ts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = products.filter(
    (p) =>
      query.trim() !== '' &&
      (p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.origin.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-[#F1D7DE] overflow-hidden flex flex-col relative animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="p-4 border-b border-[#F1D7DE] flex items-center gap-3 bg-[#F8FAFC]">
          <Search className="w-5 h-5 text-[#1F4F15]" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="¿Qué producto fresco buscas hoy? (ej. Palta, Fresas, Combo...)"
            className="flex-1 bg-transparent text-sm font-medium text-[#613914] focus:outline-none placeholder:text-[#613914]/50"
          />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#F1D7DE] text-[#613914] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestions when empty */}
        {query.trim() === '' ? (
          <div className="p-6 flex flex-col gap-3">
            <span className="text-[11px] font-bold text-[#613914]/70 uppercase tracking-wider">
              Búsquedas populares esta mañana:
            </span>
            <div className="flex flex-wrap gap-2">
              {['Palta Hass', 'Fresas Hidropónicas', 'Combo Familiar', 'Espinaca Baby', 'Tomate Cherry', 'Bowl Verde'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs bg-[#F8FAFC] hover:bg-[#F1D7DE] text-[#613914] border border-[#F1D7DE] px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto p-4 flex flex-col gap-2">
            {results.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#613914]/80">
                No encontramos productos que coincidan con "{query}".
              </div>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F8FAFC] border border-transparent hover:border-[#F1D7DE] transition-colors cursor-pointer group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover border border-[#F1D7DE]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-xs font-bold text-[#1F4F15] truncate">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#613914]/70 truncate">
                      {product.origin} · {product.badge}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-xs text-[#1F4F15]">
                      S/ {product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product, 1);
                      }}
                      className="block text-[11px] font-bold text-[#DD5510] hover:underline"
                    >
                      + Añadir
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
