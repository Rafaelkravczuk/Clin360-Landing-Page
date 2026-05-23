"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Calendar,
  BarChart3,
  Bell,
  Bot,
  Clock,
  Circle,
  CheckCircle2,
  ArrowRightLeft,
  TrendingUp,
  Stethoscope,
  Sparkles,
  Send,
  PhoneCall,
  Check,
  Users,
  Layers,
  MessageCircle,
  Camera,
  Mail,
  Globe,
  DollarSign,
  UserPlus,
  Star,
  Eye,
  Phone,
  ChevronRight,
  Zap,
  Shield,
  Heart,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Tabs                                                               */
/* ------------------------------------------------------------------ */

const tabs = [
  { id: "inbox", label: "Inbox", icon: MessageSquare, desc: "Todas as conversas" },
  { id: "agenda", label: "Agenda", icon: Calendar, desc: "Agenda visual" },
  { id: "dashboard", label: "Dashboard", icon: BarChart3, desc: "Métricas em tempo real" },
  { id: "crm", label: "CRM", icon: Users, desc: "Pipeline de pacientes" },
  { id: "multicanal", label: "Multicanal", icon: Layers, desc: "4 canais integrados" },
  { id: "lembretes", label: "Lembretes", icon: Bell, desc: "Confirmação automática" },
  { id: "financeiro", label: "Financeiro", icon: DollarSign, desc: "Receitas e faturamento" },
  { id: "receitas", label: "Receitas", icon: Stethoscope, desc: "Receitas digitais" },
] as const;

type TabId = (typeof tabs)[number]["id"];

/* ------------------------------------------------------------------ */
/*  Floating notifications                                             */
/* ------------------------------------------------------------------ */

const notifications = [
  { text: "Maria Silva agendou Dermatologia", icon: Calendar, color: "text-pink-500", delay: 4000 },
  { text: "IA respondeu João em 3 segundos", icon: Zap, color: "text-primary", delay: 12000 },
  { text: "Fernanda confirmou presença ✅", icon: Check, color: "text-emerald-500", delay: 20000 },
  { text: "Novo lead via Instagram", icon: Heart, color: "text-purple-500", delay: 28000 },
];

