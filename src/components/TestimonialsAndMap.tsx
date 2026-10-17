import React, { useState } from 'react';
import { Star, Radar, Timer, Bike, MessageSquarePlus, Check, X } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData.ts';
import { Testimonial } from '../types.ts';

interface TestimonialsAndMapProps {
  onOpenLiveTracker: () => void;
  activeZone: string;
}

export const TestimonialsAndMap: React.FC<TestimonialsAndMapProps> = ({
  onOpenLiveTracker,
  activeZone,
}) => {
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewZone, setNewReviewZone] = useState(activeZone);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [submittedReview, setSubmittedReview] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const initials = newReviewName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const created: Testimonial = {
      id: `test-${Date.now()}`,
      name: newReviewName,
      initials: initials || 'VC',
      zone: `${newReviewZone}, Miraflores`,
      comment: `“${newReviewComment}”`,
      rating: newReviewRating,
      timeDelivered: 'Hace unos minutos',
      avatarBgColor: '#1F4F15',
    };

    setReviews([created, ...reviews]);
    setSubmittedReview(true);
    setTimeout(() => {
      setSubmittedReview(false);
      setShowAddReviewModal(false);
      setNewReviewName('');
      setNewReviewComment('');
    }, 1500);
  };

  return (
    <section id="testimonials" className="w-full bg-[#F8FAFC] py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: 3 Verified Local Reviews */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-extrabold uppercase text-[#1F4F15] bg-[#1F4F15]/10 border border-[#B0D165]/50 px-3.5 py-1 rounded-full">
                  Comunidad Miraflores
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-[#1F4F15] mt-2">
                  Lo que opinan tus vecinos
                </h2>
                <p className="text-sm text-[#613914]/80 mt-1">
                  Comentarios verificados de residentes de tu propio cuadrante residencial.
                </p>
              </div>

              <button
                onClick={() => setShowAddReviewModal(true)}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#1F4F15] bg-white border border-[#F1D7DE] hover:border-[#1F4F15] px-3.5 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4 text-[#DD5510]" />
                <span>Escribir reseña</span>
              </button>
            </div>

            {/* Reviews List */}
            <div className="flex flex-col gap-4">
              {reviews.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-[#F1D7DE] flex flex-col gap-2 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-xs"
                        style={{ backgroundColor: item.avatarBgColor || '#1F4F15' }}
                      >
                        {item.initials}
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-bold text-[#1F4F15]">
                          {item.name}
                        </h4>
                        <span className="text-[10px] font-bold text-[#DD5510] uppercase tracking-wider">
                          {item.zone}
                        </span>
                      </div>
                    </div>

                    {/* 5 Stars in Mango Yellow */}
                    <div className="flex text-[#FFBD46] items-center gap-0.5">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFBD46] text-[#FFBD46]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#613914]/90 italic leading-relaxed pt-1">
                    {item.comment}
                  </p>
                </div>
              ))}
            </div>

            <div className="sm:hidden">
              <button
                onClick={() => setShowAddReviewModal(true)}
                className="w-full py-2.5 text-xs font-bold text-[#1F4F15] bg-white border border-[#F1D7DE] rounded-xl flex items-center justify-center gap-1.5"
              >
                <MessageSquarePlus className="w-4 h-4 text-[#DD5510]" />
                <span>Dejar una opinión</span>
              </button>
            </div>
          </div>

          {/* Right: District Interactive Coverage Map Card */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="bg-white p-5 rounded-3xl shadow-lg border border-[#F1D7DE] h-full flex flex-col justify-between">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F1D7DE]/60">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1F4F15]/10 flex items-center justify-center text-[#1F4F15]">
                    <Radar className="w-5 h-5 text-[#1F4F15] animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-[#1F4F15]">
                      Cobertura Activa: Sector Miraflores
                    </h3>
                    <p className="text-xs text-[#613914]/80">
                      Hub de distribución: Micro-almacén Reducto
                    </p>
                  </div>
                </div>
                <span className="bg-[#B0D165] text-[#1F4F15] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  En Vivo
                </span>
              </div>

              {/* Map Preview Container */}
              <div
                onClick={onOpenLiveTracker}
                className="w-full h-72 sm:h-80 rounded-2xl bg-[#F8FAFC] my-4 relative overflow-hidden flex items-center justify-center cursor-pointer group border border-[#F1D7DE]"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuALPqGFmEJWr7xQwMCaP22gA_0krvh03e_MBwrYTX-ur20TBQqQX1eNcv9sNctuNKRF9wfSwzt1O5S-conynZX0n0_ueF13bIKEvpeBFzkLdPdW2wqseFZCOicokR-i2PsIaLiGovMdcv8gaC-rVzW4hPwS8ZegoBN07uMZh1ns_9eFo8_nP7AI1-KzNoTj12OxUWK6WslmY9w4rLaCHHSDH4ieCZCY2SctScrLLHIbFkIWYdv2mQUl')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-[#1F4F15]/10 group-hover:bg-[#1F4F15]/5 transition-colors"></div>

                {/* Overlay Pill: Courier 1 */}
                <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-[#1F4F15] animate-bounce">
                  <Bike className="w-4 h-4 text-[#1F4F15]" />
                  <span className="text-[11px] text-[#1F4F15] font-black">
                    Carlos (#4): Jr. Alcanfores
                  </span>
                </div>

                {/* Overlay Pill: Courier 2 */}
                <div className="absolute bottom-12 right-8 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-[#DD5510]">
                  <Bike className="w-4 h-4 text-[#DD5510]" />
                  <span className="text-[11px] text-[#613914] font-black">
                    Diego (#2): Av. Benavides
                  </span>
                </div>

                {/* Center Hover Action Pill */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                  <span className="bg-[#1F4F15] text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
                    <Radar className="w-4 h-4 text-[#B0D165]" />
                    Abrir Radar de Despacho en Vivo
                  </span>
                </div>
              </div>

              {/* Live Status Strip */}
              <div className="grid grid-cols-2 gap-3 bg-[#F8FAFC] border border-[#F1D7DE] p-3 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1F4F15]/10 flex items-center justify-center text-[#1F4F15]">
                    <Timer className="w-5 h-5 text-[#1F4F15]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#613914]/70">
                      Tiempo promedio actual
                    </p>
                    <p className="font-display text-sm sm:text-base font-black text-[#1F4F15]">
                      24 minutos
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#DD5510]/10 flex items-center justify-center text-[#DD5510]">
                    <Bike className="w-5 h-5 text-[#DD5510]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#613914]/70">
                      Eco-repartidores
                    </p>
                    <p className="font-display text-sm sm:text-base font-black text-[#1F4F15]">
                      12 pedidos en camino
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Review Modal */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#F1D7DE] relative">
            <button
              onClick={() => setShowAddReviewModal(false)}
              className="absolute top-4 right-4 text-[#613914]/70 hover:text-[#1F4F15] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-xl font-bold text-[#1F4F15]">
              Escribir opinión de vecino
            </h3>
            <p className="text-xs text-[#613914]/80 mt-1 mb-4">
              Comparte tu experiencia de entrega fresca en Miraflores.
            </p>

            {submittedReview ? (
              <div className="py-8 text-center flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#B0D165] text-[#1F4F15] flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#1F4F15]">¡Gracias por tu comentario!</h4>
                <p className="text-xs text-[#613914]">Tu opinión ha sido verificada y publicada.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="flex flex-col gap-3.5">
                <div>
                  <label className="text-xs font-bold text-[#613914] block mb-1">Tu nombre</label>
                  <input
                    type="text"
                    required
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    placeholder="Ej. Lucía Vargas"
                    className="w-full px-3 py-2 text-xs border border-[#F1D7DE] rounded-xl focus:ring-2 focus:ring-[#1F4F15] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#613914] block mb-1">Zona en Miraflores</label>
                  <select
                    value={newReviewZone}
                    onChange={(e) => setNewReviewZone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#F1D7DE] rounded-xl focus:ring-2 focus:ring-[#1F4F15] outline-none"
                  >
                    <option value="San Antonio">San Antonio</option>
                    <option value="Santa Cruz">Santa Cruz</option>
                    <option value="La Aurora">La Aurora</option>
                    <option value="Malecón">Malecón</option>
                    <option value="Reducto">Reducto</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#613914] block mb-1">Calificación</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className="text-[#FFBD46] p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${star <= newReviewRating ? 'fill-[#FFBD46]' : 'text-gray-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#613914] block mb-1">Comentario</label>
                  <textarea
                    required
                    rows={3}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Cuéntanos cómo llegaron tus frutas y verduras..."
                    className="w-full px-3 py-2 text-xs border border-[#F1D7DE] rounded-xl focus:ring-2 focus:ring-[#1F4F15] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#1F4F15] text-white text-xs font-bold rounded-xl hover:bg-[#1F4F15]/90 transition-colors shadow-md mt-2"
                >
                  Publicar Opinión
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
