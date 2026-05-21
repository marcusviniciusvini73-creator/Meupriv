import { K as jsxRuntimeExports } from "./server-G4e4SWkO.js";
import { P as PageShell } from "./layout-C6BtzJUn.js";
import { P as PlansGrid } from "./router-BteBIL-w.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./types-DxrsuSRu.js";
function PlanosPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: "— Planos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 font-display text-5xl sm:text-6xl leading-tight", children: [
        "Escolha seu nível de ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-gradient-wine not-italic", children: "acesso" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-muted-foreground leading-relaxed", children: "Todos os planos incluem compra anônima, pagamento seguro e liberação imediata. Cancele quando quiser." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlansGrid, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-20 grid md:grid-cols-3 gap-6", children: [{
      t: "Pagamento seguro",
      d: "Transações criptografadas via gateway certificado."
    }, {
      t: "Sem nome no extrato",
      d: "A cobrança aparece de forma genérica e discreta."
    }, {
      t: "Cancelamento livre",
      d: "Você controla sua assinatura — sem prender ninguém."
    }].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl", children: i.t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: i.d })
    ] }, i.t)) })
  ] }) });
}
export {
  PlanosPage as component
};
