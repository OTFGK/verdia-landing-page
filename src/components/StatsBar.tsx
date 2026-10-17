import React from 'react';
import { Timer, Leaf, ShoppingBag, Star } from 'lucide-react';

export const StatsBar: React.FC = () => {
  return (
    <section className="w-full bg-[#F1D7DE]/40 border-y border-[#F1D7DE] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Metric 1 */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F1D7DE] flex flex-col gap-1 items-start hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#1F4F15]">
              <Timer className="w-6 h-6 text-[#1F4F15]" />
              <span className="font-display text-2xl sm:text-3xl font-black text-[#1F4F15]">45 Min</span>
            </div>
            <p className="text-xs sm:text-sm text-[#613914]/80 font-medium">Promedio de entrega barrial</p>
          </div>

          {/* Metric 2 */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F1D7DE] flex flex-col gap-1 items-start hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#1F4F15]">
              <Leaf className="w-6 h-6 text-[#B0D165]" />
              <span className="font-display text-2xl sm:text-3xl font-black text-[#1F4F15]">100%</span>
            </div>
            <p className="text-xs sm:text-sm text-[#613914]/80 font-medium">Origen orgánico y de proximidad</p>
          </div>

          {/* Metric 3 */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F1D7DE] flex flex-col gap-1 items-start hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#DD5510]">
              <ShoppingBag className="w-6 h-6 text-[#DD5510]" />
              <span className="font-display text-2xl sm:text-3xl font-black text-[#1F4F15]">500+</span>
            </div>
            <p className="text-xs sm:text-sm text-[#613914]/80 font-medium">Pedidos entregados hoy</p>
          </div>

          {/* Metric 4 */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F1D7DE] flex flex-col gap-1 items-start hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#FFBD46]">
              <Star className="w-6 h-6 text-[#FFBD46] fill-[#FFBD46]" />
              <span className="font-display text-2xl sm:text-3xl font-black text-[#1F4F15]">4.9 / 5</span>
            </div>
            <p className="text-xs sm:text-sm text-[#613914]/80 font-medium">Satisfacción vecinal comprobada</p>
          </div>
        </div>
      </div>
    </section>
  );
};
