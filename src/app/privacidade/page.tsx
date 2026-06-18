import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import LogoMark from "@/components/logo-mark";

export const metadata = {
  title: "Política de Privacidade | Clin360",
  description:
    "Política de Privacidade da Clin360 — como coletamos, usamos e protegemos seus dados pessoais conforme a LGPD.",
};

export default function PrivacidadePage() {
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
          <LogoMark gradientId="clinGradPrivacidade" className="h-8 w-8" />
          <span className="text-xl font-bold text-foreground">
            Clin
            <span className="bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              360
            </span>
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-foreground mb-2">
          Política de Privacidade
        </h1>
        <p className="text-sm text-muted mb-10">
          Última atualização: 22 de maio de 2026
        </p>

        <div className="prose prose-slate max-w-none space-y-8 text-foreground/90 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              1. Introdução
            </h2>
            <p>
              A Clin360, operada pela Fabrika do Marketing LTDA (&quot;nos&quot;,
              &quot;nosso&quot; ou &quot;Clin360&quot;), tem o compromisso de
              proteger a privacidade dos usuários de nossa plataforma. Esta
              Política de Privacidade descreve como coletamos, usamos,
              armazenamos e protegemos seus dados pessoais, em conformidade com
              a Lei Geral de Proteção de Dados (LGPD — Lei n. 13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              2. Dados que coletamos
            </h2>
            <p>Coletamos os seguintes tipos de dados:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Dados de cadastro:</strong> nome, e-mail, telefone e
                nome da clínica ao contratar nossos serviços.
              </li>
              <li>
                <strong>Dados de navegação:</strong> endereço IP, tipo de
                navegador, páginas visitadas e tempo de permanência no site.
              </li>
              <li>
                <strong>Dados de comunicação:</strong> mensagens enviadas pelo
                formulário de contato ou WhatsApp.
              </li>
              <li>
                <strong>Dados de uso:</strong> interações com a plataforma,
                funcionalidades utilizadas e métricas de desempenho.
              </li>
            </ul>
            <p className="mt-3">
              <strong>Importante:</strong> a Clin360 não coleta dados de saúde
              dos pacientes das clínicas clientes. Os dados de pacientes
              (agendamentos, conversas) são processados e armazenados
              exclusivamente no ambiente da clínica, sob responsabilidade da
              clínica controladora.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              3. Finalidade do tratamento
            </h2>
            <p>Utilizamos seus dados para:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Fornecer e manter nossos serviços;</li>
              <li>Personalizar sua experiência na plataforma;</li>
              <li>
                Enviar comunicações sobre atualizações, novidades e suporte
                técnico;
              </li>
              <li>Melhorar nossos produtos e serviços;</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              4. Base legal
            </h2>
            <p>
              O tratamento de dados pessoais é realizado com base nas seguintes
              hipóteses da LGPD:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Consentimento</strong> (Art. 7, I) — ao preencher
                formulários e aceitar esta política;
              </li>
              <li>
                <strong>Execução de contrato</strong> (Art. 7, V) — para
                prestação dos serviços contratados;
              </li>
              <li>
                <strong>Interesse legítimo</strong> (Art. 7, IX) — para melhoria
                de nossos serviços e comunicações relevantes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              5. Compartilhamento de dados
            </h2>
            <p>
              Não vendemos, alugamos ou compartilhamos seus dados pessoais com
              terceiros para fins de marketing. Podemos compartilhar dados com:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Provedores de serviço:</strong> empresas que nos auxiliam
                na operação da plataforma (hospedagem, processamento de
                pagamentos, envio de e-mails);
              </li>
              <li>
                <strong>Obrigação legal:</strong> quando exigido por lei, decisão
                judicial ou autoridade competente.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              6. Armazenamento e segurança
            </h2>
            <p>
              Seus dados são armazenados em servidores seguros na região
              sa-east-1 (São Paulo) com criptografia em trânsito (TLS) e em
              repouso. Implementamos medidas técnicas e organizacionais para
              proteger seus dados contra acesso não autorizado, perda ou
              destruição.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              7. Retenção de dados
            </h2>
            <p>
              Mantemos seus dados pessoais apenas pelo tempo necessário para as
              finalidades descritas nesta política ou conforme exigido por lei.
              Dados de áudios recebidos via WhatsApp são transcritos e
              descartados em até 24 horas.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              8. Seus direitos (LGPD)
            </h2>
            <p>
              Você tem o direito de:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Confirmar a existência de tratamento de seus dados;</li>
              <li>Acessar seus dados pessoais;</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados;</li>
              <li>Solicitar a portabilidade dos dados;</li>
              <li>Revogar o consentimento a qualquer momento;</li>
              <li>
                Obter informações sobre entidades com as quais compartilhamos
                seus dados.
              </li>
            </ul>
            <p className="mt-3">
              Para exercer seus direitos, entre em contato pelo e-mail{" "}
              <strong>privacidade@clin360.com.br</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              9. Alterações nesta política
            </h2>
            <p>
              Podemos atualizar esta política periodicamente. Notificaremos
              sobre mudanças significativas por e-mail ou aviso em nosso site. A
              data da última atualização será sempre indicada no topo.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              10. Contato
            </h2>
            <p>
              Para dúvidas sobre esta Política de Privacidade ou sobre o
              tratamento de seus dados, entre em contato:
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
