"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  MessageCircle,
  Camera,
  Mail,
  Globe,
  Check,
  SmartphoneNfc,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Chat messages                                                      */
/* ------------------------------------------------------------------ */

const chatMessages = [
  {
    from: "patient" as const,
    text: "Oi, quero marcar uma consulta com dermatologista",
  },
  {
    from: "ai" as const,
    text: "Oi Maria! \u{1F60A} O Dr. Carlos atende dermatologia. Datas disponiveis:\n1. Segunda, 27/05\n2. Quarta, 29/05\nQual prefere?",
  },
  { from: "patient" as const, text: "Segunda" },
  {
    from: "ai" as const,
    text: "Horarios disponiveis:\n1. 09:00\n2. 09:30\n3. 10:00\nQual fica melhor?",
  },
  { from: "patient" as const, text: "9h" },
  {
    from: "ai" as const,
    text: "Consulta agendada! ✅ Dr. Carlos, segunda 27/05 as 9h. Voce recebera um lembrete 24h antes.",
  },
];

/* ------------------------------------------------------------------ */
/*  Trust badges (channels)                                            */
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

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="gradient-hero relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* Decorative blurred circles */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-60 -right-40 h-[600px] w-[600px] rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* ---- Left column ---- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-white"
            >
              <Sparkles className="h-4 w-4 text-yellow-300" />
              Inteligencia Artificial para Clinicas
            </motion.span>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Sua clinica atendendo pacientes{" "}
              <span className="text-yellow-200">24/7</span> com Inteligencia
              Artificial
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85 lg:mx-0">
              A IA que agenda consultas, tira duvidas e confirma horarios pelo
              WhatsApp — como se fosse alguem da recepcao. Seus pacientes nunca mais
              esperam.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, "#contact")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-primary shadow-lg transition-all hover:scale-[1.03] hover:shadow-xl"
              >
                <SmartphoneNfc className="h-5 w-5" />
                Agendar Demonstracao
              </a>
              <a
                href="#features"
                onClick={(e) => handleScroll(e, "#features")}
                className="glass inline-flex h-12 items-center justify-center rounded-full px-7 text-base font-semibold text-white transition-all hover:bg-white/15"
              >
                Ver Funcionalidades
              </a>
            </div>

            {/* Trust badges */}
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
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
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
/*  Phone mockup sub-component                                         */
/* ------------------------------------------------------------------ */

function PhoneMockup() {
  return (
    <div className="animate-float mx-auto w-full max-w-[340px] lg:max-w-[380px]">
      {/* Phone frame */}
      <div className="overflow-hidden rounded-[2.5rem] border-[6px] border-white/20 bg-gray-900 shadow-2xl">
        {/* Status bar */}
        <div className="flex items-center justify-between bg-[#075e54] px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <span className="text-sm font-bold text-white">C</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Clinica Exemplo</p>
              <p className="text-xs text-emerald-200">online</p>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex min-h-[360px] flex-col gap-2 bg-[#ece5dd] px-3 py-4">
          {chatMessages.map((msg, idx) => (
            <ChatBubble key={idx} message={msg} index={idx} />
          ))}
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 bg-[#f0f0f0] px-3 py-2">
          <div className="flex-1 rounded-full bg-white px-4 py-2 text-xs text-gray-400">
            Digite uma mensagem...
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#075e54]">
            <MessageCircle className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Chat bubble                                                        */
/* ------------------------------------------------------------------ */

function ChatBubble({
  message,
  index,
}: {
  message: { from: "patient" | "ai"; text: string };
  index: number;
}) {
  const isPatient = message.from === "patient";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.6 + index * 0.45,
        duration: 0.4,
        ease: "easeOut",
      }}
      className={`flex ${isPatient ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`relative max-w-[80%] rounded-xl px-3 py-2 text-[13px] leading-snug shadow-sm ${
          isPatient
            ? "rounded-br-sm bg-[#dcf8c6] text-gray-800"
            : "rounded-bl-sm bg-white text-gray-800"
        }`}
      >
        {!isPatient && (
          <div className="mb-0.5 flex items-center gap-1">
            <Check className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-semibold text-primary">IA Clin360</span>
          </div>
        )}
        <span className="whitespace-pre-line">{message.text}</span>
      </div>
    </motion.div>
  );
}
