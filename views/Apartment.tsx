
import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '../types';
import { supabase } from '../lib/supabase';


const REVIEWS = [
  {
    author: "Sandrine",
    rating: 5,
    platform: "airbnb",
    date: { es: "Octubre 2025", en: "October 2025", it: "Ottobre 2025", fr: "Octobre 2025", de: "Oktober 2025" },
    text: {
      es: "Excelente estancia. Alojamiento conforme a la descripción, decoración muy moderna, limpio, tranquilo y bien equipado. También apreciamos mucho la terraza. Muy recomendable.",
      en: "Excellent stay. Accommodation as described, very modern decoration, clean, quiet and well equipped. We also really appreciated the terrace. Highly recommended.",
      it: "Soggiorno eccellente. Alloggio conforme alla descrizione, arredamento molto moderno, pulito, tranquillo e ben attrezzato. Abbiamo apprezzato molto anche la terrazza. Altamente raccomandato.",
      fr: "Excellent séjour. Logement conforme à la description, décoration très moderne, propre, calme et bien équipé. Nous avons également beaucoup apprécié la terrasse. Je le recommande vivement.",
      de: "Ausgezeichneter Aufenthalt. Unterkunft wie beschrieben, sehr moderne Einrichtung, sauber, ruhig und gut ausgestattet. Wir haben auch die Terrasse sehr genossen. Sehr zu empfehlen."
    }
  },
  {
    author: "Mari",
    rating: 5,
    platform: "booking",
    date: { es: "Diciembre 2025", en: "December 2025", it: "Dicembre 2025", fr: "Décembre 2025", de: "Dezember 2025" },
    text: {
      es: "Es muy bonito, está muy limpio y tiene todas las comodidades. Ya he estado en otras ocasiones en él por todo ello. Muy recomendable.",
      en: "It is very beautiful, very clean and has all the comforts. I have been there on other occasions because of all this. Highly recommended.",
      it: "È molto bello, è molto pulito e ha tutti i comfort. Ci sono già stata altre volte proprio per questo. Altamente raccomandato.",
      fr: "C'est très beau, c'est très propre et il y a tout le confort. J'y suis déjà allée à d'autres occasions pour tout cela. Très recommandé.",
      de: "Es ist sehr schön, es ist sehr sauber und hat alle Annehmlichkeiten. Ich war deshalb schon öfter dort. Sehr zu empfehlen."
    }
  },
  {
    author: "Cecilia",
    rating: 5,
    platform: "booking",
    date: { es: "Julio 2025", en: "July 2025", it: "Luglio 2025", fr: "Juillet 2025", de: "Juli 2025" },
    text: {
      es: "Nuestra estancia fue simplemente perfecta. El apartamento estaba impecablemente limpio, muy bien equipado y decorado con gusto. La ubicación es inmejorable: a pocos minutos andando de la playa.",
      en: "Our stay was simply perfect. The apartment was impeccably clean, very well equipped and tastefully decorated. The location is unbeatable: a few minutes' walk from the beach.",
      it: "Il nostro soggiorno è stato semplicemente perfetto. L'appartamento era impeccabilmente pulito, molto ben attrezzato e arredato con gusto. La posizione è imbattibile: a pochi minuti a piedi dalla spiaggia.",
      fr: "Notre séjour a été tout simplement parfait. L'appartement était impeccablement propre, très bien équipé et décoré avec goût. L'emplacement est imbattable : à quelques minutes à pied de la plage.",
      de: "Unser Aufenthalt war einfach perfekt. Die Wohnung war makellos sauber, sehr gut ausgestattet und geschmackvoll eingerichtet. Die Lage ist unschlagbar: nur wenige Gehminuten vom Strand entfernt."
    }
  },
  {
    author: "Eric",
    rating: 5,
    platform: "airbnb",
    date: { es: "Octubre 2024", en: "October 2024", it: "Ottobre 2024", fr: "Octobre 2024", de: "Oktober 2024" },
    text: {
      es: "Apartamento muy bonito, muy cómodo, estado nuevo, en una zona tranquila y con una ubicación ideal para disfrutar del océano.",
      en: "Very nice apartment, very comfortable, new condition, in a quiet area and with an ideal location to enjoy the ocean.",
      it: "Appartamento molto bello, molto confortevole, come nuovo, in una zona tranquilla e con una posizione ideale per godersi l'oceano.",
      fr: "Très bel appartement, très confortable, état neuf, dans un quartier calme et avec un emplacement idéal pour profiter de l'océan.",
      de: "Sehr schöne Wohnung, sehr komfortabel, neuwertiger Zustand, in einer ruhigen Gegend und mit einer idealen Lage, um das Meer zu genießen."
    }
  },
  {
    author: "Carla Guerrero",
    rating: 5,
    platform: "google",
    date: { es: "Hace 5 meses", en: "5 months ago", it: "5 mesi fa", fr: "Il y a 5 mois", de: "Vor 5 Monaten" },
    text: {
      es: "Es el segundo año que alquilo el apartamento de Antonio en Chiclana y, como siempre, todo perfecto. Cómodo, limpio y bien ubicado. repetiremos seguro!",
      en: "This is the second year I've rented Antonio's apartment in Chiclana and, as always, everything was perfect. Comfortable, clean, and well-located. we will definitely return!",
      it: "È il secondo anno che affitto l'appartamento di Antonio a Chiclana e, come sempre, tutto perfetto. Confortevole, pulito e ben posizionato. ci torneremo sicuramente!",
      fr: "C'est la deuxième année que je loue l'appartement d'Antonio à Chiclana et, comme toujours, tout était parfait. Confortable, propre et bien situé. nous reviendrons à coup sûr !",
      de: "Dies ist das zweite Jahr, in dem ich Antonios Apartment in Chiclana miete, und wie immer war alles perfekt. Komfortabel, sauber und gut gelegen. Wir kommen auf jeden Fall wieder!"
    }
  },
  {
    author: "Laura",
    rating: 5,
    platform: "booking",
    date: { es: "Septiembre 2025", en: "September 2025", it: "Settembre 2025", fr: "Septembre 2025", de: "September 2025" },
    text: {
      es: "Todo estaba como nuevo exactamente como se ve en las fotos. Todo muy limpio y cómodo.",
      en: "Everything was like new, exactly as seen in the photos. Everything was very clean and comfortable.",
      it: "Tutto era come nuovo, esattamente come si vede nelle foto. Tutto molto pulito e confortevole.",
      fr: "Tout était comme neuf, exactement comme sur les photos. Tout était très propre et confortable.",
      de: "Alles war wie neu, genau wie auf den Fotos zu sehen. Alles sehr sauber und komfortabel."
    }
  }
];

