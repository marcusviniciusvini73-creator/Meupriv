import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";

export const Route = createFileRoute("/pagamento/erro")({
  head: () => ({ meta: [{ title: "Erro no pagamento — Meupriv" }, { name: "robots", content: "noindex" }] }),
  component: Erro,
});

function Erro() {
  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-5 sm:px-8 py-24 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full glass border border-destructive/50 text-destructive text-2xl">
          !
        </div>
        <h1 className="mt-8 font-display text-5xl">Não foi possível processar</h1>
        <p className="mt-4 text-muted-foreground">
          Algo deu errado com o pagamento. Nenhum valor foi cobrado. Tente novamente ou
          fale com nosso suporte privado.
        </p>
        <div className="mt-10 flex gap-3 justify-center">
          <Link to="/planos" className="rounded-full bg-gradient-to-r from-wine to-magenta px-7 py-3.5 text-sm text-white">
            Tentar novamente
          </Link>
          <Link to="/contato" className="rounded-full glass px-7 py-3.5 text-sm">
            Suporte
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
