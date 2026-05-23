"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Clinic names                                                       */
/* ------------------------------------------------------------------ */

const clinics = [
  "Clínica Viva Saúde",
  "Instituto Médico Paulista",
  "Odonto Premium",
  "Centro de Fisioterapia Integral",
  "Clínica Bem Estar",
  "Centro Médico Vitória",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ClientLogos() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="relative overflow-hidden bg-gray-50/80 py-10 md:py-14">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Label */}
        <p className="mb-8 text-center text-xs font-medium tracking-widest text-muted uppercase">
          Confiado por clínicas em todo o Brasil
        </p>

        {/* Desktop: static row */}
        <div className="hidden md:flex md:items-center md:justify-center md:gap-12 lg:gap-16">
          {clinics.map((name) => (
            <LogoPlaceholder key={name} name={name} />
          ))}
        </div>

        {/* Mobile: marquee */}
        <div className="relative md:hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-gray-50/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-gray-50/80 to-transparent" />

          <div className="overflow-hidden">
            <div className="animate-marquee flex w-max items-center gap-10">
              {/* Duplicate list for seamless loop */}
              {[...clinics, ...clinics].map((name, i) => (
                <LogoPlaceholder key={`${name}-${i}`} name={name} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Logo placeholder                                                   */
/* ------------------------------------------------------------------ */

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex shrink-0 select-none items-center whitespace-nowrap text-base font-bold tracking-tight text-gray-400/60 lg:text-lg">
      {name}
    </div>
  );
}
