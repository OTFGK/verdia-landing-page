import React, { useState } from 'react';
import { Smartphone, CheckCircle, Bike, RefreshCw, Sparkles, Clock, Leaf } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const stepsDetail = [
    {
      title: 'Monitoreo de cosecha 4:30 AM',
      description: 'Nuestra red de agrónomos en Valle Lurín, Pachacámac y Huaral actualiza el catálogo según lo que alcanzó su punto óptimo de maduración natural esa misma madrugada.',
    },
    {
      title: 'Selección y Empaque Compostable 6:00 AM',
      description: 'Cada pieza se inspecciona sin químicos ni ceras cosméticas. Se empaca en bolsas hidrosolubles y compostables en casa derivadas de almidón de maíz local.',
    },
    {
      title: 'Despacho por Micro-Hubs en Bici Eléctrica',
      description: 'Desde nuestro centro en Reducto (Miraflores), repartidores locales se desplazan exclusivamente en e-bikes con alforjas térmicas certificadas a 4°C.',
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-[#F1D7DE]/30 border-y border-[#F1D7DE] py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
          <span className="text-[11px] uppercase tracking-wider text-[#1F4F15] font-extrabold bg-[#B0D165]/30 border border-[#B0D165]/60 px-4 py-1.5 rounded-full">
            Transparencia de la Huerta a tu Casa
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#1F4F15] tracking-tight">
            Del huerto a tu mesa en 3 pasos sencillos
          </h2>
          <p className="text-sm sm:text-base text-[#613914]/85 leading-relaxed">
            Rediseñamos la cadena de suministro alimentaria urbana para eliminar intermediarios y garantizar la frescura absoluta.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div
            onClick={() => setActiveStep(activeStep === 0 ? null : 0)}
            className="bg-white p-7 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group border border-[#F1D7DE] hover:border-[#B0D165] cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#1F4F15]/10 flex items-center justify-center text-[#1F4F15] group-hover:bg-[#1F4F15] group-hover:text-white transition-colors duration-300">
              <Smartphone className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#1F4F15] mb-1.5">
                1. Elige del catálogo vivo
              </h3>
              <p className="text-sm text-[#613914]/80 leading-relaxed">
                Explora insumos frescos con inventario sincronizado en tiempo real directamente con productores de los valles cercanos.
              </p>
            </div>

            {/* Expandable detail */}
            {activeStep === 0 && (
              <div className="mt-2 p-3 bg-[#F8FAFC] rounded-xl border border-[#B0D165] text-xs text-[#613914]">
                <p className="font-bold text-[#1F4F15] mb-1">{stepsDetail[0].title}</p>
                <p>{stepsDetail[0].description}</p>
              </div>
            )}

            <div className="pt-2 mt-auto border-t border-[#F1D7DE]/60 flex items-center justify-between text-xs text-[#1F4F15] font-bold">
              <span>Sincronización cada 15 min</span>
              <RefreshCw className="w-4 h-4 text-[#B0D165]" />
            </div>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => setActiveStep(activeStep === 1 ? null : 1)}
            className="bg-white p-7 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group border border-[#F1D7DE] hover:border-[#B0D165] cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#B0D165]/20 flex items-center justify-center text-[#1F4F15] group-hover:bg-[#B0D165] group-hover:text-[#1F4F15] transition-colors duration-300">
              <CheckCircle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#1F4F15] mb-1.5">
                2. Selección artesanal 6 AM
              </h3>
              <p className="text-sm text-[#613914]/80 leading-relaxed">
                Tus verduras y frutas son escogidas a mano cada amanecer, verificando textura, coloración natural y aroma sin ceras artificiales.
              </p>
            </div>

            {/* Expandable detail */}
            {activeStep === 1 && (
              <div className="mt-2 p-3 bg-[#F8FAFC] rounded-xl border border-[#B0D165] text-xs text-[#613914]">
                <p className="font-bold text-[#1F4F15] mb-1">{stepsDetail[1].title}</p>
                <p>{stepsDetail[1].description}</p>
              </div>
            )}

            <div className="pt-2 mt-auto border-t border-[#F1D7DE]/60 flex items-center justify-between text-xs text-[#1F4F15] font-bold">
              <span>Control de calidad biométrico</span>
              <Sparkles className="w-4 h-4 text-[#FFBD46]" />
            </div>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => setActiveStep(activeStep === 2 ? null : 2)}
            className="bg-white p-7 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group border border-[#F1D7DE] hover:border-[#B0D165] cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#DD5510]/10 flex items-center justify-center text-[#DD5510] group-hover:bg-[#DD5510] group-hover:text-white transition-colors duration-300">
              <Bike className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#1F4F15] mb-1.5">
                3. Eco-entrega ultra rápida
              </h3>
              <p className="text-sm text-[#613914]/80 leading-relaxed">
                En menos de 45 min en bicicleta eléctrica asistida, protegidos en bolsas de fécula de maíz 100% compostables en tu hogar.
              </p>
            </div>

            {/* Expandable detail */}
            {activeStep === 2 && (
              <div className="mt-2 p-3 bg-[#F8FAFC] rounded-xl border border-[#B0D165] text-xs text-[#613914]">
                <p className="font-bold text-[#1F4F15] mb-1">{stepsDetail[2].title}</p>
                <p>{stepsDetail[2].description}</p>
              </div>
            )}

            <div className="pt-2 mt-auto border-t border-[#F1D7DE]/60 flex items-center justify-between text-xs text-[#1F4F15] font-bold">
              <span>0% Emisiones de carbono</span>
              <Leaf className="w-4 h-4 text-[#1F4F15]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
