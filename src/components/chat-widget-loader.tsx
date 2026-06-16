"use client";

import dynamic from "next/dynamic";

// `ssr: false` so o ChatWidget (overlay 100% client) nao renderiza no servidor.
// Isso so e permitido dentro de um Client Component — por isso este wrapper
// existe (page.tsx e Server Component). Sem ele, o `next build` quebra.
const ChatWidget = dynamic(() => import("@/components/chat-widget"), {
  ssr: false,
});

export default function ChatWidgetLoader() {
  return <ChatWidget />;
}
