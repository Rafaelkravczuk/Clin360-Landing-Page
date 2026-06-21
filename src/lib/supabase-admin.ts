import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Client server-side (service role) usado apenas em route handlers para gravar
// leads. A SERVICE_ROLE_KEY nunca vai para o client — fica so no servidor.
// Retorna null se as envs nao estiverem configuradas (o lead nao quebra: o
// formulario ainda abre o WhatsApp).
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
