import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function db() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"]!,
    {
      auth: { persistSession: false },
      global: {
        fetch: (input, init) => {
          const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"]!;
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
            h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    },
  );
}

// ---------- Catálogo ----------

export const getItens = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await db().from("itens").select("*").order("ordem");
  if (error) throw new Error(error.message);
  return data;
});

// ---------- Espelho (contagem atual) ----------

export const getEspelho = createServerFn({ method: "GET" }).handler(async () => {
  const { lerEspelho } = await import("./sheets.server");
  return lerEspelho();
});

// ---------- Lançamentos (retiradas) ----------

interface LancamentoInput {
  data: string; // YYYY-MM-DD
  itens: { codigo: number; quantidade: number }[];
}

export const criarLancamento = createServerFn({ method: "POST" })
  .inputValidator((d: LancamentoInput) => d)
  .handler(async ({ data }) => {
    const supa = db();
    const itens = data.itens.filter((i) => i.quantidade > 0);
    if (itens.length === 0) throw new Error("Nenhum item com quantidade.");
    const { data: lanc, error } = await supa
      .from("lancamentos")
      .insert({ data: data.data, status: "pendente" })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    const { error: e2 } = await supa
      .from("lancamento_itens")
      .insert(itens.map((i) => ({ lancamento_id: lanc.id, ...i })));
    if (e2) throw new Error(e2.message);

    try {
      const { gravarSaidas } = await import("./sheets.server");
      const linhas = await gravarSaidas(data.data, itens);
      await supa
        .from("lancamentos")
        .update({ status: "enviado", enviado_em: new Date().toISOString(), linhas, erro: null })
        .eq("id", lanc.id);
      return { id: lanc.id, status: "enviado" as const };
    } catch (err) {
      await supa
        .from("lancamentos")
        .update({ status: "pendente", erro: String(err) })
        .eq("id", lanc.id);
      return { id: lanc.id, status: "pendente" as const, erro: String(err) };
    }
  });

export const listarLancamentos = createServerFn({ method: "GET" }).handler(async () => {
  const supa = db();
  const { data, error } = await supa
    .from("lancamentos")
    .select("*, lancamento_itens(codigo, quantidade)")
    .order("data", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
});

export const editarLancamento = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string; data: string; itens: LancamentoInput["itens"] }) => d)
  .handler(async ({ data }) => {
    const supa = db();
    const itens = data.itens.filter((i) => i.quantidade > 0);
    if (itens.length === 0) throw new Error("Nenhum item com quantidade.");
    await supa.from("lancamento_itens").delete().eq("lancamento_id", data.id);
    const { error } = await supa
      .from("lancamento_itens")
      .insert(itens.map((i) => ({ lancamento_id: data.id, ...i })));
    if (error) throw new Error(error.message);
    await supa
      .from("lancamentos")
      .update({ data: data.data, editado: true, status: "pendente" })
      .eq("id", data.id);
    return { ok: true };
  });

export const reenviarLancamento = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    const supa = db();
    const { data: lanc, error } = await supa
      .from("lancamentos")
      .select("*, lancamento_itens(codigo, quantidade)")
      .eq("id", data.id)
      .single();
    if (error || !lanc) throw new Error("Lançamento não encontrado.");
    const sheets = await import("./sheets.server");
    try {
      if (lanc.linhas && lanc.linhas.length > 0) {
        await sheets.deleteSheetRows(sheets.SAIDA_SHEET_ID_CONST, lanc.linhas as number[]);
        await ajustarLinhasAposExclusao(supa, lanc.linhas as number[], lanc.id);
      }
      const linhas = await sheets.gravarSaidas(
        lanc.data,
        (lanc.lancamento_itens as any[]).map((i) => ({ codigo: i.codigo, quantidade: i.quantidade })),
      );
      await supa
        .from("lancamentos")
        .update({
          status: "enviado",
          enviado_em: new Date().toISOString(),
          editado: false,
          linhas,
          erro: null,
        })
        .eq("id", lanc.id);
      return { ok: true };
    } catch (err) {
      await supa.from("lancamentos").update({ status: "pendente", erro: String(err) }).eq("id", lanc.id);
      throw new Error(String(err));
    }
  });

