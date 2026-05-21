import { c as createServerRpc } from "./createServerRpc-CAam1Qau.js";
import { j as createServerFn } from "./server-G4e4SWkO.js";
import { o as objectType, s as stringType } from "./types-DxrsuSRu.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const TELEGRAM_TOKEN = "8749072029:AAGKC-KKusW2_nu__p9lbqK2AJkNZMr3cTk";
const TELEGRAM_CHAT_ID = "6488236416";
async function notificarVenda(dados) {
  const emoji = dados.plano === "private" ? "💎" : dados.plano === "vip" ? "⭐" : "✅";
  const msg = [
    `${emoji} *NOVA VENDA CONFIRMADA*`,
    ``,
    `👤 *Nome:* ${dados.nome}`,
    `📧 *Email:* ${dados.email}`,
    `📦 *Plano:* ${dados.plano.toUpperCase()}`,
    `💰 *Valor:* ${dados.valor}`,
    `🔑 *TX ID:* \`${dados.txId}\``,
    `🕐 *Hora:* ${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`
  ].join("\n");
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: msg,
        parse_mode: "Markdown"
      })
    });
  } catch (err) {
    console.error("[Telegram] Erro ao notificar:", err);
  }
}
const schema = objectType({
  nome: stringType(),
  email: stringType(),
  plano: stringType(),
  valor: stringType(),
  txId: stringType()
});
const notificarVendaFn_createServerFn_handler = createServerRpc({
  id: "e83e45c2167e6793e04dbf9225a8a2a91b40e142c7f5d2eb8a7c7a69890ee768",
  name: "notificarVendaFn",
  filename: "src/lib/notificarVendaFn.ts"
}, (opts) => notificarVendaFn.__executeServer(opts));
const notificarVendaFn = createServerFn({
  method: "POST"
}).handler(notificarVendaFn_createServerFn_handler, async ({
  data
}) => {
  const dados = schema.parse(data);
  await notificarVenda(dados);
  return {
    ok: true
  };
});
export {
  notificarVendaFn_createServerFn_handler
};
