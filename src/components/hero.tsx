"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MessageCircle,
  Camera,
  Mail,
  Globe,
  CheckCheck,
  SmartphoneNfc,
  Mic,
  Smile,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  ChevronLeft,
  Shield,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Chat steps                                                         */
/* ------------------------------------------------------------------ */

type ChatStep =
  | { type: "message"; from: "patient" | "ai"; text: string; time: string }
  | { type: "typing"; duration: number }
  | { type: "pause"; duration: number }
  | { type: "event"; text: string }
  | { type: "audio"; from: "patient"; duration: string; time: string };

const conversationFlow: ChatStep[] = [
  // --- INÍCIO ---
  { type: "pause", duration: 1200 },
  { type: "message", from: "patient", text: "Oi, boa tarde!", time: "14:32" },
  { type: "pause", duration: 2500 },
  { type: "message", from: "patient", text: "Queria agendar uma consulta", time: "14:32" },

  { type: "typing", duration: 2000 },
  { type: "message", from: "ai", text: "Boa tarde! 😊 Tudo bem?", time: "14:32" },
  { type: "pause", duration: 2200 },
  { type: "message", from: "ai", text: "Vou te ajudar com o agendamento!", time: "14:32" },
  { type: "pause", duration: 2500 },
  { type: "message", from: "ai", text: "É sua primeira vez aqui na clínica?", time: "14:33" },

  // --- Paciente já conhece ---
  { type: "pause", duration: 3000 },
  { type: "message", from: "patient", text: "Não, já sou paciente", time: "14:33" },

  { type: "typing", duration: 1800 },
  { type: "message", from: "ai", text: "Que bom ter você de volta! 💚", time: "14:33" },
  { type: "pause", duration: 2200 },
  { type: "message", from: "ai", text: "Qual especialidade você precisa?", time: "14:33" },

  // --- Paciente tem dúvida ---
  { type: "pause", duration: 3200 },
  { type: "message", from: "patient", text: "Então, tô com umas manchas no rosto", time: "14:34" },
  { type: "pause", duration: 2000 },
  { type: "message", from: "patient", text: "Não sei se é dermato ou clínico geral", time: "14:34" },

  // --- IA orienta sem diagnosticar ---
  { type: "typing", duration: 2200 },
  { type: "message", from: "ai", text: "Entendi! Pra questões de pele o ideal é a Dermatologia", time: "14:34" },
  { type: "pause", duration: 2500 },
  { type: "message", from: "ai", text: "Temos a Dra. Ana Beatriz, ela é ótima 👩‍⚕️", time: "14:34" },
  { type: "pause", duration: 2200 },
  { type: "message", from: "ai", text: "Quer que eu veja os horários dela?", time: "14:35" },

  // --- Paciente aceita ---
  { type: "pause", duration: 2500 },
  { type: "message", from: "patient", text: "Sim por favor!", time: "14:35" },

  // --- IA busca horários ---
  { type: "typing", duration: 2500 },
  { type: "message", from: "ai", text: "Deixa eu ver aqui... 🔍", time: "14:35" },
  { type: "pause", duration: 2800 },
  { type: "message", from: "ai", text: "Essa semana ela atende quarta e sexta à tarde", time: "14:35" },
  { type: "pause", duration: 2200 },
  { type: "message", from: "ai", text: "Qual dia fica melhor pra você?", time: "14:35" },

  // --- Paciente manda áudio ---
  { type: "pause", duration: 3500 },
  { type: "audio", from: "patient", duration: "0:05", time: "14:36" },
  { type: "event", text: "🎙️ Áudio transcrito automaticamente" },

  // --- IA entende áudio ---
  { type: "typing", duration: 2000 },
  { type: "message", from: "ai", text: "Quarta então! 😉", time: "14:36" },
  { type: "pause", duration: 2500 },
  { type: "message", from: "ai", text: "Os horários disponíveis são:", time: "14:36" },
  { type: "pause", duration: 2000 },
  { type: "message", from: "ai", text: "14h, 14:30, 15h ou 15:30", time: "14:36" },

  // --- Paciente pergunta convênio ---
  { type: "pause", duration: 3000 },
  { type: "message", from: "patient", text: "Antes de marcar...", time: "14:37" },
  { type: "pause", duration: 2200 },
  { type: "message", from: "patient", text: "Ela atende Unimed?", time: "14:37" },

  // --- IA responde sobre convênio ---
  { type: "typing", duration: 2000 },
  { type: "message", from: "ai", text: "Sim! A Dra. Ana atende Unimed ✅", time: "14:37" },
  { type: "pause", duration: 2200 },
  { type: "message", from: "ai", text: "Aceitamos Unimed, SulAmérica e Bradesco Saúde", time: "14:37" },
  { type: "pause", duration: 2500 },
  { type: "message", from: "ai", text: "Qual horário quer na quarta?", time: "14:37" },

  // --- Paciente escolhe ---
  { type: "pause", duration: 2800 },
  { type: "message", from: "patient", text: "15h fica perfeito", time: "14:38" },

  // --- IA pede confirmação ---
  { type: "typing", duration: 2200 },
  { type: "message", from: "ai", text: "Anotado! Vou confirmar os dados:", time: "14:38" },
  { type: "pause", duration: 2500 },
  { type: "message", from: "ai", text: "Dra. Ana Beatriz — Dermatologia\nQuarta, 28/05 às 15h\nConvênio: Unimed", time: "14:38" },
  { type: "pause", duration: 2200 },
  { type: "message", from: "ai", text: "Tá tudo certo? Posso confirmar?", time: "14:38" },

  // --- Paciente confirma ---
  { type: "pause", duration: 2000 },
  { type: "message", from: "patient", text: "Tudo certo, pode confirmar!", time: "14:39" },

  // --- FIM: agendado ---
  { type: "typing", duration: 2200 },
  { type: "message", from: "ai", text: "Prontinho, agendado! 🎉", time: "14:39" },
  { type: "event", text: "📋 Consulta salva no sistema" },
  { type: "pause", duration: 2500 },
  { type: "message", from: "ai", text: "Amanhã de manhã vou te mandar um lembrete", time: "14:39" },
  { type: "pause", duration: 2200 },
  { type: "message", from: "ai", text: "Se precisar remarcar é só me chamar aqui 💚", time: "14:39" },

  // --- Paciente agradece ---
  { type: "pause", duration: 2500 },
  { type: "message", from: "patient", text: "Muito obrigada! 😍", time: "14:40" },
  { type: "pause", duration: 2000 },
  { type: "message", from: "patient", text: "Que rápido, adorei", time: "14:40" },

  { type: "typing", duration: 1500 },
  { type: "message", from: "ai", text: "Imagina! Até quarta 👋", time: "14:40" },
];

