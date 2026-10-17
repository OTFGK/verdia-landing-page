import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBasket, Check, ArrowRight, ShieldCheck, Zap, Bike } from 'lucide-react';
import { CartItem } from '../types.ts';
import { ZONES } from '../data/mockData.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  activeZone: string;
  onOrderSuccess: (orderDetails: any) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  activeZone,
  onOrderSuccess,
}) => {
  const [couponCode, setCouponCode] = useState('VERDIA20');
  const [couponApplied, setCouponApplied] = useState(true);
  const [couponError, setCouponError] = useState('');
  const [address, setAddress] = useState(`Calle Los Pinos 240, Dpto 402, ${activeZone}`);
  const [paymentMethod, setPaymentMethod] = useState<'yape' | 'plin' | 'card'>('yape');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = couponApplied ? subtotal * 0.20 : 0;
  const shippingFee = subtotal >= 30 ? 0 : 4.50;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'VERDIA20') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponApplied(false);
      setCouponError('Cupón inválido. Usa VERDIA20 para 20% de descuento.');
    }
  };

  const handleCheckout = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOrderSuccess({
        id: `VER-${Math.floor(100000 + Math.random() * 900000)}`,
        items,
        subtotal,
        discount,
        total,
        address,
        zone: activeZone,
        paymentMethod,
        estimatedMinutes: 26,
      });
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l border-[#F1D7DE]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#F1D7DE] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#1F4F15] flex items-center justify-center text-white">
              <ShoppingBasket className="w-5 h-5 text-[#B0D165]" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-black text-[#1F4F15]">
                Tu Canasta Fresca
              </h3>
              <p className="text-xs text-[#613914]/80">
                Entrega express en Miraflores ({activeZone})
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

        {/* Free Shipping Alert Bar */}
        <div className="bg-[#F1D7DE]/40 px-5 py-2.5 border-b border-[#F1D7DE] text-xs">
          {subtotal >= 30 ? (
            <p className="text-[#1F4F15] font-bold flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#DD5510]" />
              <span>¡Felicidades! Calificas para <strong>Envío Express Gratis</strong>.</span>
            </p>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="text-[#613914]">
                Agrega <strong>S/ {(30 - subtotal).toFixed(2)}</strong> más para envío <strong>GRATIS</strong>.
              </p>
              <div className="w-full bg-white rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#B0D165] h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / 30) * 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 gap-3">
              <div className="w-16 h-16 rounded-full bg-[#F1D7DE]/50 flex items-center justify-center text-[#613914]">
                <ShoppingBasket className="w-8 h-8 text-[#1F4F15]" />
              </div>
              <h4 className="font-display text-lg font-bold text-[#1F4F15]">Tu canasta está vacía</h4>
              <p className="text-xs text-[#613914]/70 max-w-xs">
                Selecciona tus verduras y frutas cosechadas hoy en Miraflores para llenar tu canasta.
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-[#1F4F15] text-white text-xs font-bold px-5 py-2.5 rounded-full cursor-pointer hover:bg-[#1F4F15]/90"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white p-3 rounded-2xl border border-[#F1D7DE] flex items-center gap-3 shadow-xs hover:border-[#B0D165] transition-colors"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#F1D7DE]"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-xs sm:text-sm font-bold text-[#1F4F15] truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-[#613914]/70">
                    {item.product.origin} · S/ {item.product.price.toFixed(2)}
                  </p>
                  <p className="font-black text-xs text-[#1F4F15] mt-0.5">
                    S/ {(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center bg-[#F8FAFC] border border-[#F1D7DE] rounded-lg p-0.5">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center text-[#613914] hover:bg-[#F1D7DE]/50 rounded cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-[#1F4F15]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center text-[#613914] hover:bg-[#F1D7DE]/50 rounded cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1.5 text-[#613914]/50 hover:text-[#DD5510] transition-colors cursor-pointer"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Coupon Code Strip */}
          {items.length > 0 && (
            <div className="mt-2 bg-[#F8FAFC] p-3 rounded-2xl border border-[#F1D7DE]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Código de descuento"
                  className="flex-1 bg-white border border-[#F1D7DE] px-3 py-1.5 rounded-xl text-xs uppercase font-bold text-[#1F4F15] focus:outline-none focus:ring-1 focus:ring-[#1F4F15]"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="bg-[#1F4F15] text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-[#1F4F15]/90 cursor-pointer"
                >
                  Aplicar
                </button>
              </div>
              {couponApplied && (
                <p className="text-[11px] text-[#1F4F15] font-bold mt-1.5 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#1F4F15]" />
                  <span>¡Cupón VERDIA20 activo! 20% de descuento aplicado.</span>
                </p>
              )}
              {couponError && <p className="text-[11px] text-[#DD5510] font-bold mt-1">{couponError}</p>}
            </div>
          )}

          {/* Delivery & Payment Selection */}
          {items.length > 0 && (
            <div className="mt-2 flex flex-col gap-3">
              <div>
                <label className="text-xs font-bold text-[#613914] block mb-1">
                  Dirección de Entrega ({activeZone}, Miraflores)
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white border border-[#F1D7DE] px-3 py-2 rounded-xl text-xs text-[#613914] focus:outline-none focus:ring-1 focus:ring-[#1F4F15]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#613914] block mb-1">
                  Método de Pago
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('yape')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-0.5 border cursor-pointer transition-all ${
                      paymentMethod === 'yape'
                        ? 'bg-[#DD5510] text-white border-[#DD5510] shadow-sm'
                        : 'bg-white text-[#613914] border-[#F1D7DE] hover:bg-[#F1D7DE]/40'
                    }`}
                  >
                    <span>Yape</span>
                    <span className="text-[10px] opacity-80">982 451 902</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('plin')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-0.5 border cursor-pointer transition-all ${
                      paymentMethod === 'plin'
                        ? 'bg-[#1F4F15] text-white border-[#1F4F15] shadow-sm'
                        : 'bg-white text-[#613914] border-[#F1D7DE] hover:bg-[#F1D7DE]/40'
                    }`}
                  >
                    <span>Plin</span>
                    <span className="text-[10px] opacity-80">982 451 902</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-0.5 border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-[#1F4F15] text-white border-[#1F4F15] shadow-sm'
                        : 'bg-white text-[#613914] border-[#F1D7DE] hover:bg-[#F1D7DE]/40'
                    }`}
                  >
                    <span>Tarjeta</span>
                    <span className="text-[10px] opacity-80">POS o Web</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer & Checkout button */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#F1D7DE] bg-[#F8FAFC] flex flex-col gap-3">
            <div className="flex flex-col gap-1 text-xs text-[#613914]">
              <div className="flex justify-between">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} ítems)</span>
                <span className="font-bold">S/ {subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#1F4F15] font-bold">
                  <span>Descuento VERDIA20 (20%)</span>
                  <span>- S/ {discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Envío Express en Bicicleta Eléctrica</span>
                <span className="font-bold">
                  {shippingFee === 0 ? (
                    <span className="text-[#1F4F15]">¡Gratis!</span>
                  ) : (
                    `S/ ${shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-[#1F4F15] pt-2 border-t border-[#F1D7DE]">
                <span>Total a Pagar</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleCheckout}
              className="w-full py-3.5 bg-[#1F4F15] hover:bg-[#1F4F15]/90 text-white rounded-xl font-display font-black text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirmando despacho...</span>
              ) : (
                <>
                  <span>Confirmar Pedido Express</span>
                  <ArrowRight className="w-4 h-4 text-[#B0D165]" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
