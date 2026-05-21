import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";

interface PreviewCard {
  id: number;
  src: string;
  plan: "basic" | "vip" | "private";
}

// ── Apenas 2 cards (1 e 2) ─────────────────────────────────────
const CARDS: PreviewCard[] = [
  { id: 1, src: "/2.jpg",  plan: "basic" },
  { id: 2, src: "/1.mp4", plan: "private" },
];

function isVideo(src: string) {
  return src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".mov");
}

function Media({ src, blurred }: { src: string; blurred: boolean }) {
  const cls = `w-full h-full object-cover transition-[filter] duration-700 ease-out ${
    blurred ? "blur-2xl scale-110" : "blur-0 scale-100"
  }`;

  if (isVideo(src)) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={cls}
      />
    );
  }

  return <img src={src} alt="" className={cls} />;
}

function Card({ card }: { card: PreviewCard }) {
  const [revealed, setRevealed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const hoverTl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (revealed) return; // Sem efeito hover depois de revelado
    const card = cardRef.current;
    const overlay = overlayRef.current;
    const hint = hintRef.current;
    const glow = glowRef.current;
    if (!card || !overlay || !hint || !glow) return;

    // Cria a timeline do hover (paused)
    hoverTl.current = gsap.timeline({ paused: true })
      // Card sobe ligeiramente e expande
      .to(card, {
        y: -8,
        scale: 1.03,
        duration: 0.4,
        ease: "power2.out",
      }, 0)
      // Overlay escurece com gradiente sedutor
      .to(overlay, {
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      }, 0)
      // Hint aparece com blur reduzido — prévia tentadora
      .to(hint, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.4)",
      }, 0.05)
      // Brilho no bordo
      .to(glow, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      }, 0);

    const onEnter = () => hoverTl.current?.play();
    const onLeave = () => hoverTl.current?.reverse();

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
      hoverTl.current?.kill();
    };
  }, [revealed]);

  // Animação de entrada ao montar
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: card.id * 0.15,
      ease: "power3.out",
    });
  }, []);

  const handleClick = () => {
    if (revealed) return;
    // Animação de reveal
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => setRevealed(true),
      });
    }
    hoverTl.current?.reverse();
  };

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer select-none"
      style={{ transformOrigin: "center bottom" }}
      onClick={handleClick}
    >
      {/* Brilho no bordo ao hover */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-0"
        style={{
          boxShadow: "inset 0 0 0 1.5px oklch(0.45 0.22 350 / 0.7), 0 0 40px 0 oklch(0.45 0.22 350 / 0.3)",
        }}
      />

      <Media src={card.src} blurred={!revealed} />

      {/* Gradiente base */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Overlay de hover — prévia antes de clicar */}
      {!revealed && (
        <>
          <div
            ref={overlayRef}
            className="absolute inset-0 pointer-events-none opacity-0"
            style={{
              background:
                "linear-gradient(to top, oklch(0.10 0.012 340 / 0.85) 0%, oklch(0.22 0.09 320 / 0.35) 50%, transparent 100%)",
            }}
          />

          {/* Hint de preview que aparece no hover */}
          <div
            ref={hintRef}
            className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-4 opacity-0 pointer-events-none"
            style={{ transform: "translateY(8px) scale(0.96)" }}
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/50 mb-2">
              amostra grátis
            </p>
            <button
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 px-5 py-2.5 text-xs font-medium text-white pointer-events-auto transition-all"
              style={{ pointerEvents: "none" }}
            >
              <span>👁</span>
              Clica para revelar
            </button>
          </div>

          {/* Botão estático quando não está em hover */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 text-xs font-medium text-white"
              style={{ opacity: 1 }}
            >
              <span>👁</span>
              Ver amostra grátis
            </div>
          </div>
        </>
      )}

      {/* Depois de revelado — link para checkout */}
      {revealed && (
        <div className="absolute inset-0 flex items-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Link
            to="/checkout"
            search={{ plano: card.plan }}
            onClick={(e) => e.stopPropagation()}
            className="w-full text-center rounded-full bg-gradient-to-r from-wine to-magenta px-4 py-2.5 text-xs font-medium text-white hover:opacity-90 transition"
          >
            Quero acesso completo →
          </Link>
        </div>
      )}
    </div>
  );
}

export function PreviewCardsSection() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl">
              Uma pequena{" "}
              <em className="text-gradient-wine not-italic">amostra</em>.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-md">
              Passa o rato por cima para espreitar. Clica para revelar.
            </p>
          </div>
          <Link to="/planos" className="text-sm text-muted-foreground hover:text-foreground transition">
            Ver planos →
          </Link>
        </div>

        {/* Grid com apenas 2 cards, centrado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {CARDS.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-5">
            Gostaste? O conteúdo completo é muito mais.
          </p>
          <Link
            to="/planos"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-wine via-wine to-magenta px-8 py-4 text-sm font-medium text-white transition hover:opacity-90"
          >
            Quero acesso completo →
          </Link>
        </div>
      </div>
    </section>
  );
}
