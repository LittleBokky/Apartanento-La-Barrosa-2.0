
import React, { useState } from 'react';
import { Language } from '../types';

const Booking: React.FC<{ lang: Language }> = ({ lang }) => {
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);

  const t = {
    es: {
      title: "Reserva tu estancia",
      subtitle: "Asegura tus fechas directamente para el mejor precio.",
      step1: "Seleccionar Fechas",
      step2: "Detalles de Huéspedes",
      summary: "Tu Estancia",
      total: "Total (EUR)",
      confirm: "Confirmar Reserva",
      safe: "Proceso de pago seguro",
      guarantee: "Mejor Precio Garantizado",
      guaranteeDesc: "No encontrarás un precio más bajo en ningún otro sitio."
    },
    en: {
      title: "Book your stay",
      subtitle: "Secure your dates directly for the best price.",
      step1: "Select Dates",
      step2: "Guest Details",
      summary: "Your Stay",
      total: "Total (EUR)",
      confirm: "Confirm Booking",
      safe: "Secure payment process",
      guarantee: "Best Price Guaranteed",
      guaranteeDesc: "You won't find a lower price anywhere else."
    }
  }[lang];

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 animate-fade-in-up">
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-black mb-3">{t.title}</h1>
        <p className="text-text-muted text-lg">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* Calendar Placeholder */}
          <section className="bg-white dark:bg-surface-dark rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-8">
              <span className="size-7 bg-primary text-white text-xs rounded-full flex items-center justify-center font-black">1</span>
              {t.step1}
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-10 text-center border border-gray-100 dark:border-gray-800">
               <span className="material-symbols-outlined text-5xl text-primary/20 mb-4">calendar_month</span>
               <p className="font-bold text-text-muted">{lang === 'es' ? 'Calendario de Disponibilidad' : 'Availability Calendar'}</p>
               <p className="text-sm text-text-muted mt-2">{lang === 'es' ? 'Selecciona entrada y salida' : 'Select arrival and departure'}</p>
            </div>
          </section>

          {/* Guests section */}
          <section className="bg-white dark:bg-surface-dark rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-8">
              <span className="size-7 bg-primary text-white text-xs rounded-full flex items-center justify-center font-black">2</span>
              {t.step2}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                <div>
                  <p className="font-bold">{lang === 'es' ? 'Adultos' : 'Adults'}</p>
                  <p className="text-xs text-text-muted">13+ {lang === 'es' ? 'años' : 'years'}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setAdults(Math.max(1, adults-1))} className="size-10 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white transition-colors">-</button>
                  <span className="font-black w-4 text-center">{adults}</span>
                  <button onClick={() => setAdults(adults+1)} className="size-10 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white transition-colors">+</button>
                </div>
              </div>
              <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                <div>
                  <p className="font-bold">{lang === 'es' ? 'Niños' : 'Children'}</p>
                  <p className="text-xs text-text-muted">2-12 {lang === 'es' ? 'años' : 'years'}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setKids(Math.max(0, kids-1))} className="size-10 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white transition-colors">-</button>
                  <span className="font-black w-4 text-center">{kids}</span>
                  <button onClick={() => setKids(kids+1)} className="size-10 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white transition-colors">+</button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder={lang === 'es' ? 'Nombre' : 'First Name'} className="h-14 px-5 bg-gray-50 dark:bg-gray-900 border-none rounded-xl" />
              <input type="text" placeholder={lang === 'es' ? 'Apellidos' : 'Last Name'} className="h-14 px-5 bg-gray-50 dark:bg-gray-900 border-none rounded-xl" />
              <input type="email" placeholder="Email" className="h-14 px-5 bg-gray-50 dark:bg-gray-900 border-none rounded-xl md:col-span-2" />
            </div>
          </section>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="h-32 bg-primary p-8 flex items-end">
                <div className="text-white">
                  <h4 className="text-2xl font-black">{t.summary}</h4>
                  <p className="text-xs opacity-80 uppercase tracking-widest font-bold">Apartamento La Barrosa</p>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between pb-8 border-b border-dashed border-gray-200 dark:border-gray-800 mb-8">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-text-muted uppercase mb-1">{lang === 'es' ? 'Llegada' : 'Arrival'}</p>
                    <p className="font-bold">12 Jul</p>
                  </div>
                  <span className="material-symbols-outlined text-gray-200">arrow_forward</span>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-text-muted uppercase mb-1">{lang === 'es' ? 'Salida' : 'Departure'}</p>
                    <p className="font-bold">19 Jul</p>
                  </div>
                </div>
                <div className="space-y-4 mb-10">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">7 {lang === 'es' ? 'noches' : 'nights'} x €150</span>
                    <span className="font-bold">€1.050,00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">{lang === 'es' ? 'Limpieza' : 'Cleaning'}</span>
                    <span className="font-bold">€45,00</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600 font-bold bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                    <span>{lang === 'es' ? 'Ahorro Reserva Directa' : 'Direct Booking Discount'}</span>
                    <span>-€52,50</span>
                  </div>
                </div>
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <p className="text-sm font-bold">{t.total}</p>
                    <p className="text-[10px] text-text-muted">{lang === 'es' ? 'IVA e impuestos incluidos' : 'VAT and taxes included'}</p>
                  </div>
                  <p className="text-4xl font-black text-primary">€1.042</p>
                </div>
                <button className="w-full h-16 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all">
                  {t.confirm}
                </button>
                <p className="text-center text-[10px] text-text-muted mt-6 flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined !text-sm text-green-500">verified_user</span>
                  {t.safe}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 flex gap-4 items-center">
              <div className="size-12 rounded-full bg-white dark:bg-gray-900 shadow-sm flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl">savings</span>
              </div>
              <div>
                <p className="text-sm font-bold mb-1">{t.guarantee}</p>
                <p className="text-xs text-text-muted">{t.guaranteeDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
