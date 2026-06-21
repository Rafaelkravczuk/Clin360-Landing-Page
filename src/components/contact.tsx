"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Mail,
  Phone,
  Send,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import {
  whatsappLink,
  trackLead,
  CONTACT_EMAIL,
  WHATSAPP_DISPLAY,
} from "@/lib/site";

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  clinica: string;
  mensagem: string;
}

const initialForm: FormData = {
  nome: "",
  email: "",
  telefone: "",
  clinica: "",
  mensagem: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!form.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email inválido";
    }
    if (!form.telefone.trim()) newErrors.telefone = "Telefone é obrigatório";
    if (!form.clinica.trim()) newErrors.clinica = "Nome da clínica é obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // 1) Persiste o lead no backend (Supabase). Nao bloqueia o fluxo: se falhar,
    //    o lead ainda segue para o WhatsApp.
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      // rede indisponivel — segue para o WhatsApp mesmo assim
    }

    // 2) Evento de conversao (Meta Pixel + GA4) para o algoritmo otimizar.
    trackLead();

    // 3) Abre o WhatsApp ja com a mensagem montada.
    const text = [
      `Olá! Sou ${form.nome} da clínica ${form.clinica}.`,
      form.mensagem ? `\n${form.mensagem}` : "",
      `\nEmail: ${form.email}`,
      `Telefone: ${form.telefone}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(text), "_blank");

    setSubmitted(true);
    setForm(initialForm);
    setErrors({});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Pronto para transformar o atendimento da sua{" "}
              <span className="gradient-text">clínica</span>?
            </h2>
            <p className="mt-5 text-lg text-muted leading-relaxed">
              Fale com um consultor ou preencha o formulário. Respondemos em até
              2 horas.
            </p>

            {/* WhatsApp CTA */}
            <a
              href={whatsappLink()}
              onClick={() => trackLead()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-all hover:bg-[#20BD5A] hover:shadow-xl hover:shadow-[#25D366]/40 hover:-translate-y-0.5 w-full sm:w-auto"
            >
              <MessageCircle className="h-6 w-6" />
              Falar pelo WhatsApp
              <ArrowRight className="h-5 w-5" />
            </a>

            {/* Contact info */}
            <div className="mt-10 space-y-4">
              {CONTACT_EMAIL && (
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-3 text-muted transition-colors hover:text-foreground"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-base">{CONTACT_EMAIL}</span>
                </a>
              )}
              {WHATSAPP_DISPLAY && (
                <a
                  href={whatsappLink()}
                  onClick={() => trackLead()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted transition-colors hover:text-foreground"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-base">{WHATSAPP_DISPLAY}</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column — Form */}
          <div className="glass-card rounded-2xl p-8 sm:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 mb-5">
                    <CheckCircle className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Mensagem enviada!
                  </h3>
                  <p className="mt-3 text-muted max-w-sm">
                    Recebemos sua mensagem e retornaremos em até 2 horas. Fique
                    de olho no seu WhatsApp e email.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-primary font-semibold hover:underline"
                  >
                    Enviar outra mensagem
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  {/* Nome */}
                  <div>
                    <label
                      htmlFor="nome"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={form.nome}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                        errors.nome ? "border-red-400" : "border-border"
                      }`}
                      placeholder="Seu nome"
                    />
                    {errors.nome && (
                      <p className="mt-1 text-sm text-red-500">{errors.nome}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                        errors.email ? "border-red-400" : "border-border"
                      }`}
                      placeholder="seu@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Telefone */}
                  <div>
                    <label
                      htmlFor="telefone"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={form.telefone}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                        errors.telefone ? "border-red-400" : "border-border"
                      }`}
                      placeholder="(00) 00000-0000"
                    />
                    {errors.telefone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.telefone}
                      </p>
                    )}
                  </div>

                  {/* Clinica */}
                  <div>
                    <label
                      htmlFor="clinica"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Nome da clínica *
                    </label>
                    <input
                      type="text"
                      id="clinica"
                      name="clinica"
                      value={form.clinica}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                        errors.clinica ? "border-red-400" : "border-border"
                      }`}
                      placeholder="Nome da sua clínica"
                    />
                    {errors.clinica && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.clinica}
                      </p>
                    )}
                  </div>

                  {/* Mensagem */}
                  <div>
                    <label
                      htmlFor="mensagem"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Mensagem
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      rows={4}
                      value={form.mensagem}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                      placeholder="Conte um pouco sobre sua clínica e o que precisa..."
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                  >
                    <Send className="h-5 w-5" />
                    Enviar Mensagem
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
