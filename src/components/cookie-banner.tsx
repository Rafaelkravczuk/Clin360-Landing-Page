"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import Link from "next/link";

const COOKIE_KEY = "clin360_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">
                  Sua privacidade é importante
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Usamos cookies para melhorar sua experiência, analisar o
                  tráfego do site e personalizar conteúdo. Ao aceitar, você
                  concorda com o uso de cookies conforme nossa{" "}
                  <Link
                    href="/cookies"
                    className="font-medium text-primary underline hover:text-primary-dark"
                  >
                    Política de Cookies
                  </Link>{" "}
                  e{" "}
                  <Link
                    href="/privacidade"
                    className="font-medium text-primary underline hover:text-primary-dark"
                  >
                    Política de Privacidade
                  </Link>
                  .
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={accept}
                    className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
                  >
                    Aceitar todos
                  </button>
                  <button
                    onClick={decline}
                    className="rounded-full border border-border px-5 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-gray-50"
                  >
                    Apenas essenciais
                  </button>
                </div>
              </div>

              <button
                onClick={decline}
                className="shrink-0 rounded-lg p-1 text-muted transition-colors hover:bg-gray-100 hover:text-foreground"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}