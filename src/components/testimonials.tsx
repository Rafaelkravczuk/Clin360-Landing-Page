"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "A Clin360 reduziu nossas faltas em 55% no primeiro mês. Os pacientes adoram a praticidade de agendar pelo WhatsApp sem esperar.",
    name: "Dra. Mariana Costa",
    role: "Diretora — Clínica Viva Saúde",
    initials: "MC",
    rating: 5,
  },
  {
    quote:
      "Antes eu tinha 3 recepcionistas só pra atender WhatsApp. Agora a IA resolve 80% das conversas e minha equipe foca no atendimento presencial.",
    name: "Dr. Ricardo Mendes",
    role: "Proprietário — Instituto Médico Paulista",
    initials: "RM",
    rating: 5,
  },
  {
    quote:
      "O painel é incrivelmente completo. Agenda, financeiro, CRM, tudo integrado. E a IA atende de madrugada como se fosse gente da recepção.",
    name: "Dra. Patrícia Oliveira",
    role: "Gestora — Centro de Fisioterapia Integral",
    initials: "PO",
    rating: 5,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 bg-slate-50">
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
            O que dizem nossos{" "}
            <span className="gradient-text">clientes</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              className="glass-card rounded-2xl p-8 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              {/* Quote icon */}
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-5">
                  <Quote className="h-5 w-5 text-primary" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-foreground/80 leading-relaxed text-base italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="mt-8 flex items-center gap-4 pt-6 border-t border-border">
                {/* Avatar with initials */}
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full gradient-hero">
                  <span className="text-sm font-bold text-white">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-muted text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
