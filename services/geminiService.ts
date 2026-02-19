/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `Você é o Assistente Zen do EPPA 2025 (Encontro de Publicidade e Propaganda Acadêmico).
      
      Tema: "Respire". Foco em saúde mental, evitar burnout e Slow Content no mercado publicitário.
      
      Diretriz Principal: Aja como um mentor calmo, empático e acolhedor. Se o usuário parecer ansioso ou com pressa, sugira gentilmente uma pausa ou uma respiração profunda. Use frases curtas e gentis.
      
      Detalhes do Evento:
      - Data: 14 e 15 de Outubro de 2025.
      - Local: Hotel Bourbon, Joinville, SC (Um refúgio no centro).
      - Lineup: Focado em "Slow Marketing" e criatividade sustentável.
      
      Responda dúvidas sobre a programação e local. Evite termos de urgência como "corra", "últimas vagas" ou "imperdível". Prefira "garanta seu momento", "junte-se a nós".
      Responda sempre em Português.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Respire fundo... A conexão parece instável no momento.";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Poderia repetir com calma?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Houve um pequeno desvio no fluxo. Tente novamente em alguns instantes.";
  }
};