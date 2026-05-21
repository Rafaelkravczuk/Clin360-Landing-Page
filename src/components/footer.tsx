"use client";

import { Plus } from "lucide-react";

const footerLinks = [
  { label: "Funcionalidades", href: "#features" },
  { label: "Como Funciona", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contact" },
];

export default function Footer() {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
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
        <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Plus className="h-5 w-5 text-white" strokeWidth={3} />
              </div>
              <span className="text-xl font-bold text-white">Clin360</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Atendimento inteligente para clínicas. IA que agenda, responde e
              organiza — 24 horas por dia, 7 dias por semana.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Navegação
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="text-slate-400 text-sm">
                contato@clin360.com.br
              </li>
              <li className="text-slate-400 text-sm">(51) 99999-9999</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            &copy; 2026 Clin360. Todos os direitos reservados.
          </p>
          <p className="text-slate-500 text-sm text-center sm:text-right">
            Desenvolvido por{" "}
            <span className="text-slate-400 font-medium">
              Fábrika do Marketing
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
