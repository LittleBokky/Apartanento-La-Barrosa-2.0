
import React from 'react';
import { Language } from '../types';
import { EXPERIENCES } from '../constants';

const Experiences: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = {
    es: {
      experiences: "Experiencias",
      restaurants: "Restaurantes",
      tasteOf: "Sabor de La Barrosa",
      placeholder: "¿Qué te apetece probar?",
      search: "Buscar",
      favorites: "Nuestros Favoritos",
      selectedForYou: "Seleccionados personalmente para ti.",
      seeMenu: "Ver Menú",
      discoverMore: "Descubre más",
      amazingPlaces: "Más de 50 lugares increíbles te esperan.",
      contactReception: "Contactar Recepción",
      categories: ['Todos', 'Tapas', 'Mariscos', 'Vistas']
    },
    en: {
      experiences: "Experiences",
      restaurants: "Restaurants",
      tasteOf: "Taste of La Barrosa",
      placeholder: "What do you want to try?",
      search: "Search",
      favorites: "Our Favorites",
      selectedForYou: "Personally selected for you.",
      seeMenu: "See Menu",
      discoverMore: "Discover more",
      amazingPlaces: "Over 50 amazing places are waiting for you.",
      contactReception: "Contact Reception",
      categories: ['All', 'Tapas', 'Seafood', 'Views']
    },
    it: {
      experiences: "Esperienze",
      restaurants: "Ristoranti",
      tasteOf: "Sapore di La Barrosa",
      placeholder: "Cosa vuoi provare?",
      search: "Cerca",
      favorites: "I Nostri Preferiti",
      selectedForYou: "Selezionati personalmente per te.",
      seeMenu: "Vedi Menu",
      discoverMore: "Scopri di più",
      amazingPlaces: "Più di 50 posti incredibili ti aspettano.",
      contactReception: "Contatta Reception",
      categories: ['Tutti', 'Tapas', 'Frutti di mare', 'Viste']
    },
    fr: {
      experiences: "Expériences",
      restaurants: "Restaurants",
      tasteOf: "Goût de La Barrosa",
      placeholder: "Que voulez-vous essayer ?",
      search: "Chercher",
      favorites: "Nos Favoris",
      selectedForYou: "Sélectionnés personnellement pour vous.",
      seeMenu: "Voir le Menu",
      discoverMore: "Découvrir plus",
      amazingPlaces: "Plus de 50 endroits incroyables vous attendent.",
      contactReception: "Contacter Réception",
      categories: ['Tous', 'Tapas', 'Fruits de Mer', 'Vues']
    },
    de: {
      experiences: "Erlebnisse",
      restaurants: "Restaurants",
      tasteOf: "Geschmack von La Barrosa",
      placeholder: "Was möchten Sie probieren?",
      search: "Suchen",
      favorites: "Unsere Favoriten",
      selectedForYou: "Persönlich für Sie ausgewählt.",
      seeMenu: "Menü ansehen",
      discoverMore: "Mehr entdecken",
      amazingPlaces: "Über 50 tolle Orte warten auf Sie.",
      contactReception: "Rezeption kontaktieren",
      categories: ['Alle', 'Tapas', 'Meeresfrüchte', 'Aussicht']
    }
  }[lang];

  return (
    <div className="animate-fade-in-up">
      <div className="relative w-full h-[400px] lg:h-[550px] overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeHGOdJ9brlNYK9PAgV1r5TQUBYMOt_tzHIrxW9NUFisDkYcYIq0BAHL847KsC9ak6IeIDSHmGvqfuBOnXYZJj6bozOchM1U7TQOfbhg6eLpSOvIMtapuSnuC45IpcWwpQn9xl2EMbWCiD7ZOnSzp9OOM368SRfXyUKcENR0voyoUbEgwA6SzL0iBahXBL6tXzmWtfg6CnDKiu0MHP62TI8kkfjHd9vd5fBRIpgsI4kfxPu-5Vo1ZM6KpirlfNZu91plS6Kb5tf4lM"
          className="w-full h-full object-cover brightness-[0.4]"
          alt="Experiences Hero"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="flex items-center gap-2 text-white/80 text-sm font-bold uppercase tracking-widest mb-4">
            <span>{t.experiences}</span>
            <span className="material-symbols-outlined !text-[14px]">chevron_right</span>
            <span>{t.restaurants}</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6">
            {t.tasteOf}
          </h1>
          <div className="w-full max-w-2xl flex p-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
            <div className="flex-1 flex items-center px-4">
              <span className="material-symbols-outlined text-white/60 mr-3">search</span>
              <input
                type="text"
                placeholder={t.placeholder}
                className="w-full bg-transparent border-none text-white placeholder:text-white/60 focus:ring-0"
              />
            </div>
            <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold transition-all">
              {t.search}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <h2 className="text-4xl font-black mb-2">{t.favorites}</h2>
            <p className="text-text-muted dark:text-gray-400">{t.selectedForYou}</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
            {t.categories.map((cat: string) => (
              <button key={cat} className="px-5 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-bold hover:bg-primary hover:text-white transition-all">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="group flex flex-col bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-800">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={exp.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={exp.title[lang]} />
                <div className="absolute top-4 right-4 z-10 bg-white/95 dark:bg-gray-900/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-yellow-500 icon-filled !text-sm">star</span>
                  {exp.rating}
                </div>
                {exp.tag && (
                  <div className="absolute top-4 left-4 z-10 bg-primary text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                    {exp.tag[lang]}
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-black mb-1 group-hover:text-primary transition-colors">{exp.title[lang]}</h3>
                <p className="text-[10px] font-black uppercase text-text-muted tracking-widest mb-4">{exp.category[lang]}</p>
                <p className="text-sm text-text-muted dark:text-gray-400 mb-8 flex-1 leading-relaxed">
                  {exp.description[lang]}
                </p>
                <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <div className="flex gap-4 text-xs font-bold text-text-muted">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined !text-sm">euro</span>{exp.priceLevel}</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined !text-sm">directions_walk</span>{exp.distance[lang]}</span>
                  </div>
                  <button className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-3 transition-all">
                    {t.seeMenu}
                    <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col bg-gray-50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 p-8 items-center justify-center text-center group cursor-pointer hover:bg-primary/5 transition-colors">
            <div className="size-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-primary/40 mb-6 group-hover:scale-110 group-hover:text-primary transition-all">
              <span className="material-symbols-outlined text-4xl">add_business</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{t.discoverMore}</h3>
            <p className="text-sm text-text-muted mb-8">{t.amazingPlaces}</p>
            <button className="w-full py-3 bg-white dark:bg-gray-800 rounded-xl text-sm font-bold border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary transition-all shadow-sm">
              {t.contactReception}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiences;
