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
  const location = useLocation();

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

          <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setLang('es')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all ${lang === 'es' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-text-muted hover:text-text-main'}`}
            >ES</button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all ${lang === 'en' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-text-muted hover:text-text-main'}`}
            >EN</button>
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
                    {lang === 'es' ? 'Mi Perfil' : 'My Profile'}
                  </Link>
                  <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="flex items-center gap-3 text-red-500 font-bold py-2 w-full text-left">
                    <span className="material-symbols-outlined">logout</span>
                    {lang === 'es' ? 'Cerrar Sesión' : 'Sign Out'}
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-text-main dark:text-white font-bold py-2">
                  <span className="material-symbols-outlined">login</span>
                  {lang === 'es' ? 'Iniciar Sesión' : 'Sign In'}
                </Link>
              )}
            </div>
            <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="h-12 w-full flex items-center justify-center bg-primary text-white rounded-lg font-bold">
              {lang === 'es' ? 'Reservar Ahora' : 'Book Now'}
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
              {lang === 'es'
                ? 'Tu hogar lejos de casa en la Costa de la Luz. Disfruta de una experiencia única con todas las comodidades.'
                : 'Your home away from home in Costa de la Luz. Enjoy a unique experience with all the comforts.'}
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
            <h4 className="font-bold mb-4">{lang === 'es' ? 'Explora' : 'Explore'}</h4>
            <ul className="space-y-2 text-sm text-text-muted dark:text-gray-400">
              <li><Link to="/apartment" className="hover:text-primary">El Apartamento</Link></li>
              <li><Link to="/services" className="hover:text-primary">Servicios</Link></li>
              <li><Link to="/experiences" className="hover:text-primary">Experiencias</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Ubicación</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{lang === 'es' ? 'Legal' : 'Legal'}</h4>
            <ul className="space-y-2 text-sm text-text-muted dark:text-gray-400">
              <li><Link to="/rules" className="hover:text-primary">Normas</Link></li>
              <li><Link to="/booking" className="hover:text-primary">Condiciones</Link></li>
              <li><button className="hover:text-primary text-left">Privacidad</button></li>
              <li><button className="hover:text-primary text-left">Cookies</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{lang === 'es' ? 'Contacto' : 'Contact'}</h4>
            <ul className="space-y-3 text-sm text-text-muted dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">location_on</span>
                <span>Calle La Barrosa 12, Chiclana</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">call</span>
                <span>+34 956 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">mail</span>
                <span>hola@labarrosa.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-text-muted">
          © {new Date().getFullYear()} Apartamento La Barrosa. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
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
            <Route path="/apartment" element={<Apartment lang={lang} />} />
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
