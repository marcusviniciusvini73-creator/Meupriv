import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const links = [
    { to: "/", label: "Início" },
    { to: "/planos", label: "Planos" },
    { to: "/sobre", label: "Sobre" },
    { to: "/contato", label: "Suporte" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-5 sm:px-8 transition-all duration-500 ${
          scrolled ? "" : ""
        }`}
      >
        <div
          className={`flex items-center justify-between rounded-full px-5 sm:px-7 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong" : "bg-transparent"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display text-2xl tracking-tight">
              <span className="text-foreground">Meu</span>
              <span className="text-gradient-wine">priv</span>
              <span className="text-foreground">.</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/planos"
            className="hidden md:inline-flex items-center rounded-full bg-gradient-to-r from-wine to-magenta px-5 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            Acesso privado
          </Link>

          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full glass"
          >
            <span className="sr-only">Abrir menu</span>
            <div className="space-y-1.5">
              <span className={`block w-4 h-px bg-foreground transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block w-4 h-px bg-foreground transition ${open ? "opacity-0" : ""}`} />
              <span className={`block w-4 h-px bg-foreground transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-2 rounded-3xl glass-strong p-5 animate-fade-up">
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="px-3 py-3 rounded-xl text-foreground/80 hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/planos"
                className="mt-2 text-center rounded-full bg-gradient-to-r from-wine to-magenta px-5 py-3 text-sm font-medium text-white"
              >
                Acesso privado
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-3xl">
              <span>Meu</span>
              <span className="text-gradient-wine">priv</span>
              <span>.</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              Plataforma privada para acesso a conteúdo exclusivo. Discrição, segurança e
              experiência premium em cada detalhe.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="mailto:suporte@meupriv.com"
                className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs hover:bg-white/5 transition"
              >
                Suporte privado
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Plataforma</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/planos" className="hover:text-foreground text-muted-foreground">Planos</Link></li>
              <li><Link to="/sobre" className="hover:text-foreground text-muted-foreground">Sobre</Link></li>
              <li><Link to="/contato" className="hover:text-foreground text-muted-foreground">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Legal</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/termos" className="hover:text-foreground text-muted-foreground">Termos de Serviço</Link></li>
              <li><Link to="/privacidade" className="hover:text-foreground text-muted-foreground">Privacidade</Link></li>
              <li><Link to="/reembolso" className="hover:text-foreground text-muted-foreground">Reembolso</Link></li>
              <li><Link to="/disclaimer" className="hover:text-foreground text-muted-foreground">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 hairline" />
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Meupriv. Todos os direitos reservados.</p>
          <p>Acesso restrito a maiores de 18 anos.</p>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-28">{children}</main>
      <Footer />
    </div>
  );
}
