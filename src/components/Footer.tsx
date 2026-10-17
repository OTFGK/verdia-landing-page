import React, { useState } from 'react';
import { Check, Send, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="w-full bg-[#F1D7DE]/30 border-t border-[#F1D7DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-[#F1D7DE]">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1VGNvNIhggjEReJxcbuoPiH3oRpkJLbORW8qSDae-dywTrFj9CoXx1xzESUN0HeS_xayakGU2SMvqlLwwaqGpikPJSVH_M_UNv4bYcp_G2C8XlywpNDjl557BUWrbOcf9ZVun-tGpbWkAHSfYu6vorYPK6KI2AhQ63oPElf1ayeLZg4WHg6fFpxK83oCvj0QTdmEKiliC9gJ3QJBGlXM9ApHkFxNmOgsvH6wUJeh5ngKfQDw-VeisGJQhw"
                alt="Verdia Express Logo"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="font-display text-2xl font-black tracking-tight text-[#1F4F15]">
                Verdia
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#613914]/80 max-w-sm leading-relaxed">
              Impulsando el comercio fresco e inteligente en Miraflores. Cosecha directa de productores regenerativos a tu mesa en menos de 2 horas.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-black tracking-wider bg-white border border-[#B0D165] text-[#1F4F15] px-3 py-1.5 rounded-full shadow-xs">
                🌱 ECO-DELIVERY 100% ELÉCTRICO
              </span>
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h4 className="font-display text-sm font-bold text-[#1F4F15]">
              Suscríbete a Ofertas Frescas
            </h4>
            <p className="text-xs text-[#613914]/80 leading-relaxed">
              Recibe cada mañana la lista de cosecha del día y promociones exclusivas para tu zona.
            </p>
            {subscribed ? (
              <div className="bg-[#B0D165]/40 border border-[#B0D165] p-3 rounded-xl flex items-center gap-2 text-xs font-bold text-[#1F4F15]">
                <Check className="w-4 h-4 text-[#1F4F15]" />
                <span>¡Listo! Te avisaremos con los primeros lotes de las 6 AM.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu correo"
                  className="flex-1 bg-white border border-[#F1D7DE] text-[#613914] px-3.5 py-2.5 rounded-xl text-xs placeholder:text-[#613914]/50 focus:outline-none focus:ring-2 focus:ring-[#1F4F15] shadow-xs"
                />
                <button
                  type="submit"
                  className="bg-[#1F4F15] hover:bg-[#1F4F15]/90 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer whitespace-nowrap active:scale-95"
                >
                  Suscribir
                </button>
              </form>
            )}
          </div>

          {/* Categories Links */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <h4 className="font-display text-sm font-bold text-[#1F4F15]">
              Categorías
            </h4>
            <ul className="flex flex-col gap-1.5 text-xs text-[#613914]/80">
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#1F4F15] transition-colors cursor-pointer text-left"
                >
                  Verduras de Hoja
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#1F4F15] transition-colors cursor-pointer text-left"
                >
                  Frutas de Temporada
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#1F4F15] transition-colors cursor-pointer text-left"
                >
                  Tubérculos Andinos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#1F4F15] transition-colors cursor-pointer text-left"
                >
                  Hierbas & Aromáticas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#1F4F15] transition-colors cursor-pointer text-left"
                >
                  Canastas Semanales
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <h4 className="font-display text-sm font-bold text-[#1F4F15]">
              Empresa
            </h4>
            <ul className="flex flex-col gap-1.5 text-xs text-[#613914]/80">
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-[#1F4F15] transition-colors cursor-pointer text-left"
                >
                  Cómo Funciona
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('producers')}
                  className="hover:text-[#1F4F15] transition-colors cursor-pointer text-left"
                >
                  Nuestros Agricultores
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('impact')}
                  className="hover:text-[#1F4F15] transition-colors cursor-pointer text-left"
                >
                  Huella Ecológica
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('testimonials')}
                  className="hover:text-[#1F4F15] transition-colors cursor-pointer text-left"
                >
                  Opiniones de Clientes
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#613914]/80">
          {/* Payment Methods */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-[10px] uppercase tracking-wider text-[#613914]/70">
              Métodos de Pago:
            </span>
            <div className="flex items-center gap-2">
              <span className="bg-white border border-[#F1D7DE] px-2.5 py-1 rounded text-[11px] font-bold text-[#613914] shadow-xs">
                Visa
              </span>
              <span className="bg-white border border-[#F1D7DE] px-2.5 py-1 rounded text-[11px] font-bold text-[#613914] shadow-xs">
                Mastercard
              </span>
              <span className="bg-[#DD5510] text-white px-2.5 py-1 rounded text-[11px] font-black shadow-xs tracking-wider">
                Yape
              </span>
              <span className="bg-[#1F4F15] text-white px-2.5 py-1 rounded text-[11px] font-black shadow-xs tracking-wider">
                Plin
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 font-bold text-xs">
            <a href="#instagram" className="hover:text-[#1F4F15] transition-colors">
              Instagram
            </a>
            <a href="#tiktok" className="hover:text-[#1F4F15] transition-colors">
              TikTok
            </a>
            <a href="#whatsapp" className="hover:text-[#1F4F15] transition-colors">
              WhatsApp
            </a>
          </div>

          <p className="text-[11px]">
            © 2024 Verdia Technologies Inc. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
