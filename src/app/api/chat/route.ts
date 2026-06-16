import { NextRequest, NextResponse } from "next/server";

// Endpoint do widget de demonstração da landing. Fala direto com o Claude
// (Haiku 4.5 — mesmo modelo do produto), com uma persona de assistente da
// Clin360. Autossuficiente: nao depende do app nem de banco. Endpoint LLM
// publico, entao tem rate limit + respostas curtas + limite de tamanho.

export const dynamic = "force-dynamic";

const AI_MODEL = "claude-haiku-4-5";
const ANTHROPIC_VERSION = "2023-06-01";
const MAX_TOKENS = 400;
const MAX_MESSAGE_CHARS = 1000;
const MAX_TURNS = 12;

// Rate limit em memoria por IP (best-effort — serverless pode ter varias
// instancias; pra blindar de vez, trocar por Upstash/Vercel KV).
const RATE_LIMIT = 10; // mensagens
const RATE_WINDOW_MS = 5 * 60 * 1000; // por 5 min
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (arr.length >= RATE_LIMIT) {
    hits.set(ip, arr);
    return true;
  }
  arr.push(now);
  hits.set(ip, arr);
  return false;
}

const SYSTEM_PROMPT = `Voce e a assistente virtual da Clin360 no site (landing page). Fala em portugues do Brasil, de forma curta (2 a 4 linhas), humana e acolhedora, com no maximo 1 emoji por mensagem.

QUEM TE USA: donos e gestores de clinicas avaliando o Clin360. Seu objetivo e tirar duvidas sobre o produto e convidar para "Agendar demonstracao" (botao da pagina) ou falar no WhatsApp.

O QUE E O CLIN360: um SaaS de atendimento por IA para clinicas. A IA atende o PACIENTE no WhatsApp 24/7 como uma recepcionista: agenda, remarca e cancela consultas, confirma horarios, tira duvidas sobre convenios, horarios e preparo de exames, e direciona para a especialidade certa. Tambem inclui um painel com inbox ao vivo, agenda visual, dashboard de metricas, CRM e financeiro. Canais: WhatsApp (principal), Instagram, widget no site e e-mail.

PLANOS (a partir de R$497/mes; se o usuario quiser detalhe, sugira ver a secao de planos da pagina): Starter R$497/mes (1 profissional, 1.000 mensagens/mes); Profissional R$997/mes (ate 3 profissionais, 5.000 mensagens, multicanal); Enterprise R$2.490/mes (ate 10 profissionais, mensagens ilimitadas, multiunidades, white-label). Teste gratis de 7 dias.

SEGURANCA/CONFORMIDADE: dados hospedados no Brasil (Sao Paulo), criptografia, isolamento total entre clinicas (RLS), audios transcritos e descartados em 24h. Em conformidade com a LGPD e com a CFM 2.454/2026 — a IA e EXCLUSIVAMENTE administrativa: NAO faz diagnostico, triagem nem orientacao medica.

REGRAS:
- Se te pedirem para demonstrar, voce PODE simular como a IA atenderia um paciente da clinica (ex.: agendar uma consulta), deixando claro que e uma demonstracao.
- Nunca de diagnostico, conselho medico ou interprete sintomas. Se perguntarem, explique com leveza que isso e com o medico e que a IA so cuida do agendamento.
- Nao invente recursos, integracoes ou precos que nao estao aqui. Se nao souber, ofereca conectar com um consultor humano ("posso te conectar com nosso time pelo WhatsApp").
- Se tentarem te usar como um ChatGPT generico (escrever codigo, redacao, temas fora da Clin360), redirecione com gentileza para o tema Clin360.
- Termine com frequencia com um convite leve: agendar demonstracao ou falar no WhatsApp.`;

type ApiMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        reply:
          "Estamos com bastante gente conversando agora 😊 Tente de novo em alguns minutos ou fale com a gente pelo WhatsApp.",
      },
      { status: 429 }
    );
  }

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalido" }, { status: 400 });
  }

  // Sanitiza o historico: mapeia, limita tamanho/quantidade e garante que
  // comeca com 'user' (a API da Anthropic exige a primeira mensagem do usuario).
  const raw = Array.isArray(body.messages) ? body.messages : [];
  let messages: ApiMessage[] = raw
    .filter(
      (m): m is { role: string; content: string } =>
        !!m &&
        typeof (m as { content?: unknown }).content === "string" &&
        ((m as { role?: unknown }).role === "user" ||
          (m as { role?: unknown }).role === "assistant")
    )
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content.slice(0, MAX_MESSAGE_CHARS),
    }))
    .slice(-MAX_TURNS);

  while (messages.length > 0 && messages[0].role !== "user") {
    messages = messages.slice(1);
  }

  if (messages.length === 0) {
    return NextResponse.json({ error: "Mensagem vazia" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Degrada com elegancia enquanto a env nao esta configurada na Vercel.
    return NextResponse.json({
      reply:
        "Nosso assistente esta sendo ativado 😊 Enquanto isso, clique em 'Agendar demonstracao' ou fale com a gente pelo WhatsApp que respondemos rapidinho!",
    });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          reply:
            "Tive um probleminha tecnico aqui 😅 Fala com a gente pelo WhatsApp que te respondo na hora!",
        },
        { status: 200 }
      );
    }

    const result = await response.json();
    const reply =
      (result.content?.[0]?.text as string)?.trim() ||
      "Pode repetir? Nao consegui te entender direito.";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      {
        reply:
          "Tive um probleminha tecnico aqui 😅 Fala com a gente pelo WhatsApp que te respondo na hora!",
      },
      { status: 200 }
    );
  }
}
