"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Check,
  CreditCard,
  QrCode,
  ShieldCheck,
  Users,
  Infinity,
  FileText,
  ChevronDown,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Plan data                                                          */
/* ------------------------------------------------------------------ */

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  includedProfessionals: string;
  features: string[];
  extraFeatures?: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    name: "Starter",
    description: "Para consultórios e profissionais autônomos",
    monthlyPrice: 497,
    annualPrice: 414,
    includedProfessionals: "1 profissional",
    features: [
      "WhatsApp IA 24/7 — 1.000 msgs/mês",
      "Agendamento automático",
      "Lembretes e confirmações por WhatsApp",
      "Inbox unificado",
      "Dashboard básico",
      "1 recepcionista/admin incluso",
      "Subdomínio Clin360",
    ],
    cta: "Começar teste grátis",
  },
  {
    name: "Profissional",
    description: "Para clínicas em crescimento",
    monthlyPrice: 1197,
    annualPrice: 998,
    includedProfessionals: "Até 3 profissionais",
    features: [
      "Tudo do Starter, mais:",
      "5.000 msgs de IA/mês",
      "4 canais (WhatsApp, Instagram, Email, Widget)",
      "CRM completo de pacientes",
      "Financeiro e faturamento",
      "Relatórios avançados",
      "3 recepcionistas/admins inclusos",
      "Domínio personalizado",
    ],
    cta: "Começar teste grátis",
    highlighted: true,
    badge: "Mais popular",
  },
  {
    name: "Enterprise",
    description: "Para redes e clínicas de grande porte",
    monthlyPrice: 3490,
    annualPrice: 2908,
    includedProfessionals: "Até 10 profissionais",
    features: [
      "Tudo do Profissional, mais:",
      "Mensagens de IA ilimitadas",
      "Multi-unidades",
      "Recepcionistas e admins ilimitados",
      "Marca própria completa",
      "API personalizada",
      "Suporte prioritário com gerente dedicado",
      "Onboarding e migração dedicados",
      "SLA 99.9%",
    ],
    cta: "Falar com consultor",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ for pricing                                                    */
/* ------------------------------------------------------------------ */

const pricingFAQ = [
  {
    question: "Preciso de mais profissionais do que o plano inclui?",
    answer:
      "Sem problema. Cada profissional adicional custa R$199/mês, independente do plano. Recepcionistas e admins extras custam R$99/mês cada (ilimitados no Enterprise).",
  },
  {
    question: "E se eu exceder o limite de mensagens?",
    answer:
      "No Starter, cada mensagem além das 1.000 custa R$0,15. No Profissional, o excedente é R$0,10 por mensagem. No Enterprise, as mensagens são ilimitadas — sem surpresas na fatura.",
  },
  {
    question: "Existe contrato de fidelidade?",
    answer:
      "Não. Todos os planos são sem fidelidade. Você pode cancelar a qualquer momento, sem multa. No plano anual, o cancelamento vale a partir do próximo ciclo.",
  },
  {
    question: "Como funciona o período de teste?",
    answer:
      "São 7 dias grátis com acesso completo a todas as funcionalidades do plano escolhido. Não pedimos cartão de crédito para iniciar o teste. Se gostar, escolhe a forma de pagamento.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "Aceitamos PIX (sem taxa) e cartão de crédito (com recorrência automática). No plano anual, o pagamento pode ser feito à vista via PIX com desconto adicional.",
  },
  {
    question: "Tem taxa de setup ou implantação?",
    answer:
      "Não. O setup é gratuito em todos os planos. Nossa equipe configura a clínica, importa os dados e treina a IA sem custo adicional.",
  },
  {
    question: "O que é o domínio personalizado?",
    answer:
      "No plano Profissional e Enterprise, sua clínica pode usar um endereço próprio (ex: painel.suaclinica.com.br) em vez do subdomínio padrão. No Starter, o acesso é via suaclinica.clin360.com.br.",
  },
  {
    question: "O que é marca própria?",
    answer:
      "Exclusivo do Enterprise: o sistema fica 100% com a identidade da sua clínica. Painel, e-mails e mensagens aparecem com a sua marca, sem nenhuma menção à Clin360.",
  },
];

/* ------------------------------------------------------------------ */
/*  Format helpers                                                     */
/* ------------------------------------------------------------------ */

function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR");
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-card py-20 md:py-28"
    >
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
            Planos que cabem{" "}
            <span className="gradient-text">na sua clínica</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            Sem fidelidade. Cancele quando quiser. Setup gratuito em todos os
            planos.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <span
            className={`text-sm font-medium transition-colors ${
              !isAnnual ? "text-foreground" : "text-muted"
            }`}
          >
            Mensal
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={isAnnual}
            onClick={() => setIsAnnual((prev) => !prev)}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              isAnnual ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                isAnnual ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>

          <span
            className={`text-sm font-medium transition-colors ${
              isAnnual ? "text-foreground" : "text-muted"
            }`}
          >
            Anual (2 meses grátis)
          </span>

          {isAnnual && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="ml-1 rounded-full bg-secondary/15 px-2.5 py-0.5 text-xs font-semibold text-secondary"
            >
              Economize 17%
            </motion.span>
          )}
        </motion.div>

        {/* Plans grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, idx) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              isAnnual={isAnnual}
              index={idx}
            />
          ))}
        </div>

        {/* Additional professionals banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5 text-center sm:px-8"
        >
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                Profissional adicional:
              </span>
              <span className="text-lg font-extrabold text-primary">
                +R$199
              </span>
              <span className="text-sm text-muted">/mês</span>
            </div>
            <div className="hidden h-4 w-px bg-primary/20 sm:block" />
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted" />
              <span className="text-sm font-semibold text-foreground">
                Admin/recepcionista extra:
              </span>
              <span className="text-lg font-extrabold text-muted">
                +R$99
              </span>
              <span className="text-sm text-muted">/mês</span>
            </div>
          </div>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted"
        >
          {[
            { icon: ShieldCheck, text: "Sem fidelidade" },
            { icon: FileText, text: "Setup gratuito" },
            { icon: CreditCard, text: "PIX ou Cartão" },
            { icon: QrCode, text: "7 dias grátis" },
          ].map((item) => (
            <span key={item.text} className="flex items-center gap-1.5">
              <item.icon className="h-4 w-4 text-secondary" />
              {item.text}
            </span>
          ))}
        </motion.div>

        {/* Pricing FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-16 max-w-2xl"
        >
          <h3 className="text-center text-xl font-bold text-foreground mb-6">
            Dúvidas sobre planos e pagamento
          </h3>
          <div className="space-y-2">
            {pricingFAQ.map((item) => (
              <PricingFAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Plan card                                                          */
/* ------------------------------------------------------------------ */

function PlanCard({
  plan,
  isAnnual,
  index,
}: {
  plan: Plan;
  isAnnual: boolean;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  const isHighlighted = plan.highlighted === true;

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className={`relative flex flex-col rounded-2xl transition-all duration-300 ${
        isHighlighted
          ? "scale-[1.03] ring-2 ring-primary shadow-xl lg:scale-105"
          : "glass-card"
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-primary px-4 py-1 text-xs font-bold text-white shadow-md">
            {plan.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div
        className={`rounded-t-2xl px-6 py-8 text-center ${
          isHighlighted ? "gradient-hero text-white" : "bg-white"
        }`}
      >
        <h3
          className={`text-xl font-bold ${
            isHighlighted ? "text-white" : "text-foreground"
          }`}
        >
          {plan.name}
        </h3>
        <p
          className={`mt-1 text-sm ${
            isHighlighted ? "text-white/80" : "text-muted"
          }`}
        >
          {plan.description}
        </p>

        {/* Included professionals */}
        <div
          className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            isHighlighted
              ? "bg-white/15 text-white"
              : "bg-primary/10 text-primary"
          }`}
        >
          <Users className="h-3 w-3" />
          {plan.includedProfessionals}
        </div>

        <p
          className={`mt-2 text-xs font-semibold ${
            isHighlighted ? "text-green-300" : "text-secondary"
          }`}
        >
          7 dias grátis para testar
        </p>

        <div className="mt-5">
          <span
            className={`text-4xl font-extrabold tracking-tight ${
              isHighlighted ? "text-white" : "text-foreground"
            }`}
          >
            R$ {formatPrice(price)}
          </span>
          <span
            className={`ml-1 text-sm ${
              isHighlighted ? "text-white/70" : "text-muted"
            }`}
          >
            /mês
          </span>
        </div>

        {isAnnual && (
          <p
            className={`mt-1 text-xs ${
              isHighlighted ? "text-white/50" : "text-muted"
            }`}
          >
            cobrado anualmente
          </p>
        )}
      </div>

      {/* Features */}
      <div
        className={`flex flex-1 flex-col px-6 py-6 ${
          isHighlighted ? "bg-white" : ""
        }`}
      >
        <ul className="flex-1 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <span className="text-sm text-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Messages highlight */}
        {plan.name === "Enterprise" ? (
          <div className="mt-5 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
            <Infinity className="h-4 w-4 shrink-0 text-secondary" />
            <span className="text-xs font-semibold text-secondary">
              Mensagens de IA ilimitadas
            </span>
          </div>
        ) : (
          <div className="mt-5 flex items-center gap-2 rounded-lg bg-sky-50 px-3 py-2">
            <Check className="h-4 w-4 shrink-0 text-primary" />
            <span className="text-xs font-semibold text-primary">
              {plan.name === "Starter" ? "1.000" : "5.000"} msgs de IA/mês
              incluídas
            </span>
          </div>
        )}

        {/* CTA */}
        <div className="mt-5">
          <a
            href="#contact"
            onClick={handleScroll}
            className={`flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] ${
              isHighlighted
                ? "bg-primary text-white shadow-lg hover:bg-primary-dark"
                : "border border-primary text-primary hover:bg-primary/5"
            }`}
          >
            {plan.cta}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pricing FAQ item                                                   */
/* ------------------------------------------------------------------ */

function PricingFAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-white transition-shadow hover:shadow-sm">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-medium text-foreground">{question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm leading-relaxed text-muted">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
