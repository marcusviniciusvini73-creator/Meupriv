import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import { PlansGrid } from "./index";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos — Meupriv" },
      { name: "description", content: "Escolha entre três planos exclusivos: Acesso Básico, VIP ou Experiência Privada." },
    ],
  }),
  component: PlanosPage,
});

function PlanosPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">— Planos</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl leading-tight">
            Escolha seu nível de <em className="text-gradient-wine not-italic">acesso</em>.
          </h1>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Todos os planos incluem compra anônima, pagamento seguro e liberação
            imediata. Cancele quando quiser.
          </p>
        </div>

        <div className="mt-16">
          <PlansGrid />
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {[
            { t: "Pagamento seguro", d: "Transações criptografadas via gateway certificado." },
            { t: "Sem nome no extrato", d: "A cobrança aparece de forma genérica e discreta." },
            { t: "Cancelamento livre", d: "Você controla sua assinatura — sem prender ninguém." },
          ].map((i) => (
            <div key={i.t} className="rounded-2xl glass p-6">
              <p className="font-display text-xl">{i.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
