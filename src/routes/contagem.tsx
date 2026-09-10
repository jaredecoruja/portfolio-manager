import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ClipboardEdit, RefreshCw } from "lucide-react";
import { Cabecalho } from "@/components/Cabecalho";
import { getEspelho } from "@/lib/app.functions";

export const Route = createFileRoute("/contagem")({
  head: () => ({
    meta: [
      { title: "Contagem — Bebidas Leo Chopp" },
      { name: "description", content: "Espelho do estoque disponível e lançamento de contagem física." },
    ],
  }),
  component: Contagem,
});

const ORDEM_CATEGORIAS = [
  "CERVEJA 600 ML",
  "CERVEJA LITRO",
  "LONG NECKS",
  "ENERGETICO",
  "REFRIGERANTE",
  "ÁGUAS",
  "DESTILADOS",
  "VINHOS",
  "ESPUMANTES",
  "WHISKY",
];

function categoriaDoCodigo(codigo: number): string {
  if (codigo <= 8) return "CERVEJA 600 ML";
  if (codigo <= 12) return "CERVEJA LITRO";
  if (codigo <= 22) return "LONG NECKS";
  if (codigo <= 27) return "ENERGETICO";
  if (codigo <= 38) return "REFRIGERANTE";
  if (codigo <= 43) return "ÁGUAS";
  if (codigo <= 65) return "DESTILADOS";
  if (codigo <= 70) return "VINHOS";
  if (codigo <= 73) return "ESPUMANTES";
  if (codigo <= 82) return "WHISKY";
  return "OUTROS";
}

function Contagem() {
  const { data: linhas = [], isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["espelho"],
    queryFn: () => getEspelho(),
    staleTime: 60 * 1000,
  });

  const grupos = ORDEM_CATEGORIAS.map((cat) => ({
    categoria: cat,
    itens: linhas.filter((l) => categoriaDoCodigo(l.codigo) === cat),
  })).filter((g) => g.itens.length > 0);

  return (
    <div className="min-h-screen bg-background pb-10">
      <Cabecalho
        titulo="CONTAGEM ATUAL"
        voltarPara="/"
        acao={
          <div className="flex items-center gap-2">
            <button
              onClick={() => refetch()}
              aria-label="Atualizar"
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
            </button>
            <Link
              to="/contagem/lancar"
              className="flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-bold text-primary-foreground"
            >
              <ClipboardEdit className="h-4 w-4" />
              LANÇAR CONTAGEM
            </Link>
          </div>
        }
      />

      <div className="mx-auto w-full max-w-2xl px-3 pt-3">
        <p className="mb-3 text-sm text-muted-foreground">
          Espelho do estoque disponível (somente leitura).
        </p>
        {isLoading ? (
          <p className="py-10 text-center text-muted-foreground">Carregando estoque…</p>
        ) : isError ? (
          <p className="py-10 text-center text-destructive">
            Não foi possível ler a planilha. Toque em atualizar para tentar de novo.
          </p>
        ) : (
          grupos.map((g) => (
            <div key={g.categoria} className="mb-4">
              <h2 className="mb-1 px-1 font-condensed text-lg font-bold tracking-wide text-primary">
                {g.categoria}
              </h2>
              <ul className="divide-y divide-border rounded-lg border border-border bg-card">
                {g.itens.map((l) => (
                  <li key={l.codigo} className="flex items-center gap-2 px-3 py-2.5">
                    <span className="w-8 shrink-0 text-sm font-semibold text-muted-foreground">
                      {l.codigo}
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-medium leading-tight">
                      {l.descricao}
                    </span>
                    <span className="shrink-0 rounded-md bg-secondary px-2.5 py-1 text-sm font-bold tabular-nums">
                      {l.estoque}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
