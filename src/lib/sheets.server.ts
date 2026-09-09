// Acesso à planilha Google via gateway do conector (somente servidor).
const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";
export const SPREADSHEET_ID = "16KMCHvRXLrUpd-0AVR4OEvlgk3jYHZpSAHHyIaThQ18";
const SAIDA_SHEET = "CONTROLE ENT|SAI 2025";
const SAIDA_SHEET_ID = 2074531545;
const ALMOX_SHEET = "ALMOXARIFADO";

async function sheetsFetch(path: string, init?: RequestInit): Promise<any> {
  const res = await fetch(`${GATEWAY}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env["LOVABLE_API_KEY"]}`,
      "X-Connection-Api-Key": process.env["GOOGLE_SHEETS_API_KEY"]!,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Planilha [${res.status}]: ${body}`);
  }
  return res.json();
}

async function batchGet(ranges: string[]): Promise<Record<string, string[][]>> {
  const qs = ranges.map((r) => `ranges=${encodeURIComponent(r)}`).join("&");
  const data = await sheetsFetch(`/spreadsheets/${SPREADSHEET_ID}/values:batchGet?${qs}`);
  const out: Record<string, string[][]> = {};
  for (const vr of data.valueRanges ?? []) out[vr.range] = vr.values ?? [];
  return out;
}

async function batchUpdateValues(
  data: { range: string; values: (string | number)[][] }[],
): Promise<void> {
  await sheetsFetch(`/spreadsheets/${SPREADSHEET_ID}/values:batchUpdate`, {
    method: "POST",
    body: JSON.stringify({ valueInputOption: "USER_ENTERED", data }),
  });
}

export async function deleteSheetRows(sheetId: number, linhas: number[]): Promise<void> {
  // linhas são 1-based (número da linha na planilha)
  const requests = [...linhas]
    .sort((a, b) => b - a)
    .map((l) => ({
      deleteDimension: {
        range: { sheetId, dimension: "ROWS", startIndex: l - 1, endIndex: l },
      },
    }));
  if (requests.length === 0) return;
  await sheetsFetch(`/spreadsheets/${SPREADSHEET_ID}:batchUpdate`, {
    method: "POST",
    body: JSON.stringify({ requests }),
  });
}

function fmtData(dataISO: string): string {
  // "2026-09-09" -> "09/09/26"
  const [y, m, d] = dataISO.split("-");
  return `${d}/${m}/${y.slice(2)}`;
}

export interface ItemSaida {
  codigo: number;
  quantidade: number;
}

// Grava cada item numa linha da aba de saídas, a partir da primeira linha vazia.
// Colunas: A=código, C=data, D=SAÍDA, E=BAR, G=quantidade. B e F não são tocadas.
// Retorna os números das linhas usadas (1-based).
export async function gravarSaidas(dataISO: string, itens: ItemSaida[]): Promise<number[]> {
  const rangeA = `${SAIDA_SHEET}!A2:A10000`;
  const lido = await batchGet([rangeA]);
  const colA = lido[rangeA] ?? [];
  const proxima = colA.length + 2; // primeira linha vazia (dados começam na linha 2)
  const dataFmt = fmtData(dataISO);
  const payload: { range: string; values: (string | number)[][] }[] = [];
  const linhas: number[] = [];
  itens.forEach((item, i) => {
    const l = proxima + i;
    linhas.push(l);
    payload.push({ range: `${SAIDA_SHEET}!A${l}:A${l}`, values: [[item.codigo]] });
    payload.push({
      range: `${SAIDA_SHEET}!C${l}:E${l}`,
      values: [[dataFmt, "SAÍDA", "BAR"]],
    });
    payload.push({ range: `${SAIDA_SHEET}!G${l}:G${l}`, values: [[item.quantidade]] });
  });
  await batchUpdateValues(payload);
  return linhas;
}

export const SAIDA_SHEET_ID_CONST = SAIDA_SHEET_ID;

// Espelho: lê código (A), descrição (B) e estoque disponível (H), linhas 2 a 83.
export async function lerEspelho(): Promise<
  { codigo: number; descricao: string; estoque: string }[]
> {
  const range = `${ALMOX_SHEET}!A2:H83`;
  const lido = await batchGet([range]);
  const rows = lido[range] ?? [];
  return rows
    .filter((r) => r[0] && r[1])
    .map((r) => ({
      codigo: Number(r[0]),
      descricao: String(r[1]),
      estoque: r[7] != null && r[7] !== "" ? String(r[7]) : "0",
    }));
}

export interface ItemContagem {
  codigo: number;
  valorPlanilha: number;
}

// Grava contagem na coluna I, linhas 2 a 83 (código 1 -> linha 2).
export async function gravarContagem(itens: ItemContagem[]): Promise<void> {
  const payload = itens.map((item) => ({
    range: `${ALMOX_SHEET}!I${item.codigo + 1}:I${item.codigo + 1}`,
    values: [[item.valorPlanilha]] as (string | number)[][],
  }));
  await batchUpdateValues(payload);
}

// Limpa a coluna I dos itens de uma contagem excluída.
export async function limparContagem(codigos: number[]): Promise<void> {
  if (codigos.length === 0) return;
  const payload = codigos.map((c) => ({
    range: `${ALMOX_SHEET}!I${c + 1}:I${c + 1}`,
    values: [[""]] as (string | number)[][],
  }));
  await batchUpdateValues(payload);
}
