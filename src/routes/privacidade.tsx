import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal-layout";

export const Route = createFileRoute("/privacidade")({
  head: () => ({ meta: [{ title: "Política de Privacidade — Meupriv" }] }),
  component: () => (
    <LegalLayout title="Política de Privacidade" updated="2025-05-16">
      <p>Sua privacidade é prioridade. Esta política descreve quais dados coletamos e como são tratados.</p>

      <h2>Dados coletados</h2>
      <ul>
        <li>Nome e email fornecidos no checkout, usados apenas para liberação do acesso.</li>
        <li>Username (opcional), quando informado.</li>
        <li>Dados de pagamento processados diretamente pelo gateway — não armazenamos cartões.</li>
      </ul>

      <h2>Uso dos dados</h2>
      <p>Os dados são utilizados unicamente para autenticação, liberação de acesso, atendimento e cumprimento de obrigações legais.</p>

      <h2>Compartilhamento</h2>
      <p>Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing. Compartilhamentos ocorrem apenas com processadores de pagamento e mediante obrigação legal.</p>

      <h2>Segurança</h2>
      <p>Empregamos criptografia em trânsito, controle de acesso e boas práticas para proteger seus dados.</p>

      <h2>Discrição</h2>
      <p>A cobrança aparece de forma genérica no extrato. Suas informações nunca são exibidas publicamente.</p>

      <h2>Direitos</h2>
      <p>Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento pelo email de suporte.</p>
    </LegalLayout>
  ),
});
