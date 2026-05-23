import { Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Termos de Uso | Clin360",
  description:
    "Termos de Uso da plataforma Clin360 — condições para utilização dos nossos serviços de atendimento inteligente para clínicas.",
};

export default function TermosPage() {
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
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Plus className="h-5 w-5 text-white" strokeWidth={3} />
          </div>
          <span className="text-xl font-bold text-foreground">Clin360</span>
        </div>

        <h1 className="text-3xl font-extrabold text-foreground mb-2">
          Termos de Uso
        </h1>
        <p className="text-sm text-muted mb-10">
          Última atualização: 22 de maio de 2026
        </p>

        <div className="prose prose-slate max-w-none space-y-8 text-foreground/90 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              1. Aceitação dos termos
            </h2>
            <p>
              Ao acessar e utilizar a plataforma Clin360, você concorda com
              estes Termos de Uso. Caso não concorde com alguma condição,
              interrompa o uso imediatamente.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              2. Descrição do serviço
            </h2>
            <p>
              A Clin360 é uma plataforma SaaS de atendimento inteligente para
              clínicas médicas, que inclui:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                Atendimento automatizado via WhatsApp com inteligência artificial;
              </li>
              <li>Agendamento e confirmação de consultas;</li>
              <li>Inbox unificado multicanal (WhatsApp, Instagram, Email, Widget);</li>
              <li>Painel administrativo com dashboard e CRM;</li>
              <li>Lembretes automáticos de consultas;</li>
              <li>Gestão financeira e de agenda.</li>
            </ul>
            <p className="mt-3">
              <strong>Importante:</strong> a IA da Clin360 realiza
              exclusivamente funções administrativas (agendamento, informações,
              confirmações). A plataforma NÃO realiza diagnósticos, triagem
              médica ou qualquer ato que exija competência médica, em
              conformidade com a Resolução CFM 2.454/2026.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              3. Cadastro e conta
            </h2>
            <p>
              Para utilizar a Clin360, a clínica deve fornecer informações
              verdadeiras e completas. A Fabrika do Marketing realiza a
              configuração inicial de cada clínica. O acesso à conta é de
              responsabilidade exclusiva do titular.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              4. Planos e pagamento
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Os planos e preços vigentes estão disponíveis na página de
                preços do site;
              </li>
              <li>
                O período de teste gratuito é de 7 (sete) dias corridos a partir
                da ativação;
              </li>
              <li>
                Após o período de teste, a cobrança será realizada mensalmente
                de forma recorrente;
              </li>
              <li>
                O cancelamento pode ser solicitado a qualquer momento, sem
                fidelidade ou multa;
              </li>
              <li>
                Não há reembolso proporcional ao período não utilizado no mês
                corrente.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              5. Responsabilidades do usuário
            </h2>
            <p>A clínica se compromete a:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                Utilizar a plataforma de acordo com a legislação vigente e as
                normas do CFM;
              </li>
              <li>
                Não utilizar a IA para fins de diagnóstico, prescrição ou
                qualquer ato médico;
              </li>
              <li>
                Manter atualizados os dados cadastrais da clínica;
              </li>
              <li>
                Garantir o consentimento dos pacientes para recebimento de
                mensagens via WhatsApp;
              </li>
              <li>
                Respeitar a LGPD no tratamento de dados de seus pacientes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              6. Propriedade intelectual
            </h2>
            <p>
              Todo o conteúdo da plataforma (software, design, textos, marcas e
              logotipos) é de propriedade da Fabrika do Marketing LTDA ou de
              seus licenciadores. É proibida a reprodução, distribuição ou
              modificação sem autorização prévia por escrito.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              7. Limitação de responsabilidade
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                A Clin360 não se responsabiliza por decisões médicas tomadas
                com base em informações fornecidas pela IA;
              </li>
              <li>
                Não garantimos disponibilidade ininterrupta do serviço, embora
                nos esforcemos para manter 99,9% de uptime;
              </li>
              <li>
                Não nos responsabilizamos por indisponibilidade dos serviços de
                terceiros (WhatsApp, provedores de nuvem).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              8. Cancelamento e suspensão
            </h2>
            <p>
              Podemos suspender ou cancelar o acesso à plataforma nos seguintes
              casos:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Violação destes Termos de Uso;</li>
              <li>Uso da IA para fins proibidos (diagnóstico, triagem);</li>
              <li>Inadimplência por mais de 15 dias;</li>
              <li>Determinação legal ou judicial.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              9. Alterações nos termos
            </h2>
            <p>
              Reservamo-nos o direito de alterar estes termos a qualquer
              momento. Alterações significativas serão comunicadas por e-mail
              com 30 dias de antecedência. O uso continuado após a notificação
              constitui aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              10. Foro e legislação aplicável
            </h2>
            <p>
              Estes Termos são regidos pela legislação brasileira. Fica eleito
              o foro da comarca de Porto Alegre/RS para dirimir quaisquer
              controvérsias.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">
              11. Contato
            </h2>
            <p>
              Para dúvidas sobre estes Termos de Uso:
            </p>
            <ul className="list-none space-y-1 mt-2">
              <li>
                <strong>E-mail:</strong> contato@clin360.com.br
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
