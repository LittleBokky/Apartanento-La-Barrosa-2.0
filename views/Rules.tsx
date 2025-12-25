
import React from 'react';
import { Language } from '../types';
import { HOUSE_RULES } from '../constants';

const Rules: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = {
    es: {
      guidelines: "Directrices",
      houseRules: "Normas de la Casa",
      generalPolicies: "Políticas Generales",
      policiesDesc: "Hemos elaborado estas normas para asegurar que la propiedad permanezca en perfectas condiciones y todos disfruten.",
      downloadPdf: "Descargar PDF",
      securityDeposit: "Fianza y Documentación",
      securityDesc: "Se requiere un depósito de seguridad de 200€ al hacer el check-in, reembolsable tras la inspección. Es obligatoria una identificación válida para mayores de 16 años.",
      yourHost: "Tu anfitrión",
      verifiedHost: "Anfitrión Verificado",
      yearsHosting: "Años hospedando",
      avgRating: "Puntuación media",
      bio1: "Hola, soy Antonio. Me defino como una persona formal, exigente y muy detallista. Mis pasiones son la automoción, la decoración y la fotografía, aficiones que trato de reflejar en cada rincón de este apartamento para que tu estancia sea inolvidable.",
      bio2: "Llevo 7 años compartiendo mi hogar con viajeros de todo el mundo. Me encanta el deporte al aire libre y el mar. Mi prioridad es tu comodidad: estoy disponible por teléfono o WhatsApp en menos de una hora para resolver cualquier duda.",
      fastResponse: "Respuesta rápida",
      responseTime: "Normalmente en menos de 1 hora",
      languages: "Idiomas",
      langList: "Español, Inglés"
    },
    en: {
      guidelines: "Guidelines",
      houseRules: "House Rules",
      generalPolicies: "General Policies",
      policiesDesc: "We have prepared these rules to ensure the property remains in perfect condition and everyone enjoys their stay.",
      downloadPdf: "Download PDF",
      securityDeposit: "Security Deposit & Docs",
      securityDesc: "A €200 security deposit is required at check-in, refundable after inspection. Valid ID is mandatory for everyone over 16.",
      yourHost: "Your host",
      verifiedHost: "Verified Host",
      yearsHosting: "Years hosting",
      avgRating: "Avg. Rating",
      bio1: "Hi, I'm Antonio. I define myself as a formal, demanding, and very detail-oriented person. My passions are automotive, decoration, and photography—hobbies I try to reflect in every corner of this apartment to make your stay unforgettable.",
      bio2: "I've been sharing my home with travelers from all over the world for 7 years. I love outdoor sports and the sea. My priority is your comfort: I'm available via phone or WhatsApp in less than an hour to resolve any questions.",
      fastResponse: "Fast response",
      responseTime: "Usually within 1 hour",
      languages: "Languages",
      langList: "Spanish, English"
    },
    it: {
      guidelines: "Linee Guida",
      houseRules: "Regole della Casa",
      generalPolicies: "Politiche Generali",
      policiesDesc: "Abbiamo elaborato queste regole per garantire che la proprietà rimanga in perfette condizioni e che tutti si godano il soggiorno.",
      downloadPdf: "Scarica PDF",
      securityDeposit: "Deposito Cauzionale e Documenti",
      securityDesc: "È richiesto un deposito cauzionale di 200€ al check-in, rimborsabile dopo l'ispezione. È obbligatorio un documento d'identità valido per i maggiori di 16 anni.",
      yourHost: "Il tuo ospite",
      verifiedHost: "Host Verificato",
      yearsHosting: "Anni come host",
      avgRating: "Voto Medio",
      bio1: "Ciao, sono Antonio. Mi definisco una persona formale, esigente e molto attenta ai dettagli. Le mie passioni sono i motori, l'arredamento e la fotografia, hobby che cerco di riflettere in ogni angolo di questo appartamento per rendere il tuo soggiorno indimenticabile.",
      bio2: "Condivido la mia casa con viaggiatori di tutto il mondo da 7 anni. Amo lo sport all'aria aperta e il mare. La mia priorità è il tuo comfort: sono disponibile per telefono o WhatsApp in meno di un'ora per risolvere qualsiasi dubbio.",
      fastResponse: "Risposta rapida",
      responseTime: "Normalmente in meno di 1 ora",
      languages: "Lingue",
      langList: "Spagnolo, Inglese"
    },
    fr: {
      guidelines: "Directives",
      houseRules: "Règles de la Maison",
      generalPolicies: "Politiques Générales",
      policiesDesc: "Nous avons préparé ces règles pour garantir que la propriété reste en parfait état et que tout le monde profite de son séjour.",
      downloadPdf: "Télécharger le PDF",
      securityDeposit: "Dépôt de Garantie et Documents",
      securityDesc: "Un dépôt de garantie de 200€ est requis lors de l'enregistrement, remboursable après inspection. Une pièce d'identité valide est obligatoire pour toute personne de plus de 16 ans.",
      yourHost: "Votre hôte",
      verifiedHost: "Hôte Vérifié",
      yearsHosting: "Années d'accueil",
      avgRating: "Note Moyenne",
      bio1: "Bonjour, je suis Antonio. Je me définis comme une personne formelle, exigeante et très soucieuse des détails. Mes passions sont l'automobile, la décoration et la photographie, des passe-temps que j'essaie de refléter dans chaque coin de cet appartement pour rendre votre séjour inoubliable.",
      bio2: "Je partage ma maison avec des voyageurs du monde entier depuis 7 ans. J'aime les sports de plein air et la mer. Ma priorité est votre confort : je suis disponible par téléphone ou WhatsApp en moins d'une heure pour répondre à vos questions.",
      fastResponse: "Réponse rapide",
      responseTime: "Normalement en moins d'une heure",
      languages: "Langues",
      langList: "Espagnol, Anglais"
    },
    de: {
      guidelines: "Richtlinien",
      houseRules: "Hausregeln",
      generalPolicies: "Allgemeine Richtlinien",
      policiesDesc: "Wir haben diese Regeln aufgestellt, um sicherzustellen, dass die Unterkunft in einwandfreiem Zustand bleibt und jeder seinen Aufenthalt genießen kann.",
      downloadPdf: "PDF herunterladen",
      securityDeposit: "Kaution & Dokumente",
      securityDesc: "Bei der Anreise ist eine Kaution in Höhe von 200 € zu hinterlegen, die nach der Besichtigung erstattet wird. Für alle Personen über 16 Jahre ist ein gültiger Ausweis erforderlich.",
      yourHost: "Ihr Gastgeber",
      verifiedHost: "Verifizierter Gastgeber",
      yearsHosting: "Jahre als Gastgeber",
      avgRating: "Durchschn. Bewertung",
      bio1: "Hallo, ich bin Antonio. Ich beschreibe mich als eine formelle, anspruchsvolle und sehr detailorientierte Person. Meine Leidenschaften sind die Automobilwelt, Dekoration und Fotografie – Hobbys, die ich in jedem Winkel dieser Wohnung widerspiegle, um Ihren Aufenthalt unvergesslich zu machen.",
      bio2: "Seit 7 Jahren teile ich mein Zuhause mit Reisenden aus aller Welt. Ich liebe Outdoor-Sport und das Meer. Meine Priorität ist Ihr Komfort: Ich bin telefonisch oder per WhatsApp in weniger als einer Stunde erreichbar, um alle Fragen zu klären.",
      fastResponse: "Schnelle Antwort",
      responseTime: "Normalerweise in weniger als 1 Stunde",
      languages: "Sprachen",
      langList: "Spanisch, Englisch"
    }
  }[lang];

  const policies = [
    { icon: 'schedule', label: { es: 'Entrada', en: 'Check-in', it: 'Entrata', fr: 'Arrivée', de: 'Check-in' }, value: { es: 'A partir de 15:00', en: 'From 3:00 PM', it: 'Dalle 15:00', fr: 'À partir de 15h00', de: 'Ab 15:00 Uhr' } },
    { icon: 'logout', label: { es: 'Salida', en: 'Check-out', it: 'Uscita', fr: 'Départ', de: 'Check-out' }, value: { es: 'Antes de 11:00', en: 'Before 11:00 AM', it: 'Entro le 11:00', fr: 'Avant 11h00', de: 'Vor 11:00 Uhr' } },
    { icon: 'group', label: { es: 'Máx. Huéspedes', en: 'Max. Guests', it: 'Max. Ospiti', fr: 'Voyageurs Max', de: 'Max. Gäste' }, value: { es: '4 Adultos', en: '4 Adults', it: '4 Adulti', fr: '4 Adultes', de: '4 Erwachsene' } },
    { icon: 'nights_stay', label: { es: 'Horario Silencio', en: 'Quiet Hours', it: 'Ore di Silenzio', fr: 'Heures de Silence', de: 'Ruhezeiten' }, value: '22:00 - 08:00' }
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
            {t.guidelines}
          </span>
          <h1 className="text-4xl lg:text-6xl font-black text-white">
            {t.houseRules}
          </h1>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-8 justify-between items-center mb-16">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl font-black mb-4">{t.generalPolicies}</h2>
            <p className="text-text-muted dark:text-gray-400 text-lg leading-relaxed">
              {t.policiesDesc}
            </p>
          </div>
          <button className="h-12 px-6 bg-gray-100 dark:bg-gray-800 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors">
            <span className="material-symbols-outlined text-primary">download</span>
            {t.downloadPdf}
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
            <h3 className="text-xl font-bold mb-2">{t.securityDeposit}</h3>
            <p className="text-sm text-text-muted dark:text-gray-300 leading-relaxed">
              {t.securityDesc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
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

        {/* Host Section */}
        <div className="mt-24">
          <div className="bg-white dark:bg-surface-dark rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 relative h-[400px] lg:h-auto bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-12">
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="size-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl mb-6">
                    <img src="/antonio.png" alt="Antonio" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-3xl font-black mb-2 italic">Antonio</h3>
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-green-500/10 text-green-600 rounded-full text-xs font-black uppercase tracking-widest border border-green-500/20">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    {t.verifiedHost}
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-8 w-full">
                    <div className="text-center">
                      <p className="text-2xl font-black text-primary">7</p>
                      <p className="text-[10px] text-text-muted uppercase font-bold tracking-tighter">{t.yearsHosting}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-primary">9.8</p>
                      <p className="text-[10px] text-text-muted uppercase font-bold tracking-tighter">{t.avgRating}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <span className="material-symbols-outlined text-[300px] absolute -right-20 -bottom-20 rotate-12">holiday_village</span>
                </div>
              </div>

              <div className="lg:col-span-7 p-10 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl font-black mb-6">
                  {t.yourHost}
                </h2>
                <div className="space-y-6 text-text-muted dark:text-gray-300 leading-relaxed text-lg">
                  <p>
                    {t.bio1}
                  </p>
                  <p>
                    {t.bio2}
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-sm">bolt</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">{t.fastResponse}</h4>
                      <p className="text-xs text-text-muted">{t.responseTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-sm">language</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">{t.languages}</h4>
                      <p className="text-xs text-text-muted">{t.langList}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
