"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Settings, Smartphone, Sparkles } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Settings,
    title: "Configuramos sua clínica",
    description:
      "Cadastramos seus médicos, horários, convênios e especialidades. Personalizamos o tom da IA com o jeito da sua clínica.",
  },
  {
    number: 2,
    icon: Smartphone,
    title: "Conectamos seus canais",
    description:
      "Integramos WhatsApp, Instagram, Email e Widget no seu site. Tudo em um painel unificado.",
  },
  {
    number: 3,
    icon: Sparkles,
    title: "IA começa a atender",
    description:
      "Seus pacientes são atendidos em segundos, 24/7. Você acompanha tudo pelo painel e assume quando quiser.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Como <span className="gradient-text">funciona</span>
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-muted max-w-2xl mx-auto">
            Do setup ao primeiro atendimento em menos de 24 horas
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Connecting line — horizontal on desktop */}
          <div
            className="hidden md:block absolute top-[52px] left-[16.67%] right-[16.67%] h-0.5 z-0"
            aria-hidden="true"
          >
            <div className="h-full w-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
          </div>

          {/* Connecting line — vertical on mobile */}
          <div
            className="md:hidden absolute top-0 bottom-0 left-[32px] w-0.5 z-0"
            aria-hidden="true"
          >
            <div className="h-full w-full bg-gradient-to-b from-primary via-secondary to-accent rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={stepVariants}
                  className="relative z-10"
                >
                  {/* Mobile layout: horizontal card */}
                  <div className="flex md:hidden items-start gap-6">
                    {/* Number circle (mobile) */}
                    <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full gradient-hero shadow-lg shadow-primary/25">
                      <span className="text-xl font-bold text-white">
                        {step.number}
                      </span>
                    </div>

                    <div className="pt-1">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 border border-border mb-3">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Desktop layout: vertical centered card */}
                  <div className="hidden md:flex flex-col items-center text-center">
                    {/* Number circle (desktop) */}
                    <div className="relative flex h-[104px] w-[104px] items-center justify-center">
                      <div className="absolute inset-0 rounded-full gradient-hero opacity-10" />
                      <div className="flex h-20 w-20 items-center justify-center rounded-full gradient-hero shadow-lg shadow-primary/25">
                        <span className="text-2xl font-bold text-white">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 border border-border">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="mt-5 text-xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base text-muted leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
