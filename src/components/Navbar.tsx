import React, { useState } from 'react';
import { ShoppingBasket, Search, X, MapPin, Sparkles, Check, ChevronDown } from 'lucide-react';
import { ZONES } from '../data/mockData.ts';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  activeZone: string;
  onSelectZone: (zone: string) => void;
  onOpenSearch: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  activeZone,
  onSelectZone,
  onOpenSearch,
  onNavigate,
  activeSection,
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [zoneDropdownOpen, setZoneDropdownOpen] = useState(false);

  const copyCoupon = () => {
    navigator.clipboard?.writeText('VERDIA20');
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  return (
    <header className="fixed top-0 w-full z-50 shadow-[0_1px_8px_rgba(31,79,21,0.08)] bg-[#F8FAFC]">
      {/* Top Announcement Bar */}
      {showBanner && (
        <div className="bg-[#1F4F15] text-white py-1.5 px-4 sm:px-8 border-b border-[#1F4F15]/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm font-medium">
            <div className="hidden md:block flex-1"></div>
            <div className="flex items-center gap-2 text-center mx-auto md:mx-0">
              <span className="material-symbols-outlined text-[#B0D165] text-base">celebration</span>
              <span>
                ¡Lanzamiento en tu distrito!{' '}
                <strong className="text-[#FFBD46]">20% de descuento</strong> en tu primer pedido con el código:{' '}
                <button
                  onClick={copyCoupon}
                  className="bg-[#1F4F15]/90 border border-[#B0D165]/50 px-2 py-0.5 rounded text-white font-bold tracking-wider hover:bg-[#B0D165] hover:text-[#1F4F15] transition-all inline-flex items-center gap-1 cursor-pointer"
                  title="Haz clic para copiar"
                >
                  <span>VERDIA20</span>
                  {copiedCoupon ? <Check className="w-3 h-3 text-[#FFBD46]" /> : <Sparkles className="w-3 h-3 text-[#FFBD46]" />}
                </button>
              </span>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                aria-label="Cerrar anuncio"
                onClick={() => setShowBanner(false)}
                className="hover:opacity-75 transition-opacity text-white flex items-center p-0.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[#F1D7DE]">
        <div className="h-20 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Logo & District Badge */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('hero')}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
            >
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1VGNvNIhggjEReJxcbuoPiH3oRpkJLbORW8qSDae-dywTrFj9CoXx1xzESUN0HeS_xayakGU2SMvqlLwwaqGpikPJSVH_M_UNv4bYcp_G2C8XlywpNDjl557BUWrbOcf9ZVun-tGpbWkAHSfYu6vorYPK6KI2AhQ63oPElf1ayeLZg4WHg6fFpxK83oCvj0QTdmEKiliC9gJ3QJBGlXM9ApHkFxNmOgsvH6wUJeh5ngKfQDw-VeisGJQhw"
                alt="Verdia Express Logo"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  // Fallback if network blocked
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="font-display text-2xl font-black tracking-tight text-[#1F4F15] flex items-center">
                Verdia
                <span className="w-2 h-2 rounded-full bg-[#B0D165] ml-1"></span>
              </span>
            </button>

            {/* District Pill with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setZoneDropdownOpen(!zoneDropdownOpen)}
                className="hidden md:flex items-center gap-1.5 bg-[#F8FAFC] border border-[#F1D7DE] hover:border-[#B0D165] px-3 py-1.5 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] transition-colors cursor-pointer text-xs"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B0D165] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1F4F15]"></span>
                </span>
                <span className="font-semibold text-[#613914]">
                  📍 {activeZone}, Miraflores (Zona 1 Activa)
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#613914]" />
              </button>

              {zoneDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 w-64 bg-white rounded-xl shadow-xl border border-[#F1D7DE] py-2 z-50">
                  <div className="px-3 py-1 text-[11px] font-bold text-[#613914]/70 uppercase tracking-wider">
                    Cambiar micro-zona de entrega
                  </div>
                  {ZONES.map((zone) => (
                    <button
                      key={zone.name}
                      onClick={() => {
                        onSelectZone(zone.name);
                        setZoneDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F1D7DE]/40 transition-colors cursor-pointer ${
                        activeZone === zone.name ? 'font-bold text-[#1F4F15] bg-[#F1D7DE]/30' : 'text-[#613914]'
                      }`}
                    >
                      <span>{zone.name}, Miraflores</span>
                      <span className="text-[10px] bg-[#B0D165]/30 text-[#1F4F15] px-1.5 py-0.5 rounded font-semibold">
                        ~{zone.deliveryMin} min
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => onNavigate('catalog')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                activeSection === 'catalog' ? 'text-[#1F4F15] border-b-2 border-[#1F4F15] pb-1' : 'text-[#613914]/80 hover:text-[#1F4F15]'
              }`}
            >
              Catálogo
            </button>
            <button
              onClick={() => onNavigate('how-it-works')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                activeSection === 'how-it-works' ? 'text-[#1F4F15] border-b-2 border-[#1F4F15] pb-1' : 'text-[#613914]/80 hover:text-[#1F4F15]'
              }`}
            >
              Cómo Funciona
            </button>
            <button
              onClick={() => onNavigate('producers')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                activeSection === 'producers' ? 'text-[#1F4F15] border-b-2 border-[#1F4F15] pb-1' : 'text-[#613914]/80 hover:text-[#1F4F15]'
              }`}
            >
              Productores
            </button>
            <button
              onClick={() => onNavigate('impact')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                activeSection === 'impact' ? 'text-[#1F4F15] border-b-2 border-[#1F4F15] pb-1' : 'text-[#613914]/80 hover:text-[#1F4F15]'
              }`}
            >
              Impacto
            </button>
            <button
              onClick={() => onNavigate('testimonials')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                activeSection === 'testimonials' ? 'text-[#1F4F15] border-b-2 border-[#1F4F15] pb-1' : 'text-[#613914]/80 hover:text-[#1F4F15]'
              }`}
            >
              Testimonios
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Icon */}
            <button
              aria-label="Buscar producto"
              onClick={onOpenSearch}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F8FAFC] border border-[#F1D7DE] text-[#613914] hover:bg-[#F1D7DE]/50 hover:text-[#1F4F15] transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-[#1F4F15] hover:bg-[#1F4F15]/90 text-white px-4 py-2.5 rounded-full shadow-[0_4px_16px_-2px_rgba(31,79,21,0.25)] transition-all cursor-pointer group active:scale-95"
            >
              <ShoppingBasket className="w-4 h-4 text-[#B0D165] group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-bold">
                {cartCount} {cartCount === 1 ? 'ítem' : 'ítems'} - S/ {cartTotal.toFixed(2)}
              </span>
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center pl-1">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVEt0uFi_IPJD4CD4ZlUclUuioVNo-Q0-VXN1IQZMqpr07ZhxPecG3ke-IVWckDSYAr750V5AwhdiMO9JdVXS_DzLywuLO0XzI6cwjfE_nmBfHNTSVSnaMWMseIm2rVpKfW8S3wXELPALl6uXyfNdvzC8z5jrHX6F521QY1ofSh-2x-f9E0Q1uF6B8L_ndna-gjUHUrQ0rhlPUM1UuYfiX6pcYFxWM_zzQMw-hwTEhZ3KZ3VRp0oFT"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#B0D165]"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
