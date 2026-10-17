import React, { useState } from 'react';
import { MapPin, ArrowRight, Zap, ShieldCheck, Bike, Snowflake, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  activeZone: string;
  onSelectZone: (zone: string) => void;
  onExploreCatalog: () => void;
  onOpenLiveTracker: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeZone,
  onSelectZone,
  onExploreCatalog,
  onOpenLiveTracker,
}) => {
  const [districtInputValue, setDistrictInputValue] = useState(`${activeZone}, Miraflores`);

  const handleZoneClick = (zone: string) => {
    onSelectZone(zone);
    setDistrictInputValue(`${zone}, Miraflores`);
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#F8FAFC] pt-8 pb-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Content & Micro-Action */}
          <div className="lg:col-span-7 flex flex-col items-start gap-5 z-10">
            {/* Organic Tech Badge */}
            <div className="inline-flex items-center gap-2 bg-[#F1D7DE]/60 border border-[#B0D165]/40 px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B0D165] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1F4F15]"></span>
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1F4F15]">
                🌱 Cosechado hoy · Entregado en minutos
              </span>
            </div>

            {/* Bold Headline */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#1F4F15] tracking-tight leading-tight md:leading-[1.15]">
              Verdia: La frescura del campo en tu distrito en{' '}
              <span className="text-[#1F4F15] underline decoration-[#B0D165] decoration-4 underline-offset-8">
                menos de 45 minutos.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#613914]/85 max-w-xl font-normal leading-relaxed">
              Frutas y verduras de máxima calidad seleccionadas hoy por productores locales. Entrega rápida, sostenible y directa a tu puerta.
            </p>

            {/* Interactive District Coverage Search Bar */}
            <div className="w-full max-w-xl bg-white p-2 rounded-2xl shadow-lg border border-[#F1D7DE] flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-1 w-full flex items-center">
                  <MapPin className="absolute left-3.5 w-5 h-5 text-[#1F4F15]" />
                  <input
                    type="text"
                    value={districtInputValue}
                    onChange={(e) => setDistrictInputValue(e.target.value)}
                    placeholder="Ingresa tu zona (ej. San Antonio, Aurora)"
                    className="w-full pl-11 pr-3 py-3 rounded-xl text-sm font-medium text-[#613914] placeholder:text-[#613914]/50 focus:outline-none focus:ring-2 focus:ring-[#1F4F15] bg-[#F8FAFC]/60"
                  />
                </div>
                <button
                  type="button"
                  onClick={onExploreCatalog}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1F4F15] hover:bg-[#1F4F15]/90 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group active:scale-95"
                >
                  <span>Explorar Catálogo</span>
                  <ArrowRight className="w-4 h-4 text-[#B0D165] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* District Quick Selectors */}
              <div className="flex items-center flex-wrap gap-1.5 pt-1 px-1">
                <span className="text-[11px] uppercase text-[#613914]/70 font-bold">Zonas directas:</span>
                {['San Antonio', 'Santa Cruz', 'La Aurora', 'Malecón', 'Reducto'].map((zone) => (
                  <button
                    key={zone}
                    type="button"
                    onClick={() => handleZoneClick(zone)}
                    className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeZone === zone
                        ? 'bg-[#B0D165] text-[#1F4F15] shadow-xs'
                        : 'bg-[#F8FAFC] hover:bg-[#F1D7DE] text-[#613914] border border-[#F1D7DE]'
                    }`}
                  >
                    {zone}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Badges Underneath */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[#613914] text-xs font-medium">
              <div className="flex items-center gap-1.5 bg-white border border-[#F1D7DE] px-3 py-1.5 rounded-full shadow-xs">
                <Zap className="w-4 h-4 text-[#DD5510]" />
                <span>Sin costo de envío en pedidos &gt; S/ 30</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-[#F1D7DE] px-3 py-1.5 rounded-full shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#1F4F15]" />
                <span>100% Garantía de reposición inmediata</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center mt-6 lg:mt-0">
            {/* Ambient Glow */}
            <div className="absolute -inset-4 bg-[#B0D165]/20 rounded-3xl blur-3xl -z-10 pointer-events-none"></div>

            {/* Master Visual Card */}
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#F1D7DE] overflow-hidden group">
              {/* Produce Hero Image */}
              <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJpFXlrqGWOHTh1y1pSHIWCtfJR7DxS32-LaUUpRh1KlsIT0CF9h_AgMEHy1_RLGa8evWnJTnEv58kldHfH_0VSiHNeIjjtjCXhY3XneENekFoT4xPweoh_tQT-_Sq_ObhX9JIMLvZfUJxSAQRIWzHeuNNz77AloCNMy_OI3jDRy12ZhHRCn97WfW4gaum6ySjSXL-gAluk4kV8p1weaq1GQYym6n2lXN7J_gSm18JYCyTx_NzGblr"
                  alt="Canasta con vegetales y frutas frescas de la cosecha matutina"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Top Left Freshness Harvest Tag */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-[#B0D165]">
                  <span className="material-symbols-outlined text-[#1F4F15] text-base">spa</span>
                  <span className="text-[11px] uppercase text-[#1F4F15] font-extrabold tracking-wider">
                    Cosechado 5:30 AM · Valle Lurín
                  </span>
                </div>

                {/* Bottom Overlay Details */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#B0D165] text-2xl">nest_eco_leaf</span>
                    <div>
                      <p className="font-display text-base font-bold text-white leading-tight">
                        Cosecha Matutina Lote #142
                      </p>
                      <p className="text-xs text-[#B0D165] font-medium">
                        100% Sin cámaras frigoríficas artificiales
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card: Live Delivery Tracker */}
              <div
                onClick={onOpenLiveTracker}
                className="p-4 bg-white flex flex-col gap-2 cursor-pointer hover:bg-[#F8FAFC] transition-colors border-t border-[#F1D7DE]"
                title="Haz clic para ver el radar del repartidor en vivo"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#1F4F15]/10 flex items-center justify-center text-[#1F4F15]">
                      <Bike className="w-4 h-4 text-[#1F4F15]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1F4F15] flex items-center gap-1">
                        Repartidor en ruta directa
                        <span className="text-[10px] bg-[#FFBD46] text-[#613914] px-1 rounded font-bold">EN VIVO</span>
                      </h4>
                      <p className="text-[11px] text-[#613914]/80">
                        Llegada a Sector {activeZone} en 18 min
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#B0D165] text-[#1F4F15] px-2 py-1 rounded-full font-black tracking-wider">
                    75% COMPLETADO
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#F1D7DE] rounded-full h-2 overflow-hidden mt-1">
                  <div className="bg-[#1F4F15] h-full rounded-full w-3/4 animate-pulse"></div>
                </div>

                {/* Badges bottom strip */}
                <div className="flex items-center justify-between pt-1 text-[#613914] text-[11px] font-bold">
                  <span className="flex items-center gap-1 text-[#1F4F15]">
                    <Snowflake className="w-3.5 h-3.5 text-[#1F4F15]" />
                    Cadena de frío activa
                  </span>
                  <span className="flex items-center gap-1 text-[#DD5510]">
                    <Zap className="w-3.5 h-3.5 text-[#DD5510]" />
                    100% Bici Eléctrica
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
