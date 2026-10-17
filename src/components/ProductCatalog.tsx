import React, { useState } from 'react';
import { Product } from '../types.ts';
import { ProductCard } from './ProductCard.tsx';
import { Search, Sparkles, Filter } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenDetails: (product: Product) => void;
  activeZone: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddToCart,
  onOpenDetails,
  activeZone,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: '🔥 Más Vendidos', filterValue: 'mas-vendidos' },
    { id: 'frutas', label: '🍎 Frutas de Estación', filterValue: 'frutas' },
    { id: 'verduras', label: '🥦 Verduras y Hortalizas', filterValue: 'verduras' },
    { id: 'combos', label: '📦 Combos Semanales', filterValue: 'combos' },
    { id: 'bowls', label: '🥗 Bowls Listos', filterValue: 'bowls' },
    { id: 'hierbas', label: '🌿 Hierbas & Aromáticas', filterValue: 'hierbas' },
  ];

  const origins = ['todos', 'Valle Hermoso', 'Pachacámac', 'Surco Ecológico', 'Valle Lurín', 'Huaral', 'Selva Central'];

  const filteredProducts = products.filter((product) => {
    // Category match
    const categoryMatch =
      selectedCategory === 'todos'
        ? true
        : selectedCategory === 'combos'
        ? product.category === 'combos'
        : product.category === selectedCategory;

    // Search query match
    const searchMatch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchQuery.toLowerCase());

    // Origin match
    const originMatch =
      selectedOrigin === 'todos' || product.origin.toLowerCase().includes(selectedOrigin.toLowerCase());

    return categoryMatch && searchMatch && originMatch;
  });

  return (
    <section id="catalog-section" className="w-full py-12 lg:py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#1F4F15]/10 text-[#1F4F15] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-[#B0D165]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#DD5510]" />
              <span>Inventario en Vivo</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#1F4F15] tracking-tight">
              Lo más fresco de hoy en tu distrito
            </h2>
            <p className="text-sm sm:text-base text-[#613914]/80 mt-1 max-w-xl">
              Stock en tiempo real cosechado esta madrugada por agricultores de los valles cercanos para entrega en {activeZone}.
            </p>
          </div>

          {/* Live Stock Pill */}
          <div className="flex items-center gap-2 bg-white border border-[#F1D7DE] px-4 py-2 rounded-full self-start md:self-auto shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F4F15] animate-pulse"></span>
            <span className="text-xs sm:text-sm text-[#1F4F15] font-bold">
              98% Productos disponibles para despacho inmediato
            </span>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  type="button"
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-xs cursor-pointer ${
                    isActive
                      ? 'bg-[#1F4F15] text-white shadow-md'
                      : 'bg-white hover:bg-[#F1D7DE]/60 text-[#613914] border border-[#F1D7DE]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Live Search & Origin filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#613914]/60 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por verdura, fruta o valle..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#F1D7DE] rounded-full text-[#613914] focus:outline-none focus:ring-2 focus:ring-[#1F4F15]"
              />
            </div>

            {selectedOrigin !== 'todos' && (
              <button
                onClick={() => setSelectedOrigin('todos')}
                className="text-xs bg-[#DD5510] text-white px-2.5 py-1.5 rounded-full font-bold cursor-pointer"
              >
                Limpiar {selectedOrigin} ×
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#F1D7DE] shadow-sm flex flex-col items-center justify-center gap-3">
            <span className="material-symbols-outlined text-5xl text-[#DD5510]">search_off</span>
            <h3 className="font-display text-xl font-bold text-[#1F4F15]">No encontramos productos en esta búsqueda</h3>
            <p className="text-sm text-[#613914]/80 max-w-md">
              Intenta con otro término o limpia los filtros para volver a ver los productos cosechados de hoy.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
                setSelectedOrigin('todos');
              }}
              className="mt-2 bg-[#1F4F15] text-white text-xs font-bold px-5 py-2.5 rounded-full cursor-pointer hover:bg-[#1F4F15]/90"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
