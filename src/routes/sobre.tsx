import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Meupriv" },
      { name: "description", content: "Como funciona o acesso privado, segurança e discrição na plataforma Meupriv." },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-5 sm:px-8 py-16 sm:py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">— Sobre</p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl leading-[1.05] max-w-3xl">
          Uma plataforma criada para
          <em className="text-gradient-wine not-italic"> proteger </em>
          quem deseja.
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
          A Meupriv foi pensada do zero para entregar uma experiência íntima sem comprometer
          sua privacidade. Cada etapa — do checkout à liberação do acesso — passa por
          camadas de segurança e discrição.
        </p>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {[
            { n: "01", t: "Escolha", d: "Selecione o plano que combina com você." },
            { n: "02", t: "Pague", d: "Checkout seguro e anônimo via gateway certificado." },
            { n: "03", t: "Acesse", d: "Liberação imediata após confirmação do pagamento." },
          ].map((s) => (
            <div key={s.n} className="rounded-3xl glass p-7">
              <p className="font-display text-3xl text-gradient-wine">{s.n}</p>
              <p className="mt-3 font-display text-2xl">{s.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <Link
            to="/planos"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-wine to-magenta px-7 py-4 text-sm font-medium text-white glow-wine"
          >
            Ver planos →
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
