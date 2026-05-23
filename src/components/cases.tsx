"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Case study data                                                    */
/* ------------------------------------------------------------------ */

interface BeforeAfterItem {
  label: string;
  before: string;
  after: string;
}

interface CaseStudy {
  clinic: string;
  specialty: string;
  initials: string;
  items: BeforeAfterItem[];
  highlight: string;
  quote: string;
}

const cases: CaseStudy[] = [
  {
    clinic: "Clínica Viva Saúde",
    specialty: "Dermatologia",
    initials: "VS",
    items: [
      { label: "Faltas/semana", before: "15", after: "4" },
      {
        label: "Recepcionistas no WhatsApp",
        before: "2",
        after: "0",
      },
      { label: "Tempo de resposta", before: "8 min", after: "4s" },
    ],
    highlight: "73% menos faltas",
    quote:
      "A IA atende melhor que qualquer recepcionista que já tivemos",
  },
  {
    clinic: "Instituto Médico Paulista",
    specialty: "Clínica Geral + Especialidades",
    initials: "IP",
    items: [
      {
        label: "Ligações/dia perdidas",
        before: "40",
        after: "0",
      },
      {
        label: "Atendimento noturno",
        before: "Nenhum",
        after: "24/7",
      },
      { label: "Agenda", before: "Manual", after: "Automática" },
    ],
    highlight: "100% dos contatos atendidos",
    quote:
      "Nunca mais perdemos um paciente por não atender",
  },
  {
    clinic: "Odonto Premium",
    specialty: "Odontologia",
    initials: "OP",
    items: [
      {
        label: "Custo recepção/mês",
        before: "R$8.500",
        after: "R$3.400",
      },
      {
        label: "Tempo médio de agendamento",
        before: "45 min",
        after: "2 min",
      },
    ],
    highlight: "R$5.100 economia/mês",
    quote: "ROI positivo já no primeiro mês",
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Cases() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cases" className="relative bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center sm:mb-20"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Resultados reais de clínicas{" "}
            <span className="gradient-text">como a sua</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            Números que falam por si
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {cases.map((cs) => (
            <CaseCard key={cs.clinic} data={cs} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Case card                                                          */
/* ------------------------------------------------------------------ */

function CaseCard({ data }: { data: CaseStudy }) {
  return (
    <motion.div
      variants={cardVariants}
      className="glass-card flex flex-col justify-between rounded-2xl p-8 transition-shadow duration-300 hover:shadow-lg"
    >
      {/* Clinic header */}
      <div>
        <div className="mb-6 flex items-center gap-4">
          <div className="gradient-hero flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
            <span className="text-sm font-bold text-white">
              {data.initials}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground">{data.clinic}</p>
            <p className="text-sm text-muted">{data.specialty}</p>
          </div>
        </div>

        {/* Before → After items */}
        <div className="space-y-3">
          {data.items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5"
            >
              <span className="text-sm text-muted">{item.label}</span>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-red-500 line-through">{item.before}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted" />
                <span className="text-emerald-600">{item.after}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight metric */}
        <div className="mt-6 text-center">
          <p className="gradient-text text-2xl font-extrabold sm:text-3xl">
            {data.highlight}
          </p>
        </div>
      </div>

      {/* Quote */}
      <div className="mt-6 flex items-start gap-3 border-t border-border pt-6">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Quote className="h-4 w-4 text-primary" />
        </div>
        <p className="text-sm leading-relaxed text-foreground/80 italic">
          &ldquo;{data.quote}&rdquo;
        </p>
      </div>
    </motion.div>
  );
}
