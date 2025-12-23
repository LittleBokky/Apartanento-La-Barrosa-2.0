
import { NavItem, Service, Experience, HouseRule } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: { es: 'Inicio', en: 'Home' }, path: '/' },
  { id: 'apartment', label: { es: 'Apartamento', en: 'Apartment' }, path: '/apartment' },
  { id: 'services', label: { es: 'Servicios', en: 'Services' }, path: '/services' },
  { id: 'experiences', label: { es: 'Experiencias', en: 'Experiences' }, path: '/experiences' },
  { id: 'rules', label: { es: 'Información', en: 'Information' }, path: '/rules' },
  { id: 'contact', label: { es: 'Contacto', en: 'Contact' }, path: '/contact' },
];

export const SERVICES: Service[] = [
  {
    icon: 'wifi',
    title: { es: 'Oficina & Conectividad', en: 'Office & Connectivity' },
    items: {
      es: ['WiFi Fibra (300 Mbps)', 'Espacio de trabajo dedicado'],
      en: ['Fiber WiFi (300 Mbps)', 'Dedicated workspace']
    }
  },
  {
    icon: 'restaurant',
    title: { es: 'Cocina Completa', en: 'Full Kitchen' },
    items: {
      es: ['Electrodomésticos completos', 'Cafetera Nespresso', 'Vajilla y menaje gourmet'],
      en: ['Full appliances', 'Nespresso coffee machine', 'Gourmet tableware']
    }
  },
  {
    icon: 'ac_unit',
    title: { es: 'Climatización', en: 'Climate Control' },
    items: {
      es: ['Aire acondicionado (Split)', 'Calefacción central', 'Ventiladores portátiles'],
      en: ['Air conditioning (Split)', 'Central heating', 'Portable fans']
    }
  },
  {
    icon: 'live_tv',
    title: { es: 'Entretenimiento', en: 'Entertainment' },
    items: {
      es: ['Smart TV 50" 4K', 'Netflix & HBO incluido', 'Juegos de mesa y libros'],
      en: ['50" 4K Smart TV', 'Netflix & HBO included', 'Board games and books']
    }
  },
  {
    icon: 'bed',
    title: { es: 'Descanso y Aseo', en: 'Rest & Hygiene' },
    items: {
      es: ['Ropa de cama premium', 'Lavadora y plancha', 'Secador de pelo'],
      en: ['Premium bedding', 'Washing machine and iron', 'Hair dryer']
    }
  },
  {
    icon: 'deck',
    title: { es: 'Exterior y Parking', en: 'Outdoor & Parking' },
    items: {
      es: ['Terraza privada amueblada', 'Parking privado gratuito', 'Acceso a piscina comunitaria'],
      en: ['Private furnished terrace', 'Free private parking', 'Community pool access']
    }
  }
];

export const HOUSE_RULES: HouseRule[] = [
  {
    icon: 'smoke_free',
    title: { es: 'Prohibido Fumar', en: 'No Smoking' },
    description: {
      es: 'Está estrictamente prohibido fumar dentro del apartamento. Tarifa de limpieza profunda de 150 € si se incumple.',
      en: 'Smoking is strictly prohibited inside the apartment. A €150 deep cleaning fee applies if violated.'
    }
  },
  {
    icon: 'pets',
    title: { es: 'Política de Mascotas', en: 'Pet Policy' },
    description: {
      es: 'Se pueden permitir mascotas pequeñas previa solicitud y aprobación. Puede aplicarse una tarifa de limpieza adicional.',
      en: 'Small pets may be allowed upon request and approval. An additional cleaning fee may apply.'
    }
  },
  {
    icon: 'celebration',
    title: { es: 'Sin Fiestas ni Eventos', en: 'No Parties or Events' },
    description: {
      es: 'Para respetar a nuestros vecinos, no se permiten fiestas ni grandes reuniones.',
      en: 'To respect our neighbors, no parties or large gatherings are allowed.'
    }
  },
  {
    icon: 'volume_off',
    title: { es: 'Horas de silencio', en: 'Quiet Hours' },
    description: {
      es: 'Respetar el descanso de los vecinos de 23:00 a 08:00.',
      en: 'Respect neighbors\' rest from 11:00 PM to 8:00 AM.'
    }
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    title: { es: 'El Pescador de La Barrosa', en: 'The Fisherman of La Barrosa' },
    category: { es: 'Mariscos • Pescado Fresco', en: 'Seafood • Fresh Fish' },
    description: {
      es: 'El mejor lugar para probar el atún rojo de almadraba. Ambiente familiar.',
      en: 'The best place to try almadraba red tuna. Family atmosphere.'
    },
    rating: 4.8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv2j2pL9m8W3A7xqoqtEx1G1E3mcssDx3jrAn9vZDXpjtJZZzXeDRSrRrjKv6HQvWSrZ9vO2fweCK20iwgOWMq2Y3ulOtcrxLBX3dKajq1VjOv2DTNrvikW9GZ2OkB1IOS3defmfN_qrOuaLGrylBtqVnTjzzySdJYWE5MM_6v5tARSp64QLrY0ekEHD4v53xaAqoxuRT42OH-BPRLMMGQR8SBgpSOEePuGwn0LAc8rXxXr6jWFOCMzfUaeWFMATkbrz031nip0JlM',
    priceLevel: '€€€',
    distance: { es: '5 min', en: '5 min' },
    tag: { es: 'Recomendado', en: 'Recommended' }
  },
  {
    id: '2',
    title: { es: 'Chiringuito Sol y Mar', en: 'Sun & Sea Beach Bar' },
    category: { es: 'Cócteles • Snack Bar', en: 'Cocktails • Snack Bar' },
    description: {
      es: 'El sitio perfecto para ver la puesta de sol con un mojito en la mano.',
      en: 'The perfect spot to watch the sunset with a mojito in hand.'
    },
    rating: 4.9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHiwmWJAdZJUA1AIDh2MWsgd3jXVLS_kx0QyFKHsK_LmMfc_qW-zuEiP3ztMAAQackOMZ1Lzm7GQ39DHKyVsrLY0fNL4PcBMYN4crWb40paihZ-5Pxrt_oB9AHGDYc62kK1pFRC4GSTnAhXp_8gVyj4725l-t0YlpBgiZSzSFcEPhSF-KM_4g92Wr4m8S38Jz-kirTNzCmbWdPVeZZXgrJsiUhZjVy13Ll4IRv9aN7_UhGtQ4eOYLCCMMO00ucQYKce_ZHIUNOd-_h',
    priceLevel: '€€',
    distance: { es: '8 min', en: '8 min' },
    tag: { es: 'Sunset Spot', en: 'Sunset Spot' }
  }
];
