// src/lib/telegram.ts
// Envia notificações para o Telegram — só corre no servidor

const TELEGRAM_TOKEN = "8749072029:AAGKC-KKusW2_nu__p9lbqK2AJkNZMr3cTk";
const TELEGRAM_CHAT_ID = "6488236416"; // será preenchido após o utilizador enviar o chat id

export async function notificarVenda(dados: {
  nome: string;
  email: string;
  plano: string;
  valor: string;
  txId: string;
}) {
  const emoji = dados.plano === "private" ? "💎" : dados.plano === "vip" ? "⭐" : "✅";
  const msg = [
    `${emoji} *NOVA VENDA CONFIRMADA*`,
    ``,
    `👤 *Nome:* ${dados.nome}`,
    `📧 *Email:* ${dados.email}`,
    `📦 *Plano:* ${dados.plano.toUpperCase()}`,
    `💰 *Valor:* ${dados.valor}`,
    `🔑 *TX ID:* \`${dados.txId}\``,
    `🕐 *Hora:* ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`,
  ].join("\n");

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: msg,
        parse_mode: "Markdown",
      }),
    });
  } catch (err) {
    console.error("[Telegram] Erro ao notificar:", err);
  }
}
