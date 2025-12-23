
import React, { useState } from 'react';
import { Language } from '../types';

const Contact: React.FC<{ lang: Language }> = ({ lang }) => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const t = {
    es: {
      title: "Contacta con nosotros",
      subtitle: "¿Tienes dudas? Háznoslo saber. Reserva directo para evitar comisiones.",
      sendMsg: "Envíanos un mensaje",
      name: "Nombre completo",
      email: "Correo electrónico",
      subject: "Asunto",
      msg: "Mensaje",
      send: "Enviar mensaje",
      success: "¡Mensaje enviado con éxito!",
      address: "Dirección",
      phone: "Teléfono",
      findUs: "Estamos aquí",
      googleMaps: "Abrir en Google Maps"
    },
    en: {
      title: "Contact us",
      subtitle: "Have questions? Let us know. Book direct to avoid commissions.",
      sendMsg: "Send us a message",
      name: "Full Name",
      email: "Email Address",
      subject: "Subject",
      msg: "Message",
      send: "Send message",
      success: "Message sent successfully!",
      address: "Address",
      phone: "Phone",
      findUs: "Find us here",
      googleMaps: "Open in Google Maps"
    }
  }[lang];

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 animate-fade-in-up">
      <div className="flex flex-col gap-4 mb-16 text-center lg:text-left">
        <h1 className="text-5xl lg:text-6xl font-black tracking-tight">{t.title}</h1>
        <p className="text-text-muted dark:text-gray-400 text-lg max-w-2xl leading-relaxed">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-7 bg-white dark:bg-surface-dark p-8 lg:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
          <h3 className="text-2xl font-black mb-8">{t.sendMsg}</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold">{t.name}</label>
                <input required type="text" className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl h-14 px-5 focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">{t.email}</label>
                <input required type="email" className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl h-14 px-5 focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">{t.subject}</label>
              <select className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl h-14 px-5 focus:ring-2 focus:ring-primary/20">
                <option>{lang === 'es' ? 'Consulta general' : 'General Inquiry'}</option>
                <option>{lang === 'es' ? 'Reserva' : 'Booking'}</option>
                <option>{lang === 'es' ? 'Problema técnico' : 'Technical Issue'}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">{t.msg}</label>
              <textarea required rows={4} className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl p-5 focus:ring-2 focus:ring-primary/20 resize-none"></textarea>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
              <p className="text-xs text-text-muted flex items-center gap-1.5">
                <span className="material-symbols-outlined text-green-500 !text-sm">check_circle</span>
                {lang === 'es' ? 'Respuesta en menos de 24h' : 'Reply in less than 24h'}
              </p>
              <button disabled={sent} type="submit" className="w-full md:w-auto h-14 px-10 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:bg-green-500">
                {sent ? (
                  <><span className="material-symbols-outlined">check</span> {t.success}</>
                ) : (
                  <>{t.send} <span className="material-symbols-outlined text-sm">send</span></>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
            <div className="flex gap-6">
              <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <h4 className="font-bold mb-1">{t.address}</h4>
                <p className="text-sm text-text-muted dark:text-gray-400">Calle La Barrosa, 12, 11130<br/>Chiclana, Cádiz, España</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">call</span>
              </div>
              <div>
                <h4 className="font-bold mb-1">{t.phone}</h4>
                <p className="text-sm text-text-muted dark:text-gray-400">+34 956 123 456</p>
                <p className="text-[10px] text-primary font-bold uppercase mt-1">WhatsApp Disponible</p>
              </div>
            </div>
          </div>

          <div className="relative h-[350px] rounded-3xl overflow-hidden shadow-2xl group">
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLCiaQH--eWCASRa3bMVrhXQFUkJi-IPFzl4XvLlJ7pVr5QnpxZ5oBGUi5mxnQBr0XtVnWoRyvmzCf26wYTn94xNmdXi5s7U_kAUbZz_wvqs8sirt2SCM13EqjfV43vVlBYMh1VrAHHdIfent38tRFXwXeNuxFMB4zpCN0XvH1RXP5vb0kNLqFCloTkAWZWSRM43nuHyofJhqjvLLhObYe21axumWljIXGLauim47hOXyp1wdztTAQDNChc94egTKzN3rGa3JPg224" className="w-full h-full object-cover" alt="Map" />
             <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all pointer-events-none"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
               <span className="material-symbols-outlined text-primary text-6xl drop-shadow-2xl animate-bounce">location_on</span>
               <div className="bg-white dark:bg-gray-900 px-4 py-2 rounded-xl shadow-2xl text-xs font-black uppercase tracking-widest mt-2">{t.findUs}</div>
             </div>
             <button className="absolute bottom-6 left-6 bg-white dark:bg-gray-900 text-sm font-bold py-3 px-5 rounded-xl shadow-2xl flex items-center gap-2 hover:bg-gray-50 transition-colors">
               <span className="material-symbols-outlined text-primary">map</span>
               {t.googleMaps}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
