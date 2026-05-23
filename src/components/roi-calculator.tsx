"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Clock,
  Zap,
  Users,
  Bot,
  Calendar,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Slider config                                                      */
/* ------------------------------------------------------------------ */

interface SliderConfig {
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  prefix?: string;
  suffix?: string;
  formatValue: (v: number) => string;
}

const sliders: SliderConfig[] = [
  {
    label: "Atendimentos por dia",
    min: 10,
    max: 200,
    step: 5,
    defaultValue: 40,
    formatValue: (v) => `${v}`,
  },
  {
    label: "Recepcionistas dedicadas ao telefone/WhatsApp",
    min: 1,
    max: 6,
    step: 1,
    defaultValue: 2,
    formatValue: (v) => `${v}`,
  },
  {
    label: "Custo médio por recepcionista (R$/mês, com impostos)",
    min: 1500,
    max: 5000,
    step: 100,
    defaultValue: 2500,
    prefix: "R$ ",
    formatValue: (v) => `R$ ${v.toLocaleString("pt-BR")}`,
  },
  {
    label: "Valor médio por consulta",
    min: 100,
    max: 800,
    step: 50,
    defaultValue: 250,
    prefix: "R$ ",
    formatValue: (v) => `R$ ${v.toLocaleString("pt-BR")}`,
  },
];

function getPlanForClinic(atendimentosDia: number) {
  if (atendimentosDia <= 30)
    return { name: "Starter", price: 497 };
  if (atendimentosDia <= 100)
    return { name: "Profissional", price: 997 };
  return { name: "Enterprise", price: 2490 };
}

