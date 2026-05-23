"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Bot,
  Calendar,
  MessageSquare,
  CalendarDays,
  Bell,
  Users,
  DollarSign,
  BarChart3,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Feature data                                                       */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: Bot,
    color: "primary" as const,
    title: "IA Conversacional",
    description:
      "Atende pacientes no WhatsApp como uma recepcionista experiente. Agenda, tira dúvidas e confirma consultas automaticamente.",
  },
  {
    icon: Calendar,
    color: "secondary" as const,
    title: "Agendamento Autônomo",
    description:
      "IA agenda consultas sem intervenção humana. Verifica disponibilidade, previne choque de horário e confirma com o paciente.",
  },
  {
    icon: MessageSquare,
    color: "accent" as const,
    title: "Inbox Multicanal",
    description:
      "WhatsApp, Instagram, Email e Widget do site — todas as conversas em um painel unificado com transferência para humano.",
  },
  {
    icon: CalendarDays,
    color: "primary" as const,
    title: "Agenda Visual",
    description:
      "Agenda completa com visão diária, semanal e mensal. Bloqueios, recorrências e confirmações automáticas.",
  },
  {
    icon: Bell,
    color: "secondary" as const,
    title: "Lembretes Automáticos",
    description:
      "Lembrete 24h antes via WhatsApp. Paciente confirma ou cancela direto no chat, reduzindo faltas em até 60%.",
  },
  {
    icon: Users,
    color: "accent" as const,
    title: "CRM de Pacientes",
    description:
      "Histórico completo, pipeline de leads, métricas de retorno e acompanhamento personalizado por paciente.",
  },
  {
    icon: DollarSign,
    color: "primary" as const,
    title: "Financeiro & Faturamento",
    description:
      "Controle de receitas, TISS, NFSe, comissões médicas e relatórios financeiros detalhados.",
  },
  {
    icon: BarChart3,
    color: "secondary" as const,
    title: "Dashboard & BI",
    description:
      "Métricas em tempo real: agendamentos, taxa de comparecimento, faturamento, desempenho da IA e ROI.",
  },
];

const colorMap = {
  primary: {
    bg: "bg-sky-50",
    icon: "text-primary",
    ring: "ring-primary/20",
  },
  secondary: {
    bg: "bg-emerald-50",
    icon: "text-secondary",
    ring: "ring-secondary/20",
  },
  accent: {
    bg: "bg-indigo-50",
    icon: "text-accent",
    ring: "ring-accent/20",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Features() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-card py-20 md:py-28"
    >
      {/* Subtle top gradient separator */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Tudo que sua clínica precisa{" "}
            <span className="gradient-text">em um só lugar</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            Da recepção inteligente ao painel completo de gestão
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feat, idx) => (
            <FeatureCard key={feat.title} feature={feat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature card                                                       */
/* ------------------------------------------------------------------ */

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  const colors = colorMap[feature.color];
  const Icon = feature.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      className="glass-card group relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
    >
      {/* Icon */}
      <div
        className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ring-1 ${colors.ring}`}
      >
        <Icon className={`h-6 w-6 ${colors.icon}`} />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {feature.description}
      </p>
    </motion.div>
  );
}
