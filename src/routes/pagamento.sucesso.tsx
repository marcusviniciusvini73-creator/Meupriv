import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import { z } from "zod";

const search = z.object({
  plano: z.enum(["basic", "vip", "private"]).optional().default("vip"),
});

export const Route = createFileRoute("/pagamento/sucesso")({
  head: () => ({ meta: [{ title: "Acesso liberado — Meupriv" }, { name: "robots", content: "noindex" }] }),
  validateSearch: (s) => search.parse(s),
  component: Sucesso,
});

function Sucesso() {
  const { plano } = Route.useSearch();
  const isPrivate = plano === "private";

  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-5 sm:px-8 py-24 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-wine to-magenta glow-magenta text-white text-2xl">
          ✓
        </div>
        <h1 className="mt-8 font-display text-5xl">
          Bem-vindo(a) à <span className="text-gradient-wine">Meupriv</span>.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Seu pagamento foi confirmado e os detalhes de acesso foram enviados para o seu
          email.
        </p>

        {isPrivate && (
          <div className="mt-10 rounded-3xl glass-strong glow-magenta p-7 text-left">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Experiência Privada
            </p>
            <p className="mt-3 font-display text-2xl">Convite privado a caminho</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Como assinante da Experiência Privada, você receberá em seu email o link
              exclusivo para o canal privado de conversa. O acesso é pessoal e
              intransferível.
            </p>
          </div>
        )}

        <div className="mt-10 flex gap-3 justify-center">
          <Link to="/" className="rounded-full bg-gradient-to-r from-wine to-magenta px-7 py-3.5 text-sm text-white">
            Voltar ao início
          </Link>
          <Link to="/contato" className="rounded-full glass px-7 py-3.5 text-sm">
            Suporte privado
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