/* ------------------------------------------------------------------ */
/*  Formatting helpers                                                 */
/* ------------------------------------------------------------------ */

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function RoiCalculator() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });

  const [values, setValues] = useState(sliders.map((s) => s.defaultValue));

  const atendimentosDia = values[0];
  const recepcionistas = values[1];
  const custoMedio = values[2];
  const valorConsulta = values[3];

  const plan = getPlanForClinic(atendimentosDia);

  const results = useMemo(() => {
    const consultasMes = atendimentosDia * 22;
    const consultasAutomatizadas = Math.round(consultasMes * 0.8);
    const horasEconomizadas = Math.round((consultasAutomatizadas * 3) / 60);

    const economiaEquipe = recepcionistas * custoMedio * 0.6;

    const consultasPerdidas = consultasMes * 0.25;
    const consultasRecuperadas = consultasPerdidas * 0.6;
    const receitaRecuperada = Math.round(consultasRecuperadas * valorConsulta);

    const economiaTotalMensal = economiaEquipe + receitaRecuperada;
    const economiaTotalAnual = economiaTotalMensal * 12;
    const roiMeses =
      economiaTotalMensal > 0 ? plan.price / economiaTotalMensal : Infinity;
    const lucroLiquidoMensal = economiaTotalMensal - plan.price;
    const lucroLiquidoAnual = economiaTotalAnual - plan.price * 12;

    return {
      consultasAutomatizadas,
      horasEconomizadas,
      economiaEquipe: Math.round(economiaEquipe),
      receitaRecuperada,
      economiaTotalMensal: Math.round(economiaTotalMensal),
      economiaTotalAnual: Math.round(economiaTotalAnual),
      roiMeses,
      roiLabel: roiMeses < 1 ? "< 1 mês" : `${roiMeses.toFixed(1)} meses`,
      lucroLiquidoMensal: Math.round(lucroLiquidoMensal),
      lucroLiquidoAnual: Math.round(lucroLiquidoAnual),
    };
  }, [atendimentosDia, recepcionistas, custoMedio, valorConsulta, plan.price]);

  const handleSliderChange = (index: number, value: number) => {
    setValues((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  return (
    <section
      id="roi"
      className="relative overflow-hidden bg-gradient-to-b from-white to-card py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---- Section heading ---- */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Quanto sua clínica pode{" "}
            <span className="gradient-text">economizar?</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            Simule a economia real com base nos dados da sua clínica
          </p>
        </motion.div>

        {/* ---- Sliders + Results grid ---- */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* ---- LEFT — Sliders ---- */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-card rounded-2xl p-6 sm:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 ring-1 ring-primary/20">
                <Calculator className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Dados da sua clínica
              </h3>
            </div>

            <div className="space-y-8">
              {sliders.map((slider, idx) => (
                <SliderInput
                  key={slider.label}
                  config={slider}
                  value={values[idx]}
                  onChange={(v) => handleSliderChange(idx, v)}
                />
              ))}
            </div>
          </motion.div>

          {/* ---- RIGHT — Results ---- */}
          <div className="space-y-4">
            {/* Row 1 — main metrics */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              <ResultCard
                icon={DollarSign}
                label="Economia total mensal"
                value={`R$ ${formatBRL(results.economiaTotalMensal)}`}
                color="emerald"
                delay={0}
                valueKey={results.economiaTotalMensal}
              />
              <ResultCard
                icon={TrendingUp}
                label="Receita recuperada/mês"
                value={`R$ ${formatBRL(results.receitaRecuperada)}`}
                color="sky"
                delay={0.08}
                valueKey={results.receitaRecuperada}
              />
              <ResultCard
                icon={Clock}
                label="Horas economizadas/mês"
                value={`${results.horasEconomizadas}h`}
                color="indigo"
                delay={0.16}
                valueKey={results.horasEconomizadas}
              />
              <ResultCard
                icon={Zap}
                label="ROI"
                value={results.roiLabel}
                color="amber"
                delay={0.24}
                valueKey={results.roiMeses}
              />
            </motion.div>

            {/* Row 2 — secondary metrics */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="grid gap-4 sm:grid-cols-3"
            >
              <ResultCard
                icon={Users}
                label="Economia com equipe/mês"
                value={`R$ ${formatBRL(results.economiaEquipe)}`}
                color="teal"
                delay={0}
                valueKey={results.economiaEquipe}
              />
              <ResultCard
                icon={Bot}
                label="Consultas automatizadas/mês"
                value={results.consultasAutomatizadas.toLocaleString("pt-BR")}
                color="violet"
                delay={0.08}
                valueKey={results.consultasAutomatizadas}
              />
              <ResultCard
                icon={Calendar}
                label="Economia anual projetada"
                value={`R$ ${formatBRL(results.economiaTotalAnual)}`}
                color="rose"
                delay={0.16}
                valueKey={results.economiaTotalAnual}
              />
            </motion.div>
          </div>
        </div>

        {/* ---- Resumo financeiro ---- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mx-auto mt-12 max-w-2xl"
        >
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <h4 className="mb-5 text-lg font-bold text-foreground">
              Resumo financeiro
            </h4>

            <div className="space-y-3 text-sm">
              <SummaryRow
                label="Economia com equipe"
                value={`R$ ${formatBRL(results.economiaEquipe)}/mês`}
              />
              <SummaryRow
                label="Receita recuperada (lembretes automáticos)"
                value={`R$ ${formatBRL(results.receitaRecuperada)}/mês`}
              />
              <SummaryRow
                label="Economia total mensal"
                value={`R$ ${formatBRL(results.economiaTotalMensal)}/mês`}
                bold
                gradient
              />
              <SummaryRow
                label={`Investimento Clin360 (plano ${plan.name})`}
                value={`R$ ${formatBRL(plan.price)}/mês`}
              />

              <div className="my-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

              <SummaryRow
                label="Lucro líquido mensal"
                value={`R$ ${formatBRL(results.lucroLiquidoMensal)}/mês`}
                bold
                positive={results.lucroLiquidoMensal > 0}
              />
              <SummaryRow
                label="Lucro líquido anual"
                value={`R$ ${formatBRL(results.lucroLiquidoAnual)}/ano`}
                bold
                positive={results.lucroLiquidoAnual > 0}
                large
              />
            </div>
          </div>
        </motion.div>

        {/* ---- Bottom CTA ---- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-12"
        >
          <div className="gradient-hero rounded-2xl px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <p className="text-lg font-bold text-white sm:text-xl">
                  Com esses números, a Clin 360 se paga em{" "}
                  <span className="underline decoration-white/50 decoration-2 underline-offset-4">
                    {results.roiLabel}
                  </span>
                </p>
                <p className="mt-1 text-sm text-white/80">
                  Economia de R$ {formatBRL(results.economiaTotalMensal)} por
                  mês — lucro líquido de R${" "}
                  {formatBRL(results.lucroLiquidoAnual)} por ano
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Agendar Demonstração
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Slider input                                                       */
/* ------------------------------------------------------------------ */

function SliderInput({
  config,
  value,
  onChange,
}: {
  config: SliderConfig;
  value: number;
  onChange: (v: number) => void;
}) {
  const percentage =
    ((value - config.min) / (config.max - config.min)) * 100;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          {config.label}
        </label>
        <span className="rounded-lg bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
          {config.formatValue(value)}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="roi-slider w-full"
          style={
            {
              "--slider-progress": `${percentage}%`,
            } as React.CSSProperties
          }
        />
        <div className="mt-1 flex justify-between text-xs text-muted">
          <span>
            {config.prefix ?? ""}
            {config.min.toLocaleString("pt-BR")}
            {config.suffix ?? ""}
          </span>
          <span>
            {config.prefix ?? ""}
            {config.max.toLocaleString("pt-BR")}
            {config.suffix ?? ""}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Result card                                                        */
/* ------------------------------------------------------------------ */

const colorStyles = {
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    ring: "ring-emerald-200",
    value: "text-emerald-600",
  },
  sky: {
    bg: "bg-sky-50",
    icon: "text-sky-600",
    ring: "ring-sky-200",
    value: "text-sky-600",
  },
  indigo: {
    bg: "bg-indigo-50",
    icon: "text-indigo-600",
    ring: "ring-indigo-200",
    value: "text-indigo-600",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
    ring: "ring-amber-200",
    value: "text-amber-600",
  },
  teal: {
    bg: "bg-teal-50",
    icon: "text-teal-600",
    ring: "ring-teal-200",
    value: "text-teal-600",
  },
  violet: {
    bg: "bg-violet-50",
    icon: "text-violet-600",
    ring: "ring-violet-200",
    value: "text-violet-600",
  },
  rose: {
    bg: "bg-rose-50",
    icon: "text-rose-600",
    ring: "ring-rose-200",
    value: "text-rose-600",
  },
};

function ResultCard({
  icon: Icon,
  label,
  value,
  color,
  delay,
  valueKey,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: keyof typeof colorStyles;
  delay: number;
  valueKey: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const colors = colorStyles[color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="glass-card group rounded-2xl p-5 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
    >
      <div
        className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg} ring-1 ${colors.ring}`}
      >
        <Icon className={`h-5 w-5 ${colors.icon}`} />
      </div>

      <p className="text-sm text-muted">{label}</p>

      <AnimatePresence mode="wait">
        <motion.p
          key={valueKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`mt-1 text-2xl font-extrabold tracking-tight ${colors.value}`}
        >
          {value}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Summary row                                                        */
/* ------------------------------------------------------------------ */

function SummaryRow({
  label,
  value,
  bold,
  gradient,
  positive,
  large,
}: {
  label: string;
  value: string;
  bold?: boolean;
  gradient?: boolean;
  positive?: boolean;
  large?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between ${large ? "pt-1" : ""}`}
    >
      <span
        className={`${bold ? "font-semibold text-foreground" : "text-muted"}`}
      >
        {label}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`
            ${bold ? "font-bold" : "font-medium"}
            ${gradient ? "gradient-text" : ""}
            ${positive ? "text-emerald-600" : ""}
            ${!gradient && !positive ? "text-foreground" : ""}
            ${large ? "text-lg" : ""}
          `}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
