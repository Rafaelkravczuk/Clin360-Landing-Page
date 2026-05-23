import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Analytics from "@/components/analytics";
import CookieBanner from "@/components/cookie-banner";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clin360.com.br"),
  title: "Clin360 | Atendimento Inteligente para Clínicas",
  description:
    "Clin360 — sistema de atendimento inteligente para clínicas. IA que responde pacientes no WhatsApp 24/7, agenda consultas automaticamente, reduz no-show em 60% e integra inbox, agenda, CRM e financeiro em um só painel.",
  keywords: [
    "clínica", "atendimento", "whatsapp", "ia", "inteligencia artificial",
    "agendamento", "saúde", "gestão clínica", "chatbot", "automação",
    "sistema para clínica", "atendimento whatsapp clínica", "redução no-show",
    "IA para saúde", "software médico", "agendamento online", "CRM clínica",
    "painel clínica",
  ],
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Clin360 | Atendimento Inteligente para Clínicas",
    description:
      "IA que responde pacientes no WhatsApp 24/7, agenda consultas automaticamente e reduz no-show em 60%. Teste grátis por 7 dias.",
    type: "website",
    locale: "pt_BR",
    siteName: "Clin360",
    url: "https://clin360.com.br",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clin360 | Atendimento Inteligente para Clínicas",
    description:
      "IA que responde pacientes no WhatsApp 24/7, agenda consultas automaticamente e reduz no-show em 60%.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://clin360.com.br" },
};

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Clin360",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description:
      "Sistema de atendimento inteligente para clínicas médicas com IA conversacional no WhatsApp.",
    url: "https://clin360.com.br",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "BRL",
      lowPrice: "497",
      highPrice: "2490",
      offerCount: "3",
    },
    provider: {
      "@type": "Organization",
      name: "Fabrika do Marketing LTDA",
      url: "https://fabrikadomarketing.com.br",
    },
    featureList: [
      "WhatsApp IA 24/7",
      "Agendamento automático",
      "Lembretes de consulta",
      "Inbox unificado multicanal",
      "Dashboard e CRM",
      "Conformidade LGPD",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <JsonLd />
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  );
}
