
import React from 'react';
import { Language } from '../types';
import { Link } from 'react-router-dom';

const Home: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = {
    es: {
      heroTitle: "Vive lo mejor de",
      heroHighlight: "La Barrosa",
      heroDesc: "Despierta con la brisa del mar y el máximo confort. Reserva directamente para obtener las mejores tarifas.",
      promo: "Ahorra un 15% al instante reservando directo.",
      gallery: "Ver Galería",
      learnMore: "Saber Más",
      reviews: "Basado en +120 reseñas",
      favorite: "Favorito de los Huéspedes",
      whyUs: "Por Qué Nos Eligen",
      whyUsDesc: "Todo lo que necesitas para una escapada perfecta.",
      amenities: "Ver todas las comodidades",
      official: "Sitio Oficial",
      from: "Desde",
      night: "noche",
      checkAv: "Consultar Disponibilidad",
      saveDirect: "Ahorra 15% Directo",
      features: [
        { icon: 'wifi', title: 'Wifi Rápido', desc: 'Ideal para trabajar' },
        { icon: 'pool', title: 'Piscina Privada', desc: 'Acceso exclusivo' },
        { icon: 'location_on', title: 'Ubicación Prime', desc: 'A 5 min de la playa' },
        { icon: 'local_parking', title: 'Parking Gratis', desc: 'Plaza asegurada' }
      ]
    },
    en: {
      heroTitle: "Live the best of",
      heroHighlight: "La Barrosa",
      heroDesc: "Wake up to the sea breeze and maximum comfort. Book directly to get the best rates.",
      promo: "Save 15% instantly by booking direct.",
      gallery: "See Gallery",
      learnMore: "Learn More",
      reviews: "Based on +120 reviews",
      favorite: "Guest Favorite",
      whyUs: "Why They Choose Us",
      whyUsDesc: "Everything you need for a perfect getaway.",
      amenities: "See all amenities",
      official: "Official Site",
      from: "From",
      night: "night",
      checkAv: "Check Availability",
      saveDirect: "Save 15% Direct",
      features: [
        { icon: 'wifi', title: 'Fast Wifi', desc: 'Ideal for working' },
        { icon: 'pool', title: 'Private Pool', desc: 'Exclusive access' },
        { icon: 'location_on', title: 'Prime Location', desc: '5 min from beach' },
        { icon: 'local_parking', title: 'Free Parking', desc: 'Guaranteed spot' }
      ]
    },
    it: {
      heroTitle: "Vivi il meglio di",
      heroHighlight: "La Barrosa",
      heroDesc: "Svegliati con la brezza marina e il massimo comfort. Prenota direttamente per ottenere le migliori tariffe.",
      promo: "Risparmia il 15% all'istante prenotando direttamente.",
      gallery: "Vedi Galleria",
      learnMore: "Saperne di più",
      reviews: "Basato su +120 recensioni",
      favorite: "Preferito dagli ospiti",
      whyUs: "Perché sceglierci",
      whyUsDesc: "Tutto ciò di cui hai bisogno per una fuga perfetta.",
      amenities: "Vedi tutti i servizi",
      official: "Sito Ufficiale",
      from: "Da",
      night: "notte",
      checkAv: "Verifica Disponibilità",
      saveDirect: "Risparmia 15% Diretto",
      features: [
        { icon: 'wifi', title: 'Wifi Veloce', desc: 'Ideale per lavorare' },
        { icon: 'pool', title: 'Piscina Privata', desc: 'Accesso esclusivo' },
        { icon: 'location_on', title: 'Posizione Prime', desc: 'A 5 min dalla spiaggia' },
        { icon: 'local_parking', title: 'Parcheggio Gratuito', desc: 'Posto assicurato' }
      ]
    },
    fr: {
      heroTitle: "Vivez le meilleur de",
      heroHighlight: "La Barrosa",
      heroDesc: "Réveillez-vous avec la brise marine et un confort maximal. Réservez directement pour obtenir les meilleurs tarifs.",
      promo: "Économisez 15% instantanément en réservant directement.",
      gallery: "Voir la galerie",
      learnMore: "En savoir plus",
      reviews: "Basé sur +120 avis",
      favorite: "Coup de cœur des voyageurs",
      whyUs: "Pourquoi nous choisir",
      whyUsDesc: "Tout ce dont vous avez besoin pour une escapade parfaite.",
      amenities: "Voir tous les équipements",
      official: "Site Officiel",
      from: "À partir de",
      night: "nuit",
      checkAv: "Vérifier la Disponibilité",
      saveDirect: "Économisez 15% en Direct",
      features: [
        { icon: 'wifi', title: 'Wifi Rapide', desc: 'Idéal pour travailler' },
        { icon: 'pool', title: 'Piscine Privée', desc: 'Accès exclusif' },
        { icon: 'location_on', title: 'Emplacement Privilégié', desc: 'À 5 min de la plage' },
        { icon: 'local_parking', title: 'Parking Gratuit', desc: 'Place garantie' }
      ]
    },
    de: {
      heroTitle: "Erleben Sie das Beste von",
      heroHighlight: "La Barrosa",
      heroDesc: "Wachen Sie mit der Meeresbrise und maximalem Komfort auf. Buchen Sie direkt, um die besten Preise zu erhalten.",
      promo: "Sparen Sie sofort 15% bei Direktbuchung.",
      gallery: "Galerie ansehen",
      learnMore: "Mehr erfahren",
      reviews: "Basierend auf +120 Bewertungen",
      favorite: "Liebling der Gäste",
      whyUs: "Warum uns wählen",
      whyUsDesc: "Alles, was Sie für einen perfekten Kurzurlaub brauchen.",
      amenities: "Alle Annehmlichkeiten ansehen",
      official: "Offizielle Website",
      from: "Ab",
      night: "Nacht",
      checkAv: "Verfügbarkeit prüfen",
      saveDirect: "15% sparen bei Direktbuchung",
      features: [
        { icon: 'wifi', title: 'Schnelles WLAN', desc: 'Ideal zum Arbeiten' },
        { icon: 'pool', title: 'Privater Pool', desc: 'Exklusiver Zugang' },
        { icon: 'location_on', title: 'Top-Lage', desc: '5 Min. vom Strand entfernt' },
        { icon: 'local_parking', title: 'Kostenloser Parkplatz', desc: 'Garantierter Platz' }
      ]
    }
  }[lang];

  return (
    <div className="flex flex-col">
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 flex flex-col items-start gap-8 z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined !text-sm">verified</span>
            {t.official}
          </div>
          <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
            {t.heroTitle} <span className="text-primary">{t.heroHighlight}</span>
          </h1>
          <p className="text-lg text-text-muted dark:text-gray-300 max-w-xl leading-relaxed">
            {t.heroDesc} <span className="font-bold text-text-main dark:text-white">{t.promo}</span>
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/apartment" className="h-14 px-8 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-all shadow-xl shadow-primary/20 flex items-center gap-2">
              {t.gallery}
            </Link>
            <Link to="/services" className="h-14 px-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-bold flex items-center justify-center hover:bg-gray-50 transition-all">
              {t.learnMore}
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark shadow-xl border border-gray-100 dark:border-gray-800 w-full max-w-lg mt-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary icon-filled">star</span>
              <span className="font-bold text-lg">{t.favorite}</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-text-muted">{t.reviews}</span>
            </div>
            <div className="grid grid-cols-3 gap-4 divide-x divide-gray-100 dark:divide-gray-800">
              {['Airbnb 4.9/5', 'Booking 9.8', 'Google 4.9/5'].map(r => (
                <div key={r} className="flex flex-col items-center gap-1 first:pl-0 pl-4">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{r.split(' ')[0]}</span>
                  <span className="text-xl font-black">{r.split(' ')[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 w-full h-[500px] lg:h-[650px] grid grid-cols-2 gap-4">
          <div className="h-full rounded-2xl overflow-hidden shadow-2xl relative group">
            <img src="/images/home/hero_1.jpg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Sunset Gazebo" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl relative group">
              <img src="/images/home/hero_3.jpg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Pool Area" />
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl relative group">
              <img src="/images/home/hero_2.jpg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Living Room" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-surface-dark py-20 border-y border-gray-100 dark:border-gray-800 transition-colors">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h3 className="text-4xl font-bold tracking-tight mb-2">{t.whyUs}</h3>
              <p className="text-text-muted">{t.whyUsDesc}</p>
            </div>
            <Link to="/services" className="text-primary font-bold flex items-center gap-1 group">
              {t.amenities}
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.map((f, i) => (
              <div key={i} className="p-8 rounded-2xl bg-background-light dark:bg-gray-800/50 hover:bg-primary/5 dark:hover:bg-primary/5 transition-all duration-300 group border border-transparent hover:border-primary/20">
                <div className="size-14 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center text-primary shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">{f.icon}</span>
                </div>
                <h4 className="text-xl font-bold mb-1">{f.title}</h4>
                <p className="text-sm text-text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Bar */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-gray-100 dark:border-gray-800 py-4 px-6 transition-colors">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="hidden md:flex items-center gap-2">
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase text-text-muted">{t.from}</p>
              <p className="text-xl font-black">€120 <span className="text-sm font-normal text-text-muted">/ {t.night}</span></p>
            </div>
          </div>
          <Link to="/booking" className="w-full md:w-auto h-14 px-10 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl flex flex-col items-center justify-center shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 active:scale-95">
            <span className="text-base">{t.checkAv}</span>
            <span className="text-[10px] font-medium opacity-80 uppercase tracking-widest">{t.saveDirect}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
