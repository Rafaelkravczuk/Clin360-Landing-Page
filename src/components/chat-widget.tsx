"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import LogoMark from "@/components/logo-mark";

interface Message {
  id: number;
  text: string;
  sender: "ai" | "user";
}

const initialMessages: Message[] = [
  { id: 1, text: "Olá! 👋 Sou a assistente da Clin 360", sender: "ai" },
  {
    id: 2,
    text: "Posso te ajudar a conhecer nosso sistema ou agendar uma demonstração",
    sender: "ai",
  },
  { id: 3, text: "Como posso ajudar?", sender: "ai" },
];

export default function ChatWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Delayed mount after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isSending) return;

    const userMsg: Message = { id: Date.now(), text: trimmed, sender: "user" };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInputValue("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });
      const data = await res.json();
      const reply =
        typeof data?.reply === "string" && data.reply.trim()
          ? data.reply
          : "Fala com a gente pelo WhatsApp que te respondo na hora! 😊";
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: reply, sender: "ai" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Tive um probleminha aqui 😅 Fala com a gente pelo WhatsApp!",
          sender: "ai",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[320px] h-[420px] rounded-2xl shadow-2xl overflow-hidden flex flex-col bg-white border border-border"
          >
            {/* Header */}
            <div className="gradient-hero px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <LogoMark bare className="h-6 w-6 shrink-0 text-white" />
                <div>
                  <h3 className="text-white font-semibold text-sm">Clin360</h3>
                  <p className="text-white/80 text-xs flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-300" />
                    Responde em minutos
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Fechar chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 scrollbar-hide">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-white text-foreground shadow-sm border border-border rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="flex justify-start">
                  <div className="bg-white text-muted shadow-sm border border-border rounded-2xl rounded-bl-md px-3 py-2.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted/60 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted/60 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted/60 animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div className="px-3 py-2 border-t border-border bg-white shrink-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isSending}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 text-sm px-3 py-2 rounded-full bg-gray-100 text-foreground placeholder:text-muted outline-none focus:ring-2 focus:ring-primary/30 transition-shadow disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={isSending}
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Enviar mensagem"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors cursor-pointer"
        aria-label="Abrir chat"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />

        <MessageCircle size={24} className="relative z-10" />
      </motion.button>
    </div>
  );
}
