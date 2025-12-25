import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Language, NavItem, BookingDetails } from './types';
import { NAV_ITEMS } from './constants';
import { ConciergeAI } from './components/ConciergeAI';

// Views
import Home from './views/Home';
import Apartment from './views/Apartment';
import Services from './views/Services';
import Rules from './views/Rules';
import Experiences from './views/Experiences';
import Contact from './views/Contact';
import Booking from './views/Booking';
import Login from './views/Login';
import Register from './views/Register';
import Profile from './views/Profile';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const Navbar: React.FC<{
  lang: Language,
  setLang: (l: Language) => void,
  isDark: boolean,
  setIsDark: (d: boolean) => void,
  user: any,
  onLogout: () => void
}> = ({ lang, setLang, isDark, setIsDark, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();

  const languages = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  ];

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-10 h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="size-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[28px]">holiday_village</span>
          </div>
          <h2 className="text-lg font-extrabold tracking-tight hidden sm:block">Apartamento La Barrosa</h2>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`text-sm font-semibold transition-colors ${location.pathname === item.path ? 'text-primary' : 'text-text-main dark:text-gray-300 hover:text-primary'
                }`}
            >
              {item.label[lang]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* User Section */}
          {user ? (
            <div className="hidden sm:flex items-center gap-3">
              <div className="relative group">
                <Link to="/profile" className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </Link>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hidden sm:flex size-10 items-center justify-center rounded-lg text-text-muted hover:text-primary hover:bg-primary/5 transition-all">
              <span className="material-symbols-outlined">account_circle</span>
            </Link>
          )}

          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="h-10 px-4 flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors group"
            >
              <span className="text-xs font-bold uppercase tracking-wider">{currentLang.code}</span>
              <span className={`material-symbols-outlined text-sm transition-transform ${isLangOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>

            {isLangOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsLangOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in-up">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code as Language);
                        setIsLangOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${lang === l.code ? 'text-primary' : 'text-text-main dark:text-gray-300'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{l.flag}</span>
                        <span className="text-sm font-bold">{l.label}</span>
                      </div>
                      <span className="text-[10px] font-black uppercase text-text-muted">{l.code}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setIsDark(!isDark)}
            className="size-10 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="material-symbols-outlined">{isDark ? 'light_mode' : 'dark_mode'}</span>
          </button>

          <Link
            to="/booking"
            className="hidden sm:flex h-10 px-5 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold shadow-md hover:bg-primary-dark transition-all active:scale-95"
          >
            {lang === 'es' ? 'Reservar' : 'Book Now'}
          </Link>

          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-background-dark border-b border-gray-100 dark:border-gray-800 px-4 py-6 animate-fade-in-up">
          <div className="flex flex-col gap-4">
            {user && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl mb-2">
                <div className="size-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold">{user.name}</p>
                  <p className="text-xs text-text-muted">{user.email}</p>
                </div>
              </div>
            )}

            {/* Language Selection for Mobile */}
            <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code as Language);
                    setIsMenuOpen(false);
                  }}
                  className={`flex-shrink-0 flex items-center gap-3 px-4 py-2 rounded-xl transition-all font-bold ${lang === l.code ? 'bg-primary/10 text-primary ring-1 ring-primary/20' : 'bg-gray-50 dark:bg-gray-800 text-text-muted'}`}
                >
                  <span className="text-xs uppercase">{l.code}</span>
                </button>
              ))}
            </div>

            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-bold text-text-main dark:text-white"
              >
                {item.label[lang]}
              </Link>
            ))}

            <div className="py-2 border-t border-gray-100 dark:border-gray-800 my-2">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-text-main dark:text-white font-bold py-2">
                    <span className="material-symbols-outlined">person</span>
                    {{
                      es: 'Mi Perfil', en: 'My Profile', it: 'Il mio profilo', fr: 'Mon profil', de: 'Mein Profil'
                    }[lang]}
                  </Link>
                  <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="flex items-center gap-3 text-red-500 font-bold py-2 w-full text-left">
                    <span className="material-symbols-outlined">logout</span>
                    {{
                      es: 'Cerrar Sesión', en: 'Sign Out', it: 'Disconnettersi', fr: 'Se déconnecter', de: 'Abmelden'
                    }[lang]}
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-text-main dark:text-white font-bold py-2">
                  <span className="material-symbols-outlined">login</span>
                  {{
                    es: 'Iniciar Sesión', en: 'Sign In', it: 'Accedi', fr: 'Se connecter', de: 'Anmelden'
                  }[lang]}
                </Link>
              )}
            </div>
            <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="h-12 w-full flex items-center justify-center bg-primary text-white rounded-lg font-bold">
              {{
                es: 'Reservar Ahora',
                en: 'Book Now',
                it: 'Prenota Ora',
                fr: 'Réserver Maintenant',
                de: 'Jetzt Buchen'
              }[lang]}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <footer className="bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 pt-16 pb-8 transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">holiday_village</span>
              <span className="text-xl font-black">La Barrosa</span>
            </div>
            <p className="text-sm text-text-muted dark:text-gray-400 leading-relaxed">
              {{
                es: 'Tu hogar lejos de casa en la Costa de la Luz. Disfruta de una experiencia única con todas las comodidades.',
                en: 'Your home away from home in Costa de la Luz. Enjoy a unique experience with all the comforts.',
                it: 'La tua casa lontano da casa nella Costa de la Luz. Goditi un\'esperienza unica con tutti i comfort.',
                fr: 'Votre chez-vous loin de chez vous sur la Costa de la Luz. Vivez une expérience unique avec tout le confort.',
                de: 'Ihr zweites Zuhause an der Costa de la Luz. Genießen Sie ein einzigartiges Erlebnis mit allem Komfort.'
              }[lang]}
            </p>
            <div className="flex gap-4">
              {['public', 'photo_camera', 'share'].map(icon => (
                <button key={icon} className="size-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-text-muted hover:text-primary transition-all">
                  <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">{{ es: 'Explora', en: 'Explore', it: 'Esplora', fr: 'Explorer', de: 'Erkunden' }[lang]}</h4>
            <ul className="space-y-2 text-sm text-text-muted dark:text-gray-400">
              <li><Link to="/apartment" className="hover:text-primary">{{ es: 'El Apartamento', en: 'The Apartment', it: 'L\'appartamento', fr: 'L\'appartement', de: 'Das Apartment' }[lang]}</Link></li>
              <li><Link to="/services" className="hover:text-primary">{{ es: 'Servicios', en: 'Services', it: 'Servizi', fr: 'Services', de: 'Dienstleistungen' }[lang]}</Link></li>
              <li><Link to="/experiences" className="hover:text-primary">{{ es: 'Experiencias', en: 'Experiences', it: 'Esperienze', fr: 'Expériences', de: 'Erlebnisse' }[lang]}</Link></li>
              <li><Link to="/contact" className="hover:text-primary">{{ es: 'Ubicación', en: 'Location', it: 'Posizione', fr: 'Emplacement', de: 'Standort' }[lang]}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{{ es: 'Legal', en: 'Legal', it: 'Legale', fr: 'Juridique', de: 'Rechtliches' }[lang]}</h4>
            <ul className="space-y-2 text-sm text-text-muted dark:text-gray-400">
              <li><Link to="/rules" className="hover:text-primary">{{ es: 'Normas', en: 'Rules', it: 'Regole', fr: 'Règles', de: 'Regeln' }[lang]}</Link></li>
              <li><Link to="/booking" className="hover:text-primary">{{ es: 'Condiciones', en: 'Conditions', it: 'Condizioni', fr: 'Conditions', de: 'Bedingungen' }[lang]}</Link></li>
              <li><button className="hover:text-primary text-left">{{ es: 'Privacidad', en: 'Privacy', it: 'Privacy', fr: 'Confidentialité', de: 'Datenschutz' }[lang]}</button></li>
              <li><button className="hover:text-primary text-left">{{ es: 'Cookies', en: 'Cookies', it: 'Cookie', fr: 'Cookies', de: 'Cookies' }[lang]}</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{{ es: 'Contacto', en: 'Contact', it: 'Contatto', fr: 'Contact', de: 'Kontakt' }[lang]}</h4>
            <ul className="space-y-3 text-sm text-text-muted dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">location_on</span>
                <span>Av. de los Pescadores, 16, 11139, Chiclana</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">call</span>
                <span>+34 601 26 04 80</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">mail</span>
                <span>apartamentoplayalabarrosa16@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-text-muted">
          © {new Date().getFullYear()} Apartamento La Barrosa. {{ es: 'Todos los derechos reservados.', en: 'All rights reserved.', it: 'Tutti i diritti riservati.', fr: 'Tous droits réservés.', de: 'Alle Rechte vorbehalten.' }[lang]}
        </div>
      </div>
    </footer>
  );
};

import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [user, setUser] = useState<any>(null);
  const [blockedDays, setBlockedDays] = useState<Date[]>([]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const fetchBlockedDays = async () => {
    // 1. Fetch manual blocks
    const { data: manualData, error: manualError } = await supabase.from('blocked_dates').select('date');

    // 2. Fetch occupied dates from bookings
    const { data: bookingData, error: bookingError } = await supabase.from('bookings').select('check_in, check_out').eq('status', 'confirmed');

    if (manualError || bookingError) {
      console.error('Error fetching dates:', manualError || bookingError);
      return;
    }

    const allBlocked = new Set<string>();

    // Add manual dates
    manualData?.forEach((row: any) => allBlocked.add(row.date));

    // Add booking dates (range)
    bookingData?.forEach((booking: any) => {
      const [sy, sm, sd] = booking.check_in.split('-').map(Number);
      const [ey, em, ed] = booking.check_out.split('-').map(Number);
      let current = new Date(sy, sm - 1, sd);
      const end = new Date(ey, em - 1, ed);

      while (current <= end) {
        const year = current.getFullYear();
        const month = String(current.getMonth() + 1).padStart(2, '0');
        const day = String(current.getDate()).padStart(2, '0');
        allBlocked.add(`${year}-${month}-${day}`);
        current.setDate(current.getDate() + 1);
      }
    });

    const combinedDates = Array.from(allBlocked).map(dateStr => {
      const [y, m, d] = dateStr.split('-').map(Number);
      return new Date(y, m - 1, d);
    });

    setBlockedDays(combinedDates);
  };

  useEffect(() => {
    // Initial user load from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Immediate session check to ensure ID and session are valid
    const syncSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const isAdmin = session.user.email === 'apartamentoplayalabarrosa16@gmail.com';
        const userData = {
          id: session.user.id,
          name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'Usuario',
          email: session.user.email,
          role: isAdmin ? 'admin' : 'user'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    };
    syncSession();

    // Supabase Auth Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const isAdmin = session.user.email === 'apartamentoplayalabarrosa16@gmail.com';
        const userData = {
          id: session.user.id,
          name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'Usuario',
          email: session.user.email,
          role: isAdmin ? 'admin' : 'user'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        if (isAdmin) localStorage.setItem('isAdmin', 'true');
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
      }
    });

    fetchBlockedDays();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleBlockedDaysUpdate = async (newDays: Date[] | undefined) => {
    if (!newDays) return;

    // Optimistic update
    const oldDays = blockedDays;
    setBlockedDays(newDays);

    const toDateStr = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const oldDates = oldDays.map(toDateStr);
    const newDates = newDays.map(toDateStr);

    const toAdd = newDates.filter(d => !oldDates.includes(d));
    const toRemove = oldDates.filter(d => !newDates.includes(d));

    if (toAdd.length > 0) {
      const { error } = await supabase.from('blocked_dates').insert(toAdd.map(date => ({ date })));
      if (error) console.error('Error adding dates:', error);
    }

    if (toRemove.length > 0) {
      const { error } = await supabase.from('blocked_dates').delete().in('date', toRemove);
      if (error) console.error('Error removing dates:', error);
    }
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-display selection:bg-primary/30">
        <Navbar lang={lang} setLang={setLang} isDark={isDark} setIsDark={setIsDark} user={user} onLogout={handleLogout} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/apartment" element={<Apartment lang={lang} user={user} />} />
            <Route path="/services" element={<Services lang={lang} />} />
            <Route path="/experiences" element={<Experiences lang={lang} />} />
            <Route path="/rules" element={<Rules lang={lang} />} />
            <Route path="/contact" element={<Contact lang={lang} />} />
            <Route path="/booking" element={<Booking lang={lang} blockedDays={blockedDays} user={user} onBookingSuccess={fetchBlockedDays} />} />
            <Route path="/login" element={<Login lang={lang} onLogin={handleLogin} />} />
            <Route path="/register" element={<Register lang={lang} />} />
            <Route path="/profile" element={<Profile lang={lang} user={user} onLogout={handleLogout} blockedDays={blockedDays} setBlockedDays={handleBlockedDaysUpdate} onRefresh={fetchBlockedDays} />} />
          </Routes>
        </main>


        <Footer lang={lang} />
        <ConciergeAI lang={lang} />
      </div>
    </Router>
  );
};

export default App;
