import { K as jsxRuntimeExports } from "./server-G4e4SWkO.js";
import { L as Link } from "./router-BteBIL-w.js";
import { P as PageShell } from "./layout-C6BtzJUn.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./types-DxrsuSRu.js";
function Pendente() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-2xl px-5 sm:px-8 py-24 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-16 w-16 items-center justify-center rounded-full glass-strong glow-magenta", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 rounded-full border-2 border-magenta border-t-transparent animate-spin" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-8 font-display text-5xl", children: "Aguardando confirmação" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Estamos processando seu pagamento. Assim que confirmado, o acesso será liberado automaticamente e enviado para seu email." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex gap-3 justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full glass px-6 py-3 text-sm", children: "Voltar ao início" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contato", className: "rounded-full bg-gradient-to-r from-wine to-magenta px-6 py-3 text-sm text-white", children: "Suporte" })
    ] })
  ] }) });
}
export {
  Pendente as component
};
