"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Zap, CheckCircle2, MessageSquare } from "lucide-react";

interface StatItem {
  value: string;
  label: string;
  icon: React.ElementType;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
}

const stats: StatItem[] = [
  {
    value: "24/7",
    label: "Atendimento ininterrupto",
    icon: Clock,
  },
  {
    value: "< 5s",
    label: "Tempo médio de resposta",
    icon: Zap,
    numericValue: 5,
    prefix: "< ",
    suffix: "s",
  },
  {
    value: "100%",
    label: "Mensagens respondidas",
    icon: CheckCircle2,
    numericValue: 100,
    suffix: "%",
  },
  {
    value: "4 canais",
    label: "WhatsApp, Instagram, Email, Widget",
    icon: MessageSquare,
    numericValue: 4,
    suffix: " canais",
  },
];

function AnimatedCounter({
  value,
  numericValue,
  prefix = "",
  suffix = "",
  isInView,
}: {
  value: string;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || numericValue === undefined) return;

    let startTime: number;
    const duration = 1500;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, numericValue]);

  if (numericValue === undefined) {
    return <span>{value}</span>;
  }

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative overflow-hidden">
      <div className="gradient-hero py-16 sm:py-20">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                    <AnimatedCounter
                      value={stat.value}
                      numericValue={stat.numericValue}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      isInView={isInView}
                    />
                  </div>
                  <p className="mt-2 text-sm sm:text-base text-white/80 font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
