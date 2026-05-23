"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Stethoscope, Lock, Clock } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const cards = [
  {
    icon: Shield,
    title: "LGPD Compliant",
    description:
      "Dados criptografados, hospedados no Brasil (São Paulo), com isolamento por clínica.",
  },
  {
    icon: Stethoscope,
    title: "CFM 2.454/2026",
    description:
      "IA exclusivamente administrativa. Sem diagnóstico, sem triagem. Roteamento seguro.",
  },
  {
    icon: Lock,
    title: "Criptografia",
    description:
      "Row Level Security no banco de dados. Dados de uma clínica nunca acessíveis por outra.",
  },
  {
    icon: Clock,
    title: "99.9% Uptime",
    description:
      "Infraestrutura na nuvem com monitoramento 24/7 e backups automáticos.",
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Security() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });

  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });

  return (
    <section
      id="security"
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          "linear-gradient(180deg, #f8fafc 0%, #f0f9ff 50%, #f8fafc 100%)",
      }}
    >
      {/* Subtle top separator */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Subtle pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #0ea5e9 1px, transparent 0)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Segurança e{" "}
            <span className="gradient-text">conformidade</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            Seus dados protegidos de ponta a ponta
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={cardVariants}
                className="glass-card group relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 ring-1 ring-primary/20">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
