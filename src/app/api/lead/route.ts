import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

type LeadBody = {
  nome?: string;
  email?: string;
  telefone?: string;
  clinica?: string;
  mensagem?: string;
};

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "JSON invalido" }, { status: 400 });
  }

  const name = clean(body.nome, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.telefone, 40);
  const clinic = clean(body.clinica, 160);
  const message = clean(body.mensagem, 2000);

  if (!name || !email || !phone || !clinic) {
    return NextResponse.json(
      { ok: false, error: "Campos obrigatorios ausentes" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();

  // Sem Supabase configurado: nao falha o lead — o formulario ainda abre o
  // WhatsApp. So registra o aviso para o operador configurar as envs.
  if (!supabase) {
    console.warn(
      "lead: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY ausentes — lead nao persistido"
    );
    return NextResponse.json({ ok: true, persisted: false });
  }

  const { error } = await supabase.from("leads").insert({
    name,
    email,
    phone,
    clinic,
    message: message || null,
    source: "landing",
  });

  if (error) {
    console.error("lead: falha ao gravar no Supabase:", error.message);
    return NextResponse.json({ ok: false, error: "Falha ao salvar" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, persisted: true });
}
