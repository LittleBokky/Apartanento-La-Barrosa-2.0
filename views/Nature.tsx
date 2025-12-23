
import React from 'react';
import { Language } from '../types';

const Nature: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = {
    es: {
      title: "Naturaleza a tu Puerta",
      subtitle: "Descubre la belleza salvaje de la costa de la Luz. Desde pinares centenarios hasta dunas doradas.",
      section: "El Entorno",
      sectionTitle: "Un Santuario Natural",
      sectionDesc: "Bienvenido a un lugar donde la naturaleza es la protagonista. Playa, pinares y marismas a un paso.",
      tip: "Consejo Local: La Hora Mágica",
      tipDesc: "Los atardeceres en La Barrosa son legendarios. Dirígete a los acantilados cerca de la Torre del Puerco.",
      spots: [
        { icon: 'water_drop', title: 'La Playa Infinita', desc: '8 km de arena dorada y dunas protegidas. Bandera Azul.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv8dlZIKZvmQLzhwYxYZRy_RRXIMwmuxbHut5dX_BJStZ0iXOPFPfoRQgLS1y1zOsVR5YermxQ0ezkTrE2AmKrdr8fu9PMT0pF1K9n2lKouujOFB0Q9vO7nvu8A-9fAxlwx7OYndzul0rLMwDdjOjHaEwTLdhcPE7NR4xMr93mkFmL4kV5TcZxFyWEna4hd35EuwtHEGch1jkmAkD7NMb5ifLY81_jw5N1ZjiEPXTA4QIbFcDQ8TduFXZaDjcl2SVOaO2OX7BW0zqy' },
        { icon: 'forest', title: 'Pinar Público', desc: 'Senderos sombreados para caminar a solo unos minutos.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUv0OCWAqHLK6KvWkqB4w12_2ECogVMc5MarOCkbBJzH4EV4YK9jt5hYSRvsACzOEuHypSNVFwSf21TJ6qPPgwKSr1rz8LrfyHrltaj-GHdBA7kK4-isLQjxGiUV6PIaorLGI07zAu8vccSbQ1xbmbeMlDK4YeuB66jCBvshdU-gIr0eSAXdPcJtxWYUQNnuSjeLpSgSM5IpcxmLPR7fgHNZEW3x_VehQ12trKuU2UAqrAUxwljRaVEWsLIq-Jk52RLTHCvfJqb-3w' },
        { icon: 'flutter_dash', title: 'Marismas y Avifauna', desc: 'Observación de flamencos y espátulas en el Parque Natural.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrkxnZ1BiH739-wvkg_6QDlzzySuUImRmGNYUkVEWi5Ab6Olu_pF5i136yDBkddE1HQ_gd1-Gr4po_v3f-49YZrOnhl3g0t0BOKZTkUwbdSHYSKpOuKrPVXWe2C2VAQmFnlZgDuFg71IifqiSg88Q0h1ms416XzEseA-voE1heecmXTPTcZh_IbjDLMQAIwFvGByHXBrLG0x8Q0zq7JcYb8VIwPuICVdFuDxmO8VUKNzsTTj0l6SzHBYLPEcuxvWaR24v2gLUnvFCn' }
      ]
    },
    en: {
      title: "Nature at your Doorstep",
      subtitle: "Discover the wild beauty of the Costa de la Luz. From ancient pine forests to golden dunes.",
      section: "The Environment",
      sectionTitle: "A Natural Sanctuary",
      sectionDesc: "Welcome to a place where nature is the protagonist. Beach, pine forests, and marshes within steps.",
      tip: "Local Tip: The Magic Hour",
      tipDesc: "Sunsets in La Barrosa are legendary. Head to the cliffs near Torre del Puerco for the best views.",
      spots: [
        { icon: 'water_drop', title: 'Infinite Beach', desc: '8 km of golden sand and protected dunes. Blue Flag.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv8dlZIKZvmQLzhwYxYZRy_RRXIMwmuxbHut5dX_BJStZ0iXOPFPfoRQgLS1y1zOsVR5YermxQ0ezkTrE2AmKrdr8fu9PMT0pF1K9n2lKouujOFB0Q9vO7nvu8A-9fAxlwx7OYndzul0rLMwDdjOjHaEwTLdhcPE7NR4xMr93mkFmL4kV5TcZxFyWEna4hd35EuwtHEGch1jkmAkD7NMb5ifLY81_jw5N1ZjiEPXTA4QIbFcDQ8TduFXZaDjcl2SVOaO2OX7BW0zqy' },
        { icon: 'forest', title: 'Public Pine Forest', desc: 'Shaded paths for walking and cycling just minutes away.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUv0OCWAqHLK6KvWkqB4w12_2ECogVMc5MarOCkbBJzH4EV4YK9jt5hYSRvsACzOEuHypSNVFwSf21TJ6qPPgwKSr1rz8LrfyHrltaj-GHdBA7kK4-isLQjxGiUV6PIaorLGI07zAu8vccSbQ1xbmbeMlDK4YeuB66jCBvshdU-gIr0eSAXdPcJtxWYUQNnuSjeLpSgSM5IpcxmLPR7fgHNZEW3x_VehQ12trKuU2UAqrAUxwljRaVEWsLIq-Jk52RLTHCvfJqb-3w' },
        { icon: 'flutter_dash', title: 'Marshes & Birds', desc: 'Spotting flamingos and spoonbills in the Natural Park.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrkxnZ1BiH739-wvkg_6QDlzzySuUImRmGNYUkVEWi5Ab6Olu_pF5i136yDBkddE1HQ_gd1-Gr4po_v3f-49YZrOnhl3g0t0BOKZTkUwbdSHYSKpOuKrPVXWe2C2VAQmFnlZgDuFg71IifqiSg88Q0h1ms416XzEseA-voE1heecmXTPTcZh_IbjDLMQAIwFvGByHXBrLG0x8Q0zq7JcYb8VIwPuICVdFuDxmO8VUKNzsTTj0l6SzHBYLPEcuxvWaR24v2gLUnvFCn' }
      ]
    }
  }[lang];

  return (
    <div className="animate-fade-in-up">
      <div className="relative h-[500px] overflow-hidden">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCBm4nPvDXeA3PZx4wMqzxtEQ3kPEsS0NSFkdi5Cabt74Q1lCc-1e7uS8JkdyGsc0GsQXnsue0-51iqkz3OG6Ra4WiqeLuXfPKxrO97H_JRTcWhxcvUgWAYaY2Eo6vtbLb_MMcY1OEthfK_Qon4VTCtRgm919XW6zQkF2CQuRirkNOgWUNc5VUjtYYYHb6V6Eoep3EWmV64QvJb379uEYQXK_Dx6QDPiEChcoefFi1I0tBBxlEdxA72e8DxRWVHmuFpMhW4xE1CtD-" className="w-full h-full object-cover brightness-[0.6]" alt="Nature" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">{t.title}</h1>
          <p className="text-white text-xl max-w-3xl font-medium drop-shadow-lg">{t.subtitle}</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">{t.section}</span>
          <h2 className="text-4xl font-black mb-6">{t.sectionTitle}</h2>
          <p className="text-text-muted dark:text-gray-300 text-lg leading-relaxed">{t.sectionDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
          {t.spots.map((s, i) => (
            <div key={i} className="group rounded-3xl overflow-hidden bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-500">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={s.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={s.title} />
                <div className="absolute top-6 right-6 size-10 rounded-full bg-white/90 backdrop-blur-md text-primary flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black mb-3">{s.title}</h3>
                <p className="text-sm text-text-muted dark:text-gray-400 leading-relaxed mb-6">{s.desc}</p>
                <button className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                  {lang === 'es' ? 'Saber Más' : 'Learn More'}
                  <span className="material-symbols-outlined !text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-primary/5 border border-primary/10 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="bg-primary/10 p-12 flex items-center justify-center md:w-64">
              <span className="material-symbols-outlined text-7xl text-primary animate-pulse">lightbulb</span>
            </div>
            <div className="p-12">
              <h3 className="text-2xl font-black mb-4">{t.tip}</h3>
              <p className="text-lg text-text-muted dark:text-gray-300 leading-relaxed">{t.tipDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nature;
