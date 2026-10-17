import React from 'react';
import { PRODUCERS } from '../data/mockData.ts';
import { Award, HeartHandshake, MapPin, Calendar } from 'lucide-react';

export const ProducersSection: React.FC = () => {
  return (
    <section id="producers" className="w-full bg-[#F8FAFC] py-14 lg:py-20 border-t border-[#F1D7DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3 mb-12">
          <span className="text-[11px] uppercase tracking-wider text-[#1F4F15] font-extrabold bg-[#B0D165]/30 border border-[#B0D165]/60 px-4 py-1.5 rounded-full">
            Comercio Justo y Regenerativo
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#1F4F15]">
            Conoce a los guardianes de tu alimento
          </h2>
          <p className="text-sm sm:text-base text-[#613914]/85 leading-relaxed">
            Eliminamos hasta 4 intermediarios de la cadena tradicional. Cada sol invertido en Verdia paga un precio justo directo a los agricultores de los valles de Lima.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCERS.map((producer) => (
            <div
              key={producer.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#F1D7DE] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-[#F8FAFC]">
                  <img
                    src={producer.image}
                    alt={producer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-[#1F4F15] text-white px-2.5 py-0.5 rounded-full">
                      {producer.farm}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white mt-1">
                      {producer.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs text-[#DD5510] font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{producer.location}</span>
                  </div>

                  <div className="text-xs text-[#613914]/80 leading-relaxed">
                    <p className="font-bold text-[#1F4F15] mb-1">
                      Especialidad: {producer.specialty} ({producer.experienceYears} años de experiencia)
                    </p>
                    <p>{producer.bio}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="bg-[#B0D165]/20 border border-[#B0D165]/50 p-3 rounded-2xl flex items-center gap-2.5 text-xs text-[#1F4F15] font-bold">
                  <HeartHandshake className="w-4 h-4 text-[#1F4F15] shrink-0" />
                  <span>{producer.fairTradeBonus}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
