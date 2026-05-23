"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "A IA faz diagnóstico ou triagem médica?",
    answer:
      "Não. A Clin360 atua exclusivamente no atendimento administrativo — agendamento, dúvidas sobre horários, convênios e confirmação de consultas. A IA nunca faz diagnóstico, triagem ou qualquer recomendação médica, em total conformidade com a Resolução CFM 2.454/2026.",
  },
  {
    question: "Quanto tempo leva para configurar?",
    answer:
      "Menos de 24 horas. Nossa equipe configura tudo: médicos, horários, convênios, tom da IA e integração com WhatsApp. Você só precisa aprovar.",
  },
  {
    question: "Funciona com meu sistema de agendamento atual?",
    answer:
      "A Clin360 tem seu próprio sistema de agendamento completo. Se você já usa outro sistema, podemos integrar via API para manter os dados sincronizados.",
  },
  {
    question: "Os dados dos pacientes estão seguros?",
    answer:
      "Sim. Utilizamos Supabase com criptografia, Row Level Security (isolamento por clínica) e hospedagem na região de São Paulo (sa-east-1) em conformidade com a LGPD.",
  },
  {
    question: "Posso personalizar o tom da IA?",
    answer:
      "Sim. Definimos juntos se a IA será formal, informal ou neutra. O nome da assistente, a saudação e as regras de atendimento são totalmente personalizáveis.",
  },
  {
    question: "E se o paciente quiser falar com um humano?",
    answer:
      "A IA detecta automaticamente quando precisa escalar: perguntas sobre valores, reclamações ou pedidos explícitos. A conversa é transferida para sua equipe no painel com resumo automático do contexto.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Perguntas{" "}
            <span className="gradient-text">Frequentes</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-border bg-slate-50/50 overflow-hidden transition-colors hover:border-primary/30"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-foreground pr-4">
                    {item.question}
                  </span>
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-muted"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <p className="text-muted leading-relaxed text-base">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
