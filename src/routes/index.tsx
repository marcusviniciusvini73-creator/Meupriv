import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";
import { PageShell } from "@/components/layout";
import { PreviewCardsSection } from "@/components/preview-cards";

// ── Configuração da Oferta de 24h ───────────────────────────────
const OFFER_HOURS = 24;
const OFFER_STORAGE_KEY = "meupriv_flash_offer_end";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// ── Hook: Cronômetro que NÃO reseta no F5 ───────────────────
function useFlashCountdown() {
  const [time, setTime] = useState({
    h: 0,
    m: 0,
    s: 0,
    expired: true,
  });

  useEffect(() => {
    let storedEnd = localStorage.getItem(OFFER_STORAGE_KEY);
    let endTime: number;

    if (!storedEnd) {
      // Primeira vez: cria um prazo de 24h
      endTime = Date.now() + (OFFER_HOURS * 60 * 60 * 1000);
      localStorage.setItem(OFFER_STORAGE_KEY, String(endTime));
    } else {
      endTime = parseInt(storedEnd, 10);
    }

    const tick = () => {
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        setTime({ h: 0, m: 0, s: 0, expired: true });
        return;
      }

      setTime({
        h: Math.floor(diff / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1000),
        expired: false,
      });
    };

    tick(); // executa inmediatamente
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

// ── Banner do Relógio (aparece acima dos planos) ───────────
function OfferCountdownBanner() {
  const { h, m, s, expired } = useFlashCountdown();
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bannerRef.current && !expired) {
      gsap.from(bannerRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, [expired]);

  if (expired) return null;

  return (
    <div
      ref={bannerRef}
      className="mb-8 flex items-center justify-center gap-4 rounded-2xl border border-magenta/50 bg-magenta/10 px-6 py-4 text-sm shadow-[0_0_30px_-5px_rgba(255,0,128,0.2)] backdrop-blur-sm"
    >
      <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-magenta text-xs">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-magenta opacity-75"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-magenta"></span>
        </span>
        Oferta Relâmpago
      </span>

      <span className="text-muted-foreground">•</span>

      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground uppercase">Expira em</span>
        <span className="font-mono text-xl font-bold text-white tabular-nums">
          {pad(h)}:{pad(m)}:{pad(s)}
        </span>
      </div>
    </div>
  );
}

// ── Contagem animada (CountUp) ───────────────────────────────
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

// ── Rota principal ─────────────────────────────────────────
export const Route = createFileRoute("/")({
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

      {/* ── Seção dos Planos COM o Relógio EM CIMA ───────────── */}
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
          
          {/* O RELÓGIO FICA AQUI, EM CIMA DOS PLANOS */}
          <PlansGrid compact={false} />
        </div>
      </section>
    </PageShell>
  );
}

// ── Dados dos Planos ────────────────────────────────────────
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

// ── PlansGrid ────────────────────────────────────────────────
export function PlansGrid({ compact = false }: { compact?: boolean }) {
  const { expired } = useFlashCountdown();
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const loopTweens = useRef<(gsap.core.Tween[] | null)[]>([null, null, null]);
  const hoveredIdx = useRef<number | null>(null);

  const startLoops = (card: HTMLElement, i: number) => {
    loopTweens.current[i]?.forEach(t => t.kill());

    const shimmer = card.querySelector("[data-shimmer]") as HTMLElement;
    const glowA = PLANS[i].featured
      ? "0 28px 90px -10px oklch(0.45 0.22 350 / 0.85), 0 0 0 1.5px oklch(0.45 0.22 350 / 0.7)"
      : (PLANS[i] as any).exclusive
      ? "0 28px 90px -10px oklch(0.55 0.18 30 / 0.85), 0 0 0 1.5px oklch(0.55 0.18 30 / 0.7)"
      : "0 24px 70px -10px oklch(0.45 0.22 350 / 0.6), 0 0 0 1.5px oklch(0.45 0.22 350 / 0.5)";
    const glowB = PLANS[i].featured
      ? "0 40px 110px -10px ok
