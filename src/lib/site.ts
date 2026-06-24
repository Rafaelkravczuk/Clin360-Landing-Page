// Dados de contato e tracking da Clin360. Defina no Vercel (Environment
// Variables) para producao. Sem os valores, o botao de WhatsApp cai no
// formulario (#contact) em vez de apontar para um numero invalido.

/** Numero de WhatsApp comercial, so digitos com DDI+DDD. Ex: 5551999887766 */
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_COMMERCIAL || "";

/** Versao formatada para exibir na pagina. Ex: (51) 99988-7766 */
export const WHATSAPP_DISPLAY = process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY || "";

/** Email de contato exibido na pagina. Ex: contato@clin360.com.br */
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

/** Monta o link wa.me com texto opcional. Cai em #contact se nao houver numero. */
export function whatsappLink(text?: string): string {
  if (!WHATSAPP_NUMBER) return "#contact";
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/** Dispara o evento de conversao de lead no Meta Pixel e no GA4. */
export function trackLead(): void {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Lead");
  window.gtag?.("event", "generate_lead");
}

/**
 * Sinal leve de engajamento (clique numa CTA que rola ate o formulario).
 * Usa evento customizado para NAO inflar o evento `Lead` (que e a conversao real).
 * Ajuda o Meta a aprender quem tem intencao mesmo antes de preencher o form.
 */
export function trackCTA(name: string): void {
  if (typeof window === "undefined") return;
  window.fbq?.("trackCustom", "CTAClick", { cta: name });
  window.gtag?.("event", "cta_click", { cta: name });
}
