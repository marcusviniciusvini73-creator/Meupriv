import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import { useMemo, useState, useEffect, useRef } from "react";
import { z } from "zod";
import { PixPayment } from "@/components/PixPayment";
import { verificarEmail } from "@/lib/verificarEmail";

const searchSchema = z.object({
  plano: z.enum(["basic", "vip", "private"]).optional().default("vip"),
});

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Meupriv" },
      { name: "description", content: "Finalize seu acesso privado de forma segura e anônima." },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (s) => searchSchema.parse(s),
  component: CheckoutPage,
});

const PLAN_INFO = {
  basic:   { name: "Acesso Básico",       price: "R$ 29,90",  amount: 29.90  },
  vip:     { name: "VIP",                 price: "R$ 59,90",  amount: 59.90  },
  private: { name: "Experiência Privada", price: "R$ 149,00", amount: 149.00 },
} as const;

/* ─── Componente de loading animado ─────────────────────────── */
function EmailCheckLoader({ visible }: { visible: boolean }) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setDots((d) => (d + 1) % 4), 420);
    return () => clearInterval(id);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Verificando email"
      className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-input/60 border border-border text-sm text-muted-foreground"
    >
      {/* Anel pulsante duplo */}
      <span className="relative flex h-5 w-5 shrink-0">
        <span className="absolute inset-0 rounded-full border-2 border-magenta/40 animate-ping" />
        <span className="relative m-auto h-3 w-3 rounded-full bg-magenta/70" />
      </span>
      <span className="font-medium text-foreground/80">
        Verificando email{"." .repeat(dots + 1)}
      </span>
    </div>
  );
}

/* ─── Página de checkout ─────────────────────────────────────── */
function CheckoutPage() {
  const { plano }  = Route.useSearch();
  const navigate   = useNavigate();
  const planKey    = (plano ?? "vip") as keyof typeof PLAN_INFO;
  const plan       = PLAN_INFO[planKey];

  const [step, setStep]           = useState<"form" | "pix">("form");
  const [form, setForm]           = useState({ name: "", email: "" });
  const [accepted, setAccepted]   = useState(false);
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [checkingEmail, setCheckingEmail] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);

  const schema = useMemo(
    () =>
      z.object({
        name:  z.string().trim().min(2, "Informe seu nome").max(80),
        email: z.string().trim().email("Email inválido").max(120),
      }),
    []
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    if (!accepted) {
      setErrors({ terms: "Você precisa aceitar os termos" });
      return;
    }

    setCheckingEmail(true);
    try {
      const { valido } = await verificarEmail({ data: { email: form.email } });
      if (!valido) {
        setErrors({ email: "Este email não existe. Use um email real." });
        setCheckingEmail(false);
        emailRef.current?.focus();
        return;
      }
    } catch {
      /* falha silenciosa — deixa prosseguir */
    }
    setCheckingEmail(false);
    setStep("pix");
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-12 sm:py-20">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">— Checkout</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">
            Finalize seu <em className="text-gradient-wine not-italic">acesso</em>.
          </h1>
          <p className="mt-3 text-muted-foreground">
            Seus dados são usados apenas para liberar o acesso. Compra anônima e discreta.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-4">

            {step === "form" && (
              <form
                onSubmit={onSubmit}
                className="rounded-3xl glass-strong p-7 sm:p-9 space-y-6"
              >
                <Field
                  label="Nome"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  error={errors.name}
                  placeholder="Como prefere ser chamado(a)"
                  disabled={checkingEmail}
                />

                <Field
                  ref={emailRef}
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  error={errors.email}
                  placeholder="seuemail@exemplo.com"
                  hint="Usado apenas para liberação do acesso."
                  disabled={checkingEmail}
                />

                {/* Loader de verificação substitui o hint quando ativo */}
                <EmailCheckLoader visible={checkingEmail} />

                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    disabled={checkingEmail}
                    className="mt-1 h-4 w-4 rounded border-border bg-input accent-magenta"
                  />
                  <span className="text-sm text-muted-foreground">
                    Confirmo ser maior de 18 anos e aceito os{" "}
                    <a href="/termos" className="text-foreground underline underline-offset-4">termos</a>,{" "}
                    <a href="/privacidade" className="text-foreground underline underline-offset-4">privacidade</a> e a{" "}
                    <a href="/reembolso" className="text-foreground underline underline-offset-4">política de reembolso</a>.
                  </span>
                </label>

                {errors.terms && (
                  <p className="text-xs text-destructive">{errors.terms}</p>
                )}

                <button
                  type="submit"
                  disabled={checkingEmail}
                  className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-wine to-magenta px-7 py-4 text-sm font-medium text-white glow-magenta transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {checkingEmail ? "Aguarde…" : "Continuar para pagamento →"}
                </button>

                <p className="text-[11px] text-center text-muted-foreground">
                  🔒 Conexão criptografada • Cobrança discreta no extrato
                </p>
              </form>
            )}

            {step === "pix" && (
              <>
                <button
                  onClick={() => setStep("form")}
                  className="text-xs text-muted-foreground hover:text-foreground transition flex items-center gap-1"
                >
                  ← Voltar
                </button>
                <PixPayment
                  amount={plan.amount}
                  planName={plan.name}
                  planKey={planKey}
                  clientName={form.name}
                  clientEmail={form.email}
                  onConfirmed={() =>
                    navigate({ to: "/pagamento/sucesso", search: { plano: planKey } })
                  }
                />
              </>
            )}
          </div>

          <aside className="lg:col-span-2 rounded-3xl glass p-7 h-fit lg:sticky lg:top-28 space-y-5">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Resumo</p>
            <div className="flex items-baseline justify-between">
              <div>
                <p className="font-display text-2xl">{plan.name}</p>
                <p className="text-sm text-muted-foreground">Assinatura mensal</p>
              </div>
              <p className="font-display text-2xl">{plan.price}</p>
            </div>
            <div className="hairline" />
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex justify-between"><span>Subtotal</span><span>{plan.price}</span></li>
              <li className="flex justify-between text-muted-foreground"><span>Taxas</span><span>Inclusas</span></li>
              <li className="flex justify-between font-medium text-foreground"><span>Total</span><span>{plan.price}</span></li>
            </ul>
            <div className="hairline" />
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>✓ Acesso liberado imediatamente após confirmação</p>
              <p>✓ Compra 100% anônima</p>
              <p>✓ Suporte privado por email</p>
            </div>
            <div className="flex gap-2 pt-2 flex-wrap">
              {(["basic", "vip", "private"] as const).map((p) => (
                <a
                  key={p}
                  href={`/checkout?plano=${p}`}
                  className={`text-[11px] rounded-full px-3 py-1.5 transition ${
                    p === planKey
                      ? "bg-gradient-to-r from-wine to-magenta text-white"
                      : "glass text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {PLAN_INFO[p].name}
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

/* ─── Campo de formulário ────────────────────────────────────── */
import { forwardRef } from "react";

const Field = forwardRef<
  HTMLInputElement,
  {
    label: string;
    value: string;
    onChange: (v: string) => void;
    error?: string;
    placeholder?: string;
    type?: string;
    hint?: string;
    disabled?: boolean;
  }
>(function Field({ label, value, onChange, error, placeholder, type = "text", hint, disabled }, ref) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
        {label}
      </label>
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-2xl bg-input/60 border border-border px-5 py-3.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-magenta/60 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
      />
      {hint && !error && (
        <p className="mt-1.5 text-[11px] text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p className="mt-1.5 text-[11px] text-destructive">{error}</p>
      )}
    </div>
  );
});
