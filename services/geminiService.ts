
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Eres el asistente virtual (Conserje) del "Apartamento La Barrosa". 
Tu objetivo es ayudar a los huéspedes con información sobre el apartamento y Chiclana de la Frontera.

Detalles Clave:
- Ubicación: Calle La Barrosa, 12, Chiclana. A 5 min de la playa.
- Servicios: WiFi 300Mbps, Piscina, Parking Gratis, A/C, Cocina completa.
- Normas: No fumar (€150 multa), no fiestas, mascotas bajo petición, silencio 23:00-08:00.
- Check-in: 15:00. Check-out: 11:00. Fianza: €200.
- Lugares cercanos: Playa La Barrosa, Castillo de Sancti Petri, Puerto de Sancti Petri.

Responde de forma amable, profesional y servicial. Usa emojis si es apropiado.
Si te preguntan algo que no sabes, sugiere contactar con el anfitrión directamente.
`;

// Simple mock response generator for demo purposes
const getMockResponse = (message: string) => {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes('wifi') || lowerMsg.includes('internet')) return "El WiFi es de alta velocidad (300Mbps) y es gratuito para todos los huéspedes.";
  if (lowerMsg.includes('piscina') || lowerMsg.includes('pool')) return "Sí, disponemos de una piscina comunitaria fantástica para uso de los huéspedes.";
  if (lowerMsg.includes('parking') || lowerMsg.includes('aparcamiento') || lowerMsg.includes('coche')) return "El apartamento incluye plaza de parking gratuita y privada.";
  if (lowerMsg.includes('playa') || lowerMsg.includes('beach') || lowerMsg.includes('distancia') || lowerMsg.includes('lejos')) return "Estamos a solo 5 minutos andando de la playa de La Barrosa, una ubicación inmejorable.";
  if (lowerMsg.includes('check-in') || lowerMsg.includes('entrada') || lowerMsg.includes('llegada')) return "El horario de Check-in es a partir de las 15:00 horas.";
  if (lowerMsg.includes('check-out') || lowerMsg.includes('salida')) return "El Check-out debe realizarse antes de las 11:00 horas.";
  if (lowerMsg.includes('precio') || lowerMsg.includes('costo') || lowerMsg.includes('cuesta') || lowerMsg.includes('vale')) return "El precio varía según la temporada: 50€/noche en temporada baja y 120€/noche en temporada alta (junio-septiembre). Consulta el calendario para ver el total exacto.";
  if (lowerMsg.includes('ubicacion') || lowerMsg.includes('ubicación') || lowerMsg.includes('donde') || lowerMsg.includes('dirección') || lowerMsg.includes('direccion') || lowerMsg.includes('calle')) return "Nos encontramos en la Calle La Barrosa, 12, Chiclana de la Frontera. ¡Una ubicación privilegiada!";
  if (lowerMsg.includes('anfitrion') || lowerMsg.includes('anfitrión') || lowerMsg.includes('dueño') || lowerMsg.includes('antonio')) return "El anfitrión es Antonio. Él se encargará de que tu estancia sea perfecta.";
  if (lowerMsg.includes('telefono') || lowerMsg.includes('teléfono') || lowerMsg.includes('contacto') || lowerMsg.includes('llam') || lowerMsg.includes('movil') || lowerMsg.includes('móvil') || lowerMsg.includes('whatsapp')) return "Puedes contactar directamente con Antonio en el teléfono +34 601 26 04 80.";
  if (lowerMsg.includes('mascota') || lowerMsg.includes('perro') || lowerMsg.includes('gato')) return "Las mascotas están permitidas bajo petición previa. Por favor, consúltanos antes de reservar.";
  if (lowerMsg.includes('fianza') || lowerMsg.includes('depósito')) return "Se solicita una fianza de 200€ que se devuelve tras comprobar el estado del apartamento.";
  if (lowerMsg.includes('fiesta') || lowerMsg.includes('ruido')) return "No están permitidas las fiestas ni eventos. El horario de silencio es de 23:00 a 08:00.";
  if (lowerMsg.includes('hola') || lowerMsg.includes('buenos dias')) return "¡Hola! ¿En qué puedo ayudarte hoy para preparar tu estancia?";

  return "Gracias por tu pregunta. Para más detalles específicos sobre esa consulta, te sugiero contactar directamente con el anfitrión o revisar nuestra sección de normas.";
};

export const getGeminiResponse = async (userMessage: string) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // If no API key is provided, follow the Mock path silently (Demo Mode)
    if (!apiKey) {
      console.warn("No API Key found (VITE_GEMINI_API_KEY). Using Mock Mode.");
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      return getMockResponse(userMessage);
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{
        role: 'user',
        parts: [{ text: userMessage }]
      }],
      config: {
        systemInstruction: {
          role: 'system',
          parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        temperature: 0.7,
      },
    });

    return response.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Fallback to mock if API fails
    return getMockResponse(userMessage);
  }
};
