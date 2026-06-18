"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  MessageCircle,
  CalendarCheck,
  Brain,
  LayoutDashboard,
  Bell,
  ShieldCheck,
  Sparkles,
  LogIn,
  Stethoscope,
} from "lucide-react";
import LogoMark from "@/components/logo-mark";

const solutionsItems = [
  {
    icon: MessageCircle,
    label: "WhatsApp IA 24/7",
    description: "Atendimento automático que agenda e responde",
    href: "#features",
  },
  {
    icon: CalendarCheck,
    label: "Agendamento Inteligente",
    description: "Agenda, confirma e envia lembretes",
    href: "#features",
  },
  {
    icon: Brain,
    label: "IA Conversacional",
    description: "Entende áudio, texto e contexto do paciente",
    href: "#demo",
  },
  {
    icon: LayoutDashboard,
    label: "Painel Completo",
    description: "Inbox, agenda, CRM e financeiro em um só lugar",
    href: "#features",
  },
  {
    icon: Bell,
    label: "Lembretes Automáticos",
    description: "Reduz no-show com confirmação via WhatsApp",
    href: "#features",
  },
  {
    icon: ShieldCheck,
    label: "Segurança e LGPD",
    description: "Dados protegidos, criptografia e conformidade",
    href: "#security",
  },
];

const navLinks = [
  { label: "Planos", href: "#pricing" },
  { label: "Resultados", href: "#cases" },
  { label: "Como Funciona", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    setSolutionsOpen(false);
    setMobileSolutionsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDropdownEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSolutionsOpen(true);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => setSolutionsOpen(false), 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-b border-white/50"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-[72px]">
          {/* Logo + nicho */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-2.5"
          >
            <LogoMark
              gradientId="clinGradHeader"
              className="h-9 w-9 transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span
                className={`text-lg font-bold leading-tight transition-colors duration-300 ${
                  scrolled ? "text-foreground" : "text-white"
                }`}
              >
                Clin
                <span
                  className={
                    scrolled
                      ? "bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent"
                      : "text-white"
                  }
                >
                  360
                </span>
              </span>
              <span
                className={`hidden text-[10px] font-medium leading-tight tracking-wide uppercase sm:block transition-colors duration-300 ${
                  scrolled ? "text-muted" : "text-white/60"
                }`}
              >
                <Stethoscope className="mr-0.5 inline h-2.5 w-2.5" />
                IA para Clínicas
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {/* Soluções dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                onClick={() => setSolutionsOpen((prev) => !prev)}
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  scrolled
                    ? "text-foreground/70 hover:text-foreground hover:bg-gray-100"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Soluções
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    solutionsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {solutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-1/2 top-full mt-2 w-[520px] -translate-x-1/2 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-black/[0.08]"
                  >
                    <div className="grid grid-cols-2 gap-1">
                      {solutionsItems.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="group/item flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-gray-50"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/item:bg-primary group-hover/item:text-white">
                            <item.icon className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {item.label}
                            </p>
                            <p className="mt-0.5 text-xs leading-snug text-muted">
                              {item.description}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>

                    <div className="mt-1 border-t border-gray-100 pt-2 px-3 pb-1">
                      <a
                        href="#features"
                        onClick={(e) => handleNavClick(e, "#features")}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                      >
                        Ver todas as funcionalidades
                        <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  scrolled
                    ? "text-foreground/70 hover:text-foreground hover:bg-gray-100"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className="hidden items-center gap-2.5 lg:flex">
            {/* LGPD badge */}
            <div
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors duration-300 ${
                scrolled
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-white/10 text-white/70"
              }`}
            >
              <ShieldCheck className="h-3 w-3" />
              LGPD
            </div>

            {/* Entrar */}
            <a
              href="https://app.clin360.com.br/login"
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                scrolled
                  ? "text-foreground/70 hover:text-foreground hover:bg-gray-100"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <LogIn className="h-4 w-4" />
              Entrar
            </a>

            {/* CTA principal */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className={`group relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] ${
                scrolled
                  ? "bg-primary text-white shadow-sm shadow-primary/25 hover:bg-primary-dark hover:shadow-md hover:shadow-primary/30"
                  : "bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/10"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Teste grátis
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                  scrolled
                    ? "bg-white/20 text-white"
                    : "bg-primary/15 text-primary"
                }`}
              >
                7 dias
              </span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors lg:hidden ${
              scrolled
                ? "text-foreground hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 top-16 z-40 flex flex-col bg-white lg:hidden"
          >
            <nav className="flex-1 overflow-y-auto px-5 py-6">
              {/* Soluções accordion */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => setMobileSolutionsOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-gray-50"
                >
                  Soluções
                  <ChevronDown
                    className={`h-4 w-4 text-muted transition-transform duration-200 ${
                      mobileSolutionsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileSolutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1 pb-3 pl-2">
                        {solutionsItems.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-50"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <item.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {item.label}
                              </p>
                              <p className="text-xs text-muted">
                                {item.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other links */}
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.2 }}
                  className="flex items-center rounded-lg px-3 py-3.5 text-base font-medium text-foreground/80 transition-colors hover:bg-gray-50 hover:text-foreground border-b border-gray-100"
                >
                  {link.label}
                </motion.a>
              ))}

              {/* LGPD badge mobile */}
              <div className="mt-6 flex items-center justify-center gap-1.5 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                Dados protegidos conforme LGPD
              </div>
            </nav>

            {/* Mobile bottom CTAs */}
            <div className="border-t border-gray-100 px-5 py-5 space-y-3">
              <a
                href="https://app.clin360.com.br/login"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-base font-medium text-foreground transition-colors hover:bg-gray-50"
              >
                <LogIn className="h-4 w-4" />
                Entrar
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark"
              >
                <Sparkles className="h-4 w-4" />
                Teste grátis
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">
                  7 dias
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
