import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import { z } from "zod";

const search = z.object({ plano: z.string().optional() });

export const Route = createFileRoute("/pagamento/pendente")({
  head: () => ({ meta: [{ title: "Pagamento pendente — Meupriv" }, { name: "robots", content: "noindex" }] }),
  validateSearch: (s) => search.parse(s),
  component: Pendente,
});

function Pendente() {
  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-5 sm:px-8 py-24 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full glass-strong glow-magenta">
          <div className="h-6 w-6 rounded-full border-2 border-magenta border-t-transparent animate-spin" />
        </div>
        <h1 className="mt-8 font-display text-5xl">Aguardando confirmação</h1>
        <p className="mt-4 text-muted-foreground">
          Estamos processando seu pagamento. Assim que confirmado, o acesso será liberado
          automaticamente e enviado para seu email.
        </p>
        <div className="mt-10 flex gap-3 justify-center">
          <Link to="/" className="rounded-full glass px-6 py-3 text-sm">Voltar ao início</Link>
          <Link to="/contato" className="rounded-full bg-gradient-to-r from-wine to-magenta px-6 py-3 text-sm text-white">
            Suporte
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
