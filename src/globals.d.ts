// src/globals.d.ts
interface Window {
  gtag: (command: string, eventName: string, params: Record<string, unknown>) => void;
}