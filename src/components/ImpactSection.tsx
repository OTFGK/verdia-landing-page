import React from 'react';
import { Leaf, Bike, Trash2, Droplets, ShieldCheck, Heart } from 'lucide-react';

export const ImpactSection: React.FC = () => {
  return (
    <section id="impact" className="w-full bg-[#F1D7DE]/30 py-14 lg:py-20 border-t border-[#F1D7DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3 mb-12">
          <span className="text-[11px] uppercase tracking-wider text-[#1F4F15] font-extrabold bg-[#B0D165]/30 border border-[#B0D165]/60 px-4 py-1.5 rounded-full">
            Huella Positiva en el Distrito
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#1F4F15]">
            Tu comida alimenta la salud del planeta
          </h2>
          <p className="text-sm sm:text-base text-[#613914]/85 leading-relaxed">
            Comprar en Verdia no solo te da frescura inigualable; transforma el impacto ambiental de Miraflores.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Impact 1 */}
          <div className="bg-white p-6 rounded-3xl border border-[#F1D7DE] shadow-sm flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1F4F15]/10 flex items-center justify-center text-[#1F4F15]">
              <Bike className="w-6 h-6 text-[#1F4F15]" />
            </div>
            <h3 className="font-display text-2xl font-black text-[#1F4F15]">
              -1,840 kg
            </h3>
            <h4 className="text-xs font-bold text-[#613914] uppercase tracking-wider">
              CO₂ Evitado al Mes
            </h4>
            <p className="text-xs text-[#613914]/80 leading-relaxed">
              100% de nuestras entregas en Miraflores se hacen en bicicletas y cargo-bikes eléctricas asistidas.
            </p>
          </div>

          {/* Impact 2 */}
          <div className="bg-white p-6 rounded-3xl border border-[#F1D7DE] shadow-sm flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#B0D165]/20 flex items-center justify-center text-[#1F4F15]">
              <Leaf className="w-6 h-6 text-[#B0D165]" />
            </div>
            <h3 className="font-display text-2xl font-black text-[#1F4F15]">
              100%
            </h3>
            <h4 className="text-xs font-bold text-[#613914] uppercase tracking-wider">
              Bolsas Compostables
            </h4>
            <p className="text-xs text-[#613914]/80 leading-relaxed">
              Fabricadas a base de almidón y fécula de maíz peruano, solubles y degradables en tu composta casera en 90 días.
            </p>
          </div>

          {/* Impact 3 */}
          <div className="bg-white p-6 rounded-3xl border border-[#F1D7DE] shadow-sm flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#DD5510]/10 flex items-center justify-center text-[#DD5510]">
              <Trash2 className="w-6 h-6 text-[#DD5510]" />
            </div>
            <h3 className="font-display text-2xl font-black text-[#1F4F15]">
              &lt; 1.2%
            </h3>
            <h4 className="text-xs font-bold text-[#613914] uppercase tracking-wider">
              Mermas de Alimentos
            </h4>
            <p className="text-xs text-[#613914]/80 leading-relaxed">
              Frente al 35% de merma de los supermercados masivos, nuestro modelo cosecha bajo predicción vecinal diaria.
            </p>
          </div>

          {/* Impact 4 */}
          <div className="bg-white p-6 rounded-3xl border border-[#F1D7DE] shadow-sm flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFBD46]/20 flex items-center justify-center text-[#613914]">
              <Droplets className="w-6 h-6 text-[#FFBD46]" />
            </div>
            <h3 className="font-display text-2xl font-black text-[#1F4F15]">
              80% Menos
            </h3>
            <h4 className="text-xs font-bold text-[#613914] uppercase tracking-wider">
              Consumo Hídrico
            </h4>
            <p className="text-xs text-[#613914]/80 leading-relaxed">
              Nuestros huertos hidropónicos en Pachacámac y Surco recirculan y ahorran el recurso vital del agua.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
