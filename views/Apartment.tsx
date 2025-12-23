
import React, { useState, useEffect } from 'react';
import { Language } from '../types';

const APARTMENT_PHOTOS = [
  {
    url: '/images/apartment/bedroom_tv.jpg',
    title: { es: 'Dormitorio Principal con Smart TV', en: 'Master Bedroom with Smart TV' }
  },
  {
    url: '/images/apartment/kitchen.jpg',
    title: { es: 'Cocina Moderna Totalmente Equipada', en: 'Modern Fully Equipped Kitchen' }
  },
  {
    url: '/images/apartment/bedroom_detail.jpg',
    title: { es: 'Detalles de Confort', en: 'Comfort Details' }
  },
  {
    url: '/images/apartment/bedroom_desk.jpg',
    title: { es: 'Espacio de Trabajo Dedicado', en: 'Dedicated Workspace' }
  },
  {
    url: '/images/apartment/bedroom_bright.jpg',
    title: { es: 'Dormitorio Luminoso', en: 'Bright Bedroom' }
  },
  {
    url: '/images/apartment/living_room.jpg',
    title: { es: 'Salón Comedor', en: 'Living & Dining Area' }
  },
  {
    url: '/images/apartment/terrace.jpg',
    title: { es: 'Terraza Privada', en: 'Private Terrace' }
  },
  {
    url: '/images/apartment/gallery_extra_1.jpg',
    title: { es: 'Entorno Natural', en: 'Natural Surroundings' }
  },
  {
    url: '/images/apartment/gallery_extra_2.jpg',
    title: { es: 'Zonas Comunes', en: 'Common Areas' }
  },
];

const REVIEWS = [
  {
    author: "Mariluz P.",
    rating: 5,
    date: { es: "Hace 7 meses", en: "7 months ago" },
    text: {
      es: "Cogimos el apartamento para el fin de semana y ha sido una estancia genial. Antonio es un gran anfitrión, preocupado en todo momento porque no nos faltase de nada...",
      en: "We booked the apartment for the weekend and had a great stay. Antonio is a great host, ensuring at all times that we had everything we needed..."
    }
  },
  {
    author: "Carla Guerrero",
    rating: 5,
    date: { es: "Hace 5 meses", en: "5 months ago" },
    text: {
      es: "Es el segundo año que alquilo el apartamento de Antonio en Chiclana y, como siempre, todo perfecto. Cómodo, limpio y bien ubicado. Antonio es muy buen anfitrión, repetiremos seguro!",
      en: "This is the second year I've rented Antonio's apartment in Chiclana and, as always, everything was perfect. Comfortable, clean, and well-located. Antonio is a very good host, we will definitely return!"
    }
  },
  {
    author: "Ana Herrero",
    rating: 5,
    date: { es: "Hace 2 años", en: "2 years ago" },
    text: {
      es: "Alojamiento muy cómodo, completo y cuidando hasta el más mínimo detalle. Limpieza y orden exquisitos...",
      en: "Very comfortable accommodation, complete and taking care of even the smallest detail. Exquisite cleanliness and order..."
    }
  }
];

const LOCATION_DATA = {
  address: "Av. de los Pescadores, 16, 11139 Chiclana de la Frontera, Cádiz, España",
  link: "https://share.google/5zMiwCH1MPPcNr0Qf",
  rating: 5.0,
  totalReviews: 56
};

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

        {/* Full Gallery Grid */}
        <div className="mb-20 mt-16">
          <h2 className="text-3xl font-black mb-10 text-center">{lang === 'es' ? 'Galería Completa' : 'Full Gallery'}</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {APARTMENT_PHOTOS.map((photo, i) => (
              <div key={i} className="break-inside-avoid rounded-3xl overflow-hidden group relative shadow-lg">
                <img
                  src={photo.url}
                  alt={photo.title[lang]}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{photo.title[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-24 mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 px-4 py-2 rounded-full border border-yellow-400/20">
              <span className="material-symbols-outlined text-sm icon-filled">star</span>
              <span className="font-bold text-sm">{LOCATION_DATA.rating}</span>
            </div>
            <h2 className="text-3xl font-black">{lang === 'es' ? 'Lo que dicen nuestros huéspedes' : 'Guest Reviews'}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <span key={j} className="material-symbols-outlined text-xl icon-filled">star</span>
                  ))}
                </div>
                <p className="text-text-muted dark:text-gray-300 mb-6 text-sm leading-relaxed italic">"{review.text[lang]}"</p>
                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                  <span className="font-bold">{review.author}</span>
                  <span className="text-xs text-text-muted dark:text-gray-500">{review.date[lang]}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <a
              href={LOCATION_DATA.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
            >
              {lang === 'es' ? `Ver las ${LOCATION_DATA.totalReviews} reseñas en Google` : `See all ${LOCATION_DATA.totalReviews} Google reviews`}
              <span className="material-symbols-outlined text-lg">open_in_new</span>
            </a>
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-surface-dark rounded-3xl overflow-hidden relative text-white group">
          <div className="absolute inset-0 bg-[url('/images/apartment/terrace.jpg')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

          <div className="relative p-10 lg:p-16 max-w-2xl">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
              {lang === 'es' ? 'Ubicación Premium' : 'Premium Location'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-black mb-6">
              {lang === 'es' ? 'En el corazón de La Barrosa' : 'In the heart of La Barrosa'}
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              {LOCATION_DATA.address}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={LOCATION_DATA.link}
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 px-8 bg-white text-black font-bold rounded-2xl flex items-center gap-3 hover:bg-gray-100 transition-all shadow-xl"
              >
                <span className="material-symbols-outlined">map</span>
                {lang === 'es' ? 'Cómo llegar' : 'Get Directions'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apartment;
