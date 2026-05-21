import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal-layout";

export const Route = createFileRoute("/reembolso")({
  head: () => ({ meta: [{ title: "Política de Reembolso — Meupriv" }] }),
  component: () => (
    <LegalLayout title="Política de Reembolso" updated="2025-05-16">
      <p>Por se tratar de produto digital de consumo imediato, aplicamos as seguintes regras:</p>

      <h2>Janela de cancelamento</h2>
      <p>Solicitações de reembolso só serão consideradas dentro dos primeiros 5 minutos após a confirmação do pagamento e desde que o conteúdo ainda não tenha sido acessado.</p>

      <h2>Após o acesso</h2>
      <p>Produtos digitais são considerados consumidos a partir do primeiro acesso ao conteúdo. Após esse momento, não há reembolso.</p>

      <h2>Chargebacks</h2>
      <p>Disputas abertas diretamente com a operadora do cartão sem contato prévio com o suporte poderão resultar em banimento permanente da plataforma.</p>

      <h2>Como solicitar</h2>
      <p>Envie um email para <a href="mailto:suporte@meupriv.com" className="underline">suporte@meupriv.com</a> com o comprovante de pagamento e o motivo da solicitação.</p>
    </LegalLayout>
  ),
});
