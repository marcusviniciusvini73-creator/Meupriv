import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal-layout";

export const Route = createFileRoute("/termos")({
  head: () => ({ meta: [{ title: "Termos de Serviço — Meupriv" }] }),
  component: () => (
    <LegalLayout title="Termos de Serviço" updated="2025-05-16">
      <p>Ao utilizar esta plataforma, você declara ter no mínimo 18 anos e estar de pleno acordo com os termos abaixo.</p>

      <h2>1. Natureza do serviço</h2>
      <p>A Meupriv oferece acesso a conteúdo digital exclusivo e privado mediante assinatura. O serviço é destinado exclusivamente a pessoas maiores de idade conforme a legislação local.</p>

      <h2>2. Conta e acesso</h2>
      <p>O acesso é pessoal e intransferível. É proibido compartilhar, redistribuir, gravar ou divulgar qualquer conteúdo obtido através da plataforma.</p>

      <h2>3. Pagamento</h2>
      <p>Os pagamentos são processados por gateway terceirizado. A assinatura é renovada automaticamente conforme o ciclo escolhido e pode ser cancelada a qualquer momento.</p>

      <h2>4. Conduta proibida</h2>
      <ul>
        <li>Republicar ou revender o conteúdo, total ou parcialmente.</li>
        <li>Realizar chargebacks indevidos.</li>
        <li>Tentar burlar sistemas de segurança ou autenticação.</li>
      </ul>

      <h2>5. Chargebacks</h2>
      <p>Disputas indevidas (chargebacks) poderão resultar em banimento permanente e medidas legais cabíveis.</p>

      <h2>6. Limitação de responsabilidade</h2>
      <p>A plataforma não se responsabiliza por uso indevido do conteúdo pelo assinante ou por terceiros.</p>

      <h2>7. Alterações</h2>
      <p>Estes termos podem ser atualizados a qualquer momento. O uso continuado da plataforma implica aceitação das novas condições.</p>
    </LegalLayout>
  ),
});
