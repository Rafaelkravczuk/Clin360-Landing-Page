"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Clock,
  Shield,
  Zap,
  MessageSquare,
  Calendar,
  BarChart3,
  Bell,
  Bot,
  CheckCircle2,
  Circle,
  Users,
  TrendingUp,
  ArrowRight,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Send,
  Layers,
  DollarSign,
  Stethoscope,
  MessageCircle,
  Camera,
  Mail,
  Globe,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Tour slides                                                        */
/* ------------------------------------------------------------------ */

interface TourSlide {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  iconBg: string;
}

const tourSlides: TourSlide[] = [
  {
    id: "inbox",
    title: "Inbox Inteligente",
    description: "Todas as conversas de WhatsApp, Instagram, Email e Widget em um só lugar. A IA responde automaticamente e você assume quando quiser.",
    icon: MessageSquare,
    color: "from-primary to-cyan-400",
    iconBg: "bg-primary/15 text-primary",
  },
  {
    id: "agenda",
    title: "Agenda Visual",
    description: "Veja todas as consultas da semana por profissional. Agendamentos feitos pela IA aparecem automaticamente, sem digitação manual.",
    icon: Calendar,
    color: "from-pink-500 to-rose-400",
    iconBg: "bg-pink-100 text-pink-600",
  },
  {
    id: "dashboard",
    title: "Dashboard em Tempo Real",
    description: "Quantos atendimentos a IA fez hoje, tempo médio de resposta, taxa de agendamento, novos pacientes — tudo atualizado ao vivo.",
    icon: BarChart3,
    color: "from-violet-500 to-purple-400",
    iconBg: "bg-violet-100 text-violet-600",
  },
  {
    id: "lembretes",
    title: "Lembretes Automáticos",
    description: "A IA envia lembretes pelo WhatsApp 24h antes da consulta. O paciente confirma com um clique. Menos faltas, sem esforço.",
    icon: Bell,
    color: "from-amber-500 to-orange-400",
    iconBg: "bg-amber-100 text-amber-600",
  },
  {
    id: "crm",
    title: "CRM de Pacientes",
    description: "Pipeline visual do primeiro contato até o retorno. Saiba exatamente quantos leads viraram consultas e de qual canal vieram.",
    icon: Users,
    color: "from-emerald-500 to-teal-400",
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  {
    id: "multicanal",
    title: "4 Canais Integrados",
    description: "WhatsApp, Instagram, Email e Widget do site — tudo chega no mesmo inbox. A IA responde em todos os canais com a mesma qualidade, 24 horas por dia.",
    icon: Layers,
    color: "from-indigo-500 to-blue-400",
    iconBg: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "financeiro",
    title: "Financeiro Completo",
    description: "Faturamento, recebimentos, formas de pagamento e ticket médio — tudo em tempo real. Saiba exatamente quanto sua clínica fatura por dia, semana ou mês.",
    icon: DollarSign,
    color: "from-emerald-600 to-green-400",
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  {
    id: "receitas",
    title: "Receitas Digitais",
    description: "Emita receitas digitais com assinatura eletrônica direto do sistema. O paciente recebe pelo WhatsApp — sem papel, sem demora, com total segurança.",
    icon: Stethoscope,
    color: "from-rose-500 to-pink-400",
    iconBg: "bg-rose-100 text-rose-600",
  },
];

const SLIDE_DURATION = 15000;

/* ------------------------------------------------------------------ */
/*  Highlights                                                         */
/* ------------------------------------------------------------------ */

const highlights = [
  { icon: Clock, title: "Setup em 24h", description: "Configuramos tudo pra você" },
  { icon: Shield, title: "Sem compromisso", description: "Teste grátis por 7 dias" },
  { icon: Zap, title: "Resultado imediato", description: "IA atendendo no primeiro dia" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function VideoDemo() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);
  const containerInView = useInView(containerRef, { once: true, amount: 0.3 });

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setActiveSlide(index);
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % tourSlides.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + tourSlides.length) % tourSlides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (100 / (SLIDE_DURATION / 50));
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const slide = tourSlides[activeSlide];

  return (
    <section id="video" className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Veja a <span className="gradient-text">Clin 360</span> em ação
          </h2>
          <p className="mt-4 text-lg text-muted">
            2 minutos para conhecer cada módulo do sistema
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 32 }}
          animate={containerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-12"
        >
          <div className="overflow-hidden rounded-2xl border border-border/50 bg-white shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center justify-between border-b border-border/50 bg-gray-50/80 px-4 py-2.5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="rounded-md bg-white px-3 py-1 text-xs text-muted ring-1 ring-border/30">
                  <Shield className="mr-1 inline h-3 w-3 text-emerald-500" />
                  app.clin360.com.br
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-gray-200 hover:text-foreground"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPaused((p) => !p)}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-gray-200 hover:text-foreground"
                  aria-label={isPaused ? "Continuar" : "Pausar"}
                >
                  {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-gray-200 hover:text-foreground"
                  aria-label="Próximo"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Slide content */}
            <div className="relative" style={{ minHeight: "500px" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0 flex flex-col md:flex-row"
                >
                  {/* Left: mockup screen */}
                  <div className={`flex flex-1 items-center justify-center bg-gradient-to-br ${slide.color} p-6 md:p-8`}>
                    <SlideScreen slideId={slide.id} />
                  </div>

                  {/* Right: description */}
                  <div className="flex w-full flex-col justify-center px-6 py-8 md:w-[340px] md:px-10">
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${slide.iconBg}`}>
                      <slide.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-extrabold text-foreground sm:text-2xl">
                      {slide.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {slide.description}
                    </p>
                    <a
                      href="#demo"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector("#demo")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                    >
                      Testar este módulo
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress bar + dots */}
            <div className="flex items-center gap-3 border-t border-border/50 bg-gray-50/80 px-4 py-3">
              <div className="flex items-center gap-1.5">
                {tourSlides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => goToSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeSlide ? "w-6 bg-primary" : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={s.title}
                  />
                ))}
              </div>
              <div className="flex-1">
                <div className="h-1 w-full rounded-full bg-gray-200">
                  <motion.div
                    className="h-full rounded-full bg-primary/60"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.05 }}
                  />
                </div>
              </div>
              <span className="text-[11px] font-medium text-muted">
                {activeSlide + 1}/{tourSlides.length}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Feature highlights */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="glass-card flex flex-col items-center rounded-2xl p-6 text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 ring-1 ring-primary/20">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Slide screens (mini mockups)                                       */
/* ------------------------------------------------------------------ */

function SlideScreen({ slideId }: { slideId: string }) {
  switch (slideId) {
    case "inbox":
      return <InboxSlide />;
    case "agenda":
      return <AgendaSlide />;
    case "dashboard":
      return <DashboardSlide />;
    case "lembretes":
      return <LembretesSlide />;
    case "crm":
      return <CrmSlide />;
    case "multicanal":
      return <MulticanalSlide />;
    case "financeiro":
      return <FinanceiroSlide />;
    case "receitas":
      return <ReceitasSlide />;
    default:
      return null;
  }
}

function InboxSlide() {
  const convs = [
    { name: "Maria Silva", msg: "Quero marcar uma consulta", badge: "IA", time: "agora", active: true },
    { name: "João Santos", msg: "Meu convênio cobre?", badge: "IA", time: "2 min", active: false },
    { name: "Ana Costa", msg: "Preciso remarcar...", badge: "Humano", time: "5 min", active: false },
    { name: "Carlos Oliveira", msg: "Boa tarde, quanto custa...", badge: "IA", time: "12 min", active: false },
    { name: "Fernanda Lima", msg: "Obrigada! Até segunda 😊", badge: "IA", time: "18 min", active: false },
  ];
  const msgs = [
    { from: "p" as const, text: "Oi, boa tarde!" },
    { from: "p" as const, text: "Quero marcar uma consulta com dermato" },
    { from: "ai" as const, text: "Boa tarde, Maria! Vou te ajudar 😊" },
    { from: "ai" as const, text: "Temos a Dra. Ana Beatriz para Dermatologia" },
    { from: "ai" as const, text: "Quer que eu veja os horários dela?" },
    { from: "p" as const, text: "Sim! Ela atende Unimed?" },
    { from: "ai" as const, text: "Sim! Unimed, SulAmérica e Bradesco ✅" },
    { from: "ai" as const, text: "Quarta 28/05: 14h, 14:30, 15h ou 15:30" },
    { from: "p" as const, text: "15h fica perfeito" },
    { from: "ai" as const, text: "Agendado! Dra. Ana, quarta 28/05 às 15h ✅" },
  ];

  return (
    <div className="w-full max-w-[560px] overflow-hidden rounded-xl bg-white shadow-xl">
      <div className="flex h-[440px]">
        <div className="w-[180px] flex-shrink-0 border-r border-border/30 bg-gray-50">
          <div className="flex items-center justify-between border-b border-border/30 px-3 py-2.5">
            <p className="text-[11px] font-bold text-foreground">Conversas</p>
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold text-primary">3 novas</span>
          </div>
          {convs.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.12 }}
              className={`flex items-center gap-2 border-b border-border/10 px-3 py-2.5 ${c.active ? "bg-primary/5" : ""}`}
            >
              <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-600">
                {c.name.charAt(0)}
                {c.active && <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-primary" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-[10px] font-semibold text-foreground">{c.name}</p>
                  <span className="text-[8px] text-muted">{c.time}</span>
                </div>
                <p className="truncate text-[8px] text-muted">{c.msg}</p>
                <span className={`mt-0.5 inline-block rounded-full px-1 py-0.5 text-[7px] font-semibold ${c.badge === "IA" ? "bg-violet-100 text-violet-700" : "bg-amber-100 text-amber-700"}`}>
                  {c.badge === "IA" ? "🤖 IA" : "👤 Humano"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-border/30 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-[10px] font-bold text-pink-600">M</div>
              <div>
                <p className="text-[11px] font-semibold text-foreground">Maria Silva</p>
                <div className="flex items-center gap-1">
                  <Circle className="h-1.5 w-1.5 fill-emerald-400 text-emerald-400" />
                  <span className="text-[9px] text-muted">WhatsApp • IA atendendo</span>
                </div>
              </div>
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              className="rounded-md bg-amber-50 px-2 py-1 text-[8px] font-semibold text-amber-700 ring-1 ring-amber-200"
            >
              Assumir conversa
            </motion.span>
          </div>
          <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto bg-gray-50/50 p-3">
            {msgs.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className={`flex ${m.from === "p" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] rounded-lg px-2.5 py-1.5 text-[10px] leading-relaxed ${
                  m.from === "p" ? "bg-primary text-white" : "bg-white text-foreground shadow-sm ring-1 ring-border/20"
                }`}>
                  {m.from === "ai" && <span className="mb-0.5 flex items-center gap-0.5 text-[8px] font-semibold text-violet-500"><Bot className="h-2.5 w-2.5" /> Clin 360</span>}
                  {m.text}
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="flex items-center gap-1.5 py-1"
            >
              <div className="h-px flex-1 bg-border/30" />
              <span className="text-[8px] font-medium text-violet-500"><Bot className="mr-0.5 inline h-2.5 w-2.5" /> IA respondendo</span>
              <div className="h-px flex-1 bg-border/30" />
            </motion.div>
          </div>
          <div className="flex items-center gap-2 border-t border-border/30 px-3 py-2">
            <div className="flex-1 rounded-md bg-gray-100 px-2 py-1.5 text-[9px] text-muted">A IA está atendendo...</div>
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary"><Send className="h-3 w-3" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgendaSlide() {
  const days = ["Seg 26", "Ter 27", "Qua 28", "Qui 29", "Sex 30"];
  const slots = [
    { day: 0, row: 0, name: "Maria S.", spec: "Dermato", color: "bg-pink-200 text-pink-800" },
    { day: 0, row: 2, name: "Lúcia F.", spec: "Dermato", color: "bg-pink-200 text-pink-800" },
    { day: 1, row: 1, name: "Pedro R.", spec: "Cardio", color: "bg-blue-200 text-blue-800" },
    { day: 1, row: 3, name: "Carla M.", spec: "Cardio", color: "bg-blue-200 text-blue-800" },
    { day: 2, row: 0, name: "José O.", spec: "Dermato", color: "bg-pink-200 text-pink-800" },
    { day: 2, row: 2, name: "Fernanda", spec: "Orto", color: "bg-emerald-200 text-emerald-800" },
    { day: 2, row: 4, name: "Paulo S.", spec: "Cardio", color: "bg-blue-200 text-blue-800" },
    { day: 3, row: 1, name: "Beatriz", spec: "Dermato", color: "bg-pink-200 text-pink-800" },
    { day: 3, row: 3, name: "André S.", spec: "Orto", color: "bg-emerald-200 text-emerald-800" },
    { day: 4, row: 0, name: "Mariana", spec: "Cardio", color: "bg-blue-200 text-blue-800" },
    { day: 4, row: 2, name: "Ricardo", spec: "Dermato", color: "bg-pink-200 text-pink-800" },
    { day: 4, row: 4, name: "Juliana", spec: "Orto", color: "bg-emerald-200 text-emerald-800" },
  ];
  const times = ["08:00", "09:00", "10:00", "14:00", "15:00"];

  return (
    <div className="w-full max-w-[560px] overflow-hidden rounded-xl bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-border/30 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-bold text-foreground">Semana 26-30 Mai</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">12 consultas</span>
          <div className="flex gap-1">
            <span className="rounded bg-pink-200 px-1 py-0.5 text-[7px] font-semibold text-pink-800">Dermato</span>
            <span className="rounded bg-blue-200 px-1 py-0.5 text-[7px] font-semibold text-blue-800">Cardio</span>
            <span className="rounded bg-emerald-200 px-1 py-0.5 text-[7px] font-semibold text-emerald-800">Orto</span>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-[50px_repeat(5,1fr)] gap-px">
          <div />
          {days.map((d, i) => (
            <div key={d} className={`py-1.5 text-center text-[9px] font-semibold ${i === 2 ? "text-primary" : "text-muted"}`}>
              {d}
              {i === 2 && <span className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-primary" />}
            </div>
          ))}
          {times.map((t, ti) => (
            <Fragment key={t}>
              <div className="border-t border-border/20 py-3 pr-2 text-right text-[9px] font-medium text-muted">{t}</div>
              {days.map((_, di) => {
                const s = slots.find((x) => x.day === di && x.row === ti);
                return (
                  <div key={`${di}-${ti}`} className="border-t border-l border-border/20 px-1 py-1.5">
                    {s && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + (di + ti) * 0.08 }}
                        className={`rounded-md px-1.5 py-1.5 text-[8px] font-semibold ${s.color}`}
                      >
                        <p>{s.name}</p>
                        <p className="opacity-70">{s.spec}</p>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Fragment } from "react";

function DashboardSlide() {
  const kpis = [
    { label: "Atendimentos", value: "47", change: "+12%", color: "text-primary", iconBg: "bg-primary/10" },
    { label: "IA", value: "81%", change: "+8%", color: "text-violet-600", iconBg: "bg-violet-100" },
    { label: "Tempo médio", value: "4s", change: "-23%", color: "text-emerald-600", iconBg: "bg-emerald-100" },
    { label: "Agendamentos", value: "23", change: "+18%", color: "text-amber-600", iconBg: "bg-amber-100" },
    { label: "Novos pacientes", value: "8", change: "+33%", color: "text-pink-600", iconBg: "bg-pink-100" },
    { label: "Satisfação", value: "4.9", change: "+2%", color: "text-yellow-600", iconBg: "bg-yellow-100" },
  ];
  const iaData = [32, 38, 45, 41, 47, 22];
  const humData = [11, 9, 13, 8, 10, 5];
  const activity = [
    { text: "Maria agendou Dermatologia", color: "text-pink-500" },
    { text: "IA respondeu João em 3s", color: "text-primary" },
    { text: "Fernanda confirmou presença", color: "text-emerald-500" },
    { text: "Novo lead pelo Instagram", color: "text-purple-500" },
  ];

  return (
    <div className="w-full max-w-[560px] overflow-hidden rounded-xl bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-border/30 px-4 py-2.5">
        <span className="text-[11px] font-bold text-foreground">Dashboard — Hoje</span>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[8px] font-semibold text-emerald-700">Ao vivo</span>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="rounded-lg bg-gray-50 p-2.5 text-center"
            >
              <p className={`text-xl font-extrabold ${k.color}`}>{k.value}</p>
              <p className="text-[8px] text-muted">{k.label}</p>
              <p className="text-[7px] font-semibold text-emerald-600"><TrendingUp className="mr-0.5 inline h-2 w-2" />{k.change}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-[1fr_160px] gap-3">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="rounded-lg bg-gray-50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[9px] font-bold text-foreground">IA vs Humano — Semana</p>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-0.5 text-[7px] text-muted"><span className="inline-block h-2 w-2 rounded-sm bg-primary" /> IA</span>
                <span className="flex items-center gap-0.5 text-[7px] text-muted"><span className="inline-block h-2 w-2 rounded-sm bg-amber-400" /> Humano</span>
              </div>
            </div>
            <div className="flex h-24 items-end gap-2">
              {iaData.map((ia, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-[2px]">
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(humData[i] / 50) * 90}px` }} transition={{ delay: 0.8 + i * 0.08, duration: 0.6 }} className="w-full rounded-t bg-amber-400" />
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(ia / 50) * 90}px` }} transition={{ delay: 0.8 + i * 0.08, duration: 0.6 }} className="w-full rounded-t bg-primary" />
                  <span className="text-[7px] text-muted">{["S", "T", "Q", "Q", "S", "S"][i]}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="rounded-lg bg-gray-50 p-3">
            <p className="mb-2 text-[9px] font-bold text-foreground">Atividade</p>
            <div className="flex flex-col gap-2">
              {activity.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + i * 0.15 }} className="flex items-start gap-1.5">
                  <Circle className={`mt-0.5 h-1.5 w-1.5 flex-shrink-0 ${a.color}`} />
                  <p className="text-[8px] leading-tight text-foreground">{a.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function LembretesSlide() {
  const steps = [
    { label: "Consulta agendada", desc: "Maria Silva — Dra. Ana Beatriz", status: "done" },
    { label: "Lembrete enviado (24h antes)", desc: "WhatsApp automático", status: "done" },
    { label: "Paciente confirma", desc: "\"Confirmo! Até amanhã\"", status: "done" },
    { label: "Lembrete do dia (2h antes)", desc: "Lembre-se: consulta às 15h", status: "active" },
    { label: "Dia da consulta", desc: "Paciente comparece", status: "pending" },
  ];
  const patients = [
    { name: "Maria Silva", time: "15:00", status: "Confirmada", color: "text-emerald-600 bg-emerald-50" },
    { name: "João Santos", time: "14:00", status: "Confirmada", color: "text-emerald-600 bg-emerald-50" },
    { name: "Pedro Rocha", time: "14:30", status: "Aguardando", color: "text-amber-600 bg-amber-50" },
    { name: "Carla Mendes", time: "16:00", status: "Confirmada", color: "text-emerald-600 bg-emerald-50" },
    { name: "André Souza", time: "15:30", status: "Cancelou", color: "text-red-500 bg-red-50" },
  ];

  return (
    <div className="w-full max-w-[560px] overflow-hidden rounded-xl bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-border/30 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Bell className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-bold text-foreground">Jornada do Lembrete</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[8px] font-semibold text-emerald-700">Automático</span>
      </div>
      <div className="flex h-[400px]">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="relative flex flex-col gap-4">
            <div className="absolute top-3 bottom-3 left-[11px] w-0.5 bg-border/40" />
            {steps.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.25 }}
                className="relative flex gap-3"
              >
                <div className={`relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                  s.status === "done" ? "bg-emerald-100" : s.status === "active" ? "bg-primary/15 ring-2 ring-primary/30" : "bg-gray-100"
                }`}>
                  {s.status === "done" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                  {s.status === "active" && <Bell className="h-3.5 w-3.5 animate-pulse text-primary" />}
                  {s.status === "pending" && <Circle className="h-3.5 w-3.5 text-gray-400" />}
                </div>
                <div>
                  <p className={`text-[10px] font-semibold ${s.status === "pending" ? "text-muted" : "text-foreground"}`}>{s.label}</p>
                  <p className="text-[8px] text-muted">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="w-[200px] flex-shrink-0 border-l border-border/30">
          <div className="border-b border-border/30 px-3 py-2">
            <p className="text-[10px] font-bold text-foreground">Amanhã — 5 consultas</p>
          </div>
          <div className="flex flex-col">
            {patients.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.12 }}
                className="flex items-center justify-between border-b border-border/20 px-3 py-2"
              >
                <div>
                  <p className="text-[9px] font-semibold text-foreground">{p.name}</p>
                  <p className="text-[7px] text-muted">{p.time}</p>
                </div>
                <span className={`rounded-full px-1.5 py-0.5 text-[7px] font-semibold ${p.color}`}>{p.status}</span>
              </motion.div>
            ))}
          </div>
          <div className="p-3">
            <div className="rounded-lg bg-emerald-50 p-3 text-center">
              <p className="text-2xl font-extrabold text-emerald-600">80%</p>
              <p className="text-[9px] font-medium text-emerald-700">Confirmação</p>
              <p className="text-[7px] text-emerald-600/70">com lembretes ativos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CrmSlide() {
  const stages = [
    { name: "Novo Lead", color: "bg-blue-500", lightColor: "bg-blue-50 border-blue-200", count: 3, cards: [
      { name: "Camila R.", source: "Instagram", tag: "Dermato" },
      { name: "Lucas F.", source: "Widget", tag: "Cardio" },
      { name: "Patrícia N.", source: "WhatsApp", tag: "Orto" },
    ]},
    { name: "Agendou", color: "bg-amber-500", lightColor: "bg-amber-50 border-amber-200", count: 2, cards: [
      { name: "Maria S.", source: "WhatsApp", tag: "Dermato" },
      { name: "João S.", source: "WhatsApp", tag: "Cardio" },
    ]},
    { name: "Compareceu", color: "bg-emerald-500", lightColor: "bg-emerald-50 border-emerald-200", count: 3, cards: [
      { name: "Fernanda L.", source: "WhatsApp", tag: "Dermato" },
      { name: "Roberto A.", source: "Email", tag: "Orto" },
      { name: "Carlos M.", source: "WhatsApp", tag: "Cardio" },
    ]},
    { name: "Retorno", color: "bg-violet-500", lightColor: "bg-violet-50 border-violet-200", count: 1, cards: [
      { name: "Ana C.", source: "WhatsApp", tag: "Dermato" },
    ]},
  ];

  return (
    <div className="w-full max-w-[560px] overflow-hidden rounded-xl bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-border/30 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Users className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-bold text-foreground">Pipeline de Pacientes</span>
        </div>
        <span className="text-[9px] font-semibold text-foreground">9 pacientes</span>
      </div>
      <div className="flex gap-2 p-3">
        {stages.map((st, si) => (
          <motion.div
            key={st.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + si * 0.12 }}
            className="flex flex-1 flex-col rounded-lg border border-border/30 bg-gray-50/50"
          >
            <div className="flex items-center justify-between px-2 py-2">
              <div className="flex items-center gap-1.5">
                <div className={`h-2 w-2 rounded-full ${st.color}`} />
                <span className="text-[8px] font-bold text-foreground">{st.name}</span>
              </div>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-[7px] font-bold text-gray-600">{st.count}</span>
            </div>
            <div className="flex flex-col gap-1.5 px-1.5 pb-2">
              {st.cards.map((c, ci) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + si * 0.12 + ci * 0.08 }}
                  className={`rounded-md border p-2 ${st.lightColor}`}
                >
                  <p className="text-[8px] font-semibold text-foreground">{c.name}</p>
                  <div className="mt-0.5 flex items-center justify-between">
                    <span className="rounded bg-white/80 px-1 py-0.5 text-[6px] text-muted">{c.source}</span>
                    <span className="text-[6px] font-medium text-muted">{c.tag}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MulticanalSlide() {
  const channels = [
    { name: "WhatsApp", icon: MessageCircle, color: "bg-emerald-500", light: "bg-emerald-50 border-emerald-200 text-emerald-700", msgs: 156, pct: 65 },
    { name: "Instagram", icon: Camera, color: "bg-purple-500", light: "bg-purple-50 border-purple-200 text-purple-700", msgs: 43, pct: 18 },
    { name: "Email", icon: Mail, color: "bg-blue-500", light: "bg-blue-50 border-blue-200 text-blue-700", msgs: 28, pct: 12 },
    { name: "Widget", icon: Globe, color: "bg-indigo-500", light: "bg-indigo-50 border-indigo-200 text-indigo-700", msgs: 12, pct: 5 },
  ];

  return (
    <div className="w-full max-w-[560px] overflow-hidden rounded-xl bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-border/30 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Layers className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-bold text-foreground">Canais Integrados</span>
        </div>
        <span className="text-[10px] font-semibold text-foreground">239 msgs hoje</span>
      </div>
      <div className="p-3">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-3 flex items-center justify-between rounded-lg bg-gradient-to-r from-primary/10 to-emerald-500/10 px-3 py-2.5"
        >
          <p className="text-[10px] font-semibold text-foreground">Todos os canais no mesmo inbox</p>
          <div className="flex gap-1">
            {channels.map((ch) => (
              <div key={ch.name} className="flex items-center gap-0.5 rounded-full bg-white px-1.5 py-0.5 shadow-sm">
                <div className={`h-1.5 w-1.5 rounded-full ${ch.color}`} />
                <span className="text-[7px] font-medium text-foreground">{ch.pct}%</span>
              </div>
            ))}
          </div>
        </motion.div>
        <div className="grid grid-cols-2 gap-2.5">
          {channels.map((ch, i) => {
            const Icon = ch.icon;
            return (
              <motion.div
                key={ch.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.12 }}
                className={`rounded-xl border p-3 ${ch.light}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${ch.color} text-white`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-foreground">{ch.name}</p>
                      <p className="text-[8px] text-muted">{ch.msgs} msgs</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-0.5 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[7px] font-semibold text-emerald-700">
                    <Circle className="h-1 w-1 fill-emerald-500 text-emerald-500" /> On
                  </span>
                </div>
                <div className="mt-2">
                  <div className="h-1.5 w-full rounded-full bg-white/60">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ch.pct}%` }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
                      className={`h-full rounded-full ${ch.color}`}
                    />
                  </div>
                  <p className="mt-1 text-[7px] text-muted">{ch.pct}% do tráfego</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FinanceiroSlide() {
  const kpis = [
    { label: "Faturamento", value: "R$ 45.280", color: "text-emerald-600" },
    { label: "Recebido", value: "R$ 38.750", color: "text-primary" },
    { label: "A Receber", value: "R$ 6.530", color: "text-amber-600" },
    { label: "Ticket Médio", value: "R$ 185", color: "text-violet-600" },
  ];
  const transactions = [
    { name: "Maria Silva", service: "Consulta Dermato", value: "R$ 250", method: "PIX", paid: true },
    { name: "João Santos", service: "Retorno Cardio", value: "R$ 180", method: "Convênio", paid: true },
    { name: "Ana Costa", service: "Exame Sangue", value: "R$ 95", method: "Cartão", paid: false },
    { name: "Carlos O.", service: "Consulta Orto", value: "R$ 220", method: "PIX", paid: true },
    { name: "Fernanda L.", service: "Consulta Dermato", value: "R$ 250", method: "Convênio", paid: false },
  ];
  const methods = [
    { label: "Convênio", pct: 45, color: "bg-primary" },
    { label: "PIX", pct: 30, color: "bg-emerald-500" },
    { label: "Cartão", pct: 20, color: "bg-amber-500" },
    { label: "Particular", pct: 5, color: "bg-violet-500" },
  ];

  return (
    <div className="w-full max-w-[560px] overflow-hidden rounded-xl bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-border/30 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-[11px] font-bold text-foreground">Financeiro — Maio 2026</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[8px] font-semibold text-emerald-700">+14%</span>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-4 gap-2">
          {kpis.map((k, i) => (
            <motion.div key={k.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="rounded-lg bg-gray-50 p-2.5 text-center">
              <p className={`text-base font-extrabold ${k.color}`}>{k.value}</p>
              <p className="text-[8px] text-muted">{k.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-[1fr_140px] gap-3">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="rounded-lg bg-gray-50">
            <div className="border-b border-border/30 px-3 py-2">
              <p className="text-[9px] font-bold text-foreground">Últimas Transações</p>
            </div>
            {transactions.map((tx, i) => (
              <motion.div key={tx.name} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.08 }} className="flex items-center justify-between border-b border-border/20 px-3 py-1.5">
                <div>
                  <p className="text-[8px] font-semibold text-foreground">{tx.name}</p>
                  <p className="text-[7px] text-muted">{tx.service}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="rounded bg-gray-100 px-1 py-0.5 text-[6px] text-muted">{tx.method}</span>
                  <span className="text-[8px] font-bold text-foreground">{tx.value}</span>
                  <span className={`rounded-full px-1 py-0.5 text-[6px] font-semibold ${tx.paid ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                    {tx.paid ? "Pago" : "Pendente"}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="rounded-lg bg-gray-50 p-3">
            <p className="mb-2 text-[9px] font-bold text-foreground">Pagamentos</p>
            <div className="relative mx-auto mb-3 flex h-20 w-20 items-center justify-center">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                {(() => {
                  let offset = 0;
                  return methods.map((m) => {
                    const el = (
                      <circle key={m.label} cx="18" cy="18" r="15.9155" fill="none" strokeWidth="3.5" strokeDasharray={`${m.pct} ${100 - m.pct}`} strokeDashoffset={-offset} className={m.color.replace("bg-", "stroke-")} strokeLinecap="round" />
                    );
                    offset += m.pct;
                    return el;
                  });
                })()}
              </svg>
              <div className="absolute text-center">
                <p className="text-[10px] font-extrabold text-foreground">100%</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              {methods.map((m) => (
                <div key={m.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className={`h-2 w-2 rounded-sm ${m.color}`} />
                    <span className="text-[8px] text-foreground">{m.label}</span>
                  </div>
                  <span className="text-[8px] font-semibold text-foreground">{m.pct}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ReceitasSlide() {
  const medications = [
    { name: "Losartana Potássica 50mg", dosage: "1 comprimido, 1x ao dia, 30 dias" },
    { name: "Atenolol 25mg", dosage: "1 comprimido, pela manhã" },
    { name: "Sinvastatina 20mg", dosage: "1 comprimido, à noite, 60 dias" },
  ];
  const recent = [
    { patient: "Maria Silva", doctor: "Dra. Ana", date: "21/05", status: "Enviada" },
    { patient: "João Santos", doctor: "Dr. Carlos", date: "21/05", status: "Enviada" },
    { patient: "Pedro Rocha", doctor: "Dr. Carlos", date: "20/05", status: "Enviada" },
    { patient: "Fernanda L.", doctor: "Dra. Ana", date: "20/05", status: "Rascunho" },
  ];

  return (
    <div className="w-full max-w-[560px] overflow-hidden rounded-xl bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-border/30 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-bold text-foreground">Receita Digital</span>
        </div>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[8px] font-semibold text-primary">127 este mês</span>
      </div>
      <div className="flex h-[400px]">
        <div className="flex-1 overflow-y-auto p-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-border/40 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between border-b border-border/30 pb-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-emerald-400">
                  <span className="text-[8px] font-bold text-white">C</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-foreground">Clínica Saúde Viva</p>
                  <p className="text-[7px] text-muted">Rua das Flores, 123 — São Paulo</p>
                </div>
              </div>
              <p className="text-[8px] text-muted">21/05/2026</p>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <p className="text-[7px] font-semibold uppercase text-muted">Médico(a)</p>
                <p className="text-[10px] font-semibold text-foreground">Dra. Ana Beatriz</p>
                <p className="text-[7px] text-muted">CRM 12345/SP</p>
              </div>
              <div>
                <p className="text-[7px] font-semibold uppercase text-muted">Paciente</p>
                <p className="text-[10px] font-semibold text-foreground">Maria Silva</p>
                <p className="text-[7px] text-muted">CPF ***.***.***-12</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="mb-1.5 text-[7px] font-semibold uppercase text-muted">Medicamentos</p>
              {medications.map((med, i) => (
                <motion.div key={med.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.15 }} className="mb-1.5 flex items-start gap-1.5 rounded-md bg-gray-50 px-2 py-1.5">
                  <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-[7px] font-bold text-primary">{i + 1}</span>
                  <div>
                    <p className="text-[9px] font-semibold text-foreground">{med.name}</p>
                    <p className="text-[7px] text-muted">{med.dosage}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-border/30 pt-2">
              <div>
                <div className="mx-auto mb-0.5 h-px w-20 bg-border/50" />
                <p className="text-[8px] font-semibold text-foreground">Dra. Ana Beatriz</p>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5">
                <Shield className="h-2.5 w-2.5 text-emerald-600" />
                <span className="text-[7px] font-semibold text-emerald-600">Assinada digitalmente</span>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="w-[180px] flex-shrink-0 border-l border-border/30">
          <div className="border-b border-border/30 px-3 py-2">
            <p className="text-[10px] font-bold text-foreground">Recentes</p>
          </div>
          {recent.map((r, i) => (
            <motion.div key={r.patient} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.12 }} className="flex items-center justify-between border-b border-border/20 px-3 py-2">
              <div>
                <p className="text-[8px] font-semibold text-foreground">{r.patient}</p>
                <p className="text-[6px] text-muted">{r.doctor} • {r.date}</p>
              </div>
              <span className={`rounded-full px-1.5 py-0.5 text-[6px] font-semibold ${r.status === "Enviada" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-muted"}`}>{r.status}</span>
            </motion.div>
          ))}
          <div className="p-3">
            <div className="rounded-lg bg-primary/5 p-2.5 text-center">
              <p className="text-xl font-extrabold text-primary">98%</p>
              <p className="text-[8px] font-medium text-primary">Enviadas digitalmente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
