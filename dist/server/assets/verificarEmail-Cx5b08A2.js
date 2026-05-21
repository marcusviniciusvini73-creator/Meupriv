import { c as createServerRpc } from "./createServerRpc-CAam1Qau.js";
import { j as createServerFn } from "./server-G4e4SWkO.js";
import { o as objectType, s as stringType } from "./types-DxrsuSRu.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const schema = objectType({
  email: stringType().email()
});
const verificarEmail_createServerFn_handler = createServerRpc({
  id: "b2acdf280e1b4ccd19e3ffccee1ee2a5ca5e46030d21018f3c149f682614fcb0",
  name: "verificarEmail",
  filename: "src/lib/verificarEmail.ts"
}, (opts) => verificarEmail.__executeServer(opts));
const verificarEmail = createServerFn({
  method: "POST"
}).handler(verificarEmail_createServerFn_handler, async ({
  data
}) => {
  const {
    email
  } = schema.parse(data);
  const domain = email.split("@")[1]?.toLowerCase().trim() ?? "";
  if (!domain) return {
    valido: false
  };
  try {
    const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`, {
      headers: {
        Accept: "application/dns-json"
      },
      signal: AbortSignal.timeout(5e3)
    });
    if (!res.ok) {
      return {
        valido: true
      };
    }
    const json = await res.json();
    const temMX = json.Status === 0 && Array.isArray(json.Answer) && json.Answer.some((r) => r.type === 15);
    return {
      valido: temMX
    };
  } catch {
    return {
      valido: true
    };
  }
});
export {
  verificarEmail_createServerFn_handler
};
