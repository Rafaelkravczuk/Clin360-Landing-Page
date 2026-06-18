import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import LogoMark from "@/components/logo-mark";

export const metadata = {
  title: "Política de Cookies | Clin360",
  description:
    "Política de Cookies da Clin360 — como usamos cookies e tecnologias semelhantes em nosso site.",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao site
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <LogoMark gradientId="clinGradCookies" className="h-8 w-8" />
          <span className="text-xl font-bold text-foreground">
            Clin
            <span className="bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              360
            </span>
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-foreground mb-2">
          Política de Cookies
        </h1>
        <p className="text-sm text-muted mb-10">
          Última atualização: 22 de maio de 2026
        </p>

        <div className="prose prose-slate max-w-none space-y-8 text-foreground/90 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              1. O que são cookies?
            </h2>
            <p>
              Cookies são pequenos arquivos de texto armazenados no seu
              dispositivo (computador, celular ou tablet) quando você visita
              nosso site. Eles nos ajudam a oferecer uma experiência melhor e
              mais personalizada.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              2. Tipos de cookies que usamos
            </h2>

            <div className="space-y-4 mt-3">
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Cookies essenciais
                </h3>
                <p>
                  Necessários para o funcionamento básico do site. Sem eles,
                  algumas funcionalidades podem não funcionar corretamente.
                </p>
                <p className="mt-1 text-xs text-muted">
                  Exemplo: preferências de sessão, segurança.
                </p>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Cookies de desempenho
                </h3>
                <p>
                  Coletam informações anônimas sobre como os visitantes usam
                  nosso site, ajudando-nos a melhorar a experiência.
                </p>
                <p className="mt-1 text-xs text-muted">
                  Exemplo: Google Analytics, páginas mais visitadas.
                </p>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Cookies de marketing
                </h3>
                <p>
                  Usados para exibir anúncios relevantes e medir a eficácia
                  de campanhas publicitárias.
                </p>
                <p className="mt-1 text-xs text-muted">
                  Exemplo: Meta Pixel, Google Ads.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              3. Cookies de terceiros
            </h2>
            <p>Podemos usar cookies de terceiros, incluindo:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Google Analytics:</strong> para análise de tráfego e
                comportamento de navegação;
              </li>
              <li>
                <strong>Meta Pixel:</strong> para medição de campanhas de
                anúncios no Facebook e Instagram;
              </li>
              <li>
                <strong>Hotjar:</strong> para análise de experiência do usuário
                (heatmaps e gravações anônimas).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              4. Como gerenciar cookies
            </h2>
            <p>
              Você pode gerenciar ou desativar cookies a qualquer momento
              através das configurações do seu navegador:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Chrome:</strong> Configurações → Privacidade e
                segurança → Cookies
              </li>
              <li>
                <strong>Firefox:</strong> Configurações → Privacidade e
                segurança → Cookies
              </li>
              <li>
                <strong>Safari:</strong> Preferências → Privacidade → Cookies
              </li>
              <li>
                <strong>Edge:</strong> Configurações → Cookies e permissões de
                site
              </li>
            </ul>
            <p className="mt-3">
              Ao desativar cookies, algumas funcionalidades do site podem ser
              afetadas.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              5. Tempo de retenção
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Cookies de sessão:</strong> expiram ao fechar o
                navegador;
              </li>
              <li>
                <strong>Cookies persistentes:</strong> permanecem por até 12
                meses ou até serem excluídos manualmente.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              6. Atualizações
            </h2>
            <p>
              Esta Política de Cookies pode ser atualizada periodicamente.
              Recomendamos que a consulte regularmente para se manter informado
              sobre como usamos cookies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              7. Contato
            </h2>
            <p>
              Para dúvidas sobre o uso de cookies:
            </p>
            <ul className="list-none space-y-1 mt-2">
              <li>
                <strong>E-mail:</strong> privacidade@clin360.com.br
              </li>
              <li>
                <strong>Responsável:</strong> Fabrika do Marketing LTDA
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
