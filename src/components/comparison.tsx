"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  X,
  CheckCircle,
  Headphones,
  CalendarCheck,
  BarChart3,
  Wallet,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

type ComparisonItem = {
  text: string;
};

type Category = {
  title: string;
  icon: LucideIcon;
  before: ComparisonItem[];
  after: ComparisonItem[];
};

const categories: Category[] = [
  {
    title: "Atendimento ao Paciente",
    icon: Headphones,
    before: [
      { text: "Paciente liga e fica na fila de espera" },
      { text: "Resposta demorada — até 4h no WhatsApp" },
      { text: "Sem atendimento fora do horário comercial" },
      { text: "Paciente desiste antes de ser atendido" },
    ],
    after: [
      { text: "Resposta automática em menos de 5 segundos" },
      { text: "Atendimento 24/7 pelo WhatsApp, Instagram, Email e Widget" },
      { text: "IA conversa de forma natural e humanizada" },
      { text: "80% das conversas resolvidas sem humano" },
    ],
  },
  {
    title: "Agendamento e Agenda",
    icon: CalendarCheck,
    before: [
      { text: "Agendamento manual com risco de erros" },
      { text: "Conflito de horários entre profissionais" },
      { text: "Faltas sem aviso — taxa de no-show de 30-40%" },
      { text: "Sem lembretes automáticos" },
    ],
    after: [
      { text: "Agendamento automático inteligente sem conflitos" },
      { text: "Agenda visual integrada por profissional" },
      { text: "No-show reduzido em 60% com lembretes automáticos" },
      { text: "Confirmação de consulta via WhatsApp" },
    ],
  },
  {
    title: "Gestão e Controle",
    icon: BarChart3,
    before: [
      { text: "Sem métricas — decisões no escuro" },
      { text: "Planilhas separadas para cada coisa" },
      { text: "Sem visão unificada do paciente" },
      { text: "Impossível saber quantos pacientes a recepção perdeu" },
    ],
    after: [
      { text: "Dashboard em tempo real com KPIs completos" },
      { text: "CRM integrado com pipeline de pacientes" },
      { text: "Histórico completo por paciente em um só lugar" },
      { text: "Métricas de atendimento IA vs humano" },
    ],
  },
  {
    title: "Financeiro e Crescimento",
    icon: Wallet,
    before: [
      { text: "Receita perdida com no-show sem controle" },
      { text: "2-3 recepcionistas dedicadas só ao telefone" },
      { text: "Custo operacional alto e sem retorno claro" },
      { text: "Crescimento limitado pela capacidade da equipe" },
    ],
    after: [
      { text: "Receita recuperada com redução de 60% no no-show" },
      { text: "Equipe focada no atendimento presencial" },
      { text: "ROI em menos de 2 meses" },
      { text: "Escala sem aumentar equipe" },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

function CategoryCard({ category, index }: { category: Category; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const Icon = category.icon;

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: index * 0.12 }}
      className="glass-card rounded-2xl p-6 sm:p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500">
          <Icon className="h-5 w-5 text-white" />
        </span>
        <h3 className="text-lg font-bold text-foreground sm:text-xl">
          {category.title}
        </h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="rounded-xl border-l-4 border-l-red-400 bg-red-50/50 p-4 sm:p-5"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-red-500">
            Sem Clin 360
          </p>
          <ul className="space-y-3">
            {category.before.map((item) => (
              <motion.li
                key={item.text}
                variants={itemVariants}
                className="flex items-start gap-2.5"
              >
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                  <X className="h-3 w-3 text-red-500" />
                </span>
                <span className="text-sm leading-relaxed text-muted">
                  {item.text}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="rounded-xl border-l-4 border-l-emerald-400 bg-emerald-50/50 p-4 sm:p-5"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-emerald-600">
            Com Clin 360
          </p>
          <ul className="space-y-3">
            {category.after.map((item) => (
              <motion.li
                key={item.text}
                variants={itemVariants}
                className="flex items-start gap-2.5"
              >
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle className="h-3 w-3 text-emerald-600" />
                </span>
                <span className="text-sm leading-relaxed text-foreground">
                  {item.text}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Comparison() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });

  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerInView = useInView(bannerRef, { once: true, amount: 0.3 });

  return (
    <section
      id="comparison"
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Antes e depois da{" "}
            <span className="gradient-text">Clin 360</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            Cada área da sua clínica transformada com atendimento inteligente
          </p>
        </motion.div>

        <div className="mt-14 space-y-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>

        <motion.div
          ref={bannerRef}
          initial={{ opacity: 0, y: 32 }}
          animate={bannerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-14 overflow-hidden rounded-2xl gradient-hero p-8 text-center text-white sm:p-12"
        >
          <p className="mx-auto max-w-3xl text-lg font-semibold leading-relaxed sm:text-xl">
            Clínicas que implementaram a Clin 360 economizam em média{" "}
            <span className="font-extrabold">R$ 4.200/mês</span> e recuperam{" "}
            <span className="font-extrabold">60% dos pacientes</span> que antes
            desistiam.
          </p>
          <a
            href="#roi"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-sky-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Calcular minha economia
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
