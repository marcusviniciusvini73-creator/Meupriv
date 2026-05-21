// src/components/PixPayment.tsx

import { useState, useCallback, useEffect, useRef } from "react";
import { criarPix } from "@/lib/promisse";
import { verificarPix } from "@/lib/promisse";
import { notificarVendaFn } from "@/lib/notificarVendaFn";

const PLAN_PRICES: Record<string, string> = {
  basic:   "R$ 29,90",
  vip:     "R$ 59,90",
  private: "R$ 149,00",
};

interface Props {
  amount: number;
  planName: string;
  planKey: string;
  clientName: string;
  clientEmail: string;
  onConfirmed?: () => void;
}

export function PixPayment({ amount, planName, planKey, clientName, clientEmail, onConfirmed }: Props) {
  const [step, setStep] = useState<"idle"|"loading"|"pix"|"confirmed"|"error">("idle");
  const [pix, setPix]   = useState<{ txId:string; qrCodeBase64:string; copyPasteCode:string; expiresIn?:number }|null>(null);
  const [copied, setCopied]     = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const pollingRef = useRef<ReturnType<typeof setInterval>|null>(null);
  const timerRef   = useRef<ReturnType<typeof setInterval>|null>(null);

  useEffect(() => () => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    if (timerRef.current)   clearInterval(timerRef.current);
  }, []);

  const iniciarPolling = useCallback((txId: string) => {
    pollingRef.current = setInterval(async () => {
      try {
        const { pago } = await verificarPix({ data: { txId } });
        if (pago) {
          clearInterval(pollingRef.current!);
          clearInterval(timerRef.current!);
          setStep("confirmed");

          // Notifica no Telegram
          try {
            await notificarVendaFn({
              data: {
                nome:  clientName,
                email: clientEmail,
                plano: planKey,
                valor: PLAN_PRICES[planKey] ?? `R$ ${amount.toFixed(2)}`,
                txId,
              },
            });
          } catch {}

          onConfirmed?.();
        }
      } catch {}
    }, 5000);
    setTimeout(() => clearInterval(pollingRef.current!), 15 * 60 * 1000);
  }, [onConfirmed, clientName, clientEmail, planKey, amount]);

  const iniciarTimer = useCallback((segundos: number) => {
    setSecondsLeft(segundos);
    timerRef.current = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) { clearInterval(timerRef.current!); return 0; }
        return s - 1;
      });
    }, 1000);
  }, []);

  async function handleGerar() {
    setStep("loading"); setErrorMsg("");
    try {
      const data = await criarPix({ data: { amount } });
      setPix(data); setStep("pix");
      iniciarPolling(data.txId);
      if (data.expiresIn) iniciarTimer(data.expiresIn);
    } catch (err: any) {
      setErrorMsg(err.message ?? "Erro ao gerar PIX");
      setStep("error");
    }
  }

  async function handleCopiar() {
    if (!pix?.copyPasteCode) return;
    await navigator.clipboard.writeText(pix.copyPasteCode);
    setCopied(true); setTimeout(() => setCopied(false), 2500);
  }

  const fmt = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,"0")}`;

  return (
    <div className="rounded-3xl glass-strong p-7 sm:p-9 space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-wine to-magenta flex items-center justify-center text-base shrink-0">◈</div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Pagamento via</p>
          <p className="font-display text-lg leading-tight">PIX</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-muted-foreground">{planName}</p>
          <p className="font-display text-xl text-gradient-wine">
            {amount.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}
          </p>
        </div>
      </div>
      <div className="hairline" />

      {step === "idle" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Clique abaixo para gerar seu QR Code PIX. O acesso é liberado automaticamente assim que o pagamento for confirmado.
          </p>
          <button onClick={handleGerar}
            className="w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-wine to-magenta px-7 py-4 text-sm font-medium text-white glow-magenta transition hover:opacity-90">
            Gerar QR Code PIX
          </button>
          <p className="text-[11px] text-center text-muted-foreground">🔒 Transação instantânea · Cobrança discreta · 100% anônima</p>
        </div>
      )}

      {step === "loading" && (
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="h-10 w-10 rounded-full border-2 border-magenta border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Gerando seu PIX…</p>
        </div>
      )}

      {step === "error" && (
        <div className="space-y-4 text-center">
          <p className="text-sm text-destructive">⚠ {errorMsg}</p>
          <button onClick={handleGerar}
            className="rounded-full border border-border px-6 py-2.5 text-sm text-muted-foreground hover:text-foreground transition">
            Tentar novamente
          </button>
        </div>
      )}

      {step === "pix" && pix && (
        <div className="space-y-5">
          {pix.qrCodeBase64 && (
            <div className="flex justify-center">
              <div className="rounded-2xl bg-white p-3 shadow-lg shadow-black/40">
                <img src={`data:image/png;base64,${pix.qrCodeBase64}`} alt="QR Code PIX" className="h-48 w-48 block" />
              </div>
            </div>
          )}
          <p className="text-xs text-center text-muted-foreground">Abra o app do seu banco → PIX → "Ler QR Code"</p>
          {pix.copyPasteCode && (
            <div className="rounded-2xl glass p-4 space-y-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Ou use o código copia e cola:</p>
              <p className="font-mono text-[11px] text-foreground/70 break-all leading-relaxed">{pix.copyPasteCode.slice(0,60)}…</p>
              <button onClick={handleCopiar}
                className={`w-full rounded-full py-2.5 text-sm font-medium transition ${copied ? "bg-gradient-to-r from-wine to-magenta text-white glow-magenta" : "border border-border text-muted-foreground hover:text-foreground"}`}>
                {copied ? "✓ Código copiado!" : "Copiar código PIX"}
              </button>
            </div>
          )}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-magenta animate-pulse" />
              Aguardando confirmação…
            </span>
            {secondsLeft > 0 && <span className="tabular-nums">Expira em {fmt(secondsLeft)}</span>}
          </div>
        </div>
      )}

      {step === "confirmed" && (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-wine to-magenta glow-magenta flex items-center justify-center text-2xl text-white">✓</div>
          <div>
            <p className="font-display text-2xl">Pagamento confirmado!</p>
            <p className="mt-1 text-sm text-muted-foreground">Seu acesso será liberado em instantes. Verifique seu email.</p>
          </div>
        </div>
      )}
    </div>
  );
}
