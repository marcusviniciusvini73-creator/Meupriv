import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Suporte — Meupriv" },
      { name: "description", content: "Canal privado de suporte." },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">— Suporte</p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl">
          Aqui, em <em className="text-gradient-wine not-italic">silêncio</em>.
        </h1>
        <p className="mt-5 text-muted-foreground">
          Nosso atendimento é privado e responde apenas pelo canal oficial.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          <a
            href="mailto:suporte@meupriv.com"
            className="rounded-3xl glass-strong p-7 glow-magenta hover:bg-white/5 transition"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email privado</p>
            <p className="mt-2 font-display text-2xl">suporte@meupriv.com</p>
            <p className="mt-1 text-sm text-muted-foreground">Resposta em até 12 horas, com total discrição.</p>
          </a>
          <div className="rounded-3xl glass p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Horário</p>
            <p className="mt-2 font-display text-2xl">Todos os dias</p>
            <p className="mt-1 text-sm text-muted-foreground">Das 09h às 23h (horário de Brasília).</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