/* ------------------------------------------------------------------ */
/*  Trust badges                                                       */
/* ------------------------------------------------------------------ */

const channels = [
  { label: "WhatsApp", icon: MessageCircle },
  { label: "Instagram", icon: Camera },
  { label: "Email", icon: Mail },
  { label: "Widget", icon: Globe },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    e.preventDefault();
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="gradient-hero relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-60 -right-40 h-[600px] w-[600px] rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* ---- Left column ---- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-white"
            >
              <Sparkles className="h-4 w-4 text-yellow-300" />
              Inteligência Artificial para Clínicas
            </motion.span>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Sua clínica atendendo pacientes{" "}
              <span className="text-yellow-200">24/7</span> com Inteligência
              Artificial
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85 lg:mx-0">
              A IA que agenda consultas, tira dúvidas e confirma horários pelo
              WhatsApp — como se fosse alguém da recepção. Seus pacientes nunca
              mais esperam.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, "#contact")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-primary shadow-lg transition-all hover:scale-[1.03] hover:shadow-xl"
              >
                <SmartphoneNfc className="h-5 w-5" />
                Agendar Demonstração
              </a>
              <a
                href="#features"
                onClick={(e) => handleScroll(e, "#features")}
                className="glass inline-flex h-12 items-center justify-center rounded-full px-7 text-base font-semibold text-white transition-all hover:bg-white/15"
              >
                Ver Funcionalidades
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-5 lg:justify-start">
              {channels.map((ch) => (
                <div
                  key={ch.label}
                  className="flex items-center gap-1.5 text-sm text-white/70"
                >
                  <ch.icon className="h-4 w-4" />
                  <span>{ch.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ---- Right column: phone mockup ---- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="w-full max-w-sm flex-shrink-0 lg:max-w-md"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Phone mockup                                                       */
/* ------------------------------------------------------------------ */

function PhoneMockup() {
  const chatRef = useRef<HTMLDivElement>(null);
  const userScrolledRef = useRef(false);
  const { visibleMessages, isTyping } = useChatAnimation(conversationFlow);

  // auto-scroll: follows new messages unless user scrolled up manually
  useEffect(() => {
    const el = chatRef.current;
    if (!el || userScrolledRef.current) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [visibleMessages, isTyping]);

  const handleScroll = () => {
    const el = chatRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    userScrolledRef.current = distanceFromBottom > 40;
  };

  return (
    <div className="mx-auto w-full max-w-[340px] lg:max-w-[380px]">
      <div className="overflow-hidden rounded-[2.5rem] border-[6px] border-white/20 bg-gray-900 shadow-2xl">
        {/* WhatsApp header */}
        <div className="flex items-center justify-between bg-[#075e54] px-3 py-2.5">
          <div className="flex items-center gap-2">
            <ChevronLeft className="h-5 w-5 text-white/70" />
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-emerald-400">
              <span className="text-sm font-bold text-white">C</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Clin 360</p>
              <AnimatePresence mode="wait">
                {isTyping ? (
                  <motion.p
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[11px] text-emerald-200"
                  >
                    digitando...
                  </motion.p>
                ) : (
                  <motion.p
                    key="online"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[11px] text-emerald-200/70"
                  >
                    online
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex items-center gap-3.5 text-white/70">
            <Video className="h-4.5 w-4.5" />
            <Phone className="h-4 w-4" />
            <MoreVertical className="h-4 w-4" />
          </div>
        </div>

        {/* Chat area */}
        <div className="relative flex h-[420px] flex-col bg-[#ece5dd]">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 mx-auto mt-2 mb-1 flex-shrink-0 rounded-md bg-[#fdf4c5]/90 px-3 py-1.5 text-center">
            <p className="flex items-center justify-center gap-1 text-[10px] text-[#54656f]">
              <Shield className="h-3 w-3" />
              Mensagens protegidas com criptografia
            </p>
          </div>

          <div
            ref={chatRef}
            onScroll={handleScroll}
            className="relative z-10 flex-1 overflow-y-auto px-3 pb-2"
          >
            <div className="flex flex-col gap-1.5">
              <AnimatePresence>
                {visibleMessages.map((step, idx) => {
                  if (step.type === "message") {
                    return <ChatBubble key={`msg-${idx}`} message={step} />;
                  }
                  if (step.type === "audio") {
                    return <AudioBubble key={`audio-${idx}`} step={step} />;
                  }
                  if (step.type === "event") {
                    return <EventBadge key={`event-${idx}`} text={step.text} />;
                  }
                  return null;
                })}
              </AnimatePresence>

              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-start"
                  >
                    <div className="rounded-xl rounded-bl-sm bg-white px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-1">
                        <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                        <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                        <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 bg-[#f0f0f0] px-2 py-1.5">
          <Smile className="h-5 w-5 text-[#54656f]" />
          <Paperclip className="h-5 w-5 text-[#54656f]" />
          <div className="flex-1 rounded-full bg-white px-4 py-2 text-xs text-gray-400">
            Mensagem
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#075e54]">
            <Mic className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Chat animation hook                                                */
/* ------------------------------------------------------------------ */

type VisibleStep = Extract<
  ChatStep,
  { type: "message" } | { type: "audio" } | { type: "event" }
>;

function useChatAnimation(flow: ChatStep[]) {
  const [visibleMessages, setVisibleMessages] = useState<VisibleStep[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const runAnimation = useCallback(() => {
    clearAllTimeouts();
    setVisibleMessages([]);
    setIsTyping(false);

    let delay = 0;

    flow.forEach((step) => {
      if (step.type === "pause") {
        delay += step.duration;
        return;
      }

      if (step.type === "typing") {
        const showAt = delay;
        const hideAt = delay + step.duration;
        const t1 = setTimeout(() => setIsTyping(true), showAt);
        const t2 = setTimeout(() => setIsTyping(false), hideAt);
        timeoutsRef.current.push(t1, t2);
        delay = hideAt;
        return;
      }

      if (step.type === "event") {
        const s = step;
        const t = setTimeout(() => {
          setVisibleMessages((prev) => [...prev, s]);
        }, delay);
        timeoutsRef.current.push(t);
        delay += 800;
        return;
      }

      if (step.type === "message" || step.type === "audio") {
        const s = step;
        const t = setTimeout(() => {
          setVisibleMessages((prev) => [...prev, s]);
        }, delay);
        timeoutsRef.current.push(t);
        delay += 300;
      }
    });
  }, [flow, clearAllTimeouts]);

  useEffect(() => {
    runAnimation();
    return clearAllTimeouts;
  }, [runAnimation, clearAllTimeouts]);

  return { visibleMessages, isTyping };
}

/* ------------------------------------------------------------------ */
/*  Chat bubble                                                        */
/* ------------------------------------------------------------------ */

function ChatBubble({
  message,
}: {
  message: { from: "patient" | "ai"; text: string; time: string };
}) {
  const isPatient = message.from === "patient";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex ${isPatient ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`relative max-w-[82%] rounded-lg px-2.5 py-1.5 text-[12.5px] leading-[1.35] shadow-sm ${
          isPatient
            ? "rounded-tr-none bg-[#d9fdd3] text-gray-800"
            : "rounded-tl-none bg-white text-gray-800"
        }`}
      >
        {!isPatient && (
          <div className="mb-0.5 flex items-center gap-1">
            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-primary/15">
              <Sparkles className="h-2 w-2 text-primary" />
            </div>
            <span className="text-[10px] font-semibold text-primary">
              Clin 360
            </span>
          </div>
        )}

        <span className="whitespace-pre-line">{message.text}</span>

        <span className="mt-0.5 flex items-center justify-end gap-0.5 text-[9.5px] text-gray-500">
          {message.time}
          {isPatient && (
            <CheckCheck className="ml-0.5 h-3 w-3 text-[#53bdeb]" />
          )}
        </span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Audio bubble                                                       */
/* ------------------------------------------------------------------ */

function AudioBubble({
  step,
}: {
  step: { from: "patient"; duration: string; time: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex justify-end"
    >
      <div className="flex max-w-[75%] items-center gap-2 rounded-lg rounded-tr-none bg-[#d9fdd3] px-2.5 py-2 shadow-sm">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#075e54]">
          <svg
            viewBox="0 0 16 16"
            fill="white"
            className="ml-0.5 h-3.5 w-3.5"
          >
            <path d="M4 2l10 6-10 6V2z" />
          </svg>
        </div>

        <div className="flex flex-1 items-center gap-[2px]">
          {Array.from({ length: 20 }).map((_, i) => {
            const heights = [
              3, 5, 8, 12, 7, 14, 10, 6, 11, 15, 8, 13, 5, 9, 12, 7, 14, 6,
              10, 4,
            ];
            return (
              <div
                key={i}
                className="w-[2.5px] rounded-full bg-[#075e54]/50"
                style={{ height: `${heights[i]}px` }}
              />
            );
          })}
        </div>

        <div className="flex flex-col items-end text-[9.5px] text-gray-500">
          <span>{step.duration}</span>
          <span className="flex items-center gap-0.5">
            {step.time}
            <CheckCheck className="h-3 w-3 text-[#53bdeb]" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Event badge                                                        */
/* ------------------------------------------------------------------ */

function EventBadge({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center py-1"
    >
      <span className="rounded-md bg-[#e2f7cb]/90 px-3 py-1 text-center text-[10.5px] font-medium text-[#1b5e20] shadow-sm">
        {text}
      </span>
    </motion.div>
  );
}
