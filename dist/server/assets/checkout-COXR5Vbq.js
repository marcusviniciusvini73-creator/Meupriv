import { T as TSS_SERVER_FUNCTION, x as getServerFnById, j as createServerFn, U as reactExports, K as jsxRuntimeExports } from "./server-G4e4SWkO.js";
import { R as Route, u as useNavigate } from "./router-BteBIL-w.js";
import { P as PageShell } from "./layout-C6BtzJUn.js";
import { o as objectType, s as stringType } from "./types-DxrsuSRu.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const criarPix = createServerFn({
  method: "POST"
}).handler(createSsrRpc("9ad0073fe11875e81b7851934f342c7970c6926546a6e28f6a857ecc54889497"));
const verificarPix = createServerFn({
  method: "GET"
}).handler(createSsrRpc("0e9897260f3c0205d5c111414e32c85e9fdd589882eb9f3ec186a0dcb9c9b7ee"));
const notificarVendaFn = createServerFn({
  method: "POST"
}).handler(createSsrRpc("e83e45c2167e6793e04dbf9225a8a2a91b40e142c7f5d2eb8a7c7a69890ee768"));
const PLAN_PRICES = {
  basic: "R$ 29,90",
  vip: "R$ 59,90",
  private: "R$ 149,00"
};
function PixPayment({ amount, planName, planKey, clientName, clientEmail, onConfirmed }) {
  const [step, setStep] = reactExports.useState("idle");
  const [pix, setPix] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(false);
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  const [secondsLeft, setSecondsLeft] = reactExports.useState(0);
  const pollingRef = reactExports.useRef(null);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => () => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);
  const iniciarPolling = reactExports.useCallback((txId) => {
    pollingRef.current = setInterval(async () => {
      try {
        const { pago } = await verificarPix({ data: { txId } });
        if (pago) {
          clearInterval(pollingRef.current);
          clearInterval(timerRef.current);
          setStep("confirmed");
          try {
            await notificarVendaFn({
              data: {
                nome: clientName,
                email: clientEmail,
                plano: planKey,
                valor: PLAN_PRICES[planKey] ?? `R$ ${amount.toFixed(2)}`,
                txId
              }
            });
          } catch {
          }
          onConfirmed?.();
        }
      } catch {
      }
    }, 5e3);
    setTimeout(() => clearInterval(pollingRef.current), 15 * 60 * 1e3);
  }, [onConfirmed, clientName, clientEmail, planKey, amount]);
  const iniciarTimer = reactExports.useCallback((segundos) => {
    setSecondsLeft(segundos);
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1e3);
  }, []);
  async function handleGerar() {
    setStep("loading");
    setErrorMsg("");
    try {
      const data = await criarPix({ data: { amount } });
      setPix(data);
      setStep("pix");
      iniciarPolling(data.txId);
      if (data.expiresIn) iniciarTimer(data.expiresIn);
    } catch (err) {
      setErrorMsg(err.message ?? "Erro ao gerar PIX");
      setStep("error");
    }
  }
  async function handleCopiar() {
    if (!pix?.copyPasteCode) return;
    await navigator.clipboard.writeText(pix.copyPasteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }
  const fmt = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl glass-strong p-7 sm:p-9 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full bg-gradient-to-br from-wine to-magenta flex items-center justify-center text-base shrink-0", children: "◈" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.25em] text-muted-foreground", children: "Pagamento via" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg leading-tight", children: "PIX" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: planName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl text-gradient-wine", children: amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hairline" }),
    step === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Clique abaixo para gerar seu QR Code PIX. O acesso é liberado automaticamente assim que o pagamento for confirmado." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleGerar,
          className: "w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-wine to-magenta px-7 py-4 text-sm font-medium text-white glow-magenta transition hover:opacity-90",
          children: "Gerar QR Code PIX"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-center text-muted-foreground", children: "🔒 Transação instantânea · Cobrança discreta · 100% anônima" })
    ] }),
    step === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full border-2 border-magenta border-t-transparent animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Gerando seu PIX…" })
    ] }),
    step === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-destructive", children: [
        "⚠ ",
        errorMsg
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleGerar,
          className: "rounded-full border border-border px-6 py-2.5 text-sm text-muted-foreground hover:text-foreground transition",
          children: "Tentar novamente"
        }
      )
    ] }),
    step === "pix" && pix && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      pix.qrCodeBase64 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-white p-3 shadow-lg shadow-black/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `data:image/png;base64,${pix.qrCodeBase64}`, alt: "QR Code PIX", className: "h-48 w-48 block" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: 'Abra o app do seu banco → PIX → "Ler QR Code"' }),
      pix.copyPasteCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: "Ou use o código copia e cola:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[11px] text-foreground/70 break-all leading-relaxed", children: [
          pix.copyPasteCode.slice(0, 60),
          "…"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleCopiar,
            className: `w-full rounded-full py-2.5 text-sm font-medium transition ${copied ? "bg-gradient-to-r from-wine to-magenta text-white glow-magenta" : "border border-border text-muted-foreground hover:text-foreground"}`,
            children: copied ? "✓ Código copiado!" : "Copiar código PIX"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-2 w-2 rounded-full bg-magenta animate-pulse" }),
          "Aguardando confirmação…"
        ] }),
        secondsLeft > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
          "Expira em ",
          fmt(secondsLeft)
        ] })
      ] })
    ] }),
    step === "confirmed" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-gradient-to-br from-wine to-magenta glow-magenta flex items-center justify-center text-2xl text-white", children: "✓" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl", children: "Pagamento confirmado!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Seu acesso será liberado em instantes. Verifique seu email." })
      ] })
    ] })
  ] });
}
const verificarEmail = createServerFn({
  method: "POST"
}).handler(createSsrRpc("b2acdf280e1b4ccd19e3ffccee1ee2a5ca5e46030d21018f3c149f682614fcb0"));
const PLAN_INFO = {
  basic: {
    name: "Acesso Básico",
    price: "R$ 29,90",
    amount: 29.9
  },
  vip: {
    name: "VIP",
    price: "R$ 59,90",
    amount: 59.9
  },
  private: {
    name: "Experiência Privada",
    price: "R$ 149,00",
    amount: 149
  }
};
function EmailCheckLoader({
  visible
}) {
  const [dots, setDots] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setDots((d) => (d + 1) % 4), 420);
    return () => clearInterval(id);
  }, [visible]);
  if (!visible) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-live": "polite", "aria-label": "Verificando email", className: "flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-input/60 border border-border text-sm text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-5 w-5 shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full border-2 border-magenta/40 animate-ping" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative m-auto h-3 w-3 rounded-full bg-magenta/70" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground/80", children: [
      "Verificando email",
      ".".repeat(dots + 1)
    ] })
  ] });
}
function CheckoutPage() {
  const {
    plano
  } = Route.useSearch();
  const navigate = useNavigate();
  const planKey = plano ?? "vip";
  const plan = PLAN_INFO[planKey];
  const [step, setStep] = reactExports.useState("form");
  const [form, setForm] = reactExports.useState({
    name: "",
    email: ""
  });
  const [accepted, setAccepted] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  const [checkingEmail, setCheckingEmail] = reactExports.useState(false);
  const emailRef = reactExports.useRef(null);
  const schema = reactExports.useMemo(() => objectType({
    name: stringType().trim().min(2, "Informe seu nome").max(80),
    email: stringType().trim().email("Email inválido").max(120)
  }), []);
  async function onSubmit(e) {
    e.preventDefault();
    setErrors({});
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs = {};
      parsed.error.issues.forEach((i) => errs[i.path[0]] = i.message);
      setErrors(errs);
      return;
    }
    if (!accepted) {
      setErrors({
        terms: "Você precisa aceitar os termos"
      });
      return;
    }
    setCheckingEmail(true);
    try {
      const {
        valido
      } = await verificarEmail({
        data: {
          email: form.email
        }
      });
      if (!valido) {
        setErrors({
          email: "Este email não existe. Use um email real."
        });
        setCheckingEmail(false);
        emailRef.current?.focus();
        return;
      }
    } catch {
    }
    setCheckingEmail(false);
    setStep("pix");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-5 sm:px-8 py-12 sm:py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: "— Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 font-display text-4xl sm:text-5xl", children: [
        "Finalize seu ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-gradient-wine not-italic", children: "acesso" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Seus dados são usados apenas para liberar o acesso. Compra anônima e discreta." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid gap-8 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-4", children: [
        step === "form" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "rounded-3xl glass-strong p-7 sm:p-9 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome", value: form.name, onChange: (v) => setForm({
            ...form,
            name: v
          }), error: errors.name, placeholder: "Como prefere ser chamado(a)", disabled: checkingEmail }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { ref: emailRef, label: "Email", type: "email", value: form.email, onChange: (v) => setForm({
            ...form,
            email: v
          }), error: errors.email, placeholder: "seuemail@exemplo.com", hint: "Usado apenas para liberação do acesso.", disabled: checkingEmail }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(EmailCheckLoader, { visible: checkingEmail }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-3 cursor-pointer select-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: accepted, onChange: (e) => setAccepted(e.target.checked), disabled: checkingEmail, className: "mt-1 h-4 w-4 rounded border-border bg-input accent-magenta" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              "Confirmo ser maior de 18 anos e aceito os",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/termos", className: "text-foreground underline underline-offset-4", children: "termos" }),
              ",",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/privacidade", className: "text-foreground underline underline-offset-4", children: "privacidade" }),
              " e a",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/reembolso", className: "text-foreground underline underline-offset-4", children: "política de reembolso" }),
              "."
            ] })
          ] }),
          errors.terms && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.terms }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: checkingEmail, className: "w-full inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-wine to-magenta px-7 py-4 text-sm font-medium text-white glow-magenta transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed", children: checkingEmail ? "Aguarde…" : "Continuar para pagamento →" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-center text-muted-foreground", children: "🔒 Conexão criptografada • Cobrança discreta no extrato" })
        ] }),
        step === "pix" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStep("form"), className: "text-xs text-muted-foreground hover:text-foreground transition flex items-center gap-1", children: "← Voltar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PixPayment, { amount: plan.amount, planName: plan.name, planKey, clientName: form.name, clientEmail: form.email, onConfirmed: () => navigate({
            to: "/pagamento/sucesso",
            search: {
              plano: planKey
            }
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:col-span-2 rounded-3xl glass p-7 h-fit lg:sticky lg:top-28 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: "Resumo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl", children: plan.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Assinatura mensal" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl", children: plan.price })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hairline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-foreground/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: plan.price })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Taxas" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Inclusas" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between font-medium text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: plan.price })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hairline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "✓ Acesso liberado imediatamente após confirmação" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "✓ Compra 100% anônima" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "✓ Suporte privado por email" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 pt-2 flex-wrap", children: ["basic", "vip", "private"].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/checkout?plano=${p}`, className: `text-[11px] rounded-full px-3 py-1.5 transition ${p === planKey ? "bg-gradient-to-r from-wine to-magenta text-white" : "glass text-muted-foreground hover:text-foreground"}`, children: PLAN_INFO[p].name }, p)) })
      ] })
    ] })
  ] }) });
}
const Field = reactExports.forwardRef(function Field2({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  hint,
  disabled
}, ref) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref, type, value, onChange: (e) => onChange(e.target.value), placeholder, disabled, className: "w-full rounded-2xl bg-input/60 border border-border px-5 py-3.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-magenta/60 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed" }),
    hint && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[11px] text-muted-foreground", children: hint }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[11px] text-destructive", children: error })
  ] });
});
export {
  CheckoutPage as component
};