// Após apagar linhas da planilha, as linhas de outros lançamentos sobem.
async function ajustarLinhasAposExclusao(
  supa: ReturnType<typeof db>,
  removidas: number[],
  ignorarId?: string,
) {
  const { data: todos } = await supa.from("lancamentos").select("id, linhas");
  for (const l of todos ?? []) {
    if (l.id === ignorarId) continue;
    const linhas = (l.linhas as number[]) ?? [];
    const novas = linhas.map((n) => n - removidas.filter((r) => r < n).length);
    if (JSON.stringify(novas) !== JSON.stringify(linhas)) {
      await supa.from("lancamentos").update({ linhas: novas }).eq("id", l.id);
    }
  }
}

export const excluirLancamento = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    const supa = db();
    const { data: lanc } = await supa
      .from("lancamentos")
      .select("linhas, status")
      .eq("id", data.id)
      .single();
    if (lanc?.status === "enviado" && (lanc.linhas as number[])?.length > 0) {
      const sheets = await import("./sheets.server");
      await sheets.deleteSheetRows(sheets.SAIDA_SHEET_ID_CONST, lanc.linhas as number[]);
      await ajustarLinhasAposExclusao(supa, lanc.linhas as number[], data.id);
    }
    const { error } = await supa.from("lancamentos").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- Contagens ----------

const CATEGORIAS_DOSE = new Set(["DESTILADOS", "WHISKY"]);

export const criarContagem = createServerFn({ method: "POST" })
  .inputValidator((d: LancamentoInput) => d)
  .handler(async ({ data }) => {
    const supa = db();
    const itens = data.itens.filter((i) => i.quantidade > 0);
    if (itens.length === 0) throw new Error("Nenhum item com quantidade.");
    const { data: catalogo } = await supa.from("itens").select("codigo, categoria");
    const catPorCodigo = new Map((catalogo ?? []).map((c) => [c.codigo, c.categoria]));
    const itensComValor = itens.map((i) => ({
      codigo: i.codigo,
      quantidade: i.quantidade,
      valor_planilha: CATEGORIAS_DOSE.has(catPorCodigo.get(i.codigo) ?? "")
        ? i.quantidade * 50
        : i.quantidade,
    }));
    const { data: cont, error } = await supa
      .from("contagens")
      .insert({ data: data.data, status: "pendente" })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    const { error: e2 } = await supa
      .from("contagem_itens")
      .insert(itensComValor.map((i) => ({ contagem_id: cont.id, ...i })));
    if (e2) throw new Error(e2.message);
    try {
      const { gravarContagem } = await import("./sheets.server");
      await gravarContagem(
        itensComValor.map((i) => ({ codigo: i.codigo, valorPlanilha: i.valor_planilha })),
      );
      await supa
        .from("contagens")
        .update({ status: "enviado", enviado_em: new Date().toISOString(), erro: null })
        .eq("id", cont.id);
      return { id: cont.id, status: "enviado" as const };
    } catch (err) {
      await supa.from("contagens").update({ status: "pendente", erro: String(err) }).eq("id", cont.id);
      return { id: cont.id, status: "pendente" as const, erro: String(err) };
    }
  });

export const listarContagens = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await db()
    .from("contagens")
    .select("*, contagem_itens(codigo, quantidade, valor_planilha)")
    .order("data", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
});

export const excluirContagem = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    const supa = db();
    const { data: cont } = await supa
      .from("contagens")
      .select("status, contagem_itens(codigo)")
      .eq("id", data.id)
      .single();
    if (cont?.status === "enviado") {
      const { limparContagem } = await import("./sheets.server");
      await limparContagem(((cont.contagem_itens as any[]) ?? []).map((i) => i.codigo));
    }
    const { error } = await supa.from("contagens").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
