// src/lib/promisse.ts
// Funções de servidor — a chave NUNCA vai para o browser

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const CHAVE = "sk_live_l7Qge18a4srVQmr13FQ75K02zUZ3gIknFqaDN3Abz9LFSecIpqHJ+BRf8bSwk1u4ZeUm7XYsEzUu1NoxTfwsFw==";
const BASE  = "https://api.promisse.com.br";

const pixSchema       = z.object({ amount: z.number() });
const verificarSchema = z.object({ txId: z.string() });

// ── Criar cobrança PIX ────────────────────────────────
export const criarPix = createServerFn({ method: "POST" })
  .handler(async ({ data }) => {
    const { amount } = pixSchema.parse(data);

    const res = await fetch(`${BASE}/transactions`, {
      method: "POST",
      headers: {
        Authorization: CHAVE,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: Math.round(amount * 100) }),
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json?.message ?? "Erro ao criar PIX");

    // Remove o prefixo data:image/png;base64, se vier incluído
    const qrRaw: string = json.qrCodeBase64 ?? "";
    const qrCodeBase64 = qrRaw.startsWith("data:")
      ? qrRaw.replace(/^data:image\/\w+;base64,/, "")
      : qrRaw;

    // Calcula segundos restantes a partir da data de expiração
    const expiresIn = json.expiresAt
      ? Math.max(0, Math.round((new Date(json.expiresAt).getTime() - Date.now()) / 1000))
      : 3600;

    const copyPasteCode: string = json.copyPaste ?? json.pix_code ?? json.pixCode ?? json.brCode ?? "";

    // A API não retorna campo "id" — extraímos o txId do URL dentro do copyPaste
    // Formato: .../qr/v3/at/<uuid>...
    const txIdMatch = copyPasteCode.match(/\/at\/([a-f0-9-]{36})/i);
    const txId: string = json.id ?? txIdMatch?.[1] ?? "";

    return { txId, qrCodeBase64, copyPasteCode, expiresIn };
  });

// ── Verificar status ──────────────────────────────────
export const verificarPix = createServerFn({ method: "GET" })
  .handler(async ({ data }) => {
    const { txId } = verificarSchema.parse(data);

    const res = await fetch(`${BASE}/transactions/${txId}`, {
      headers: { Authorization: CHAVE },
    });
    const json = await res.json();
    const status: string = json.status ?? "";
    const pago = ["paid", "approved", "pago", "completed", "CONCLUIDA"].includes(status);
    return { pago, status };
  });
