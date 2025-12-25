
import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '../types';
import { supabase } from '../lib/supabase';


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
