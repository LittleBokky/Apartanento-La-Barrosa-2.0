
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { Language } from '../types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ConciergeAI: React.FC<{ lang: Language }> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getGeminiResponse(input);
    const aiMsg: Message = { role: 'assistant', content: response || '' };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const labels = {
    es: {
      title: 'Asistente La Barrosa',
      placeholder: 'Pregúntame algo...',
      send: 'Enviar',
      welcome: '¡Hola! Soy tu conserje virtual. ¿En qué puedo ayudarte hoy?'
    },
    en: {
      title: 'La Barrosa Assistant',
      placeholder: 'Ask me anything...',
      send: 'Send',
      welcome: 'Hi! I am your virtual concierge. How can I help you today?'
    },
    it: {
      title: 'Assistente La Barrosa',
      placeholder: 'Chiedimi qualsiasi cosa...',
      send: 'Invia',
      welcome: 'Ciao! Sono il tuo concierge virtuale. Come posso aiutarti oggi?'
    },
    fr: {
      title: 'Assistant La Barrosa',
      placeholder: 'Posez-moi une question...',
      send: 'Envoyer',
      welcome: "Bonjour ! Je suis votre concierge virtuel. Comment puis-je vous aider aujourd'hui ?"
    },
    de: {
      title: 'La Barrosa Assistent',
      placeholder: 'Fragen Sie mich etwas...',
      send: 'Senden',
      welcome: 'Hallo! Ich bin Ihr virtueller Concierge. Wie kann ich Ihnen heute helfen?'
    }
  }[lang];

  return (
    <div className="fixed bottom-24 right-6 z-[60] flex flex-col items-end">
      {isOpen && (
        <div className="w-[350px] max-w-[calc(100vw-2rem)] h-[500px] bg-white dark:bg-surface-dark shadow-2xl rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden mb-4 animate-fade-in-up">
          <div className="p-4 bg-primary text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">smart_toy</span>
              <span className="font-bold">{labels.title}</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-text-muted dark:text-gray-400 py-10">
                <span className="material-symbols-outlined text-4xl mb-2">waving_hand</span>
                <p className="text-sm">
                  {labels.welcome}
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                  ? 'bg-primary text-white rounded-tr-none'
                  : 'bg-gray-100 dark:bg-gray-800 text-text-main dark:text-gray-200 rounded-tl-none'
                  }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none animate-pulse">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={labels.placeholder}
                className="flex-1 bg-gray-50 dark:bg-gray-900 border-none rounded-lg text-sm focus:ring-1 focus:ring-primary"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-primary text-white p-2 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="size-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all active:scale-95 group relative"
      >
        <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">
          {isOpen ? 'close' : 'chat'}
        </span>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
          </span>
        )}
      </button>
    </div>
  );
};
