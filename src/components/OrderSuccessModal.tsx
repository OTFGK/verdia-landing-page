import React from 'react';
import { CheckCircle2, Bike, MapPin, Receipt, ArrowRight, X, Clock } from 'lucide-react';

interface OrderSuccessModalProps {
  order: any | null;
  onClose: () => void;
  onOpenLiveTracker: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onOpenLiveTracker,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#F1D7DE] overflow-hidden p-6 sm:p-8 flex flex-col gap-5 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#613914]/70 hover:text-[#1F4F15] p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-16 h-16 rounded-full bg-[#B0D165]/30 border-2 border-[#1F4F15] flex items-center justify-center text-[#1F4F15]">
            <CheckCircle2 className="w-10 h-10 text-[#1F4F15]" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-wider bg-[#B0D165] text-[#1F4F15] px-3 py-0.5 rounded-full mt-1">
            ¡Pedido Confirmado con Éxito!
          </span>
          <h3 className="font-display text-2xl font-black text-[#1F4F15]">
            Orden #{order.id}
          </h3>
          <p className="text-xs text-[#613914]/80 max-w-sm">
            Tus productos cosechados esta mañana están siendo empacados en bolsa compostable en nuestro micro-hub de Reducto.
          </p>
        </div>

        {/* Delivery Details Card */}
        <div className="bg-[#F8FAFC] border border-[#F1D7DE] p-4 rounded-2xl flex flex-col gap-2.5 text-xs text-[#613914]">
          <div className="flex items-center justify-between pb-2 border-b border-[#F1D7DE]">
            <span className="flex items-center gap-1.5 font-bold text-[#1F4F15]">
              <Clock className="w-4 h-4 text-[#DD5510]" />
              Tiempo estimado de llegada:
            </span>
            <span className="font-display font-black text-[#1F4F15] text-sm">
              24 - 28 minutos
            </span>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#1F4F15] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#1F4F15]">{order.address}</p>
              <p className="text-[11px] text-[#613914]/70">Sector {order.zone}, Miraflores</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#F1D7DE]">
            <span>Total pagado ({order.paymentMethod.toUpperCase()}):</span>
            <span className="font-display font-black text-[#1F4F15] text-base">
              S/ {order.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button
            onClick={() => {
              onClose();
              onOpenLiveTracker();
            }}
            className="flex-1 py-3 bg-[#1F4F15] hover:bg-[#1F4F15]/90 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <Bike className="w-4 h-4 text-[#B0D165]" />
            <span>Seguir Eco-Repartidor en Vivo</span>
          </button>

          <button
            onClick={onClose}
            className="py-3 px-5 bg-white border border-[#F1D7DE] hover:bg-[#F1D7DE]/40 text-[#613914] rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
