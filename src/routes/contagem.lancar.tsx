import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Cabecalho } from "@/components/Cabecalho";
import { CatalogoLista, CATEGORIAS_DOSE, agruparPorCategoria } from "@/components/CatalogoLista";
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
import { criarContagem, getItens } from "@/lib/app.functions";

export const Route = createFileRoute("/contagem/lancar")({
  head: () => ({
    meta: [{ title: "Lançar Contagem — Bebidas Leo Chopp" }],
  }),
  component: LancarContagem,
});

function hojeISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function LancarContagem() {
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

  async function enviar() {
    setEnviando(true);
    try {
      const res = await criarContagem({ data: { data, itens: selecionados } });
      if (res.status === "enviado") {
        toast.success("Contagem salva e enviada para a planilha.");
      } else {
        toast.warning("Contagem salva. Falha no envio à planilha — verifique o Relatório.");
      }
      setConfirmar(false);
      navigate({ to: "/relatorio" });
    } catch (err) {
      toast.error(`Erro ao lançar: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      <Cabecalho titulo="LANÇAR CONTAGEM" voltarPara="/contagem" />

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
        <p className="mb-2 px-1 text-xs text-muted-foreground">
          Destilados e Whisky são contados em doses (1 dose = 50 ml).
        </p>

        {isLoading ? (
          <p className="py-10 text-center text-muted-foreground">Carregando catálogo…</p>
        ) : (
          <CatalogoLista
            itens={itens}
            valores={valores}
            modoDose
            onMudar={(codigo, v) => setValores((prev) => ({ ...prev, [codigo]: v }))}
          />
        )}
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-2xl px-3 py-3">
          <Button
            className="h-11 w-full text-base font-bold"
            disabled={selecionados.length === 0 || enviando}
            onClick={() => setConfirmar(true)}
          >
            <Send className="mr-2 h-4 w-4" />
            {enviando ? "Enviando…" : `Enviar contagem (${selecionados.length})`}
          </Button>
        </div>
      </footer>

      <AlertDialog open={confirmar} onOpenChange={setConfirmar}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar contagem</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <p className="mb-2">
                  Data: <strong>{data.split("-").reverse().join("/")}</strong> —{" "}
                  {selecionados.length} item(ns):
                </p>
                <ul className="max-h-48 space-y-1 overflow-y-auto text-left">
                  {agruparPorCategoria(itens).map(([cat, lista]) =>
                    lista
                      .filter((i) => (valores[i.codigo] ?? 0) > 0)
                      .map((i) => {
                        const q = valores[i.codigo];
                        const dose = CATEGORIAS_DOSE.includes(i.categoria);
                        return (
                          <li key={i.codigo} className="flex justify-between text-sm">
                            <span>
                              {i.codigo} — {i.descricao}
                            </span>
                            <strong>
                              {dose ? `${q} doses (${q * 50})` : q}
                            </strong>
                          </li>
                        );
                      }),
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
