import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FileBarChart, ShieldCheck, Send } from "lucide-react";
import { toast } from "sonner";
import { Cabecalho } from "@/components/Cabecalho";
import { CatalogoLista, agruparPorCategoria } from "@/components/CatalogoLista";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { criarLancamento, getItens } from "@/lib/app.functions";

export const Route = createFileRoute("/retiradas")({
  head: () => ({
    meta: [
      { title: "Retiradas — Bebidas Leo Chopp" },
      { name: "description", content: "Lance as saídas de produtos do bar." },
    ],
  }),
  component: Retiradas,
});

function hojeISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function Retiradas() {
  const navigate = useNavigate();
  const { data: itens = [], isLoading } = useQuery({
    queryKey: ["itens"],
    queryFn: () => getItens(),
    staleTime: 5 * 60 * 1000,
  });
  const [data, setData] = useState(hojeISO());
  const [valores, setValores] = useState<Record<number, number>>({});
  const [confirmar, setConfirmar] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const selecionados = Object.entries(valores)
    .filter(([, q]) => q > 0)
    .map(([c, q]) => ({ codigo: Number(c), quantidade: q }));
  const totalItens = selecionados.length;

  async function enviar() {
    setEnviando(true);
    try {
      const res = await criarLancamento({ data: { data, itens: selecionados } });
      if (res.status === "enviado") {
        toast.success("Lançamento salvo e enviado para a planilha.");
      } else {
        toast.warning("Lançamento salvo. Falha no envio à planilha — reenvie pelo Relatório.");
      }
      setValores({});
      setConfirmar(false);
      navigate({ to: "/relatorio" });
    } catch (err) {
      toast.error(`Erro ao lançar: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      <Cabecalho
        titulo="RETIRADAS"
        voltarPara="/"
        acao={
          <Link
            to="/relatorio"
            className="flex h-9 items-center gap-1.5 rounded-md bg-secondary px-3 text-sm font-semibold text-secondary-foreground hover:bg-accent"
          >
            <FileBarChart className="h-4 w-4" />
            Relatório
          </Link>
        }
      />

      <div className="mx-auto w-full max-w-2xl px-3 pt-3">
        <div className="mb-2 flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5">
          <Label htmlFor="data" className="text-sm font-semibold">
            Data
          </Label>
          <Input
            id="data"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-40"
          />
        </div>

        {isLoading ? (
          <p className="py-10 text-center text-muted-foreground">Carregando catálogo…</p>
        ) : (
          <CatalogoLista
            itens={itens}
            valores={valores}
            onMudar={(codigo, v) => setValores((prev) => ({ ...prev, [codigo]: v }))}
          />
        )}
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-2 px-3 py-3">
          <Link
            to="/adm"
            className="flex h-11 items-center gap-1.5 rounded-md px-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            <ShieldCheck className="h-4 w-4" />
            ADM
          </Link>
          <Button
            className="h-11 flex-1 text-base font-bold"
            disabled={totalItens === 0 || enviando}
            onClick={() => setConfirmar(true)}
          >
            <Send className="mr-2 h-4 w-4" />
            {enviando ? "Enviando…" : `Enviar lançamento (${totalItens})`}
          </Button>
        </div>
      </footer>

      <AlertDialog open={confirmar} onOpenChange={setConfirmar}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar lançamento</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <p className="mb-2">
                  Data: <strong>{data.split("-").reverse().join("/")}</strong> — {totalItens}{" "}
                  item(ns):
                </p>
                <ul className="max-h-48 space-y-1 overflow-y-auto text-left">
                  {agruparPorCategoria(itens).map(([cat, lista]) =>
                    lista
                      .filter((i) => (valores[i.codigo] ?? 0) > 0)
                      .map((i) => (
                        <li key={i.codigo} className="flex justify-between text-sm">
                          <span>
                            {i.codigo} — {i.descricao}
                          </span>
                          <strong>{valores[i.codigo]}</strong>
                        </li>
                      )),
                  )}
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={enviando}>Voltar</AlertDialogCancel>
            <AlertDialogAction onClick={enviar} disabled={enviando}>
              {enviando ? "Enviando…" : "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
