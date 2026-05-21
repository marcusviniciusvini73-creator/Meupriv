// src/lib/verificarEmail.ts
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

/**
 * Verifica se o email existe consultando registros MX do domínio
 * via Cloudflare DNS-over-HTTPS (funciona em Cloudflare Workers).
 *
 * Retorna { valido: true }  — domínio tem servidor de email
 * Retorna { valido: false } — domínio sem MX ou inválido
 */
export const verificarEmail = createServerFn({ method: "POST" })
  .handler(async ({ data }) => {
    const { email } = schema.parse(data);
    const domain = email.split("@")[1]?.toLowerCase().trim() ?? "";

    if (!domain) return { valido: false };

    try {
      const res = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`,
        {
          headers: { Accept: "application/dns-json" },
          signal: AbortSignal.timeout(5000),
        }
      );

      if (!res.ok) {
        // Se a DNS falhar por rede, deixa passar para não bloquear usuários legítimos
        return { valido: true };
      }

      const json = (await res.json()) as {
        Status: number;
        Answer?: Array<{ type: number; data: string }>;
      };

      // Status 0 = NOERROR, precisa ter pelo menos um registro MX (type 15)
      const temMX =
        json.Status === 0 &&
        Array.isArray(json.Answer) &&
        json.Answer.some((r) => r.type === 15);

      return { valido: temMX };
    } catch {
      // Timeout ou erro de rede — não bloqueia
      return { valido: true };
    }
  });
