import { useEffect, useRef, useState } from "react";

type RecognitionEvent = {
  results: { [key: number]: { [key: number]: { transcript: string } } };
};

type Recognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: RecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

export function useSpeechRecognition(onText: (text: string) => void) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const recognition = useRef<Recognition | null>(null);

  useEffect(() => {
    const w = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const instance = new SpeechRecognition();
    instance.lang = navigator.language || "en-US";
    instance.interimResults = false;
    instance.continuous = false;
    instance.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript || "";
      if (transcript.trim()) onText(transcript.trim());
    };
    instance.onend = () => setListening(false);
    instance.onerror = () => setListening(false);

    recognition.current = instance;
    setSupported(true);
  }, [onText]);

  const start = () => {
    if (!recognition.current || listening) return;
    setListening(true);
    recognition.current.start();
  };

  const stop = () => {
    recognition.current?.stop();
    setListening(false);
  };

  return { supported, listening, start, stop };
}