import { K as jsxRuntimeExports } from "./server-G4e4SWkO.js";
import { P as PageShell } from "./layout-C6BtzJUn.js";
function LegalLayout({
  title,
  updated,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: "— Legal" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-4xl sm:text-5xl", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-xs text-muted-foreground", children: [
      "Última atualização: ",
      updated
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 space-y-6 text-foreground/85 leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-2 [&_p]:text-[15px] [&_p]:text-foreground/80 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:text-foreground/80 [&_li]:text-[15px]", children })
  ] }) });
}
export {
  LegalLayout as L
};
