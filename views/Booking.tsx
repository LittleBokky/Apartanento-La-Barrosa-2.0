import React, { useState, useEffect } from 'react';
import { format, differenceInDays, addDays, isSameDay } from 'date-fns';
import { enUS, es, it, fr, de } from 'date-fns/locale';
import { DayPicker, DateRange } from 'react-day-picker';
import { Language } from '../types';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Booking: React.FC<{
  lang: Language,
  blockedDays?: Date[],
  user?: any,
  onBookingSuccess?: () => void
}> = ({ lang, blockedDays = [], user, onBookingSuccess }) => {
  const [range, setRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [priceDetails, setPriceDetails] = useState({ total: 0, nights: 0, avgPrice: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const getLocaleForDateFns = (l: Language) => {
    switch (l) {
      case 'es': return es;
      case 'it': return it;
      case 'fr': return fr;
      case 'de': return de;
      default: return enUS;
    }
  };

  const t = {
    es: {
      title: "Reserva tu estancia",
      subtitle: "Asegura tus fechas directamente para el mejor precio.",
      step1: "Seleccionar Fechas",
      step2: "Detalles de Huéspedes",
      summary: "Tu Estancia",
      total: "Total (EUR)",
      confirm: "Confirmar Reserva",
      safe: "Proceso de pago seguro",
      guarantee: "Mejor Precio Garantizado",
      guaranteeDesc: "No encontrarás un precio más bajo en ningún otro sitio.",
      checkin: "Llegada",
      checkout: "Salida",
      selectDates: "Selecciona fechas de llegada y salida",
      night: "noche",
      nights: "noches",
      cleaning: "Limpieza",
      discount: "Ahorro Reserva Directa",
      taxes: "IVA e impuestos incluidos",
      emptyDates: "Selecciona tus fechas",
      adults: "Adultos",
      children: "Niños",
      years: "años",
      firstName: "Nombre",
      lastName: "Apellidos",
      mustLogin: "Debes iniciar sesión para reservar.",
      dateOverlap: "Lo sentimos, algunas de las fechas seleccionadas ya no están disponibles.",
      bookingError: "Error al crear la reserva",
      bookingSuccess: "¡Reserva confirmada con éxito!"
    },
    en: {
      title: "Book your stay",
      subtitle: "Secure your dates directly for the best price.",
      step1: "Select Dates",
      step2: "Guest Details",
      summary: "Your Stay",
      total: "Total (EUR)",
      confirm: "Confirm Booking",
      safe: "Secure payment process",
      guarantee: "Best Price Guaranteed",
      guaranteeDesc: "You won't find a lower price anywhere else.",
      checkin: "Arrival",
      checkout: "Departure",
      selectDates: "Select arrival and departure dates",
      night: "night",
      nights: "nights",
      cleaning: "Cleaning",
      discount: "Direct Booking Discount",
      taxes: "VAT and taxes included",
      emptyDates: "Select your dates",
      adults: "Adults",
      children: "Children",
      years: "years",
      firstName: "First Name",
      lastName: "Last Name",
      mustLogin: "You must log in to book.",
      dateOverlap: "Sorry, some of the selected dates are no longer available.",
      bookingError: "Error creating booking",
      bookingSuccess: "Booking confirmed successfully!"
    },
    it: {
      title: "Prenota il tuo soggiorno",
      subtitle: "Assicurati le tue date direttamente per il miglior prezzo.",
      step1: "Seleziona Date",
      step2: "Dettagli Ospiti",
      summary: "Il Tuo Soggiorno",
      total: "Totale (EUR)",
      confirm: "Conferma Prenotazione",
      safe: "Processo di pagamento sicuro",
      guarantee: "Miglior Prezzo Garantito",
      guaranteeDesc: "Non troverai un prezzo più basso altrove.",
      checkin: "Arrivo",
      checkout: "Partenza",
      selectDates: "Seleziona le date di arrivo e partenza",
      night: "notte",
      nights: "notti",
      cleaning: "Pulizia",
      discount: "Risparmio Prenotazione Diretta",
      taxes: "IVA e tasse incluse",
      emptyDates: "Seleziona le tue date",
      adults: "Adulti",
      children: "Bambini",
      years: "anni",
      firstName: "Nome",
      lastName: "Cognome",
      mustLogin: "Devi accedere per prenotare.",
      dateOverlap: "Siamo spiacenti, alcune delle date selezionate non sono più disponibili.",
      bookingError: "Errore durante la creazione della prenotazione",
      bookingSuccess: "Prenotazione confermata con successo!"
    },
    fr: {
      title: "Réservez votre séjour",
      subtitle: "Bloquez vos dates directement pour le meilleur prix.",
      step1: "Sélectionner les dates",
      step2: "Détails des voyageurs",
      summary: "Votre Séjour",
      total: "Total (EUR)",
      confirm: "Confirmer la réservation",
      safe: "Processus de paiement sécurisé",
      guarantee: "Meilleur prix garanti",
      guaranteeDesc: "Vous ne trouverez pas de prix inférieur ailleurs.",
      checkin: "Arrivée",
      checkout: "Départ",
      selectDates: "Sélectionnez les dates d'arrivée et de départ",
      night: "nuit",
      nights: "nuits",
      cleaning: "Ménage",
      discount: "Réduction réservation directe",
      taxes: "TVA et taxes incluses",
      emptyDates: "Sélectionnez vos dates",
      adults: "Adultes",
      children: "Enfants",
      years: "ans",
      firstName: "Prénom",
      lastName: "Nom",
      mustLogin: "Vous devez vous connecter pour réserver.",
      dateOverlap: "Désolé, certaines des dates sélectionnées ne sont plus disponibles.",
      bookingError: "Erreur lors de la création de la réservation",
      bookingSuccess: "Réservation confirmée avec succès !"
    },
    de: {
      title: "Buchen Sie Ihren Aufenthalt",
      subtitle: "Sichern Sie sich Ihre Termine direkt zum besten Preis.",
      step1: "Termine wählen",
      step2: "Details der Gäste",
      summary: "Ihr Aufenthalt",
      total: "Gesamt (EUR)",
      confirm: "Buchung bestätigen",
      safe: "Sicherer Zahlungsvorgang",
      guarantee: "Bestpreis-Garantie",
      guaranteeDesc: "Sie werden nirgendwo anders einen niedrigeren Preis finden.",
      checkin: "Anreise",
      checkout: "Abreise",
      selectDates: "Wählen Sie Anreise- und Abreisedaten",
      night: "Nacht",
      nights: "Nächte",
      cleaning: "Reinigung",
      discount: "Direktbuchungsrabatt",
      taxes: "MwSt. und Steuern inbegriffen",
      emptyDates: "Wählen Sie Ihre Daten",
      adults: "Erwachsene",
      children: "Kinder",
      years: "Jahre",
      firstName: "Vorname",
      lastName: "Nachname",
      mustLogin: "Sie müssen sich anmelden, um zu buchen.",
      dateOverlap: "Entschuldigung, einige der ausgewählten Termine sind nicht mehr verfügbar.",
      bookingError: "Fehler beim Erstellen der Buchung",
      bookingSuccess: "Buchung erfolgreich bestätigt!"
    }
  }[lang];

  // Pricing Logic
  const getPriceForDate = (date: Date) => {
    const month = date.getMonth(); // 0 = Jan, 11 = Dec
    let basePrice = 50;

    // High Season: June (5) to September (8)
    if (month >= 5 && month <= 8) {
      basePrice = 120;
    }

    // Guest Surcharges
    const extraAdultsFee = Math.max(0, adults - 2) * 20;
    const kidsFee = kids * 10;

    return basePrice + extraAdultsFee + kidsFee;
  };

  useEffect(() => {
    if (range?.from && range?.to) {
      let currentDate = range.from;
      let total = 0;
      let nights = 0;

      while (differenceInDays(range.to, currentDate) > 0) {
        total += getPriceForDate(currentDate);
        currentDate = addDays(currentDate, 1);
        nights++;
      }

      setPriceDetails({
        total,
        nights,
        avgPrice: nights > 0 ? total / nights : 0
      });
    } else {
      setPriceDetails({ total: 0, nights: 0, avgPrice: 0 });
    }
  }, [range, adults, kids]);

  const handleBookingConfirm = async () => {
    if (!user) {
      alert(t.mustLogin);
      navigate('/login');
      return;
    }

    if (!range?.from || !range?.to) return;

    // Overlap check
    const isDateBlocked = (date: Date) => {
      return blockedDays.some(blockedDate => isSameDay(blockedDate, date));
    };

    let checkDate = range.from;
    while (checkDate <= range.to) {
      if (isDateBlocked(checkDate)) {
        alert(t.dateOverlap);
        return;
      }
      checkDate = addDays(checkDate, 1);
    }

    setIsSubmitting(true);

    const check_in = format(range.from, 'yyyy-MM-dd');
    const check_out = format(range.to, 'yyyy-MM-dd');

    const CLEANING_FEE = 45;
    const DISCOUNT = 0.05;
    const finalTotal = priceDetails.total + CLEANING_FEE;
    const discountedTotal = finalTotal * (1 - DISCOUNT);

    const { error } = await supabase.from('bookings').insert({
      user_id: user.id,
      guest_name: user.name,
      guest_email: user.email,
      check_in,
      check_out,
      guests_adults: adults,
      guests_children: kids,
      total_price: Math.round(discountedTotal),
      status: 'confirmed'
    });

    setIsSubmitting(false);

    if (error) {
      console.error('Booking error:', error);
      alert(`${t.bookingError}: ${error.message}`);
      return;
    }

    alert(t.bookingSuccess);
    onBookingSuccess?.();
    navigate('/profile');
  };

  const CLEANING_FEE = 45;
  const DISCOUNT = 0.05;
  const finalTotal = priceDetails.total + CLEANING_FEE;
  const discountedTotal = finalTotal * (1 - DISCOUNT);
  const discountAmount = finalTotal * DISCOUNT;

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 animate-fade-in-up">
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-black mb-3">{t.title}</h1>
        <p className="text-text-muted text-lg">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <section className="bg-white dark:bg-surface-dark rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-8">
              <span className="size-7 bg-primary text-white text-xs rounded-full flex items-center justify-center font-black">1</span>
              {t.step1}
            </h3>

            <div className="flex flex-col md:flex-row justify-center bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 md:p-10">
              <style>{`
                .rdp { --rdp-cell-size: 50px; --rdp-accent-color: #19a1e6; --rdp-background-color: #e0f2fe; margin: 0; }
                .rdp-day_selected:not([disabled]) { font-weight: bold; background-color: var(--rdp-accent-color); color: white; }
                .rdp-day_selected:hover:not([disabled]) { background-color: var(--rdp-accent-color); opacity: 0.8; }
                .dark .rdp { --rdp-accent-color: #158bc5; color: #e2e8f0; }
                .dark .rdp-day:hover:not(.rdp-day_selected) { background-color: #1e293b; }
              `}</style>
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                locale={getLocaleForDateFns(lang)}
                numberOfMonths={1}
                disabled={[...blockedDays, { before: new Date() }]}
              />
            </div>
          </section>

          <section className="bg-white dark:bg-surface-dark rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-8">
              <span className="size-7 bg-primary text-white text-xs rounded-full flex items-center justify-center font-black">2</span>
              {t.step2}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                <div>
                  <p className="font-bold">{t.adults}</p>
                  <p className="text-xs text-text-muted">13+ {t.years}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setAdults(Math.max(1, adults - 1))} className="size-10 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-colors flex items-center justify-center">-</button>
                  <span className="font-black w-4 text-center">{adults}</span>
                  <button onClick={() => setAdults(adults + 1)} className="size-10 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-colors flex items-center justify-center">+</button>
                </div>
              </div>
              <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                <div>
                  <p className="font-bold">{t.children}</p>
                  <p className="text-xs text-text-muted">2-12 {t.years}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setKids(Math.max(0, kids - 1))} className="size-10 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-colors flex items-center justify-center">-</button>
                  <span className="font-black w-4 text-center">{kids}</span>
                  <button onClick={() => setKids(kids + 1)} className="size-10 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-colors flex items-center justify-center">+</button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder={t.firstName} className="h-14 px-5 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none" />
              <input type="text" placeholder={t.lastName} className="h-14 px-5 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none" />
              <input type="email" placeholder="Email" className="h-14 px-5 bg-gray-50 dark:bg-gray-900 border-none rounded-xl md:col-span-2 focus:ring-2 focus:ring-primary outline-none" />
            </div>
          </section>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="h-32 bg-primary p-8 flex items-end relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                <div className="text-white relative z-10">
                  <h4 className="text-2xl font-black">{t.summary}</h4>
                  <p className="text-xs opacity-80 uppercase tracking-widest font-bold">Apartamento La Barrosa</p>
                </div>
              </div>

              <div className="p-8">
                {priceDetails.nights > 0 ? (
                  <>
                    <div className="flex items-center justify-between pb-8 border-b border-dashed border-gray-200 dark:border-gray-800 mb-8">
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-text-muted uppercase mb-1">{t.checkin}</p>
                        <p className="font-bold">{range?.from ? format(range.from, 'd MMM', { locale: getLocaleForDateFns(lang) }) : '-'}</p>
                      </div>
                      <span className="material-symbols-outlined text-gray-300">arrow_forward</span>
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-text-muted uppercase mb-1">{t.checkout}</p>
                        <p className="font-bold">{range?.to ? format(range.to, 'd MMM', { locale: getLocaleForDateFns(lang) }) : '-'}</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-10">
                      <div className="flex justify-between text-sm">
                        <div className="flex flex-col">
                          <span className="text-text-muted">{priceDetails.nights} {priceDetails.nights === 1 ? t.night : t.nights}</span>
                          <span className="text-xs text-text-muted opacity-70">Average €{Math.round(priceDetails.avgPrice)}/{t.night}</span>
                        </div>
                        <span className="font-bold">€{priceDetails.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-muted">{t.cleaning}</span>
                        <span className="font-bold">€{CLEANING_FEE.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-green-600 font-bold bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                        <span>{t.discount}</span>
                        <span>-€{discountAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <p className="text-sm font-bold">{t.total}</p>
                        <p className="text-[10px] text-text-muted">{t.taxes}</p>
                      </div>
                      <p className="text-4xl font-black text-primary">€{Math.round(discountedTotal)}</p>
                    </div>
                  </>
                ) : (
                  <div className="py-12 text-center text-text-muted">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-30">calendar_month</span>
                    <p>{t.selectDates}</p>
                  </div>
                )}

                <button
                  onClick={handleBookingConfirm}
                  disabled={!range?.from || !range?.to || isSubmitting}
                  className="w-full h-16 bg-primary disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    t.confirm
                  )}
                </button>
                <p className="text-center text-[10px] text-text-muted mt-6 flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined !text-sm text-green-500">verified_user</span>
                  {t.safe}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 flex gap-4 items-center">
              <div className="size-12 rounded-full bg-white dark:bg-gray-900 shadow-sm flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl">savings</span>
              </div>
              <div>
                <p className="text-sm font-bold mb-1">{t.guarantee}</p>
                <p className="text-xs text-text-muted">{t.guaranteeDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
