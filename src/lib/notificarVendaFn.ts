// src/lib/notificarVendaFn.ts
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { notificarVenda } from "./telegram";

const schema = z.object({
  nome:  z.string(),
  email: z.string(),
  plano: z.string(),
  valor: z.string(),
  txId:  z.string(),
});

export const notificarVendaFn = createServerFn({ method: "POST" })
  .handler(async ({ data }) => {
    const dados = schema.parse(data);
    await notificarVenda(dados);
    return { ok: true };
  });
