import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";
import { PageShell } from "@/components/layout";
import { PreviewCardsSection } from "@/components/preview-cards";

// ── Cronômetro de 24 horas que reseta a cada 3 dias ────────────────
const CYCLE_DAYS = 3;
const OFFER_HOURS = 24;
const CYCLE_MS = CYCLE_DAYS * 24 * 60 * 60 * 1000;
const OFFER_MS = OFFER_HOURS * 60 * 60 * 1000;
const STORAGE_KEY = "meupriv_cycle_start";

function getCycleStart(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    if (stored) {
      const start = parseInt(stored, 10);
      if (now - start >= CYCLE_MS) {
        localStorage.setItem(STORAGE_KEY, String(now));
        return now;
      }
      return start;
    } else {
      localStorage.setItem(STORAGE_KEY, String(now));
      return now;
    }
  } catch {
    return Date.now();
  }
}

function useOfferCountdown() {
  const [state, setState] = useState<{
    ms: number;
    active: boolean;
    h: number;
    m: number;
    s: number;
  }>(() => {
    const start = getCycleStart();
    const elapsed = Date.now() - start;
    const remaining = Math.max(0, OFFER_MS - elapsed);
    return {
      ms: remaining,
      active: remaining > 0,
      h: Math.floor(remaining / 3_600_000),
      m: Math.floor((remaining % 3_600_000) / 60_000),
      s: Math.floor((remaining % 60_000) / 1000),
    };
  });

  useEffect(() => {
    const tick = () => {
      const start = getCycleStart();
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, OFFER_MS - elapsed);
      setState({
        ms: remaining,
        active: remaining > 0,
        h: Math.floor(remaining / 3_600_000),
        m: Math.floor((remaining % 3_600_000) / 60_000),
        s: Math.floor((remaining % 60_000) / 1000),
      });
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return state;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function DiscountBanner() {
  const { active, h, m, s } = useOfferCountdown();
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current || !active) return;
    gsap.from(bannerRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
    });
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={bannerRef}
      className="mb-10 flex items-center justify-center gap-3 rounded-2xl border border-magenta/30 bg-magenta/10 px-6 py-4 text-sm flex-wrap"
    >
      <span className="text-magenta font-medium tracking-wide uppercase text-[11px]">
        🔥 Oferta imperdível por tempo limitado
      </span>
      <span className="text-muted-foreground">—</span>
      <span className="font-display text-foreground text-base">
        Expira em{" "}
        <span className="text-magenta tabular-nums font-bold">
          {pad(h)}:{pad(m)}:{pad(s)}
        </span>
      </span>
    </div>
  );
}

function CountUp({ to, prefix = "" }: { to: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let tween: gsap.core.Tween | null = null;
    const obj = { v: 0 };
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          observer.disconnect();
          tween = gsap.to(obj, {
            v: to,
            duration: 2.4,
            ease: "power2.out",
            onUpdate: () => { el.textContent = `${prefix}${obj.v.toFixed(0)}`; },
            onComplete: () => { el.textContent = `${prefix}${to}`; },
          });
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => { io.disconnect(); tween?.kill(); };
  }, [to, prefix]);
  return <span ref={ref}>{prefix}0</span>;
}

