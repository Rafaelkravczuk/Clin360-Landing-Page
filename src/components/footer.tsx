"use client";

import Link from "next/link";
import LogoMark from "@/components/logo-mark";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from "@/lib/site";

const productLinks = [
  { label: "Funcionalidades", href: "#features" },
  { label: "Demonstração", href: "#demo" },
  { label: "Calculadora de ROI", href: "#roi" },
  { label: "Planos e Preços", href: "#pricing" },
  { label: "Segurança", href: "#security" },
];

const resourceLinks = [
  { label: "Como Funciona", href: "#how-it-works" },
  { label: "Comparativo", href: "#comparison" },
  { label: "Casos de Uso", href: "#cases" },
  { label: "Perguntas Frequentes", href: "#faq" },
];

const legalLinks = [
  { label: "Política de Privacidade", href: "/privacidade" },
  { label: "Termos de Uso", href: "/termos" },
  { label: "Política de Cookies", href: "/cookies" },
];

export default function Footer() {
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid grid-cols-2 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <LogoMark gradientId="clinGradFooter" className="h-8 w-8" />
              <span className="text-xl font-bold text-white">
                Clin
                <span className="bg-gradient-to-br from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  360
                </span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm text-sm">
              Atendimento inteligente para clínicas. IA que agenda, responde e
              organiza — 24 horas por dia, 7 dias por semana.
            </p>
            <div className="mt-6 space-y-2">
              {CONTACT_EMAIL && (
                <p className="text-slate-400 text-sm">{CONTACT_EMAIL}</p>
              )}
              {WHATSAPP_DISPLAY && (
                <p className="text-slate-400 text-sm">{WHATSAPP_DISPLAY}</p>
              )}
            </div>
          </div>

          {/* Column 2: Produto */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Produto
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Recursos */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Recursos
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            &copy; 2026 Clin360. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500">
              {legalLinks.map((link, i) => (
                <span key={link.href} className="flex items-center gap-3">
                  {i > 0 && <span className="text-slate-700">·</span>}
                  <Link
                    href={link.href}
                    className="hover:text-slate-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </div>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <p className="text-slate-500 text-sm text-center sm:text-right">
              Desenvolvido por{" "}
              <a
                href="https://fabrikadomarketing.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 font-medium hover:text-white transition-colors"
              >
                Fabrika do Marketing
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
