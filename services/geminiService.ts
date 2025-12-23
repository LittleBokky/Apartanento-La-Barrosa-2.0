
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

export const getGeminiResponse = async (userMessage: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Lo siento, estoy teniendo problemas para conectar ahora mismo. ¿Podrías intentarlo de nuevo o contactar al anfitrión?";
  }
};
