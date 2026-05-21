import { c as createServerRpc } from "./createServerRpc-CAam1Qau.js";
import { j as createServerFn } from "./server-G4e4SWkO.js";
import { o as objectType, n as numberType, s as stringType } from "./types-DxrsuSRu.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const CHAVE = "sk_live_l7Qge18a4srVQmr13FQ75K02zUZ3gIknFqaDN3Abz9LFSecIpqHJ+BRf8bSwk1u4ZeUm7XYsEzUu1NoxTfwsFw==";
const BASE = "https://api.promisse.com.br";
const pixSchema = objectType({
  amount: numberType()
});
const verificarSchema = objectType({
  txId: stringType()
});
const criarPix_createServerFn_handler = createServerRpc({
  id: "9ad0073fe11875e81b7851934f342c7970c6926546a6e28f6a857ecc54889497",
  name: "criarPix",
  filename: "src/lib/promisse.ts"
}, (opts) => criarPix.__executeServer(opts));
const criarPix = createServerFn({
  method: "POST"
}).handler(criarPix_createServerFn_handler, async ({
  data
}) => {
  const {
    amount
  } = pixSchema.parse(data);
  const res = await fetch(`${BASE}/transactions`, {
    method: "POST",
    headers: {
      Authorization: CHAVE,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100)
    })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.message ?? "Erro ao criar PIX");
  const qrRaw = json.qrCodeBase64 ?? "";
  const qrCodeBase64 = qrRaw.startsWith("data:") ? qrRaw.replace(/^data:image\/\w+;base64,/, "") : qrRaw;
  const expiresIn = json.expiresAt ? Math.max(0, Math.round((new Date(json.expiresAt).getTime() - Date.now()) / 1e3)) : 3600;
  const copyPasteCode = json.copyPaste ?? json.pix_code ?? json.pixCode ?? json.brCode ?? "";
  const txIdMatch = copyPasteCode.match(/\/at\/([a-f0-9-]{36})/i);
  const txId = json.id ?? txIdMatch?.[1] ?? "";
  return {
    txId,
    qrCodeBase64,
    copyPasteCode,
    expiresIn
  };
});
const verificarPix_createServerFn_handler = createServerRpc({
  id: "0e9897260f3c0205d5c111414e32c85e9fdd589882eb9f3ec186a0dcb9c9b7ee",
  name: "verificarPix",
  filename: "src/lib/promisse.ts"
}, (opts) => verificarPix.__executeServer(opts));
const verificarPix = createServerFn({
  method: "GET"
}).handler(verificarPix_createServerFn_handler, async ({
  data
}) => {
  const {
    txId
  } = verificarSchema.parse(data);
  const res = await fetch(`${BASE}/transactions/${txId}`, {
    headers: {
      Authorization: CHAVE
    }
  });
  const json = await res.json();
  const status = json.status ?? "";
  const pago = ["paid", "approved", "pago", "completed", "CONCLUIDA"].includes(status);
  return {
    pago,
    status
  };
});
export {
  criarPix_createServerFn_handler,
  verificarPix_createServerFn_handler
};
