
import React, { useState, useEffect } from 'react';
import { Language } from '../types';

const APARTMENT_PHOTOS = [
  { 
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfc0Q5X_lPmae-PhK8-fNBEUZZgho9lEIGh_6tcd6LnCMuEGO7ya416miwRRj2SLKDjgj0TGGBZdLMa0TXaAIMyBn3hrrYvxhpGSSIbnY9dvn85jAeQVZCaTGaXjKCSvxSC4ZLh3a5Vvb1D0CtDNSw8yQjqjM9z9y2CeqsBX1FFe8FIwpCo1gx1SHVeCZCU0foWajkrkrsdPWPV5WqeR9WZEk4dTaVo8EmWplzAXUTGjrkLu6x5faVGGwHbw9D_i-kgk7waMi-5FYS', 
    title: { es: 'Salón y Zona de Estar', en: 'Living & Lounge Area' } 
  },
  { 
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD_44EEDt10cGol4wPlugYm-tepW0DF4OmhOUSjFQTHlC7cmmW7WqTuAoMgWsc5ehFv4WMRuE_S3SDlRWZC7Rat70UX58nOkHsZUhacswXUW7WgOrrjVzQ_St7T6sRVxUK7dfmlgxXrbx68Y17GkjgzYhQRq7aFWUZa2yUn27LeJH2l0oh6atj72pUrMGOu6jqvZDfwQ-IAQpEUStSpNIZJ8RzVWqeAio0ZVFmb7dDMp5IBD-TvoFkIYzvXEMRbpSUnBQQbwnyDL0u', 
    title: { es: 'Dormitorio Principal con Smart TV', en: 'Master Bedroom with Smart TV' } 
  },
  { 
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEQshho2Zim80r7orfJi8xZxk_GKpS3ovb7CdNnFDzvuHsyGWccullarl_81EPi7EcXuLxDdn8N6wXqDa9WI4Oa3lmDBkWmWZ0wBGrLNgp371nx4km2s0eJyYJtZMX_Myq8DZQKdPex2XFTbQnus1oJc9l0z6pIWpyIjZHo-IF-LUoRuHSIU1RumDcd60YIs1B3ZPBa-QkvmzEjk3lYpQ6GswclOt9V5YD7XD_nBKdBJu_FLXfddmX9byrwnIz9ehieI06QT9qwI53', 
    title: { es: 'Cocina Moderna Totalmente Equipada', en: 'Modern Fully Equipped Kitchen' } 
  },
  { 
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-dPrWE3u8Dwn0NoUKbQf6dG_DtSLKC1DNJJGs5bnDYCwxfrDdQxLofsEWreEnC8GDUgJyaI2MfIav0sii_WteTCHSpIKxO2K9NA3-9xIFgDYsCfrTqyutc6zn3ZUGxbn7GljeHq6E_f89fAWWHXZlikEpN1rBLei_yc9O3BQ5CvdZH5pmSLf1b3-tXLUozHiIEEhewlbjo5Rx_4ziahMz-Lvn4zfzmEm4DGd2SB0GE6orBaEwXGg_iFUuSKpGK5X7t1vnMHw4D3oi', 
    title: { es: 'Terraza Privada y Zona Exterior', en: 'Private Terrace & Outdoor Area' } 
  },
  { 
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeHGOdJ9brlNYK9PAgV1r5TQUBYMOt_tzHIrxW9NUFisDkYcYIq0BAHL847KsC9ak6IeIDSHmGvqfuBOnXYZJj6bozOchM1U7TQOfbhg6eLpSOvIMtapuSnuC45IpcWwpQn9xl2EMbWCiD7ZOnSzp9OOM368SRfXyUKcENR0voyoUbEgwA6SzL0iBahXBL6tXzmWtfg6CnDKiu0MHP62TI8kkfjHd9vd5fBRIpgsI4kfxPu-5Vo1ZM6KpirlfNZu91plS6Kb5tf4lM', 
    title: { es: 'Espacio de Trabajo Dedicado', en: 'Dedicated Workspace' } 
  },
  { 
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCBm4nPvDXeA3PZx4wMqzxtEQ3kPEsS0NSFkdi5Cabt74Q1lCc-1e7uS8JkdyGsc0GsQXnsue0-51iqkz3OG6Ra4WiqeLuXfPKxrO97H_JRTcWhxcvUgWAYaY2Eo6vtbLb_MMcY1OEthfK_Qon4VTCtRgm919XW6zQkF2CQuRirkNOgWUNc5VUjtYYYHb6V6Eoep3EWmV64QvJb379uEYQXK_Dx6QDPiEChcoefFi1I0tBBxlEdxA72e8DxRWVHmuFpMhW4xE1CtD-', 
    title: { es: 'Dormitorio Luminoso', en: 'Bright Bedroom' } 
  },
  { 
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLCiaQH--eWCASRa3bMVrhXQFUkJi-IPFzl4XvLlJ7pVr5QnpxZ5oBGUi5mxnQBr0XtVnWoRyvmzCf26wYTn94xNmdXi5s7U_kAUbZz_wvqs8sirt2SCM13EqjfV43vVlBYMh1VrAHHdIfent38tRFXwXeNuxFMB4zpCN0XvH1RXP5vb0kNLqFCloTkAWZWSRM43nuHyofJhqjvLLhObYe21axumWljIXGLauim47hOXyp1wdztTAQDNChc94egTKzN3rGa3JPg224', 
    title: { es: 'Comedor Exterior', en: 'Outdoor Dining' } 
  },
];

