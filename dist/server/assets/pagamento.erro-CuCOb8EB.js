import { K as jsxRuntimeExports } from "./server-G4e4SWkO.js";
import { L as Link } from "./router-BteBIL-w.js";
import { P as PageShell } from "./layout-C6BtzJUn.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./types-DxrsuSRu.js";
function Erro() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-2xl px-5 sm:px-8 py-24 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-16 w-16 items-center justify-center rounded-full glass border border-destructive/50 text-destructive text-2xl", children: "!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-8 font-display text-5xl", children: "Não foi possível processar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Algo deu errado com o pagamento. Nenhum valor foi cobrado. Tente novamente ou fale com nosso suporte privado." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex gap-3 justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/planos", className: "rounded-full bg-gradient-to-r from-wine to-magenta px-7 py-3.5 text-sm text-white", children: "Tentar novamente" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contato", className: "rounded-full glass px-7 py-3.5 text-sm", children: "Suporte" })
    ] })
  ] }) });
}
export {
  Erro as component
};