const PLATFORMS = [
  { name: "Booking.com", rating: "9.7", total: 69, link: "https://www.booking.com/hotel/es/apartamento-playa-la-barrosa-chiclana-de-la-frontera.es.html" },
  { name: "Airbnb", rating: "4.97", total: 37, link: "https://www.airbnb.es/rooms/35460015" },
  { name: "Google", rating: "5.0", total: 56, link: "https://share.google/5zMiwCH1MPPcNr0Qf" }
];

const LOCATION_DATA = {
  address: "Av. de los Pescadores, 16, 11139 Chiclana de la Frontera, Cádiz, España",
  link: "https://share.google/5zMiwCH1MPPcNr0Qf"
};

interface GalleryImage {
  id: string;
  url: string;
  title_es: string;
  title_en: string;
  order: number;
}

const Apartment: React.FC<{ lang: Language, user: any }> = ({ lang, user }) => {
  const isAdmin = user?.role === 'admin';
  const [currentIdx, setCurrentIdx] = useState(0);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [photos, setPhotos] = useState<any[]>([]);
  const [dbGallery, setDbGallery] = useState<GalleryImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

  // Helper for Supabase image transformations
  const getOptimizedUrl = (url: string, width: number, quality = 80) => {
    if (!url.includes('supabase.co')) return url;
    // Route through the transformation service by changing 'object' to 'render/image'
    const transformedUrl = url.replace('/object/public/', '/render/image/public/');
    return `${transformedUrl}?width=${width}&quality=${quality}&resize=contain`;
  };

  const nextSlide = () => setCurrentIdx((prev) => (prev + 1) % photos.length);
  const prevSlide = () => setCurrentIdx((prev) => (prev - 1 + photos.length) % photos.length);

  const fetchGallery = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('gallery').select('*').order('order', { ascending: true });
    if (error) {
      console.error('Error fetching gallery:', error);
    } else {
      if (data && data.length > 0) {
        setDbGallery(data);
        setPhotos(data.map(img => ({
          url: img.url,
          title: { es: img.title_es || '', en: img.title_en || '' }
        })));
      } else {
        setDbGallery([]);
        setPhotos([]);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(filePath, file);

    if (uploadError) {
      alert(lang === 'es' ? 'Error al subir la imagen' : 'Error uploading image');
      console.error(uploadError);
      setIsUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('gallery')
      .getPublicUrl(filePath);

    const { error: dbError } = await supabase.from('gallery').insert([{
      url: publicUrl,
      title_es: '',
      title_en: '',
      order: dbGallery.length
    }]);

    if (dbError) {
      alert(lang === 'es' ? 'Error al guardar en la base de datos' : 'Error saving to database');
      console.error(dbError);
    } else {
      fetchGallery();
    }
    setIsUploading(false);
  };

  const handleDeleteImage = async (image: GalleryImage) => {
    if (!window.confirm(lang === 'es' ? '¿Borrar esta imagen?' : 'Delete this image?')) return;

    const fileName = image.url.split('/').pop();
    if (fileName) {
      await supabase.storage.from('gallery').remove([fileName]);
    }

    const { error } = await supabase.from('gallery').delete().eq('id', image.id);
    if (error) console.error(error);
    else fetchGallery();
  };

  const handleUpdateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    const { error } = await supabase.from('gallery').update({
      title_es: editingImage.title_es,
      title_en: editingImage.title_en,
      order: editingImage.order
    }).eq('id', editingImage.id);

    if (error) {
      alert(lang === 'es' ? 'Error al actualizar' : 'Error updating');
      console.error(error);
    } else {
      setEditingImage(null);
      fetchGallery();
    }
  };

  useEffect(() => {
    if (photos.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [photos]);

  const t = useMemo(() => ({
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
    },
    it: {
      title: "Il tuo rifugio sulla costa",
      subtitle: "Uno spazio progettato per il relax, con finiture in legno naturale e luce mediterranea.",
      roomsTitle: "Spazi Progettati",
      roomsDesc: "Ogni angolo è stato pensato per offrirti il massimo comfort durante il tuo soggiorno.",
      kitchen: "Cucina Attrezzata",
      kitchenDesc: "Elettrodomestici Siemens, macchina del caffè Nespresso e tutte le stoviglie necessarie.",
      terrace: "Oasi Esterna",
      terraceDesc: "Terrazza privata con zona pranzo per godersi il clima di Cadice sotto la tenda.",
      living: "Connettività e tempo libero",
      livingDesc: "Smart TV da 50\", zona lavoro e un'atmosfera accogliente con tocchi marinari."
    },
    fr: {
      title: "Votre refuge côtier",
      subtitle: "Un espace conçu pour la détente, avec des finitions en bois naturel et une lumière méditerranéenne.",
      roomsTitle: "Espaces Conçus",
      roomsDesc: "Chaque recoin a été pensé pour vous offrir un maximum de confort pendant votre séjour.",
      kitchen: "Cuisine Équipée",
      kitchenDesc: "Appareils Siemens, machine à café Nespresso et tous les ustensiles de cuisine nécessaires.",
      terrace: "Oasis Extérieure",
      terraceDesc: "Terrasse privée avec coin repas pour profiter du climat de Cadix à l'ombre.",
      living: "Connectivité et Loisirs",
      livingDesc: "Smart TV 50\", espace de travail et ambiance chaleureuse aux touches nautiques."
    },
    de: {
      title: "Ihr Rückzugsort an der Küste",
      subtitle: "Ein Ort zum Entspannen, mit natürlichen Holzoberflächen und mediterranem Licht.",
      roomsTitle: "Gestaltete Räume",
      roomsDesc: "Jede Ecke wurde durchdacht, um Ihnen während Ihres Aufenthalts maximalen Komfort zu bieten.",
      kitchen: "Ausgestattete Küche",
      kitchenDesc: "Siemens-Elektrogeräte, Nespresso-Kaffeemaschine und alle notwendigen Küchenutensilien.",
      terrace: "Oase im Freien",
      terraceDesc: "Private Terrasse mit Essbereich, um das Klima von Cádiz im Schatten zu genießen.",
      living: "Konnektivität & Freizeit",
      livingDesc: "50\" Smart TV, Arbeitsbereich und eine gemütliche Atmosphäre mit Akzenten zum Meer."
    }
  }[lang]), [lang]);

  const adminT = useMemo(() => ({
    es: {
      gallery: "Gestión de Galería",
      uploading: "Subiendo...",
      uploadPhoto: "Subir Foto",
      editPhoto: "Editar Foto",
      save: "Guardar",
      cancel: "Cancelar",
      titleEs: "Título (ES)",
      titleEn: "Título (EN)",
      order: "Orden"
    },
    en: {
      gallery: "Gallery Management",
      uploading: "Uploading...",
      uploadPhoto: "Upload Photo",
      editPhoto: "Edit Photo",
      save: "Save",
      cancel: "Cancel",
      titleEs: "Title (ES)",
      titleEn: "Title (EN)",
      order: "Order"
    },
    it: {
      gallery: "Gestione Galleria",
      uploading: "Caricamento...",
      uploadPhoto: "Carica Foto",
      editPhoto: "Modifica Foto",
      save: "Salva",
      cancel: "Annulla",
      titleEs: "Titolo (ES)",
      titleEn: "Titolo (EN)",
      order: "Ordine"
    },
    fr: {
      gallery: "Gestion de la Galerie",
      uploading: "Chargement...",
      uploadPhoto: "Télécharger une Photo",
      editPhoto: "Modifier la Photo",
      save: "Enregistrer",
      cancel: "Annuler",
      titleEs: "Titre (ES)",
      titleEn: "Titre (EN)",
      order: "Ordre"
    },
    de: {
      gallery: "Galerie-Verwaltung",
      uploading: "Hochladen...",
      uploadPhoto: "Foto hochladen",
      editPhoto: "Foto bearbeiten",
      save: "Speichern",
      cancel: "Abbrechen",
      titleEs: "Titel (ES)",
      titleEn: "Titel (EN)",
      order: "Reihenfolge"
    }
  }[lang]), [lang]);

  return (
    <div className="animate-fade-in-up">
      {/* Carrusel Galería */}
      <section className="relative w-full h-[60vh] lg:h-[85vh] bg-gray-900 overflow-hidden group">
        {photos.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
            <span className="material-symbols-outlined text-8xl mb-4">photo_library</span>
            <p className="font-bold tracking-widest uppercase">{lang === 'es' ? 'Galería vacía' : 'Gallery empty'}</p>
          </div>
        ) : (
          <>
            {photos.map((photo, i) => {
              // Only render current, previous and next for performance
              const isVisible = i === currentIdx;
              const isNearby = Math.abs(i - currentIdx) <= 1 || (currentIdx === 0 && i === photos.length - 1) || (currentIdx === photos.length - 1 && i === 0);

              if (!isNearby) return null;

              return (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <img
                    src={getOptimizedUrl(photo.url, 1200)}
                    className="w-full h-full object-cover brightness-[0.85]"
                    alt={photo.title[lang]}
                    decoding="async"
                    loading={i === 0 || i === currentIdx ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>
              );
            })}

            <div className="absolute bottom-12 left-10 z-20">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-2 block">
                {lang === 'es' ? 'Galería Real' : 'Real Gallery'}
              </span>
              <h2 className="text-white text-3xl lg:text-5xl font-black mb-2">
                {photos[currentIdx]?.title[lang]}
              </h2>
              <p className="text-white/70 text-sm font-bold">
                {currentIdx + 1} / {photos.length}
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
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${i === currentIdx ? 'w-8 bg-primary' : 'w-2 bg-white/40'}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight">{t.title}</h1>
          <p className="text-text-muted dark:text-gray-400 text-lg leading-relaxed">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="aspect-video rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative group shadow-2xl">
              {photos.length > 0 ? (
                <img
                  src={getOptimizedUrl(photos[0].url, 800)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Living"
                  decoding="async"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-gray-400">image</span>
                </div>
              )}
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <div className="flex-1"></div>
            <h2 className="text-3xl lg:text-4xl font-black text-center">{lang === 'es' ? 'Galería Completa' : 'Full Gallery'}</h2>
            <div className="flex-1 flex justify-end">
              {isAdmin && (
                <label className={`cursor-pointer h-12 px-6 rounded-xl font-bold flex items-center gap-2 transition-all ${isUploading ? 'bg-gray-100 text-gray-400' : 'bg-primary text-white hover:bg-primary-dark shadow-md'}`}>
                  <span className="material-symbols-outlined">{isUploading ? 'sync' : 'upload'}</span>
                  {isUploading ? adminT.uploading : adminT.uploadPhoto}
                  <input type="file" className="hidden" accept="image/*" onChange={handleUploadImage} disabled={isUploading} />
                </label>
              )}
            </div>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {isLoading ? (
              // Loading Skeleton
              [...Array(6)].map((_, i) => (
                <div key={i} className="break-inside-avoid rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 animate-pulse aspect-[4/3]"></div>
              ))
            ) : photos.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-gray-50 dark:bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">photo_library</span>
                <p className="text-text-muted font-bold">{lang === 'es' ? 'No hay fotos todavía' : 'No photos yet'}</p>
                {isAdmin && (
                  <p className="text-sm text-text-muted mt-2">{lang === 'es' ? 'Usa el botón de arriba para subir la primera.' : 'Use the button above to upload the first one.'}</p>
                )}
              </div>
            ) : (() => {
              // Create a map for O(1) lookup
              const dbLookup = new Map<string, GalleryImage>(dbGallery.map(img => [img.url, img]));

              return photos.map((photo, i) => {
                const dbImg = dbLookup.get(photo.url);
                return (
                  <div key={i} className="break-inside-avoid rounded-3xl overflow-hidden group relative shadow-lg bg-gray-100 dark:bg-gray-800">
                    <img
                      src={getOptimizedUrl(photo.url, 800)}
                      alt={photo.title[lang]}
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <p className="text-white text-sm font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300 mb-4">{photo.title[lang]}</p>

                      {isAdmin && dbImg && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingImage(dbImg)}
                            className="size-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-colors"
                          >
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteImage(dbImg)}
                            className="size-10 rounded-xl bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          {/* Edit Modal */}
          {editingImage && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
              <div className="bg-white dark:bg-surface-dark rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-up">
                <h4 className="text-2xl font-black mb-6">{adminT.editPhoto}</h4>
                <form onSubmit={handleUpdateImage} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">{adminT.titleEs}</label>
                    <input
                      type="text"
                      value={editingImage.title_es}
                      onChange={(e) => setEditingImage({ ...editingImage, title_es: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">{adminT.titleEn}</label>
                    <input
                      type="text"
                      value={editingImage.title_en}
                      onChange={(e) => setEditingImage({ ...editingImage, title_en: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">{adminT.order}</label>
                    <input
                      type="number"
                      value={editingImage.order}
                      onChange={(e) => setEditingImage({ ...editingImage, order: parseInt(e.target.value) || 0 })}
                      className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setEditingImage(null)}
                      className="flex-1 h-12 rounded-xl font-bold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition-all"
                    >
                      {adminT.cancel}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 h-12 rounded-xl font-bold bg-primary text-white hover:bg-primary-dark shadow-md"
                    >
                      {adminT.save}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="mt-24 mb-20 px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 max-w-5xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-black">{lang === 'es' ? 'Lo que dicen nuestros huéspedes' : 'Guest Reviews'}</h2>
            <div className="flex flex-wrap gap-4">
              {PLATFORMS.map((p, i) => (
                <div key={i} className="flex items-center gap-2 bg-white dark:bg-surface-dark px-4 py-2 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <span className={`size-2 rounded-full ${p.name === 'Airbnb' ? 'bg-[#FF385C]' : p.name === 'Booking.com' ? 'bg-[#003580]' : 'bg-[#4285F4]'}`}></span>
                  <span className="text-xs font-black uppercase tracking-wider">{p.name}</span>
                  <span className="font-bold text-primary">{p.rating}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-[2rem]">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${reviewIdx * 100}%)` }}
              >
                {REVIEWS.map((review: any, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-2 lg:px-4">
                    <div className="bg-white dark:bg-surface-dark p-8 lg:p-12 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col min-h-[320px]">
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-0.5 text-yellow-500">
                          {[...Array(review.rating)].map((_, j) => (
                            <span key={j} className="material-symbols-outlined text-[24px] icon-filled">star</span>
                          ))}
                        </div>
                        <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${review.platform === 'airbnb' ? 'bg-[#FF385C]/10 text-[#FF385C]' :
                          review.platform === 'booking' ? 'bg-[#003580]/10 text-[#003580]' : 'bg-[#4285F4]/10 text-[#4285F4]'
                          }`}>
                          {review.platform}
                        </div>
                      </div>
                      <p className="text-text-muted dark:text-gray-300 mb-10 text-lg lg:text-xl leading-relaxed italic font-medium flex-grow">
                        "{review.text[lang]}"
                      </p>
                      <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-800/50 pt-8">
                        <div className="flex items-center gap-4">
                          <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                            {review.author.charAt(0)}
                          </div>
                          <div>
                            <span className="block font-black text-base">{review.author}</span>
                            <span className="block text-xs text-text-muted dark:text-gray-500 uppercase tracking-[0.2em] mt-1 font-bold">{review.date[lang]}</span>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-gray-200 dark:text-gray-800 text-6xl opacity-30">format_quote</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between mt-10">
              <div className="flex gap-2">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === reviewIdx ? 'w-10 bg-primary' : 'w-2 bg-gray-200 dark:bg-gray-800'}`}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setReviewIdx(prev => (prev - 1 + REVIEWS.length) % REVIEWS.length)}
                  className="size-12 rounded-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button
                  onClick={() => setReviewIdx(prev => (prev + 1) % REVIEWS.length)}
                  className="size-12 rounded-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-10">
            {PLATFORMS.map((p, i) => (
              <a
                key={i}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-text-muted group-hover:text-primary transition-colors">
                  {lang === 'es' ? `Ver ${p.total} reseñas en ${p.name}` : `See all ${p.total} ${p.name} reviews`}
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </div>
                <div className="h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-300"></div>
              </a>
            ))}
          </div>
        </div>


        {/* Location Section */}
        <div className="bg-surface-dark rounded-3xl overflow-hidden relative text-white group">
          <div className="absolute inset-0 bg-[url('/images/apartment/terrace.jpg')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

          <div className="relative p-10 lg:p-16 max-w-2xl">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
              {{ es: 'Ubicación Premium', en: 'Premium Location', it: 'Posizione Premium', fr: 'Emplacement Privilégié', de: 'Premium-Lage' }[lang]}
            </span>
            <h2 className="text-3xl lg:text-4xl font-black mb-6">
              {{ es: 'En el corazón de La Barrosa', en: 'In the heart of La Barrosa', it: 'Nel cuore di La Barrosa', fr: 'Au cœur de La Barrosa', de: 'Im Herzen von La Barrosa' }[lang]}
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
                {{ es: 'Cómo llegar', en: 'Get Directions', it: 'Indicazioni', fr: 'Itinéraire', de: 'Wegbeschreibung' }[lang]}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apartment;
