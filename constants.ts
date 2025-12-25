
import { NavItem, Service, Experience, HouseRule } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: { es: 'Inicio', en: 'Home', it: 'Inizio', fr: 'Accueil', de: 'Startseite' }, path: '/' },
  { id: 'apartment', label: { es: 'Apartamento', en: 'Apartment', it: 'Appartamento', fr: 'Appartement', de: 'Apartment' }, path: '/apartment' },
  { id: 'services', label: { es: 'Servicios', en: 'Services', it: 'Servizi', fr: 'Services', de: 'Dienstleistungen' }, path: '/services' },
  { id: 'experiences', label: { es: 'Experiencias', en: 'Experiences', it: 'Esperienze', fr: 'Expériences', de: 'Erlebnisse' }, path: '/experiences' },
  { id: 'rules', label: { es: 'Información', en: 'Information', it: 'Informazioni', fr: 'Informations', de: 'Informationen' }, path: '/rules' },
  { id: 'contact', label: { es: 'Contacto', en: 'Contact', it: 'Contatto', fr: 'Contact', de: 'Kontakt' }, path: '/contact' },
];

export const SERVICES: Service[] = [
  {
    icon: 'wifi',
    title: { es: 'Oficina & Conectividad', en: 'Office & Connectivity', it: 'Ufficio e Connettività', fr: 'Bureau et Connectivité', de: 'Büro & Konnektivität' },
    items: {
      es: ['WiFi Fibra (300 Mbps)', 'Espacio de trabajo dedicado'],
      en: ['Fiber WiFi (300 Mbps)', 'Dedicated workspace'],
      it: ['WiFi Fibra (300 Mbps)', 'Spazio di lavoro dedicato'],
      fr: ['WiFi Fibre (300 Mbps)', 'Espace de travail dédié'],
      de: ['Glasfaser-WiFi (300 Mbit/s)', 'Dedizierter Arbeitsbereich']
    }
  },
  {
    icon: 'restaurant',
    title: { es: 'Cocina Completa', en: 'Full Kitchen', it: 'Cucina Completa', fr: 'Cuisine Complète', de: 'Voll ausgestattete Küche' },
    items: {
      es: ['Electrodomésticos completos', 'Cafetera Nespresso', 'Vajilla y menaje gourmet'],
      en: ['Full appliances', 'Nespresso coffee machine', 'Gourmet tableware'],
      it: ['Elettrodomestici completi', 'Macchina del caffè Nespresso', 'Stoviglie e utensili gourmet'],
      fr: ['Appareils complets', 'Machine à café Nespresso', 'Vaisselle et ustensiles gastronomiques'],
      de: ['Alle Elektrogeräte', 'Nespresso-Kaffeemaschine', 'Gourmet-Geschirr und -Utensilien']
    }
  },
  {
    icon: 'ac_unit',
    title: { es: 'Climatización', en: 'Climate Control', it: 'Climatizzazione', fr: 'Climatisation', de: 'Klimatisierung' },
    items: {
      es: ['Aire acondicionado (Split)', 'Calefacción central', 'Ventiladores portátiles'],
      en: ['Air conditioning (Split)', 'Central heating', 'Portable fans'],
      it: ['Aria condizionata (Split)', 'Riscaldamento centralizzato', 'Ventilatori portatili'],
      fr: ['Climatisation (Split)', 'Chauffage central', 'Ventilateurs portables'],
      de: ['Klimaanlage (Split)', 'Zentralheizung', 'Tragbare Ventilatoren']
    }
  },
  {
    icon: 'live_tv',
    title: { es: 'Entretenimiento', en: 'Entertainment', it: 'Intrattenimento', fr: 'Divertissement', de: 'Unterhaltung' },
    items: {
      es: ['Smart TV 50" 4K', 'Netflix & HBO incluido', 'Juegos de mesa y libros'],
      en: ['50" 4K Smart TV', 'Netflix & HBO included', 'Board games and books'],
      it: ['Smart TV 50" 4K', 'Netflix e HBO inclusi', 'Giochi da tavolo e libri'],
      fr: ['Smart TV 50" 4K', 'Netflix et HBO inclus', 'Jeux de société et livres'],
      de: ['50" 4K Smart TV', 'Netflix & HBO inklusive', 'Brettspiele und Bücher']
    }
  },
  {
    icon: 'bed',
    title: { es: 'Descanso y Aseo', en: 'Rest & Hygiene', it: 'Riposo e Igiene', fr: 'Repos et Hygiène', de: 'Ruhe & Hygiene' },
    items: {
      es: ['Ropa de cama premium', 'Lavadora y plancha', 'Secador de pelo'],
      en: ['Premium bedding', 'Washing machine and iron', 'Hair dryer'],
      it: ['Biancheria da letto premium', 'Lavatrice e ferro da stiro', 'Asciugacapelli'],
      fr: ['Literie de qualité supérieure', 'Lave-linge et fer à repasser', 'Sèche-cheveux'],
      de: ['Premium-Bettwäsche', 'Waschmaschine und Bügeleisen', 'Haartrockner']
    }
  },
  {
    icon: 'deck',
    title: { es: 'Exterior y Parking', en: 'Outdoor & Parking', it: 'Esterno e Parcheggio', fr: 'Extérieur et Parking', de: 'Außenbereich & Parkplatz' },
    items: {
      es: ['Terraza privada amueblada', 'Parking privado gratuito', 'Acceso a piscina comunitaria'],
      en: ['Private furnished terrace', 'Free private parking', 'Community pool access'],
      it: ['Terrazza privata arredata', 'Parcheggio privato gratuito', 'Accesso alla piscina comunitaria'],
      fr: ['Terrasse privée meublée', 'Parking privé gratuit', 'Accès à la piscine communautaire'],
      de: ['Private möblierte Terrasse', 'Kostenloser Privatparkplatz', 'Zugang zum Gemeinschaftspool']
    }
  }
];

