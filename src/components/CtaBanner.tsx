import React, { useState } from 'react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

interface CtaBannerProps {
  onOrderNow: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOrderNow }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText('VERDIA20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-12 lg:py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative bg-gradient-to-r from-[#1F4F15] via-[#1F4F15] to-[#1F4F15]/90 border border-[#B0D165]/30 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden">
          {/* Subtle decorative geometric SVG element */}
          <svg
            className="absolute -right-10 -bottom-10 w-72 h-72 text-[#B0D165]/10 pointer-events-none"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="40" />
            <path d="M50 10 L90 50 L50 90 L10 50 Z" opacity="0.3" />
          </svg>

          <div className="relative z-10 max-w-2xl flex flex-col gap-4">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#B0D165] bg-black/25 px-3.5 py-1.5 rounded-full self-start border border-[#B0D165]/40">
              Promoción Exclusiva Vecinal
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              ¿Listo para probar la verdadera frescura?
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
              Haz tu primer pedido hoy y recibe 20% de descuento automático en cualquier canasta o verdura fresca.
            </p>

            {/* Fast Action Strip */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 max-w-lg">
              <div
                onClick={handleCopy}
                className="bg-white text-[#613914] px-4 py-3 rounded-xl flex items-center justify-between flex-1 shadow-inner cursor-pointer hover:bg-[#F8FAFC] transition-colors border border-white/20"
                title="Haz clic para copiar código"
              >
                <span className="text-xs font-semibold text-[#613914]/70">Cupón aplicado:</span>
                <span className="font-display text-base font-black text-[#1F4F15] tracking-wider flex items-center gap-1.5">
                  VERDIA20
                  {copied ? (
                    <Check className="w-4 h-4 text-[#1F4F15]" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-[#DD5510]" />
                  )}
                </span>
              </div>

              <button
                type="button"
                onClick={onOrderNow}
                className="w-full sm:w-auto bg-[#B0D165] text-[#1F4F15] font-display text-sm px-6 py-3.5 rounded-xl font-black shadow-lg hover:bg-[#B0D165]/90 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Hacer Pedido Ahora</span>
                <ArrowRight className="w-4 h-4 text-[#1F4F15]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
