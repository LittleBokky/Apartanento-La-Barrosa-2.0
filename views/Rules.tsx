
import React from 'react';
import { Language } from '../types';
import { HOUSE_RULES } from '../constants';

const Rules: React.FC<{ lang: Language }> = ({ lang }) => {
  const policies = [
    { icon: 'schedule', label: { es: 'Entrada', en: 'Check-in' }, value: { es: 'A partir de 15:00', en: 'From 3:00 PM' } },
    { icon: 'logout', label: { es: 'Salida', en: 'Check-out' }, value: { es: 'Antes de 11:00', en: 'Before 11:00 AM' } },
    { icon: 'group', label: { es: 'Máx. Huéspedes', en: 'Max. Guests' }, value: { es: '4 Adultos', en: '4 Adults' } },
    { icon: 'nights_stay', label: { es: 'Horario Silencio', en: 'Quiet Hours' }, value: '22:00 - 08:00' }
  ];

  return (
    <div className="animate-fade-in-up">
      <div className="relative w-full h-[300px] overflow-hidden">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-dPrWE3u8Dwn0NoUKbQf6dG_DtSLKC1DNJJGs5bnDYCwxfrDdQxLofsEWreEnC8GDUgJyaI2MfIav0sii_WteTCHSpIKxO2K9NA3-9xIFgDYsCfrTqyutc6zn3ZUGxbn7GljeHq6E_f89fAWWHXZlikEpN1rBLei_yc9O3BQ5CvdZH5pmSLf1b3-tXLUozHiIEEhewlbjo5Rx_4ziahMz-Lvn4zfzmEm4DGd2SB0GE6orBaEwXGg_iFUuSKpGK5X7t1vnMHw4D3oi"
          className="w-full h-full object-cover brightness-[0.5]"
          alt="House Rules Hero"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest mb-4 inline-block border border-white/20">
            {lang === 'es' ? 'Directrices' : 'Guidelines'}
          </span>
          <h1 className="text-4xl lg:text-6xl font-black text-white">
            {lang === 'es' ? 'Normas de la Casa' : 'House Rules'}
          </h1>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-8 justify-between items-center mb-16">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl font-black mb-4">{lang === 'es' ? 'Políticas Generales' : 'General Policies'}</h2>
            <p className="text-text-muted dark:text-gray-400 text-lg leading-relaxed">
              {lang === 'es' 
                ? 'Hemos elaborado estas normas para asegurar que la propiedad permanezca en perfectas condiciones y todos disfruten.' 
                : 'We have prepared these rules to ensure the property remains in perfect condition and everyone enjoys their stay.'}
            </p>
          </div>
          <button className="h-12 px-6 bg-gray-100 dark:bg-gray-800 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors">
            <span className="material-symbols-outlined text-primary">download</span>
            {lang === 'es' ? 'Descargar PDF' : 'Download PDF'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {policies.map((p, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-xl">{p.icon}</span>
              </div>
              <span className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">{p.label[lang]}</span>
              <p className="text-lg font-bold">{p.value[lang] || p.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10 mb-16 flex gap-6 items-start">
          <div className="size-14 rounded-full bg-white dark:bg-gray-900 shadow-sm flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-3xl">info</span>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">{lang === 'es' ? 'Fianza y Documentación' : 'Security Deposit & Docs'}</h3>
            <p className="text-sm text-text-muted dark:text-gray-300 leading-relaxed">
              {lang === 'es'
                ? 'Se requiere un depósito de seguridad de 200€ al hacer el check-in, reembolsable tras la inspección. Es obligatoria una identificación válida para mayores de 16 años.'
                : 'A €200 security deposit is required at check-in, refundable after inspection. Valid ID is mandatory for everyone over 16.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {HOUSE_RULES.map((r, i) => (
            <div key={i} className="flex gap-4">
              <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-muted shrink-0">
                <span className="material-symbols-outlined text-xl">{r.icon}</span>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">{r.title[lang]}</h4>
                <p className="text-sm text-text-muted dark:text-gray-400 leading-relaxed">{r.description[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rules;