export const HOUSE_RULES: HouseRule[] = [
  {
    icon: 'smoke_free',
    title: { es: 'Prohibido Fumar', en: 'No Smoking', it: 'Vietato Fumare', fr: 'Défense de Fumer', de: 'Nichtrauchen' },
    description: {
      es: 'Está estrictamente prohibido fumar dentro del apartamento. Tarifa de limpieza profunda de 150 € si se incumple.',
      en: 'Smoking is strictly prohibited inside the apartment. A €150 deep cleaning fee applies if violated.',
      it: 'È severamente vietato fumare all\'interno dell\'appartamento. In caso de violazione, verrà applicata una penale de 150 € per la pulizia profonda.',
      fr: 'Il est strictement interdit de fumer à l\'intérieur de l\'appartement. Des frais de nettoyage en profondeur de 150 € s\'appliquent en cas de non-respect.',
      de: 'Das Rauchen in der Wohnung ist strengstens verboten. Bei Verstoß wird eine Reinigungsgebühr von 150 € erhoben.'
    }
  },
  {
    icon: 'pets',
    title: { es: 'Política de Mascotas', en: 'Pet Policy', it: 'Politica sugli Animali Domestici', fr: 'Politique concernant les Animaux', de: 'Haustierregelung' },
    description: {
      es: 'Se pueden permitir mascotas pequeñas previa solicitud y aprobación. Puede aplicarse una tarifa de limpieza adicional.',
      en: 'Small pets may be allowed upon request and approval. An additional cleaning fee may apply.',
      it: 'Gli animali de piccola taglia possono essere ammessi su richiesta e previa approvazione. Potrebbe essere applicato un supplemento per la pulizia.',
      fr: 'Les petits animaux peuvent être admis sur demande et après approbation. Des frais de nettoyage supplémentaires peuvent s\'appliquer.',
      de: 'Kleine Haustiere können auf Anfrage und nach Genehmigung gestattet werden. Es kann eine zusätzliche Reinigungsgebühr anfallen.'
    }
  },
  {
    icon: 'celebration',
    title: { es: 'Sin Fiestas ni Eventos', en: 'No Parties or Events', it: 'Niente Feste o Eventi', fr: 'Pas de Fêtes ni d\'Événements', de: 'Keine Partys oder Veranstaltungen' },
    description: {
      es: 'Para respetar a nuestros vecinos, no se permiten fiestas ni grandes reuniones.',
      en: 'To respect our neighbors, no parties or large gatherings are allowed.',
      it: 'Per rispettare i nostri vicini, non sono ammesse feste o grandi riunioni.',
      fr: 'Pour respecter nos voisins, les fêtes et les grands rassemblements ne sont pas autorisés.',
      de: 'Um unsere Nachbarn zu respektieren, sind keine Partys oder großen Versammlungen erlaubt.'
    }
  },
  {
    icon: 'volume_off',
    title: { es: 'Horas de silencio', en: 'Quiet Hours', it: 'Ore di Silenzio', fr: 'Heures de Silence', de: 'Ruhezeiten' },
    description: {
      es: 'Respetar el descanso de los vecinos de 23:00 a 08:00.',
      en: 'Respect neighbors\' rest from 11:00 PM to 8:00 AM.',
      it: 'Rispettare il riposo dei vicini dalle 23:00 alle 08:00.',
      fr: 'Respecter le repos des voisins de 23h00 à 08h00.',
      de: 'Bitte respektieren Sie die Nachtruhe der Nachbarn von 23:00 bis 08:00 Uhr.'
    }
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    title: { es: 'El Pescador de La Barrosa', en: 'The Fisherman of La Barrosa', it: 'Il Pescatore de La Barrosa', fr: 'Le Pêcheur de La Barrosa', de: 'Der Fischer von La Barrosa' },
    category: { es: 'Mariscos • Pescado Fresco', en: 'Seafood • Fresh Fish', it: 'Frutti de mare • Pesce Fresco', fr: 'Fruits de mer • Poisson Frais', de: 'Meeresfrüchte • Frischer Fisch' },
    description: {
      es: 'El mejor lugar para probar el atún rojo de almadraba. Ambiente familiar.',
      en: 'The best place to try almadraba red tuna. Family atmosphere.',
      it: 'Il posto migliore per provare il tonno rosso almadraba. Atmosfera familiare.',
      fr: 'Le meilleur endroit pour déguster le thon rouge de l\'almadraba. Ambiance familiale.',
      de: 'Der beste Ort, um roten Almadraba-Thunfisch zu probieren. Familiäre Atmosphäre.'
    },
    rating: 4.8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv2j2pL9m8W3A7xqoqtEx1G1E3mcssDx3jrAn9vZDXpjtJZZzXeDRSrRrjKv6HQvWSrZ9vO2fweCK20iwgOWMq2Y3ulOtcrxLBX3dKajq1VjOv2DTNrvikW9GZ2OkB1IOS3defmfN_qrOuaLGrylBtqVnTjzzySdJYWE5MM_6v5tARSp64QLrY0ekEHD4v53xaAqoxuRT42OH-BPRLMMGQR8SBgpSOEePuGwn0LAc8rXxXr6jWFOCMzfUaeWFMATkbrz031nip0JlM',
    priceLevel: '€€€',
    distance: { es: '5 min', en: '5 min', it: '5 min', fr: '5 min', de: '5 Min.' },
    tag: { es: 'Recomendado', en: 'Recommended', it: 'Consigliato', fr: 'Recommandé', de: 'Empfohlen' }
  },
  {
    id: '2',
    title: { es: 'Chiringuito Sol y Mar', en: 'Sun & Sea Beach Bar', it: 'Chiringuito Sole e Mare', fr: 'Chiringuito Soleil et Mer', de: 'Chiringuito Sonne und Meer' },
    category: { es: 'Cócteles • Snack Bar', en: 'Cocktails • Snack Bar', it: 'Cocktail • Snack Bar', fr: 'Cocktails • Snack Bar', de: 'Cocktails • Snack-Bar' },
    description: {
      es: 'El sitio perfecto para ver la puesta de sol con un mojito en la mano.',
      en: 'The perfect spot to watch the sunset with a mojito in hand.',
      it: 'Il posto perfetto per guardare il tramonto con un mojito in mano.',
      fr: 'L\'endroit parfait pour regarder le coucher du soleil avec un mojito à la main.',
      de: 'Der perfekte Ort, um den Sonnenuntergang mit einem Mojito in der Hand zu beobachten.'
    },
    rating: 4.9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHiwmWJAdZJUA1AIDh2MWsgd3jXVLS_kx0QyFKHsK_LmMfc_qW-zuEiP3ztMAAQackOMZ1Lzm7GQ39DHKyVsrLY0fNL4PcBMYN4crWb40paihZ-5Pxrt_oB9AHGDYc62kK1pFRC4GSTnAhXp_8gVyj4725l-t0YlpBgiZSzSFcEPhSF-KM_4g92Wr4m8S38Jz-kirTNzCmbWdPVeZZXgrJsiUhZjVy13Ll4IRv9aN7_UhGtQ4eOYLCCMMO00ucQYKce_ZHIUNOd-_h',
    priceLevel: '€€',
    distance: { es: '8 min', en: '8 min', it: '8 min', fr: '8 min', de: '8 Min.' },
    tag: { es: 'Sunset Spot', en: 'Sunset Spot', it: 'Luogo del Tramonto', fr: 'Point de Coucher du Soleil', de: 'Sonnenuntergangs-Spot' }
  }
];
