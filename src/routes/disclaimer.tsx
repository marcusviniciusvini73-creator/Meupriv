import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal-layout";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({ meta: [{ title: "Disclaimer — Meupriv" }] }),
  component: () => (
    <LegalLayout title="Disclaimer" updated="2025-05-16">
      <p>Este site contém material destinado exclusivamente a pessoas maiores de 18 anos. Ao acessar, você declara estar ciente da natureza do conteúdo.</p>

      <h2>Responsabilidade do usuário</h2>
      <p>É de responsabilidade do usuário garantir que o acesso a este tipo de conteúdo é permitido em sua jurisdição.</p>

      <h2>Conteúdo</h2>
      <p>Todo o material publicado é produzido com consentimento e protegido por direitos autorais. Qualquer redistribuição é proibida e sujeita a medidas legais.</p>

      <h2>Sem garantias</h2>
      <p>O serviço é oferecido "como está". Apesar do nosso compromisso com qualidade e disponibilidade, não garantimos funcionamento ininterrupto.</p>
    </LegalLayout>
  ),
});
