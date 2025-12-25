
import React from 'react';
import { Language } from '../types';
import { SERVICES } from '../constants';

const Services: React.FC<{ lang: Language }> = ({ lang }) => {
  const exclusive = [
    {
      icon: 'airport_shuttle',
      title: { es: 'Transfer Aeropuerto', en: 'Airport Transfer', it: 'Trasferimento Aeroporto', fr: 'Transfert Aéroport', de: 'Flughafentransfer' },
      desc: { es: 'Traslados desde Jerez (XRY) o Sevilla (SVQ).', en: 'Transfers from Jerez (XRY) or Seville (SVQ).', it: 'Trasferimenti da Jerez (XRY) o Siviglia (SVQ).', fr: 'Transferts depuis Jerez (XRY) ou Séville (SVQ).', de: 'Transfers von Jerez (XRY) oder Sevilla (SVQ).' }
    },
    {
      icon: 'child_friendly',
      title: { es: 'Kit Bebé Gratuito', en: 'Free Baby Kit', it: 'Kit Neonato Gratuito', fr: 'Kit Bébé Gratuit', de: 'Kostenloses Baby-Kit' },
      desc: { es: 'Cuna, trona y bañera sin coste adicional.', en: 'Crib, high chair, and bathtub at no extra cost.', it: 'Culla, seggiolone e vaschetta senza costi aggiuntivi.', fr: 'Berceau, chaise haute et baignoire sans frais supplémentaires.', de: 'Kinderbett, Hochstuhl und Badewanne ohne Aufpreis.' },
      badge: { es: 'Incluido', en: 'Included', it: 'Incluso', fr: 'Inclus', de: 'Inklusive' }
    },
    {
      icon: 'cleaning_services',
      title: { es: 'Limpieza Adicional', en: 'Extra Cleaning', it: 'Pulizia Extra', fr: 'Ménage Supplémentaire', de: 'Zusätzliche Reinigung' },
      desc: { es: 'Servicio de limpieza y cambio de ropa bajo demanda.', en: 'Cleaning service and laundry change upon demand.', it: 'Servizio di pulizia e cambio biancheria su richiesta.', fr: 'Service de ménage et changement de linge sur demande.', de: 'Reinigungsdienst und Wäschewechsel auf Anfrage.' }
    },
    {
      icon: 'shopping_basket',
      title: { es: 'Pack Bienvenida', en: 'Welcome Pack', it: 'Pacchetto Benvenuto', fr: 'Pack de Bienvenue', de: 'Willkommenspaket' },
      desc: { es: 'Fruta fresca y productos locales a tu llegada.', en: 'Fresh fruit and local products upon arrival.', it: 'Frutta fresca e prodotti locali al tuo arrivo.', fr: 'Fruits frais et produits locaux à votre arrivée.', de: 'Frisches Obst und lokale Produkte bei Ihrer Ankunft.' }
    }
  ];

  const t = {
    es: {
      heroTitle: "Servicios y Comodidades",
      heroDesc: "Diseñado para tu máximo confort. Descubre todo lo que ofrecemos.",
      allIncluded: "Todo Incluido",
      accomAmenities: "Comodidades del Alojamiento",
      exclServices: "Servicios Exclusivos",
      qualityG: "Garantía de Calidad",
      cleaningSt: "Estándares de Limpieza Premium",
      cleaningDesc: "Tu seguridad es nuestra prioridad. Seguimos un riguroso protocolo de desinfección profesional antes de cada estancia."
    },
    en: {
      heroTitle: "Services & Amenities",
      heroDesc: "Designed for your maximum comfort. Discover everything we offer.",
      allIncluded: "All Included",
      accomAmenities: "Accommodation Amenities",
      exclServices: "Exclusive Services",
      qualityG: "Quality Guaranteed",
      cleaningSt: "Premium Cleaning Standards",
      cleaningDesc: "Your safety is our priority. We follow a rigorous professional disinfection protocol before each stay."
    },
    it: {
      heroTitle: "Servizi e Comfort",
      heroDesc: "Progettato per il tuo massimo comfort. Scopri tutto ciò che offriamo.",
      allIncluded: "Tutto Incluso",
      accomAmenities: "Comfort dell'Alloggio",
      exclServices: "Servizi Esclusivi",
      qualityG: "Garanzia di Qualità",
      cleaningSt: "Standard di Pulizia Premium",
      cleaningDesc: "La tua sicurezza è la nostra priorità. Seguiamo un rigoroso protocollo di disinfezione professionale prima di ogni soggiorno."
    },
    fr: {
      heroTitle: "Services et Équipements",
      heroDesc: "Conçu pour votre plus grand confort. Découvrez tout ce que nous proposons.",
      allIncluded: "Tout Inclus",
      accomAmenities: "Équipements de l'Hébergement",
      exclServices: "Services Exclusifs",
      qualityG: "Garantie de Qualité",
      cleaningSt: "Normes de Nettoyage Premium",
      cleaningDesc: "Votre sécurité est notre priorité. Nous suivons un protocole de désinfection professionnel rigoureux avant chaque séjour."
    },
    de: {
      heroTitle: "Dienstleistungen & Annehmlichkeiten",
      heroDesc: "Entworfen für Ihren maximalen Komfort. Entdecken Sie alles, was wir anbieten.",
      allIncluded: "Alles Inklusive",
      accomAmenities: "Unterkunfts-Annehmlichkeiten",
      exclServices: "Exklusive Dienstleistungen",
      qualityG: "Qualitätsgarantie",
      cleaningSt: "Premium-Reinigungsstandards",
      cleaningDesc: "Ihre Sicherheit ist unsere Priorität. Wir befolgen vor jedem Aufenthalt ein strenges professionelles Desinfektionsprotokoll."
    }
  }[lang];

  return (
    <div className="flex flex-col animate-fade-in-up">
      <div className="relative w-full h-[350px] lg:h-[450px] overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEQshho2Zim80r7orfJi8xZxk_GKpS3ovb7CdNnFDzvuHsyGWccullarl_81EPi7EcXuLxDdn8N6wXqDa9WI4Oa3lmDBkWmWZ0wBGrLNgp371nx4km2s0eJyYJtZMX_Myq8DZQKdPex2XFTbQnus1oJc9l0z6pIWpyIjZHo-IF-LUoRuHSIU1RumDcd60YIs1B3ZPBa-QkvmzEjk3lYpQ6GswclOt9V5YD7XD_nBKdBJu_FLXfddmX9byrwnIz9ehieI06QT9qwI53"
          className="w-full h-full object-cover brightness-[0.4]"
          alt="Services Hero"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">
            {t.heroTitle}
          </h1>
          <p className="text-white/90 text-lg max-w-2xl font-medium">
            {t.heroDesc}
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 inline-block">
            {t.allIncluded}
          </span>
          <h2 className="text-3xl lg:text-4xl font-black mb-4">
            {t.accomAmenities}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {SERVICES.map((s, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 group">
              <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">{s.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-4">{s.title[lang]}</h3>
              <ul className="space-y-3">
                {s.items[lang].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-text-muted dark:text-gray-400">
                    <span className="material-symbols-outlined text-green-500 !text-lg">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
            <h2 className="text-3xl font-black">{t.exclServices}</h2>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {exclusive.map((e, i) => (
              <div key={i} className="flex gap-6 p-8 rounded-2xl bg-gradient-to-br from-white to-primary/5 dark:from-surface-dark dark:to-gray-800/30 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="size-16 rounded-2xl bg-white dark:bg-gray-900 shadow-sm flex items-center justify-center text-primary shrink-0 border border-primary/10">
                  <span className="material-symbols-outlined text-3xl">{e.icon}</span>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                    {e.title[lang]}
                    {e.badge && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase font-bold">{e.badge[lang]}</span>}
                  </h3>
                  <p className="text-sm text-text-muted dark:text-gray-400">{e.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-10 lg:p-16 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row gap-12 items-center text-center md:text-left overflow-hidden relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -mr-40 -mt-40"></div>
          <div className="flex-1 z-10">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
              {t.qualityG}
            </span>
            <h3 className="text-3xl lg:text-4xl font-black mb-4">
              {t.cleaningSt}
            </h3>
            <p className="text-text-muted dark:text-gray-300 text-lg">
              {t.cleaningDesc}
            </p>
          </div>
          <div className="size-24 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-primary shadow-2xl border-8 border-primary/10 z-10">
            <span className="material-symbols-outlined text-5xl">clean_hands</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
