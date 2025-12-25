import React, { useState } from 'react';
import { Language } from '../types';
import { supabase } from '../lib/supabase';

const Contact: React.FC<{ lang: Language }> = ({ lang }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const getInitialSubject = (l: Language) => {
    return {
      es: 'Consulta general',
      en: 'General Inquiry',
      it: 'Richiesta generale',
      fr: 'Demande générale',
      de: 'Allgemeine Anfrage'
    }[l];
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: getInitialSubject(lang),
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Guardar en Supabase (para el panel interno)
    const { error: supabaseError } = await supabase.from('contact_messages').insert([
      {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      }
    ]);

    // 2. Enviar a Formspree (para notificación por email)
    try {
      const response = await fetch('https://formspree.io/f/mnjawval', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        console.error('Formspree error:', await response.text());
      }
    } catch (err) {
      console.error('Formspree fetch failed:', err);
    }

    setIsSubmitting(false);

    if (supabaseError) {
      alert({
        es: 'Error al enviar el mensaje',
        en: 'Error sending message',
        it: 'Errore nell\'invio del messaggio',
        fr: 'Erreur lors de l\'envoi du message',
        de: 'Fehler beim Senden der Nachricht'
      }[lang]);
      console.error(supabaseError);
      return;
    }

    setSent(true);
    setFormData({
      name: '',
      email: '',
      subject: getInitialSubject(lang),
      message: ''
    });
    setTimeout(() => setSent(false), 5000);
  };

  const t = {
    es: {
      title: "Contacta con nosotros",
      subtitle: "¿Tienes dudas? Háznoslo saber. Reserva directo para evitar comisiones.",
      sendMsg: "Envíanos un mensaje",
      name: "Nombre completo",
      email: "Correo electrónico",
      subject: "Asunto",
      msg: "Mensaje",
      send: "Enviar mensaje",
      success: "¡Mensaje enviado con éxito!",
      address: "Dirección",
      phone: "Teléfono",
      findUs: "Estamos aquí",
      googleMaps: "Abrir en Google Maps",
      replyTime: "Respuesta en menos de 24h",
      subjects: {
        general: "Consulta general",
        booking: "Reserva",
        technical: "Problema técnico"
      }
    },
    en: {
      title: "Contact us",
      subtitle: "Have questions? Let us know. Book direct to avoid commissions.",
      sendMsg: "Send us a message",
      name: "Full Name",
      email: "Email Address",
      subject: "Subject",
      msg: "Message",
      send: "Send message",
      success: "Message sent successfully!",
      address: "Address",
      phone: "Phone",
      findUs: "Find us here",
      googleMaps: "Open in Google Maps",
      replyTime: "Reply in less than 24h",
      subjects: {
        general: "General Inquiry",
        booking: "Booking",
        technical: "Technical Issue"
      }
    },
    it: {
      title: "Contattaci",
      subtitle: "Hai domande? Faccelo sapere. Prenota direttamente per evitare commissioni.",
      sendMsg: "Inviaci un messaggio",
      name: "Nome completo",
      email: "Indirizzo e-mail",
      subject: "Oggetto",
      msg: "Messaggio",
      send: "Invia messaggio",
      success: "Messaggio inviato con successo!",
      address: "Indirizzo",
      phone: "Telefono",
      findUs: "Siamo qui",
      googleMaps: "Apri in Google Maps",
      replyTime: "Risposta in meno di 24h",
      subjects: {
        general: "Richiesta generale",
        booking: "Prenotazione",
        technical: "Problema tecnico"
      }
    },
    fr: {
      title: "Contactez-nous",
      subtitle: "Vous avez des questions ? Faites-le nous savoir. Réservez directement pour éviter les commissions.",
      sendMsg: "Envoyez-nous un message",
      name: "Nom complet",
      email: "Adresse e-mail",
      subject: "Objet",
      msg: "Message",
      send: "Envoyer le message",
      success: "Message envoyé avec succès !",
      address: "Adresse",
      phone: "Téléphone",
      findUs: "Nous sommes ici",
      googleMaps: "Ouvrir dans Google Maps",
      replyTime: "Réponse en moins de 24h",
      subjects: {
        general: "Demande générale",
        booking: "Réservation",
        technical: "Problème technique"
      }
    },
    de: {
      title: "Kontaktieren Sie uns",
      subtitle: "Haben Sie Fragen? Lassen Sie es uns wissen. Buchen Sie direkt, um Provisionen zu sparen.",
      sendMsg: "Senden Sie uns eine Nachricht",
      name: "Vollständiger Name",
      email: "E-Mail-Adresse",
      subject: "Betreff",
      msg: "Nachricht",
      send: "Nachricht senden",
      success: "Nachricht erfolgreich gesendet!",
      address: "Adresse",
      phone: "Telefon",
      findUs: "Wir sind hier",
      googleMaps: "In Google Maps öffnen",
      replyTime: "Antwort in weniger als 24 Stunden",
      subjects: {
        general: "Allgemeine Anfrage",
        booking: "Buchung",
        technical: "Technisches Problem"
      }
    }
  }[lang];

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 animate-fade-in-up">
      <div className="flex flex-col gap-4 mb-16 text-center lg:text-left">
        <h1 className="text-5xl lg:text-6xl font-black tracking-tight">{t.title}</h1>
        <p className="text-text-muted dark:text-gray-400 text-lg max-w-2xl leading-relaxed">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-7 bg-white dark:bg-surface-dark p-8 lg:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
          <h3 className="text-2xl font-black mb-8">{t.sendMsg}</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold">{t.name}</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl h-14 px-5 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">{t.email}</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl h-14 px-5 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">{t.subject}</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl h-14 px-5 focus:ring-2 focus:ring-primary/20"
              >
                <option value={t.subjects.general}>{t.subjects.general}</option>
                <option value={t.subjects.booking}>{t.subjects.booking}</option>
                <option value={t.subjects.technical}>{t.subjects.technical}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">{t.msg}</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl p-5 focus:ring-2 focus:ring-primary/20 resize-none"
              ></textarea>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
              <p className="text-xs text-text-muted flex items-center gap-1.5">
                <span className="material-symbols-outlined text-green-500 !text-sm">check_circle</span>
                {t.replyTime}
              </p>
              <button
                disabled={sent || isSubmitting}
                type="submit"
                className="w-full md:w-auto h-14 px-10 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:bg-green-500 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : sent ? (
                  <><span className="material-symbols-outlined">check</span> {t.success}</>
                ) : (
                  <>{t.send} <span className="material-symbols-outlined text-sm">send</span></>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
            <div className="flex gap-6">
              <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <h4 className="font-bold mb-1">{t.address}</h4>
                <p className="text-sm text-text-muted dark:text-gray-400">Av. de los Pescadores, 16, 11139<br />Chiclana de la Frontera, Cádiz</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">call</span>
              </div>
              <div>
                <h4 className="font-bold mb-1">{t.phone}</h4>
                <p className="text-sm text-text-muted dark:text-gray-400">+34 601 26 04 80</p>
                <p className="text-[10px] text-primary font-bold uppercase mt-1">WhatsApp Disponible</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <h4 className="font-bold mb-1">{t.email}</h4>
                <p className="text-sm text-text-muted dark:text-gray-400">apartamentoplayalabarrosa16@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="relative h-[350px] rounded-3xl overflow-hidden shadow-2xl group border border-gray-100 dark:border-gray-800">
            <iframe
              width="100%"
              height="100%"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=Av.%20de%20los%20Pescadores%2C%2016%2C%2011139%20Chiclana%20de%20la%20Frontera%2C%20C%C3%A1diz&t=&z=15&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              scrolling="no"
              className="grayscale group-hover:grayscale-0 transition-all duration-700"
              title="Ubicación Apartamento"
            ></iframe>
            <a href="https://maps.app.goo.gl/RJ8nCBqYqqz6q4Qk8" target="_blank" rel="noopener noreferrer" className="absolute bottom-6 left-6 bg-white dark:bg-gray-900 text-sm font-bold py-3 px-5 rounded-xl shadow-2xl flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined text-primary">map</span>
              {t.googleMaps}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