export const Route = createFileRoute("/")(  {
  head: () => ({
    meta: [
      { title: "Meupriv — Acesso privado e exclusivo" },
      { name: "description", content: "Plataforma premium para acesso a conteúdo exclusivo privado." },
      { property: "og:title", content: "Meupriv — Acesso privado e exclusivo" },
      { property: "og:description", content: "Conteúdo exclusivo. Compra anônima. Entrega instantânea." },
    ],
  }),
  component: HomePage,
});

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] tracking-wide text-foreground/80">
      <span className="w-1.5 h-1.5 rounded-full bg-magenta shadow-[0_0_8px_var(--magenta)]" />
      {children}
    </span>
  );
}

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-item]", { y: 24, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12 });
      gsap.from("[data-hero-shout]", { scale: 0.92, opacity: 0, duration: 1.2, delay: 0.4, ease: "expo.out" });
      gsap.to("[data-hero-shout]", { y: -6, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.6 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageShell>
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroBg} alt="" width={1920} height={1280} className="h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-32 sm:pt-24 sm:pb-40">
          <div className="max-w-3xl animate-fade-up">
            <div className="flex flex-wrap gap-2" data-hero-item>
              <Badge>Acesso privado</Badge>
              <Badge>Compra anônima</Badge>
              <Badge>Entrega instantânea</Badge>
            </div>
            <h1 className="mt-8 font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight" data-hero-item>
              O desejo,<br />
              <em className="not-italic text-gradient-wine">em silêncio</em>.
            </h1>
            <div data-hero-shout className="mt-8 inline-block">
              <div className="relative rounded-2xl border border-magenta/40 bg-gradient-to-r from-wine/30 via-magenta/20 to-wine/30 px-6 py-5 glow-magenta backdrop-blur-md">
                <div className="absolute -top-3 left-5 rounded-full bg-gradient-to-r from-wine to-magenta px-3 py-1 text-[10px] font-medium tracking-[0.25em] uppercase text-white">
                  Acesso liberado
                </div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-display text-6xl sm:text-7xl lg:text-8xl leading-none text-gradient-wine">
                    <CountUp to={100} prefix="+" />
                  </span>
                  <span className="font-display text-2xl sm:text-3xl lg:text-4xl text-foreground leading-tight">
                    fotos <span className="text-magenta">&</span> vídeos
                  </span>
                </div>
                <p className="mt-2 text-sm sm:text-base text-foreground/80">
                  exclusivos esperando por você — sem censura, sem filtro.
                </p>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-4" data-hero-item>
              <Link to="/planos" className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-wine via-wine to-magenta px-7 py-4 text-sm font-medium text-white glow-wine hover:glow-magenta transition-all">
                Ver planos privados
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link to="/sobre" className="text-sm text-muted-foreground hover:text-foreground transition">
                Como funciona
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-6 bottom-10 hidden lg:flex flex-col items-end gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
          <span>Maiores de 18</span>
          <span className="h-10 w-px bg-gradient-to-b from-magenta to-transparent" />
        </div>
      </section>

      <PreviewCardsSection />

      <section className="relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32">
          <div className="grid gap-16 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">— Sobre</p>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight">
                Uma experiência feita para{" "}
                <em className="text-gradient-wine not-italic">poucos</em>.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-foreground/80 leading-relaxed">
              <p>A Meupriv é um espaço privado para acesso a conteúdo exclusivo, criado para quem valoriza a discrição tanto quanto o desejo.</p>
              <p className="text-muted-foreground">Sua compra é processada de forma anônima através de gateway seguro. Após a confirmação, o acesso é liberado imediatamente.</p>
              <div className="grid sm:grid-cols-2 gap-4 pt-6">
                {[
                  { t: "Discrição total", d: "Sem nome no extrato, sem rastros públicos." },
                  { t: "Pagamento seguro", d: "Gateway criptografado de ponta a ponta." },
                  { t: "Acesso imediato", d: "Liberação automática após confirmação." },
                  { t: "Conteúdo exclusivo", d: "Material privado, fora das redes sociais." },
                ].map((f) => (
                  <div key={f.t} className="rounded-2xl glass p-5">
                    <p className="font-display text-xl">{f.t}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-20">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">— Planos</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">
                Três níveis de{" "}
                <em className="text-gradient-wine not-italic">intimidade</em>.
              </h2>
            </div>
            <Link to="/planos" className="text-sm text-muted-foreground hover:text-foreground">Ver todos →</Link>
          </div>
          <PlansGrid compact />
        </div>
      </section>
    </PageShell>
  );
}

// ── Dados dos planos ───────────────────────────────────────────
const PLANS = [
  {
    id: "basic",
    name: "Acesso Básico",
    tag: "Entrada",
    oldPrice: "29,90",
    price: "17",
    cents: "90",
    desc: "Para começar a explorar.",
    features: [
      "Fotos diárias exclusivas",
      "Vídeos normais semanais",
      "Atualizações constantes",
      "Suporte por email",
    ],
    featured: false,
  },
  {
    id: "vip",
    name: "VIP",
    tag: "Mais escolhido",
    oldPrice: "59,90",
    price: "39",
    cents: "90",
    desc: "Para quem quer mais.",
    features: [
      "Tudo do Acesso Básico",
      "Conteúdo exclusivo extra",
      "Áudios sensuais privados",
      "Vídeos íntimos exclusivos",
      "Atualizações prioritárias",
    ],
    featured: true,
  },
  {
    id: "private",
    name: "Experiência Privada",
    tag: "Exclusivo",
    oldPrice: "149,90",
    price: "119",
    cents: "90",
    desc: "O máximo da intimidade.",
    features: [
      "Tudo do VIP",
      "Acesso a conteúdo nunca publicado",
      "Vídeos longos e exclusivos",
      "Chat privado direto",
      "Pedidos especiais mensais",
      "Prioridade máxima de suporte",
    ],
    featured: false,
    exclusive: true,
  },
];

// ── PlansGrid ─────────────────────────────────────────────────
export function PlansGrid({ compact = false }: { compact?: boolean }) {
  const { active: offerActive } = useOfferCountdown();
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  // Guarda os loops activos por card — nunca os mata enquanto o card está em hover
  const loopTweens = useRef<(gsap.core.Tween[] | null)[]>([null, null, null]);
  const hoveredIdx = useRef<number | null>(null);

  const startLoops = (card: HTMLElement, i: number) => {
    // Para loops anteriores deste card sem afectar outros
    loopTweens.current[i]?.forEach(t => t.kill());

    const shimmer = card.querySelector("[data-shimmer]") as HTMLElement;
    const glowA = PLANS[i].featured
      ? "0 28px 90px -10px oklch(0.45 0.22 350 / 0.85), 0 0 0 1.5px oklch(0.45 0.22 350 / 0.7)"
      : (PLANS[i] as any).exclusive
      ? "0 28px 90px -10px oklch(0.55 0.18 30 / 0.85), 0 0 0 1.5px oklch(0.55 0.18 30 / 0.7)"
      : "0 24px 70px -10px oklch(0.45 0.22 350 / 0.6), 0 0 0 1.5px oklch(0.45 0.22 350 / 0.5)";
    const glowB = PLANS[i].featured
      ? "0 40px 110px -10px oklch(0.45 0.22 350 / 0.4), 0 0 0 1.5px oklch(0.45 0.22 350 / 0.3)"
      : (PLANS[i] as any).exclusive
      ? "0 40px 110px -10px oklch(0.55 0.18 30 / 0.4), 0 0 0 1.5px oklch(0.55 0.18 30 / 0.3)"
      : "0 40px 110px -10px oklch(0.45 0.22 350 / 0.25), 0 0 0 1.5px oklch(0.45 0.22 350 / 0.2)";

    // Glow pulsa suave em loop — nunca para
    const glowLoop = gsap.fromTo(card,
      { boxShadow: glowA },
      { boxShadow: glowB, duration: 1.6, ease: "sine.inOut", repeat: -1, yoyo: true }
    );

    // Escala respira levemente — nunca para
    const scaleLoop = gsap.to(card, {
      scale: 1.065,
      duration: 1.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Shimmer passa da esquerda para direita infinitamente, suave
    const shimmerLoop = shimmer ? gsap.fromTo(shimmer,
      { x: "-130%", opacity: 0 },
      {
        x: "130%",
        opacity: 0,
        duration: 0,
        ease: "none",
        repeat: -1,
        repeatDelay: 2.0,
        onRepeat: () => { gsap.set(shimmer, { x: "-130%", opacity: 0 }); },
        keyframes: [
          { x: "-130%", opacity: 0,    duration: 0 },
          { x: "-30%",  opacity: 0.5,  duration: 0.6 },
          { x: "30%",   opacity: 0.5,  duration: 0.6 },
          { x: "130%",  opacity: 0,    duration: 0.6 },
        ],
      }
    ) : null;

    loopTweens.current[i] = [glowLoop, scaleLoop, ...(shimmerLoop ? [shimmerLoop] : [])];
  };

  const stopLoops = (i: number) => {
    loopTweens.current[i]?.forEach(t => t.kill());
    loopTweens.current[i] = null;
  };

  const handleEnter = (idx: number) => {
    hoveredIdx.current = idx;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cta = card.querySelector("[data-cta]") as HTMLElement;

      if (i === idx) {
        // Levanta o card — loops começam logo, não esperam o onComplete
        gsap.to(card, {
          scale: 1.06,
          y: -14,
          opacity: 1,
          filter: "brightness(1.15) saturate(1.1)",
          duration: 0.7,
          ease: "power2.out",
          zIndex: 10,
          overwrite: "auto",
        });
        if (cta) gsap.to(cta, { scale: 1.04, duration: 0.7, ease: "power2.out", overwrite: "auto" });
        // Inicia loops imediatamente — contínuos e sem reset
        startLoops(card, i);
      } else {
        // Para os loops dos outros cards
        stopLoops(i);
        gsap.to(card, {
          scale: 0.94,
          y: 6,
          opacity: 0.5,
          filter: "brightness(0.7) saturate(0.75)",
          boxShadow: "none",
          duration: 0.7,
          ease: "power2.out",
          zIndex: 1,
          overwrite: "auto",
        });
        if (cta) gsap.to(cta, { scale: 1, duration: 0.7, ease: "power2.out", overwrite: "auto" });
      }
    });
  };

  const handleLeave = () => {
    hoveredIdx.current = null;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      // Para todos os loops
      stopLoops(i);
      const cta = card.querySelector("[data-cta]") as HTMLElement;
      gsap.to(card, {
        scale: 1,
        y: 0,
        opacity: 1,
        filter: "brightness(1) saturate(1)",
        boxShadow: "none",
        duration: 1.5,
        ease: "power3.out",
        zIndex: 1,
        overwrite: "auto",
      });
      if (cta) gsap.to(cta, { scale: 1, duration: 1.3, ease: "power3.out", overwrite: "auto" });
    });
  };

  return (
    <>
      {!compact && <DiscountBanner />}
      <div
        className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto"
        style={{ perspective: "1200px" }}
      >
        {PLANS.map((p, i) => (
          <article
            key={p.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={handleLeave}
            className={`relative rounded-3xl p-8 flex flex-col overflow-hidden cursor-pointer ${
              p.featured
                ? "glass-strong border-magenta/40"
                : (p as any).exclusive
                ? "glass border border-white/10"
                : "glass"
            }`}
            style={{ transformOrigin: "center center", willChange: "transform, opacity, filter, box-shadow" }}
          >
            {/* Shimmer de highlight */}
            <div
              data-shimmer
              className="absolute inset-y-0 w-28 pointer-events-none z-20"
              style={{
                background: "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.12), transparent)",
                transform: "translateX(-110%)",
              }}
            />

            {/* Gradiente interno decorativo */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: p.featured
                  ? "linear-gradient(135deg, oklch(0.45 0.22 350 / 0.09) 0%, transparent 55%)"
                  : (p as any).exclusive
                  ? "linear-gradient(135deg, oklch(0.55 0.18 30 / 0.12) 0%, transparent 55%)"
                  : "linear-gradient(135deg, oklch(0.32 0.13 12 / 0.07) 0%, transparent 55%)",
              }}
            />

            {p.featured && (
              <span className="inline-flex items-center self-start rounded-full bg-gradient-to-r from-wine to-magenta px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-white mb-2">
                {p.tag}
              </span>
            )}
            {(p as any).exclusive && (
              <span className="inline-flex items-center self-start rounded-full bg-gradient-to-r from-amber-700 to-amber-500 px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-white mb-2">
                {p.tag}
              </span>
            )}
            {!p.featured && !(p as any).exclusive && (
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{p.tag}</span>
            )}

            <h3 className="mt-3 font-display text-3xl">{p.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>

            <div className="mt-6 space-y-2">
              {offerActive && (
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl text-muted-foreground/60 line-through decoration-magenta decoration-2">
                    R$ {p.oldPrice}
                  </span>
                  <span className="rounded-full bg-magenta/20 border border-magenta/40 px-2.5 py-1 text-[11px] font-bold text-magenta uppercase tracking-wide">
                    Desconto
                  </span>
                </div>
              )}
              <div className="flex items-end gap-1">
                <span className="text-sm text-muted-foreground mb-2">R$</span>
                <span className="font-display text-6xl leading-none">
                  {offerActive ? p.price : p.oldPrice.split(",")[0]}
                </span>
                <span className="text-muted-foreground mb-2">
                  ,{offerActive ? p.cents : p.oldPrice.split(",")[1]}
                </span>
                <span className="text-xs text-muted-foreground mb-2 ml-1">/ mês</span>
              </div>
            </div>

            {!compact && (
              <ul className="mt-7 space-y-3 text-sm flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-magenta shadow-[0_0_8px_var(--magenta)] shrink-0" />
                    <span className="text-foreground/85">{f}</span>
                  </li>
                ))}
              </ul>
            )}
            {compact && (
              <ul className="mt-6 space-y-2 text-sm flex-1">
                {p.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex gap-3 text-foreground/80">
                    <span className="mt-1 h-1 w-1 rounded-full bg-magenta shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            )}

            <Link
              data-cta
              to="/checkout"
              search={{ plano: p.id }}
              className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium transition-opacity ${
                p.featured
                  ? "bg-gradient-to-r from-wine to-magenta text-white"
                  : (p as any).exclusive
                  ? "bg-gradient-to-r from-amber-700 to-amber-500 text-white"
                  : "glass text-foreground"
              }`}
              style={{ willChange: "transform" }}
            >
              Selecionar plano
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