const Apartment: React.FC<{ lang: Language }> = ({ lang }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextSlide = () => setCurrentIdx((prev) => (prev + 1) % APARTMENT_PHOTOS.length);
  const prevSlide = () => setCurrentIdx((prev) => (prev - 1 + APARTMENT_PHOTOS.length) % APARTMENT_PHOTOS.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const t = {
    es: {
      title: "Tu Refugio en la Costa",
      subtitle: "Un espacio diseñado para el descanso, con acabados de madera natural y luz mediterránea.",
      roomsTitle: "Espacios Diseñados",
      roomsDesc: "Cada rincón ha sido pensado para ofrecerte la máxima comodidad durante tu estancia.",
      kitchen: "Cocina Equipada",
      kitchenDesc: "Electrodomésticos Siemens, cafetera Nespresso y todo el menaje necesario.",
      terrace: "Oasis Exterior",
      terraceDesc: "Terraza privada con zona de comedor para disfrutar del clima de Cádiz bajo el toldo.",
      living: "Conectividad y Ocio",
      livingDesc: "Smart TV de 50\", zona de trabajo y un ambiente acogedor con toques marineros."
    },
    en: {
      title: "Your Coastal Retreat",
      subtitle: "A space designed for relaxation, featuring natural wood finishes and Mediterranean light.",
      roomsTitle: "Designed Spaces",
      roomsDesc: "Every corner has been thought out to offer you maximum comfort during your stay.",
      kitchen: "Equipped Kitchen",
      kitchenDesc: "Siemens appliances, Nespresso coffee machine, and all necessary kitchenware.",
      terrace: "Outdoor Oasis",
      terraceDesc: "Private terrace with dining area to enjoy the Cádiz climate under the shade.",
      living: "Connectivity & Leisure",
      livingDesc: "50\" Smart TV, dedicated workspace, and a cozy atmosphere with nautical touches."
    }
  }[lang];

  return (
    <div className="animate-fade-in-up">
      {/* Carrusel Galería */}
      <section className="relative w-full h-[60vh] lg:h-[85vh] bg-black overflow-hidden group">
        {APARTMENT_PHOTOS.map((photo, i) => (
          <div 
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === currentIdx ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={photo.url} className="w-full h-full object-cover brightness-[0.85]" alt={photo.title[lang]} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          </div>
        ))}

        <div className="absolute bottom-12 left-10 z-20">
          <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-2 block">
            {lang === 'es' ? 'Galería Real' : 'Real Gallery'}
          </span>
          <h2 className="text-white text-3xl lg:text-5xl font-black mb-2">
            {APARTMENT_PHOTOS[currentIdx].title[lang]}
          </h2>
          <p className="text-white/70 text-sm font-bold">
            {currentIdx + 1} / {APARTMENT_PHOTOS.length}
          </p>
        </div>

        {/* Navegación Carrusel */}
        <button 
          onClick={(e) => { e.preventDefault(); prevSlide(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 size-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button 
          onClick={(e) => { e.preventDefault(); nextSlide(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 size-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-12 right-10 z-30 flex gap-2">
          {APARTMENT_PHOTOS.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`h-1.5 rounded-full transition-all ${i === currentIdx ? 'w-8 bg-primary' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight">{t.title}</h1>
          <p className="text-text-muted dark:text-gray-400 text-lg leading-relaxed">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="aspect-video rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative group shadow-2xl">
              <img 
                src={APARTMENT_PHOTOS[0].url} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Living"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-2xl font-bold">{t.living}</h3>
                <p className="text-white/80 text-sm mt-2">{t.livingDesc}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all">
                <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined">countertops</span>
                </div>
                <h4 className="text-xl font-bold mb-3">{t.kitchen}</h4>
                <p className="text-sm text-text-muted dark:text-gray-400 leading-relaxed">{t.kitchenDesc}</p>
              </div>
              <div className="p-8 rounded-3xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all">
                <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined">deck</span>
                </div>
                <h4 className="text-xl font-bold mb-3">{t.terrace}</h4>
                <p className="text-sm text-text-muted dark:text-gray-400 leading-relaxed">{t.terraceDesc}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 flex flex-col justify-between shadow-inner">
            <div>
              <span className="material-symbols-outlined text-primary text-5xl mb-6">king_bed</span>
              <h3 className="text-2xl font-black mb-4">{t.roomsTitle}</h3>
              <p className="text-text-muted dark:text-gray-300 mb-8">{t.roomsDesc}</p>
              <ul className="space-y-4">
                {[
                  { es: '2 Dormitorios dobles', en: '2 Double bedrooms' },
                  { es: 'Dormitorio con Smart TV y escritorio', en: 'Bedroom with Smart TV & desk' },
                  { es: 'Baño con ducha moderna', en: 'Bathroom with modern shower' },
                  { es: 'Ropa de cama premium incluida', en: 'Premium linens included' }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium">
                    <span className="material-symbols-outlined text-primary text-sm">done_all</span>
                    {item[lang]}
                  </li>
                ))}
              </ul>
            </div>
            <button className="mt-10 w-full h-14 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
              {lang === 'es' ? 'Ver Disponibilidad' : 'Check Availability'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apartment;
