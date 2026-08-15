import { Memory, Message, Settings } from "../types";

const keys = {
  messages: "jarvis_messages",
  memories: "jarvis_memories",
  settings: "jarvis_settings",
};

export const defaultSettings: Settings = {
  assistantName: "JARVIS",
  userName: "Sir",
  personality:
    "Calm, concise, capable and helpful. Speak naturally and avoid unnecessary filler.",
  voiceEnabled: true,
  ollamaEnabled: false,
  ollamaUrl: "http://localhost:11434",
  ollamaModel: "llama3.2",
};

export function loadMessages(): Message[] {
  try { return JSON.parse(localStorage.getItem(keys.messages) || "[]"); } catch { return []; }
}
export function saveMessages(items: Message[]) {
  localStorage.setItem(keys.messages, JSON.stringify(items.slice(-100)));
}
export function loadMemories(): Memory[] {
  try { return JSON.parse(localStorage.getItem(keys.memories) || "[]"); } catch { return []; }
}
export function saveMemories(items: Memory[]) {
  localStorage.setItem(keys.memories, JSON.stringify(items));
}
export function loadSettings(): Settings {
  try { return { ...defaultSettings, ...JSON.parse(localStorage.getItem(keys.settings) || "{}") }; }
  catch { return defaultSettings; }
}
export function saveSettings(settings: Settings) {
  localStorage.setItem(keys.settings, JSON.stringify(settings));
}