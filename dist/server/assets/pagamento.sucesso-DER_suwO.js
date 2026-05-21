import { K as jsxRuntimeExports } from "./server-G4e4SWkO.js";
import { a as Route, L as Link } from "./router-BteBIL-w.js";
import { P as PageShell } from "./layout-C6BtzJUn.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./types-DxrsuSRu.js";
function Sucesso() {
  const {
    plano
  } = Route.useSearch();
  const isPrivate = plano === "private";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-2xl px-5 sm:px-8 py-24 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-wine to-magenta glow-magenta text-white text-2xl", children: "✓" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-8 font-display text-5xl", children: [
      "Bem-vindo(a) à ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-wine", children: "Meupriv" }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Seu pagamento foi confirmado e os detalhes de acesso foram enviados para o seu email." }),
    isPrivate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-3xl glass-strong glow-magenta p-7 text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: "Experiência Privada" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-display text-2xl", children: "Convite privado a caminho" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Como assinante da Experiência Privada, você receberá em seu email o link exclusivo para o canal privado de conversa. O acesso é pessoal e intransferível." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex gap-3 justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-gradient-to-r from-wine to-magenta px-7 py-3.5 text-sm text-white", children: "Voltar ao início" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contato", className: "rounded-full glass px-7 py-3.5 text-sm", children: "Suporte privado" })
    ] })
  ] }) });
}
export {
  Sucesso as component
};
