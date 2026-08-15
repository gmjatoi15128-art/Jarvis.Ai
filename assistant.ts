import { Memory, Message, Settings } from "../types";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function localToolReply(input: string): string | null {
  const q = normalize(input);
  if (q.includes("time")) {
    return `It is ${new Intl.DateTimeFormat(undefined, { timeStyle: "short" }).format(new Date())}.`;
  }
  if (q.includes("date")) {
    return `Today is ${new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(new Date())}.`;
  }
  if (q.startsWith("calculate ")) {
    const expr = input.slice(10).replace(/[^0-9+\-*/().% ]/g, "");
    try {
      // Basic calculator for user-entered arithmetic. No variables/functions are accepted.
      const value = Function(`"use strict"; return (${expr})`)();
      return `The result is ${value}.`;
    } catch {
      return "I couldn't calculate that expression.";
    }
  }
  if (q.includes("who are you") || q.includes("what are you")) {
    return "I am JARVIS, your personal AI assistant. I am designed to grow with you.";
  }
  return null;
}

async function askOllama(
  input: string,
  settings: Settings,
  memories: Memory[],
  history: Message[]
): Promise<string> {
  const context = memories.length
    ? `Known memories:\n${memories.slice(-20).map(m => `- ${m.text}`).join("\n")}`
    : "No stored memories.";
  const messages = [
    {
      role: "system",
      content: `${settings.personality}\nYou are ${settings.assistantName}. Address the user as ${settings.userName} when natural.\n${context}`,
    },
    ...history.slice(-12).map(m => ({ role: m.role, content: m.content })),
    { role: "user", content: input },
  ];

  const response = await fetch(`${settings.ollamaUrl.replace(/\/$/, "")}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: settings.ollamaModel, messages, stream: false }),
  });

  if (!response.ok) throw new Error(`Ollama returned ${response.status}`);
  const data = await response.json();
  return data?.message?.content || "I received an empty response.";
}

export async function getAssistantReply(
  input: string,
  settings: Settings,
  memories: Memory[],
  history: Message[]
): Promise<string> {
  if (settings.ollamaEnabled) {
    try {
      return await askOllama(input, settings, memories, history);
    } catch {
      return "My local AI connection isn't available. Check the Ollama URL, model, and whether the local server is running.";
    }
  }

  const tool = localToolReply(input);
  if (tool) return tool;

  return `I heard you, ${settings.userName}. My core interface is ready, but my AI brain is not connected yet. Enable the local Ollama option in Settings to give me a free local AI model.`;
}

export function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.98;
  utterance.pitch = 0.92;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
}