import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";
import { PageShell } from "@/components/layout";
import { PreviewCardsSection } from "@/components/preview-cards";

// ── Configurações da Oferta Relâmpago ───────────────────────────
const OFFER_HOURS = 24; 
const OFFER_KEY = "meupriv_flash_sale_end"; // Chave no localStorage

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// ── Hook: Cronômetro Persistente (Não reset no F5) ─────────────
function useFlashOfferCountdown() {
  const [timeLeft, setTimeLeft] = useState<{
    total: number;
    hours: number;
    mins: number;
    secs: number;
    isExpired: boolean;
  }>({
    total: 0,
    hours: 0,
    mins: 0,
    secs: 0,
    isExpired: true,
  });

  useEffect(() => {
    // 1. Verifica se já temos um prazo salvo no navegador
    const storedEndTime = localStorage.getItem(OFFER_KEY);
    let endTime: number;

    if (storedEndTime) {
      endTime = parseInt(storedEndTime, 10);
    } else {
      // Se não existe, cria um novo prazo de 24h a partir de agora
      endTime = Date.now() + (OFFER_HOURS * 60 * 60 * 1000);
      localStorage.setItem(OFFER_KEY, String(endTime));
    }

    const calculate = () => {
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        // Oferta expirou
        setTimeLeft({ total: 0, hours: 0, mins: 0, secs: 0, isExpired: true });
        // (Opcional) Limpar o storage paraResetar a oferta automaticamente?
        // Se quiser resetar automático a cada 3 dias, descomente abaixo:
        // if (now - parseInt(localStorage.getItem("meupriv_cycle_start") || "0") > (3 * 24 * 60 * 60 * 1000)) localStorage.removeItem(OFFER_KEY);
        return false; // Para o intervalo
      } else {
        setTimeLeft({
          total: diff,
          hours: Math.floor(diff / 3_600_000),
          mins: Math.floor((diff % 3_600_000) / 60_000),
          secs: Math.floor((diff % 60_000) / 1000),
          isExpired: false,
        });
        return true; // Continua
      }
    };

    // Inicia o intervalo
    const id = setInterval(() => {
      if (!calculate()) clearInterval(id);
    }, 1000);

    // Roda uma vez immediately para evitar delay de 1s no mount
    calculate();

    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

// ── Componente: Banner da Oferta ─────────────────────────────
function FlashOfferBanner() {
  const { total, hours, mins, secs, isExpired } = useFlashOfferCountdown();
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current || isExpired) return;
    
    // Animação de entrada (GSAP) — sama que o banner anterior
    gsap.from(bannerRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, [isExpired]);

  if (isExpired) return null;

  return (
    <div
      ref={bannerRef}
      className="mb-8 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-magenta/50 bg-magenta/10 px-6 py-4 text-sm shadow-[0_0_30px_-5px_rgba(255,0,128,0.15)] backdrop-blur-sm"
    >
      <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-magenta">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-magenta opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-magenta"></span>
        </span>
        Oferta Relâmpago 24h
      </span>
      
      <span className="text-muted-foreground hidden sm:inline">•</span>
      
      <div className="flex items-center gap-1 font-mono text-lg font-bold text-foreground">
        <span className="text-magenta">Expira em:</span>
        <span className="w-[70px] text-center text-white">
          {pad(hours)}:{pad(mins)}:{pad(secs)}
        </span>
      </div>
    </div>
  );
}

// ── Componente auxiliar de contagem (já existente no seu código) ─
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

// ── Rota Principal ───────────────────────────────────────────
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "
