export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
};

export type Memory = {
  id: string;
  text: string;
  createdAt: number;
};

export type Settings = {
  assistantName: string;
  userName: string;
  personality: string;
  voiceEnabled: boolean;
  ollamaEnabled: boolean;
  ollamaUrl: string;
  ollamaModel: string;
};