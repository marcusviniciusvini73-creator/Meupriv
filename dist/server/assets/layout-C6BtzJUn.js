import { a6 as useRouter, K as jsxRuntimeExports, U as reactExports } from "./server-G4e4SWkO.js";
import { L as Link } from "./router-BteBIL-w.js";
function useRouterState(opts) {
  const contextRouter = useRouter();
  const router = contextRouter;
  {
    const state = router.stores.__store.get();
    return state;
  }
}
function Navbar() {
  const [open, setOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  const { location } = useRouterState();
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  reactExports.useEffect(() => setOpen(false), [location.pathname]);
  const links = [
    { to: "/", label: "Início" },
    { to: "/planos", label: "Planos" },
    { to: "/sobre", label: "Sobre" },
    { to: "/contato", label: "Suporte" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "header",
    {
      className: `fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `mx-auto max-w-7xl px-5 sm:px-8 transition-all duration-500 ${scrolled ? "" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-center justify-between rounded-full px-5 sm:px-7 py-3 transition-all duration-500 ${scrolled ? "glass-strong" : "bg-transparent"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex items-center gap-2 group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl tracking-tight", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Meu" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-wine", children: "priv" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "." })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-8", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: l.to,
                      className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
                      activeProps: { className: "text-foreground" },
                      activeOptions: { exact: l.to === "/" },
                      children: l.label
                    },
                    l.to
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/planos",
                      className: "hidden md:inline-flex items-center rounded-full bg-gradient-to-r from-wine to-magenta px-5 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity",
                      children: "Acesso privado"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      "aria-label": "Menu",
                      onClick: () => setOpen((o) => !o),
                      className: "md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full glass",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Abrir menu" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `block w-4 h-px bg-foreground transition ${open ? "translate-y-[6px] rotate-45" : ""}` }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `block w-4 h-px bg-foreground transition ${open ? "opacity-0" : ""}` }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `block w-4 h-px bg-foreground transition ${open ? "-translate-y-[6px] -rotate-45" : ""}` })
                        ] })
                      ]
                    }
                  )
                ]
              }
            ),
            open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden mt-2 rounded-3xl glass-strong p-5 animate-fade-up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-col gap-1", children: [
              links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: l.to,
                  className: "px-3 py-3 rounded-xl text-foreground/80 hover:bg-white/5",
                  children: l.label
                },
                l.to
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/planos",
                  className: "mt-2 text-center rounded-full bg-gradient-to-r from-wine to-magenta px-5 py-3 text-sm font-medium text-white",
                  children: "Acesso privado"
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "relative mt-32 border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 sm:px-8 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Meu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-wine", children: "priv" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed", children: "Plataforma privada para acesso a conteúdo exclusivo. Discrição, segurança e experiência premium em cada detalhe." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "mailto:suporte@meupriv.com",
            className: "inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs hover:bg-white/5 transition",
            children: "Suporte privado"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Plataforma" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/planos", className: "hover:text-foreground text-muted-foreground", children: "Planos" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sobre", className: "hover:text-foreground text-muted-foreground", children: "Sobre" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contato", className: "hover:text-foreground text-muted-foreground", children: "Contato" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Legal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/termos", className: "hover:text-foreground text-muted-foreground", children: "Termos de Serviço" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacidade", className: "hover:text-foreground text-muted-foreground", children: "Privacidade" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/reembolso", className: "hover:text-foreground text-muted-foreground", children: "Reembolso" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/disclaimer", className: "hover:text-foreground text-muted-foreground", children: "Disclaimer" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 hairline" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Meupriv. Todos os direitos reservados."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Acesso restrito a maiores de 18 anos." })
    ] })
  ] }) });
}
function PageShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-28", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  PageShell as P
};
