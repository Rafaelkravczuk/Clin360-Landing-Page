import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clin360 | Atendimento Inteligente para Clinicas",
  description:
    "IA que atende seus pacientes no WhatsApp 24/7 — agenda consultas, tira duvidas e confirma horarios automaticamente. Painel completo com inbox, agenda, CRM e financeiro.",
  keywords: [
    "clinica", "atendimento", "whatsapp", "ia", "inteligencia artificial",
    "agendamento", "saude", "gestao clinica", "chatbot", "automacao",
  ],
  openGraph: {
    title: "Clin360 | Atendimento Inteligente para Clinicas",
    description: "IA que atende seus pacientes no WhatsApp 24/7.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
