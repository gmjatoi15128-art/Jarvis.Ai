# JARVIS.AI

A mobile-first personal AI assistant starter.

## What is included

- Premium mobile-first JARVIS interface
- Voice input using the browser Speech Recognition API when supported
- Voice output using browser text-to-speech
- Conversation history stored locally
- Local memory stored locally
- Basic built-in tools: time, date, calculator
- Settings for assistant name, user name and personality
- Optional local AI adapter for Ollama
- No API key is required for the built-in demo brain

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Free local AI

Install Ollama on a computer, pull a model, and make the Ollama API available to the device running JARVIS.

Then open Settings and enable:

- Use local AI
- Ollama URL
- Model

For browser access from another device, you may need to configure CORS/network access on your local AI server.

## Important

This is a strong working foundation, not a science-fiction-level autonomous JARVIS. Real Android system actions, background wake-word support, advanced agents, secure remote APIs, web search providers, vision, and computer control are planned as later modules.

Do not place private API keys in the frontend code.