/* ------------------------------------------------------------------ */
/*  Sidebar nav items (simulated app)                                  */
/* ------------------------------------------------------------------ */

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", tab: "dashboard" as TabId },
  { icon: MessageSquare, label: "Inbox", tab: "inbox" as TabId },
  { icon: Calendar, label: "Agenda", tab: "agenda" as TabId },
  { icon: Users, label: "CRM", tab: "crm" as TabId },
  { icon: Bell, label: "Lembretes", tab: "lembretes" as TabId },
  { icon: Layers, label: "Canais", tab: "multicanal" as TabId },
  { icon: DollarSign, label: "Financeiro", tab: "financeiro" as TabId },
  { icon: Stethoscope, label: "Receitas", tab: "receitas" as TabId },
];

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function ProductDemo() {
  const [activeTab, setActiveTab] = useState<TabId>("inbox");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [userClicked, setUserClicked] = useState(false);
  const [visibleNotif, setVisibleNotif] = useState<number | null>(null);

  useEffect(() => {
    if (userClicked) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const idx = tabs.findIndex((t) => t.id === prev);
        return tabs[(idx + 1) % tabs.length].id;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, [userClicked]);

  // floating notifications
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    notifications.forEach((n, i) => {
      timers.push(setTimeout(() => {
        setVisibleNotif(i);
        timers.push(setTimeout(() => setVisibleNotif(null), 3500));
      }, n.delay));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleTabClick = (id: TabId) => {
    setUserClicked(true);
    setActiveTab(id);
  };

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Veja o sistema por dentro
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
            Tudo que sua clínica precisa,{" "}
            <span className="gradient-text">num só lugar</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Conheça os módulos que vão transformar o atendimento da sua clínica
          </p>
        </motion.div>

        {/* Tabs — mobile scrollable */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="scrollbar-hide inline-flex max-w-full gap-1 overflow-x-auto rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-border/50">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative flex flex-shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all sm:px-5 ${
                    active
                      ? "bg-primary text-white shadow-md"
                      : "text-muted hover:bg-gray-100 hover:text-foreground"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-4 text-center text-sm text-muted"
          >
            {tabs.find((t) => t.id === activeTab)?.desc}
          </motion.p>
        </AnimatePresence>

        {/* App window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative overflow-hidden rounded-2xl border border-border/50 bg-white shadow-2xl"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-3 border-b border-border/50 bg-gray-50/80 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 text-center">
              <span className="rounded-md bg-white px-4 py-1 text-xs text-muted ring-1 ring-border/30">
                <Shield className="mr-1 inline h-3 w-3 text-emerald-500" />
                app.clin360.com.br
              </span>
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="hidden w-[180px] flex-shrink-0 border-r border-border/30 bg-gray-50/50 md:block">
              <div className="flex items-center gap-2 border-b border-border/30 px-4 py-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-emerald-400">
                  <span className="text-[10px] font-bold text-white">C</span>
                </div>
                <span className="text-[13px] font-bold text-foreground">
                  Clin 360
                </span>
              </div>
              <nav className="flex flex-col gap-0.5 p-2">
                {sidebarItems.map((item) => {
                  const isActive = "tab" in item && item.tab === activeTab;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        if ("tab" in item && item.tab) handleTabClick(item.tab);
                      }}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] font-medium transition-all ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted hover:bg-gray-100 hover:text-foreground"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                      {item.label === "Inbox" && (
                        <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                          3
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Sidebar footer */}
              <div className="mt-auto border-t border-border/30 p-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    R
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-foreground">
                      Admin
                    </p>
                    <p className="text-[9px] text-muted">Administrador</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="min-h-[480px] flex-1 md:min-h-[520px]">
              <AnimatePresence mode="wait">
                {activeTab === "inbox" && <InboxDemo key="inbox" />}
                {activeTab === "agenda" && <AgendaDemo key="agenda" />}
                {activeTab === "dashboard" && <DashboardDemo key="dashboard" />}
                {activeTab === "crm" && <CrmDemo key="crm" />}
                {activeTab === "multicanal" && <MulticanalDemo key="multicanal" />}
                {activeTab === "lembretes" && <LembretesDemo key="lembretes" />}
                {activeTab === "financeiro" && <FinanceiroDemo key="financeiro" />}
                {activeTab === "receitas" && <ReceitasDemo key="receitas" />}
              </AnimatePresence>
            </div>
          </div>

          {/* Floating notification */}
          <AnimatePresence>
            {visibleNotif !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-4 bottom-4 z-30 flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 shadow-xl ring-1 ring-border/30"
              >
                {(() => {
                  const n = notifications[visibleNotif];
                  const Icon = n.icon;
                  return (
                    <>
                      <Icon className={`h-4 w-4 ${n.color}`} />
                      <span className="text-[12px] font-medium text-foreground">
                        {n.text}
                      </span>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  INBOX DEMO                                                         */
/* ================================================================== */

interface InboxConversation {
  name: string;
  preview: string;
  time: string;
  unread: number;
  channel: string;
  handler: "ia" | "humano";
  avatarColor: string;
  messages: { from: "patient" | "ai"; text: string; time: string }[];
  statusLabel: string;
}

const inboxConversations: InboxConversation[] = [
  {
    name: "Maria Silva",
    preview: "Quero marcar uma consulta com dermato...",
    time: "agora",
    unread: 2,
    channel: "whatsapp",
    handler: "ia",
    avatarColor: "bg-pink-100 text-pink-600",
    statusLabel: "IA atendendo",
    messages: [
      { from: "patient", text: "Oi, boa tarde!", time: "14:32" },
      { from: "patient", text: "Quero marcar uma consulta com dermato", time: "14:32" },
      { from: "ai", text: "Boa tarde, Maria! 😊 Vou te ajudar!", time: "14:32" },
      { from: "ai", text: "Temos a Dra. Ana Beatriz para Dermatologia", time: "14:33" },
      { from: "ai", text: "Quer que eu veja os horários dela?", time: "14:33" },
      { from: "patient", text: "Sim por favor!", time: "14:33" },
      { from: "ai", text: "Ela atende quarta e sexta à tarde 📋", time: "14:33" },
      { from: "ai", text: "Quarta 28/05: 14h, 14:30, 15h ou 15:30", time: "14:34" },
      { from: "patient", text: "15h fica perfeito", time: "14:34" },
      { from: "ai", text: "Agendado! Dra. Ana Beatriz, quarta 28/05 às 15h ✅", time: "14:34" },
      { from: "ai", text: "Vou te mandar um lembrete amanhã 💚", time: "14:35" },
      { from: "patient", text: "Obrigada! Adorei a rapidez 😍", time: "14:35" },
    ],
  },
  {
    name: "João Santos",
    preview: "Meu convênio cobre esse exame?",
    time: "2 min",
    unread: 1,
    channel: "whatsapp",
    handler: "ia",
    avatarColor: "bg-blue-100 text-blue-600",
    statusLabel: "IA atendendo",
    messages: [
      { from: "patient", text: "Boa tarde!", time: "14:28" },
      { from: "patient", text: "Meu convênio cobre esse exame de sangue completo?", time: "14:28" },
      { from: "ai", text: "Boa tarde, João! 😊", time: "14:28" },
      { from: "ai", text: "Qual é o seu convênio?", time: "14:28" },
      { from: "patient", text: "Unimed", time: "14:29" },
      { from: "ai", text: "Sim! A Unimed cobre hemograma completo ✅", time: "14:29" },
      { from: "ai", text: "Quer que eu agende pra você?", time: "14:29" },
      { from: "patient", text: "Sim, pode ser amanhã de manhã?", time: "14:30" },
      { from: "ai", text: "Amanhã temos horário às 8h ou 9h30 🕐", time: "14:30" },
      { from: "patient", text: "8h tá ótimo", time: "14:30" },
      { from: "ai", text: "Pronto! Exame agendado pra amanhã às 8h ✅", time: "14:31" },
      { from: "ai", text: "Lembre-se: jejum de 12 horas, ok? 🩺", time: "14:31" },
    ],
  },
  {
    name: "Ana Costa",
    preview: "Preciso remarcar minha consulta de...",
    time: "5 min",
    unread: 0,
    channel: "instagram",
    handler: "humano",
    avatarColor: "bg-purple-100 text-purple-600",
    statusLabel: "Humano atendendo",
    messages: [
      { from: "patient", text: "Oi! Vim pelo Instagram", time: "14:20" },
      { from: "patient", text: "Preciso remarcar minha consulta de sexta", time: "14:20" },
      { from: "ai", text: "Oi, Ana! Achei sua consulta 😊", time: "14:20" },
      { from: "ai", text: "Sexta 30/05 às 10h com Dr. Marcos, certo?", time: "14:21" },
      { from: "patient", text: "Isso! Pode ser na semana que vem?", time: "14:21" },
      { from: "ai", text: "Claro! Na semana que vem o Dr. Marcos atende segunda e quarta", time: "14:22" },
      { from: "ai", text: "Segunda 02/06: 9h, 10h ou 11h\nQuarta 04/06: 14h ou 15h", time: "14:22" },
      { from: "patient", text: "Quarta às 14h por favor", time: "14:23" },
      { from: "ai", text: "Remarcado! Quarta 04/06 às 14h com Dr. Marcos ✅", time: "14:23" },
      { from: "patient", text: "Perfeito, obrigada!", time: "14:24" },
    ],
  },
  {
    name: "Carlos Oliveira",
    preview: "Boa tarde, quanto custa uma limpeza...",
    time: "12 min",
    unread: 0,
    channel: "widget",
    handler: "ia",
    avatarColor: "bg-amber-100 text-amber-600",
    statusLabel: "IA atendendo",
    messages: [
      { from: "patient", text: "Boa tarde, quanto custa uma limpeza de pele?", time: "14:10" },
      { from: "ai", text: "Boa tarde, Carlos! 😊", time: "14:10" },
      { from: "ai", text: "Para valores e orçamentos, vou transferir para nossa equipe", time: "14:10" },
      { from: "ai", text: "Um momento que alguém da recepção vai te atender 🙋‍♀️", time: "14:11" },
      { from: "ai", text: "Enquanto isso, posso adiantar: aceitamos PIX, cartão e convênio", time: "14:11" },
      { from: "patient", text: "Ok, obrigado!", time: "14:12" },
    ],
  },
  {
    name: "Fernanda Lima",
    preview: "Obrigada! Até segunda então 😊",
    time: "18 min",
    unread: 0,
    channel: "email",
    handler: "ia",
    avatarColor: "bg-emerald-100 text-emerald-600",
    statusLabel: "Conversa encerrada",
    messages: [
      { from: "patient", text: "Olá, recebi o lembrete da minha consulta", time: "13:50" },
      { from: "patient", text: "Confirmo presença na segunda!", time: "13:50" },
      { from: "ai", text: "Perfeito, Fernanda! Presença confirmada ✅", time: "13:51" },
      { from: "ai", text: "Segunda 26/05 às 10h com Dra. Ana Beatriz", time: "13:51" },
      { from: "ai", text: "Lembre-se de trazer seus exames anteriores 📋", time: "13:51" },
      { from: "patient", text: "Obrigada! Até segunda então 😊", time: "13:52" },
      { from: "ai", text: "Até lá! Qualquer dúvida é só chamar 💚", time: "13:52" },
    ],
  },
];

function InboxDemo() {
  const [selectedConv, setSelectedConv] = useState(0);
  const [showHandoff, setShowHandoff] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const conv = inboxConversations[selectedConv];

  useEffect(() => {
    setShowHandoff(false);
    const t = setTimeout(() => setShowHandoff(true), 2000);
    return () => clearTimeout(t);
  }, [selectedConv]);

  useEffect(() => {
    const el = chatContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [selectedConv]);

  const channelIcons: Record<string, string> = {
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    email: "Email",
    widget: "Widget",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex h-[480px] md:h-[520px]"
    >
      {/* Sidebar */}
      <div className="hidden w-[260px] flex-shrink-0 border-r border-border/30 md:flex md:flex-col">
        <div className="border-b border-border/30 px-4 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">Conversas</h3>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
              3 novas
            </span>
          </div>
          <div className="mt-2 flex gap-2">
            {["Todos", "IA", "Humano"].map((f, i) => (
              <span
                key={f}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  i === 0
                    ? "bg-primary/10 text-primary"
                    : "bg-gray-100 text-muted"
                }`}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {inboxConversations.map((c, i) => (
            <button
              type="button"
              key={c.name}
              onClick={() => setSelectedConv(i)}
              className={`flex w-full items-start gap-3 border-b border-border/20 px-4 py-3 text-left transition-colors ${
                selectedConv === i ? "bg-primary/5" : "hover:bg-gray-50"
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${c.avatarColor}`}>
                  {c.name.charAt(0)}
                </div>
                {c.unread > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                    {c.unread}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className={`truncate text-[13px] font-semibold ${selectedConv === i ? "text-primary" : "text-foreground"}`}>
                    {c.name}
                  </span>
                  <span className="ml-2 flex-shrink-0 text-[10px] text-muted">
                    {c.time}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[11px] text-muted">
                  {c.preview}
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
                      c.handler === "ia"
                        ? "bg-violet-100 text-violet-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {c.handler === "ia" ? "🤖 IA" : "👤 Humano"}
                  </span>
                  <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] text-muted">
                    {c.channel}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border/30 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${conv.avatarColor}`}>
              {conv.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{conv.name}</p>
              <div className="flex items-center gap-1.5">
                <Circle className="h-2 w-2 fill-emerald-400 text-emerald-400" />
                <span className="text-[11px] text-muted">{channelIcons[conv.channel]} • {conv.statusLabel}</span>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {showHandoff && conv.handler === "ia" && (
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-[12px] font-semibold text-amber-700 ring-1 ring-amber-200 transition-all hover:bg-amber-100"
              >
                <ArrowRightLeft className="h-3.5 w-3.5" />
                Assumir conversa
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div ref={chatContainerRef} className="flex-1 overflow-y-auto bg-gray-50/50 px-4 py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedConv}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-2.5"
            >
              {conv.messages.map((msg, i) => (
                <MsgBubble key={`${selectedConv}-${i}`} msg={msg} delay={i * 0.08} />
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: conv.messages.length * 0.08 + 0.3 }}
                className="flex items-center gap-2 py-1"
              >
                <div className="h-px flex-1 bg-border/30" />
                <span className="flex items-center gap-1 text-[10px] font-medium text-violet-500">
                  <Bot className="h-3 w-3" />
                  {conv.handler === "ia" ? "IA respondendo automaticamente" : "Atendimento humano ativo"}
                </span>
                <div className="h-px flex-1 bg-border/30" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 border-t border-border/30 px-4 py-3">
          <div className="flex-1 rounded-lg bg-gray-100 px-3 py-2 text-xs text-muted">
            {conv.handler === "ia"
              ? "A IA está atendendo... Clique em \"Assumir\" para intervir"
              : "Você está atendendo esta conversa"}
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Send className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MsgBubble({ msg, delay }: { msg: { from: "patient" | "ai"; text: string; time: string }; delay: number }) {
  const isP = msg.from === "patient";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className={`flex ${isP ? "justify-end" : "justify-start"}`}
    >
      <div className={`max-w-[75%] rounded-xl px-3 py-2 text-[13px] shadow-sm ${isP ? "bg-primary text-white" : "bg-white text-foreground ring-1 ring-border/20"}`}>
        {!isP && <span className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold text-violet-500"><Bot className="h-3 w-3" /> Clin 360</span>}
        <p>{msg.text}</p>
        <span className={`mt-1 block text-right text-[10px] ${isP ? "text-white/70" : "text-muted"}`}>{msg.time}</span>
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/*  AGENDA DEMO                                                        */
/* ================================================================== */

const weekDays = ["Seg 26", "Ter 27", "Qua 28", "Qui 29", "Sex 30"];
const timeSlots = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

const appts = [
  { day: 0, time: 0, name: "Maria Silva", doctor: "Dra. Ana", spec: "Dermato", c: "bg-pink-100 text-pink-700 border-pink-200" },
  { day: 0, time: 2, name: "Pedro Rocha", doctor: "Dr. Carlos", spec: "Cardio", c: "bg-blue-100 text-blue-700 border-blue-200" },
  { day: 0, time: 4, name: "Lúcia Ferreira", doctor: "Dra. Ana", spec: "Dermato", c: "bg-pink-100 text-pink-700 border-pink-200" },
  { day: 1, time: 1, name: "Roberto Alves", doctor: "Dr. Marcos", spec: "Orto", c: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { day: 1, time: 3, name: "Carla Mendes", doctor: "Dr. Carlos", spec: "Cardio", c: "bg-blue-100 text-blue-700 border-blue-200" },
  { day: 1, time: 5, name: "Amanda Reis", doctor: "Dra. Ana", spec: "Dermato", c: "bg-pink-100 text-pink-700 border-pink-200" },
  { day: 2, time: 0, name: "José Oliveira", doctor: "Dra. Ana", spec: "Dermato", c: "bg-pink-100 text-pink-700 border-pink-200" },
  { day: 2, time: 2, name: "Fernanda Lima", doctor: "Dr. Marcos", spec: "Orto", c: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { day: 2, time: 5, name: "Paulo Santos", doctor: "Dr. Carlos", spec: "Cardio", c: "bg-blue-100 text-blue-700 border-blue-200" },
  { day: 3, time: 1, name: "Beatriz Costa", doctor: "Dra. Ana", spec: "Dermato", c: "bg-pink-100 text-pink-700 border-pink-200" },
  { day: 3, time: 4, name: "André Souza", doctor: "Dr. Marcos", spec: "Orto", c: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { day: 3, time: 6, name: "Renata Dias", doctor: "Dr. Carlos", spec: "Cardio", c: "bg-blue-100 text-blue-700 border-blue-200" },
  { day: 4, time: 0, name: "Mariana R.", doctor: "Dr. Carlos", spec: "Cardio", c: "bg-blue-100 text-blue-700 border-blue-200" },
  { day: 4, time: 2, name: "Ricardo G.", doctor: "Dra. Ana", spec: "Dermato", c: "bg-pink-100 text-pink-700 border-pink-200" },
  { day: 4, time: 5, name: "Juliana M.", doctor: "Dr. Marcos", spec: "Orto", c: "bg-emerald-100 text-emerald-700 border-emerald-200" },
];

function AgendaDemo() {
  const [doc, setDoc] = useState("todos");
  const [hovered, setHovered] = useState<string | null>(null);

  const docMap: Record<string, string> = { ana: "Dra. Ana", carlos: "Dr. Carlos", marcos: "Dr. Marcos" };
  const filtered = doc === "todos" ? appts : appts.filter((a) => a.doctor === docMap[doc]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-[480px] flex-col md:h-[520px]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Semana 26-30 Mai</h3>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
            {filtered.length} consultas
          </span>
        </div>
        <div className="flex gap-1.5">
          {[
            { id: "todos", label: "Todos", cl: "bg-gray-100 text-gray-700" },
            { id: "ana", label: "Dra. Ana", cl: "bg-pink-100 text-pink-700" },
            { id: "carlos", label: "Dr. Carlos", cl: "bg-blue-100 text-blue-700" },
            { id: "marcos", label: "Dr. Marcos", cl: "bg-emerald-100 text-emerald-700" },
          ].map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDoc(d.id)}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                doc === d.id ? d.cl + " ring-1 ring-current/20" : "bg-gray-50 text-muted hover:bg-gray-100"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid min-w-[600px] grid-cols-[60px_repeat(5,1fr)]">
          <div className="sticky top-0 z-10 border-b border-border/30 bg-gray-50" />
          {weekDays.map((day, i) => (
            <div key={day} className={`sticky top-0 z-10 border-b border-l border-border/30 bg-gray-50 px-2 py-2 text-center text-[12px] font-semibold ${i === 2 ? "text-primary" : "text-foreground"}`}>
              {day}
              {i === 2 && <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" />}
            </div>
          ))}

          {timeSlots.map((time, ti) => (
            <Fragment key={`row-${ti}`}>
              <div className="border-b border-border/20 px-2 py-3 text-right text-[11px] font-medium text-muted">{time}</div>
              {weekDays.map((_, di) => {
                const a = filtered.find((x) => x.day === di && x.time === ti);
                const key = `${di}-${ti}`;
                return (
                  <div key={key} className="relative border-b border-l border-border/20 px-1 py-1">
                    {a && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.03 * (di + ti) }}
                        onMouseEnter={() => setHovered(key)}
                        onMouseLeave={() => setHovered(null)}
                        className={`cursor-pointer rounded-md border px-1.5 py-1 transition-all hover:shadow-md ${a.c}`}
                      >
                        <p className="truncate text-[10px] font-semibold">{a.name}</p>
                        <p className="truncate text-[9px] opacity-80">{a.spec}</p>
                        {hovered === key && (
                          <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-full left-0 z-20 mt-1 w-44 rounded-lg bg-foreground p-2.5 text-[11px] text-white shadow-xl"
                          >
                            <p className="font-semibold">{a.name}</p>
                            <p className="mt-0.5 text-white/70">{a.doctor}</p>
                            <p className="text-white/70">{a.spec} • {time}</p>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

import { Fragment } from "react";

/* ================================================================== */
/*  DASHBOARD DEMO                                                     */
/* ================================================================== */

const kpis = [
  { label: "Atendimentos Hoje", value: "47", change: "+12%", icon: MessageSquare, color: "bg-primary/10 text-primary" },
  { label: "Atendidos pela IA", value: "38", sub: "81% do total", change: "+8%", icon: Bot, color: "bg-violet-100 text-violet-600" },
  { label: "Tempo Médio", value: "4s", change: "-23%", icon: Clock, color: "bg-emerald-100 text-emerald-600" },
  { label: "Agendamentos", value: "23", change: "+18%", icon: Calendar, color: "bg-amber-100 text-amber-600" },
  { label: "Novos Pacientes", value: "8", change: "+33%", icon: UserPlus, color: "bg-pink-100 text-pink-600" },
  { label: "Satisfação", value: "4.9", sub: "⭐ de 5", change: "+2%", icon: Star, color: "bg-yellow-100 text-yellow-600" },
];

const chartData = [
  { label: "Seg", ia: 32, humano: 11 },
  { label: "Ter", ia: 38, humano: 9 },
  { label: "Qua", ia: 45, humano: 13 },
  { label: "Qui", ia: 41, humano: 8 },
  { label: "Sex", ia: 47, humano: 10 },
  { label: "Sáb", ia: 22, humano: 5 },
];

const activity = [
  { text: "Maria Silva agendou Dermatologia", time: "agora", icon: Calendar, color: "text-pink-500" },
  { text: "IA respondeu João em 3s", time: "2 min", icon: Zap, color: "text-primary" },
  { text: "Ana Costa remarcou consulta", time: "5 min", icon: ArrowRightLeft, color: "text-amber-500" },
  { text: "Lembrete enviado: Pedro Rocha", time: "8 min", icon: Bell, color: "text-emerald-500" },
  { text: "Fernanda confirmou presença", time: "12 min", icon: CheckCircle2, color: "text-green-500" },
  { text: "Novo lead pelo Widget", time: "15 min", icon: Globe, color: "text-indigo-500" },
];

function DashboardDemo() {
  const maxBar = Math.max(...chartData.map((d) => d.ia + d.humano));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-[480px] flex-col gap-4 overflow-y-auto p-4 md:h-[520px] md:p-5">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-border/30">
            <div className="flex items-center justify-between">
              <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${kpi.color}`}>
                <kpi.icon className="h-3.5 w-3.5" />
              </div>
              <span className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600">
                <TrendingUp className="h-2.5 w-2.5" />{kpi.change}
              </span>
            </div>
            <p className="mt-1.5 text-xl font-extrabold text-foreground">{kpi.value}</p>
            <p className="text-[10px] text-muted">{kpi.label}</p>
            {kpi.sub && <p className="text-[9px] font-semibold text-violet-500">{kpi.sub}</p>}
          </motion.div>
        ))}
      </div>

      {/* Chart + Feed */}
      <div className="grid flex-1 gap-3 md:grid-cols-[1fr_240px]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-border/30">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-bold text-foreground">IA vs Humano — Semana</h4>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[11px] text-muted"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-primary" /> IA</span>
              <span className="flex items-center gap-1 text-[11px] text-muted"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-amber-400" /> Humano</span>
            </div>
          </div>
          <div className="flex h-36 items-end gap-3">
            {chartData.map((d, i) => (
              <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex w-full flex-col items-center gap-[2px]">
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(d.humano / maxBar) * 120}px` }} transition={{ delay: 0.5 + i * 0.08, duration: 0.6 }} className="w-full max-w-[24px] rounded-t-md bg-amber-400" />
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(d.ia / maxBar) * 120}px` }} transition={{ delay: 0.5 + i * 0.08, duration: 0.6 }} className="w-full max-w-[24px] rounded-t-md bg-primary" />
                </div>
                <span className="text-[10px] font-medium text-muted">{d.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="rounded-xl bg-white p-3.5 shadow-sm ring-1 ring-border/30">
          <h4 className="mb-2.5 text-sm font-bold text-foreground">Atividade</h4>
          <div className="flex flex-col gap-2.5">
            {activity.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }} className="flex items-start gap-2">
                <a.icon className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${a.color}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] leading-tight text-foreground">{a.text}</p>
                  <p className="text-[9px] text-muted">{a.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/*  CRM DEMO                                                           */
/* ================================================================== */

const pipelineStages = [
  {
    name: "Novo Lead",
    color: "bg-blue-50 border-blue-200",
    headerColor: "bg-blue-500",
    patients: [
      { name: "Camila Reis", source: "Instagram", time: "hoje", tag: "Dermato" },
      { name: "Lucas Ferraz", source: "Widget", time: "hoje", tag: "Cardio" },
      { name: "Patrícia Nunes", source: "WhatsApp", time: "ontem", tag: "Orto" },
    ],
  },
  {
    name: "Agendou",
    color: "bg-amber-50 border-amber-200",
    headerColor: "bg-amber-500",
    patients: [
      { name: "Maria Silva", source: "WhatsApp", time: "hoje", tag: "Dermato" },
      { name: "João Santos", source: "WhatsApp", time: "hoje", tag: "Cardio" },
    ],
  },
  {
    name: "Compareceu",
    color: "bg-emerald-50 border-emerald-200",
    headerColor: "bg-emerald-500",
    patients: [
      { name: "Fernanda Lima", source: "WhatsApp", time: "ontem", tag: "Dermato" },
      { name: "Roberto Alves", source: "Email", time: "ontem", tag: "Orto" },
      { name: "Carlos Mendes", source: "WhatsApp", time: "2 dias", tag: "Cardio" },
    ],
  },
  {
    name: "Retorno",
    color: "bg-violet-50 border-violet-200",
    headerColor: "bg-violet-500",
    patients: [
      { name: "Ana Costa", source: "WhatsApp", time: "3 dias", tag: "Dermato" },
    ],
  },
];

function CrmDemo() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-[480px] flex-col md:h-[520px]">
      <div className="flex items-center justify-between border-b border-border/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Pipeline de Pacientes</h3>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-muted">
          <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> Esta semana</span>
          <span className="font-semibold text-foreground">9 pacientes</span>
        </div>
      </div>

      <div className="flex flex-1 gap-3 overflow-x-auto p-4">
        {pipelineStages.map((stage, si) => (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.12 }}
            className="flex w-[220px] flex-shrink-0 flex-col rounded-xl border border-border/30 bg-gray-50/50"
          >
            <div className="flex items-center justify-between px-3 py-2.5">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${stage.headerColor}`} />
                <span className="text-[12px] font-bold text-foreground">{stage.name}</span>
              </div>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-600">
                {stage.patients.length}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-2 pb-2">
              {stage.patients.map((p, pi) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: si * 0.12 + pi * 0.08 }}
                  className={`cursor-pointer rounded-lg border p-2.5 transition-all hover:shadow-md ${stage.color}`}
                >
                  <p className="text-[12px] font-semibold text-foreground">{p.name}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="rounded-full bg-white/80 px-1.5 py-0.5 text-[9px] font-medium text-muted">
                      {p.source}
                    </span>
                    <span className="text-[9px] text-muted">{p.time}</span>
                  </div>
                  <span className="mt-1.5 inline-block rounded-full bg-white/80 px-2 py-0.5 text-[9px] font-semibold text-muted">
                    {p.tag}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/*  MULTICANAL DEMO                                                    */
/* ================================================================== */

const channelData = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    msgs: 156,
    percentage: 65,
    status: "Conectado" as const,
    lastMsg: "Maria: Quero marcar uma consulta",
    features: ["IA 24/7", "Áudio → Texto", "Lembretes", "Agendamento"],
  },
  {
    name: "Instagram",
    icon: Camera,
    color: "bg-purple-500",
    lightColor: "bg-purple-50 text-purple-700 border-purple-200",
    msgs: 43,
    percentage: 18,
    status: "Conectado" as const,
    lastMsg: "Ana: Vi o post de vocês sobre...",
    features: ["DM automático", "Stories reply", "Link na bio"],
  },
  {
    name: "Email",
    icon: Mail,
    color: "bg-blue-500",
    lightColor: "bg-blue-50 text-blue-700 border-blue-200",
    msgs: 28,
    percentage: 12,
    status: "Conectado" as const,
    lastMsg: "Carlos: Gostaria de informações...",
    features: ["Auto-resposta", "Templates", "Anexos"],
  },
  {
    name: "Widget",
    icon: Globe,
    color: "bg-indigo-500",
    lightColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    msgs: 12,
    percentage: 5,
    status: "Conectado" as const,
    lastMsg: "Visitante: Olá, quero saber mais...",
    features: ["Chat no site", "Captura de lead", "Personalização"],
  },
];

function MulticanalDemo() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-[480px] flex-col gap-4 overflow-y-auto p-4 md:h-[520px] md:p-5">
      {/* Total bar */}
      <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-primary/10 to-emerald-500/10 px-4 py-3">
        <div>
          <p className="text-sm font-bold text-foreground">239 mensagens hoje</p>
          <p className="text-[11px] text-muted">Todos os canais unificados no mesmo inbox</p>
        </div>
        <div className="flex items-center gap-1">
          {channelData.map((ch) => (
            <div key={ch.name} className="flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-sm">
              <div className={`h-2 w-2 rounded-full ${ch.color}`} />
              <span className="text-[10px] font-medium text-foreground">{ch.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Channel cards */}
      <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
        {channelData.map((ch, i) => {
          const Icon = ch.icon;
          return (
            <motion.div
              key={ch.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex flex-col rounded-xl border p-4 transition-all hover:shadow-lg ${ch.lightColor}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${ch.color} text-white`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-foreground">{ch.name}</p>
                    <p className="text-[10px] text-muted">{ch.msgs} msgs hoje</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  <Circle className="h-1.5 w-1.5 fill-emerald-500 text-emerald-500" />
                  {ch.status}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="h-1.5 w-full rounded-full bg-white/50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${ch.percentage}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                    className={`h-full rounded-full ${ch.color}`}
                  />
                </div>
                <p className="mt-1 text-[10px] text-muted">{ch.percentage}% do tráfego</p>
              </div>

              {/* Last message */}
              <div className="mt-2 rounded-lg bg-white/60 px-2.5 py-1.5">
                <p className="truncate text-[11px] text-foreground">{ch.lastMsg}</p>
              </div>

              {/* Features */}
              <div className="mt-2 flex flex-wrap gap-1">
                {ch.features.map((f) => (
                  <span key={f} className="rounded-full bg-white/60 px-2 py-0.5 text-[9px] font-medium text-muted">
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/*  LEMBRETES DEMO                                                     */
/* ================================================================== */

const reminderSteps = [
  { icon: Calendar, title: "Consulta agendada", desc: "Maria Silva — Dra. Ana Beatriz\nQuarta, 28/05 às 15h", status: "done" as const, time: "Seg 26/05, 14:36" },
  { icon: Bell, title: "Lembrete enviado", desc: "WhatsApp automático 24h antes", status: "done" as const, time: "Ter 27/05, 15:00" },
  { icon: PhoneCall, title: "Paciente recebe", desc: "\"Olá Maria! Sua consulta é amanhã às 15h. Confirma?\"", status: "done" as const, time: "Ter 27/05, 15:00" },
  { icon: Check, title: "Paciente confirma", desc: "Status → Confirmada automaticamente", status: "active" as const, time: "Ter 27/05, 15:02" },
  { icon: Stethoscope, title: "Dia da consulta", desc: "No-show reduzido em 60%", status: "pending" as const, time: "Qua 28/05, 15:00" },
];

const reminderPatients = [
  { name: "Maria Silva", status: "Confirmada", time: "15:00", color: "text-emerald-600 bg-emerald-50" },
  { name: "João Santos", status: "Confirmada", time: "14:00", color: "text-emerald-600 bg-emerald-50" },
  { name: "Pedro Rocha", status: "Aguardando", time: "14:30", color: "text-amber-600 bg-amber-50" },
  { name: "Carla Mendes", status: "Confirmada", time: "16:00", color: "text-emerald-600 bg-emerald-50" },
  { name: "André Souza", status: "Cancelou", time: "15:30", color: "text-red-500 bg-red-50" },
];

function LembretesDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    reminderSteps.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i), i * 1500));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-[480px] flex-col md:h-[520px] md:flex-row">
      {/* Timeline */}
      <div className="flex-1 overflow-y-auto p-4 md:p-5">
        <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
          <Bell className="h-4 w-4 text-primary" /> Jornada do Lembrete
        </h4>
        <div className="relative flex flex-col">
          <div className="absolute top-4 bottom-4 left-[15px] w-0.5 bg-border/40" />
          {reminderSteps.map((s, i) => {
            const visible = i <= step;
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4 }} className="relative flex gap-3 pb-5">
                <div className={`relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                  s.status === "done" ? "bg-emerald-100 text-emerald-600" : s.status === "active" ? "bg-primary/15 text-primary ring-2 ring-primary/30" : "bg-gray-100 text-muted"
                }`}>
                  {s.status === "done" ? <CheckCircle2 className="h-4 w-4" /> : <s.icon className={`h-4 w-4 ${s.status === "active" ? "animate-pulse" : ""}`} />}
                </div>
                <div>
                  <p className={`text-[13px] font-semibold ${s.status === "pending" ? "text-muted" : "text-foreground"}`}>{s.title}</p>
                  <p className="mt-0.5 whitespace-pre-line text-[11px] text-muted">{s.desc}</p>
                  <p className="mt-1 text-[10px] text-muted/60">{s.time}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Patients panel */}
      <div className="w-full border-t border-border/30 md:w-[240px] md:border-t-0 md:border-l">
        <div className="border-b border-border/30 px-4 py-3">
          <h4 className="text-sm font-bold text-foreground">Amanhã</h4>
          <p className="text-[11px] text-muted">5 consultas</p>
        </div>
        <div className="flex flex-col">
          {reminderPatients.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.12 }} className="flex items-center justify-between border-b border-border/20 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-[10px] font-semibold text-gray-600">{p.name.charAt(0)}</div>
                <div>
                  <p className="text-[11px] font-semibold text-foreground">{p.name}</p>
                  <p className="text-[9px] text-muted">{p.time}</p>
                </div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${p.color}`}>{p.status}</span>
            </motion.div>
          ))}
        </div>
        <div className="p-3">
          <div className="rounded-lg bg-emerald-50 p-3 text-center">
            <p className="text-2xl font-extrabold text-emerald-600">80%</p>
            <p className="text-[11px] font-medium text-emerald-700">Confirmação</p>
            <p className="text-[9px] text-emerald-600/70">+60% vs sem lembretes</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/*  FINANCEIRO DEMO                                                    */
/* ================================================================== */

const finKpis = [
  { label: "Faturamento do Mês", value: "R$ 45.280", change: "+14%", icon: DollarSign, color: "bg-emerald-100 text-emerald-600" },
  { label: "Recebido", value: "R$ 38.750", change: "+11%", icon: CheckCircle2, color: "bg-primary/10 text-primary" },
  { label: "A Receber", value: "R$ 6.530", change: "-8%", icon: Clock, color: "bg-amber-100 text-amber-600" },
  { label: "Ticket Médio", value: "R$ 185", change: "+5%", icon: TrendingUp, color: "bg-violet-100 text-violet-600" },
];

const finTransactions = [
  { name: "Maria Silva", service: "Consulta Dermato", value: "R$ 250", method: "PIX", status: "Pago" as const },
  { name: "João Santos", service: "Retorno Cardio", value: "R$ 180", method: "Convênio", status: "Pago" as const },
  { name: "Ana Costa", service: "Exame Sangue", value: "R$ 95", method: "Cartão", status: "Pendente" as const },
  { name: "Carlos Oliveira", service: "Consulta Orto", value: "R$ 220", method: "PIX", status: "Pago" as const },
  { name: "Fernanda Lima", service: "Consulta Dermato", value: "R$ 250", method: "Convênio", status: "Pendente" as const },
  { name: "Pedro Rocha", service: "Consulta Cardio", value: "R$ 200", method: "Cartão", status: "Pago" as const },
];

const finPaymentMethods = [
  { label: "Convênio", pct: 45, color: "bg-primary" },
  { label: "PIX", pct: 30, color: "bg-emerald-500" },
  { label: "Cartão", pct: 20, color: "bg-amber-500" },
  { label: "Particular", pct: 5, color: "bg-violet-500" },
];

function FinanceiroDemo() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-[480px] flex-col gap-4 overflow-y-auto p-4 md:h-[520px] md:p-5">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-foreground">Maio 2026</h3>
        </div>
        <div className="flex gap-1.5">
          {["Este mês", "Último mês", "Trimestre"].map((f, i) => (
            <span
              key={f}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                i === 0
                  ? "bg-primary/10 text-primary"
                  : "bg-gray-100 text-muted"
              }`}
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {finKpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-border/30">
            <div className="flex items-center justify-between">
              <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${kpi.color}`}>
                <kpi.icon className="h-3.5 w-3.5" />
              </div>
              <span className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600">
                <TrendingUp className="h-2.5 w-2.5" />{kpi.change}
              </span>
            </div>
            <p className="mt-1.5 text-lg font-extrabold text-foreground">{kpi.value}</p>
            <p className="text-[10px] text-muted">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Transactions + Pie chart */}
      <div className="grid flex-1 gap-3 md:grid-cols-[1fr_220px]">
        {/* Transactions list */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="rounded-xl bg-white shadow-sm ring-1 ring-border/30">
          <div className="border-b border-border/30 px-4 py-2.5">
            <h4 className="text-[13px] font-bold text-foreground">Últimas Transações</h4>
          </div>
          <div className="flex flex-col">
            {finTransactions.map((tx, i) => (
              <motion.div
                key={tx.name + tx.service}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center justify-between border-b border-border/20 px-4 py-2"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-[10px] font-semibold text-gray-600">
                    {tx.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-foreground">{tx.name}</p>
                    <p className="text-[9px] text-muted">{tx.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] font-medium text-muted">
                    {tx.method}
                  </span>
                  <span className="text-[11px] font-bold text-foreground">{tx.value}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                      tx.status === "Pago"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pie chart mockup */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-border/30">
          <h4 className="mb-3 text-[13px] font-bold text-foreground">Formas de Pagamento</h4>

          {/* Donut chart mockup */}
          <div className="relative mx-auto mb-4 flex h-28 w-28 items-center justify-center">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
              {(() => {
                let offset = 0;
                return finPaymentMethods.map((m) => {
                  const dash = m.pct;
                  const gap = 100 - dash;
                  const el = (
                    <circle
                      key={m.label}
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      strokeWidth="3.5"
                      strokeDasharray={`${dash} ${gap}`}
                      strokeDashoffset={-offset}
                      className={m.color.replace("bg-", "stroke-")}
                      strokeLinecap="round"
                    />
                  );
                  offset += dash;
                  return el;
                });
              })()}
            </svg>
            <div className="absolute text-center">
              <p className="text-sm font-extrabold text-foreground">100%</p>
              <p className="text-[8px] text-muted">total</p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2">
            {finPaymentMethods.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.08 }} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-sm ${m.color}`} />
                  <span className="text-[11px] text-foreground">{m.label}</span>
                </div>
                <span className="text-[11px] font-semibold text-foreground">{m.pct}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/*  RECEITAS DEMO                                                      */
/* ================================================================== */

const receitaMedications = [
  { name: "Losartana Potássica 50mg", dosage: "1 comprimido, 1x ao dia, por 30 dias" },
  { name: "Atenolol 25mg", dosage: "1 comprimido, 1x ao dia, pela manhã" },
  { name: "Sinvastatina 20mg", dosage: "1 comprimido, à noite, por 60 dias" },
];

const receitaList = [
  { patient: "Maria Silva", doctor: "Dra. Ana Beatriz", date: "21/05/2026", status: "Enviada" as const },
  { patient: "João Santos", doctor: "Dr. Carlos Lima", date: "21/05/2026", status: "Enviada" as const },
  { patient: "Pedro Rocha", doctor: "Dr. Carlos Lima", date: "20/05/2026", status: "Enviada" as const },
  { patient: "Fernanda Lima", doctor: "Dra. Ana Beatriz", date: "20/05/2026", status: "Rascunho" as const },
  { patient: "Ana Costa", doctor: "Dr. Marcos Alves", date: "19/05/2026", status: "Enviada" as const },
];

function ReceitasDemo() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-[480px] flex-col md:h-[520px] md:flex-row">
      {/* Prescription form view */}
      <div className="flex-1 overflow-y-auto p-4 md:p-5">
        <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
          <Stethoscope className="h-4 w-4 text-primary" /> Receita Digital
        </h4>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border/40 bg-white p-5 shadow-sm"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-border/30 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-emerald-400">
                  <span className="text-[9px] font-bold text-white">C</span>
                </div>
                <div>
                  <p className="text-[12px] font-bold text-foreground">Clínica Saúde Viva</p>
                  <p className="text-[9px] text-muted">Rua das Flores, 123 — São Paulo, SP</p>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-muted">21/05/2026</p>
          </div>

          {/* Doctor & patient */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[9px] font-semibold text-muted uppercase">Médico(a)</p>
              <p className="text-[12px] font-semibold text-foreground">Dra. Ana Beatriz</p>
              <p className="text-[9px] text-muted">CRM 12345/SP</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold text-muted uppercase">Paciente</p>
              <p className="text-[12px] font-semibold text-foreground">Maria Silva</p>
              <p className="text-[9px] text-muted">CPF ***.***.***-12</p>
            </div>
          </div>

          {/* Medications */}
          <div className="mt-4">
            <p className="mb-2 text-[9px] font-semibold text-muted uppercase">Medicamentos</p>
            <div className="flex flex-col gap-2">
              {receitaMedications.map((med, i) => (
                <motion.div
                  key={med.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  className="rounded-lg bg-gray-50 px-3 py-2"
                >
                  <div className="flex items-start gap-2">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold text-foreground">{med.name}</p>
                      <p className="text-[10px] text-muted">{med.dosage}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Signature */}
          <div className="mt-4 flex items-center justify-between border-t border-border/30 pt-3">
            <div className="text-center">
              <div className="mx-auto mb-1 h-px w-28 bg-border/50" />
              <p className="text-[10px] font-semibold text-foreground">Dra. Ana Beatriz</p>
              <p className="text-[8px] text-muted">CRM 12345/SP</p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1">
              <Shield className="h-3 w-3 text-emerald-600" />
              <span className="text-[9px] font-semibold text-emerald-600">Assinada digitalmente</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent prescriptions list */}
      <div className="w-full border-t border-border/30 md:w-[260px] md:border-t-0 md:border-l">
        <div className="border-b border-border/30 px-4 py-3">
          <h4 className="text-sm font-bold text-foreground">Receitas Recentes</h4>
          <p className="text-[11px] text-muted">{receitaList.length} receitas</p>
        </div>
        <div className="flex flex-col">
          {receitaList.map((r, i) => (
            <motion.div
              key={r.patient + r.date}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center justify-between border-b border-border/20 px-4 py-2.5"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-foreground">{r.patient}</p>
                <p className="truncate text-[9px] text-muted">{r.doctor} • {r.date}</p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-1.5">
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                    r.status === "Enviada"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-gray-100 text-muted"
                  }`}
                >
                  {r.status}
                </span>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1 text-[9px] font-medium text-muted transition-colors hover:bg-gray-100 hover:text-foreground"
                >
                  Imprimir
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="p-3">
          <div className="rounded-lg bg-primary/5 p-3 text-center">
            <p className="text-2xl font-extrabold text-primary">127</p>
            <p className="text-[11px] font-medium text-primary">Receitas este mês</p>
            <p className="text-[9px] text-primary/60">98% enviadas digitalmente</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
