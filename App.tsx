
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Language, NavItem, BookingDetails } from './types';
import { NAV_ITEMS } from './constants';
import { ConciergeAI } from './components/ConciergeAI';

// Views
import Home from './views/Home';
import Apartment from './views/Apartment'; // Cambiado de Nature a Apartment
import Services from './views/Services';
import Rules from './views/Rules';
import Experiences from './views/Experiences';
import Contact from './views/Contact';
import Booking from './views/Booking';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const Navbar: React.FC<{ lang: Language, setLang: (l: Language) => void, isDark: boolean, setIsDark: (d: boolean) => void }> = ({ lang, setLang, isDark, setIsDark }) => {
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
              className={`text-sm font-semibold transition-colors ${
                location.pathname === item.path ? 'text-primary' : 'text-text-main dark:text-gray-300 hover:text-primary'
              }`}
            >
              {item.label[lang]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
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

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-display selection:bg-primary/30">
        <Navbar lang={lang} setLang={setLang} isDark={isDark} setIsDark={setIsDark} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/apartment" element={<Apartment lang={lang} />} />
            <Route path="/services" element={<Services lang={lang} />} />
            <Route path="/experiences" element={<Experiences lang={lang} />} />
            <Route path="/rules" element={<Rules lang={lang} />} />
            <Route path="/contact" element={<Contact lang={lang} />} />
            <Route path="/booking" element={<Booking lang={lang} />} />
          </Routes>
        </main>

        <Footer lang={lang} />
        <ConciergeAI lang={lang} />
      </div>
    </Router>
  );
};

export default App;
