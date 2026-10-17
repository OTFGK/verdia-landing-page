import React, { useState, useEffect } from 'react';
import { X, Bike, Snowflake, Phone, ShieldCheck, MapPin, CheckCircle, Clock } from 'lucide-react';
import { ACTIVE_COURIERS } from '../data/mockData.ts';

interface LiveTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeZone: string;
}

export const LiveTrackerModal: React.FC<LiveTrackerModalProps> = ({
  isOpen,
  onClose,
  activeZone,
}) => {
  const [selectedCourier, setSelectedCourier] = useState(ACTIVE_COURIERS[0]);
  const [minutesRemaining, setMinutesRemaining] = useState(18);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setMinutesRemaining((prev) => (prev > 1 ? prev - 1 : 1));
    }, 12000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#F1D7DE] overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#F1D7DE] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1F4F15] flex items-center justify-center text-white">
              <Bike className="w-5 h-5 text-[#B0D165]" />
            </div>
            <div>
              <h3 className="font-display text-lg font-black text-[#1F4F15]">
                Radar de Despacho en Vivo: Miraflores
              </h3>
              <p className="text-xs text-[#613914]/80">
                Eco-reparto activo hacia Sector {activeZone}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#F1D7DE] text-[#613914] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Courier Selectors */}
        <div className="px-5 py-2.5 bg-[#F1D7DE]/30 border-b border-[#F1D7DE] flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-bold text-[#613914] uppercase">Unidades activas:</span>
          {ACTIVE_COURIERS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCourier(c)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCourier.id === c.id
                  ? 'bg-[#1F4F15] text-white shadow-xs'
                  : 'bg-white text-[#613914] border border-[#F1D7DE]'
              }`}
            >
              {c.name} (#{c.number})
            </button>
          ))}
        </div>

        {/* Live Map Display */}
        <div className="relative h-64 sm:h-72 w-full bg-[#F8FAFC] border-b border-[#F1D7DE] overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuALPqGFmEJWr7xQwMCaP22gA_0krvh03e_MBwrYTX-ur20TBQqQX1eNcv9sNctuNKRF9wfSwzt1O5S-conynZX0n0_ueF13bIKEvpeBFzkLdPdW2wqseFZCOicokR-i2PsIaLiGovMdcv8gaC-rVzW4hPwS8ZegoBN07uMZh1ns_9eFo8_nP7AI1-KzNoTj12OxUWK6WslmY9w4rLaCHHSDH4ieCZCY2SctScrLLHIbFkIWYdv2mQUl"
            alt="Mapa Miraflores"
            className="w-full h-full object-cover"
          />

          {/* Active Courier Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1F4F15] text-white px-3.5 py-1.5 rounded-full shadow-2xl flex items-center gap-2 border-2 border-[#B0D165] animate-pulse">
            <Bike className="w-4 h-4 text-[#B0D165]" />
            <span className="text-xs font-black">
              {selectedCourier.name} (#{selectedCourier.number}) en camino
            </span>
          </div>

          {/* Temperature Sensor Overlay */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-[#F1D7DE] text-xs font-bold text-[#1F4F15] flex items-center gap-1.5">
            <Snowflake className="w-4 h-4 text-[#1F4F15]" />
            <span>Alforja Térmica: 4.2°C (Óptima)</span>
          </div>

          {/* Battery Overlay */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-[#F1D7DE] text-xs font-bold text-[#613914] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#B0D165]"></span>
            <span>Batería: {selectedCourier.batteryPercent}%</span>
          </div>
        </div>

        {/* Live Timeline & Status Details */}
        <div className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#F1D7DE]">
            <div>
              <p className="text-[11px] font-bold text-[#613914]/70 uppercase">
                Ubicación Actual
              </p>
              <h4 className="font-display text-sm font-bold text-[#1F4F15]">
                {selectedCourier.currentStreet}
              </h4>
              <p className="text-xs text-[#613914] mt-0.5">
                Vehículo: {selectedCourier.vehicle}
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-[#1F4F15] font-display">
                ~{minutesRemaining} min
              </span>
              <p className="text-[10px] font-bold text-[#DD5510] uppercase">
                Tiempo Estimado
              </p>
            </div>
          </div>

          {/* Timeline Steps */}
          <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
            <div className="flex flex-col items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-[#B0D165] text-[#1F4F15] flex items-center justify-center font-bold">
                ✓
              </div>
              <span className="font-bold text-[#1F4F15]">Cosecha 5:30 AM</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-[#B0D165] text-[#1F4F15] flex items-center justify-center font-bold">
                ✓
              </div>
              <span className="font-bold text-[#1F4F15]">Inspección Hub</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-[#1F4F15] text-white flex items-center justify-center font-bold animate-ping">
                •
              </div>
              <span className="font-bold text-[#1F4F15]">En ruta express</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-[#F1D7DE] text-[#613914] flex items-center justify-center font-bold">
                4
              </div>
              <span className="text-[#613914]/70">Tu puerta</span>
            </div>
          </div>

          <button
            onClick={() => alert(`Conectando con el repartidor ${selectedCourier.name} vía llamada encriptada...`)}
            className="w-full py-3 bg-[#1F4F15] hover:bg-[#1F4F15]/90 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Phone className="w-4 h-4 text-[#B0D165]" />
            <span>Contactar al repartidor {selectedCourier.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
