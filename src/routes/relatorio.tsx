import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Pencil, RefreshCw, Send } from "lucide-react";
import { toast } from "sonner";
import { Cabecalho } from "@/components/Cabecalho";
import { CatalogoLista } from "@/components/CatalogoLista";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  editarLancamento,
  getItens,
  listarContagens,
  listarLancamentos,
  reenviarLancamento,
} from "@/lib/app.functions";

export const Route = createFileRoute("/relatorio")({
  head: () => ({
    meta: [{ title: "Relatório — Bebidas Leo Chopp" }],
  }),
  component: Relatorio,
});

type Lancamento = {
  id: string;
  data: string;
  status: string;
  editado: boolean;
  lancamento_itens: { codigo: number; quantidade: number }[];
};

type Contagem = {
  id: string;
  data: string;
  status: string;
  contagem_itens: { codigo: number; quantidade: number; valor_planilha: number }[];
};

function fmtData(iso: string) {
  return iso.split("-").reverse().join("/");
}

function StatusBadge({ status, editado }: { status: string; editado?: boolean }) {
  if (status === "enviado")
    return <Badge className="bg-primary text-primary-foreground">Enviado</Badge>;
  return (
    <Badge variant="destructive">
      {editado ? "Editado — reenviar" : "Pendente — reenviar"}
    </Badge>
  );
}

function Relatorio() {
  const qc = useQueryClient();
  const { data: itens = [] } = useQuery({
    queryKey: ["itens"],
    queryFn: () => getItens(),
    staleTime: 5 * 60 * 1000,
  });
  const { data: lancamentos = [], isLoading: carL } = useQuery({
    queryKey: ["lancamentos"],
    queryFn: () => listarLancamentos(),
  });
  const { data: contagens = [], isLoading: carC } = useQuery({
    queryKey: ["contagens"],
    queryFn: () => listarContagens(),
  });

  const descricao = (codigo: number) =>
    itens.find((i) => i.codigo === codigo)?.descricao ?? `Item ${codigo}`;

  const [editando, setEditando] = useState<Lancamento | null>(null);
  const [editData, setEditData] = useState("");
  const [editValores, setEditValores] = useState<Record<number, number>>({});
  const [salvando, setSalvando] = useState(false);
  const [reenviando, setReenviando] = useState<string | null>(null);

  function abrirEdicao(l: Lancamento) {
    setEditando(l);
    setEditData(l.data);
    const v: Record<number, number> = {};
    for (const i of l.lancamento_itens) v[i.codigo] = i.quantidade;
    setEditValores(v);
  }

  async function salvarEdicao() {
    if (!editando) return;
    setSalvando(true);
    try {
      const selecionados = Object.entries(editValores)
        .filter(([, q]) => q > 0)
        .map(([c, q]) => ({ codigo: Number(c), quantidade: q }));
      await editarLancamento({ data: { id: editando.id, data: editData, itens: selecionados } });
      toast.success("Lançamento editado. Agora reenvie para atualizar a planilha.");
      setEditando(null);
      await qc.invalidateQueries({ queryKey: ["lancamentos"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : String(err));
    } finally {
      setSalvando(false);
    }
  }

  async function reenviar(id: string) {
    setReenviando(id);
    try {
      await reenviarLancamento({ data: { id } });
      toast.success("Lançamento reenviado para a planilha.");
      await qc.invalidateQueries({ queryKey: ["lancamentos"] });
    } catch (err) {
      toast.error(`Falha no reenvio: ${err instanceof Error ? err.message : String(err)}`);
      await qc.invalidateQueries({ queryKey: ["lancamentos"] });
    } finally {
      setReenviando(null);
    }
  }

  return (
    <div className="min-h-screen bg-background pb-10">
      <Cabecalho titulo="RELATÓRIO" voltarPara="/retiradas" />
      <div className="mx-auto w-full max-w-2xl px-3 pt-3">
        <Tabs defaultValue="retiradas">
          <TabsList className="w-full">
            <TabsTrigger value="retiradas" className="flex-1">
              Retiradas
            </TabsTrigger>
            <TabsTrigger value="contagens" className="flex-1">
              Contagens
            </TabsTrigger>
          </TabsList>

          <TabsContent value="retiradas" className="mt-3 space-y-3">
            {carL ? (
              <p className="py-10 text-center text-muted-foreground">Carregando…</p>
            ) : lancamentos.length === 0 ? (
              <p className="py-10 text-center text-muted-foreground">
                Nenhum lançamento registrado.
              </p>
            ) : (
              (lancamentos as Lancamento[]).map((l) => (
                <div key={l.id} className="rounded-lg border border-border bg-card p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-condensed text-lg font-bold">{fmtData(l.data)}</span>
                    <StatusBadge status={l.status} editado={l.editado} />
                  </div>
                  <ul className="mt-2 space-y-0.5">
                    {l.lancamento_itens
                      .slice()
                      .sort((a, b) => a.codigo - b.codigo)
                      .map((i) => (
                        <li key={i.codigo} className="flex justify-between text-sm">
                          <span>
                            {i.codigo} — {descricao(i.codigo)}
                          </span>
                          <strong>{i.quantidade}</strong>
                        </li>
                      ))}
                  </ul>
                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => abrirEdicao(l)}
                      className="flex-1"
                    >
                      <Pencil className="mr-1.5 h-4 w-4" /> Editar
                    </Button>
                    {l.status !== "enviado" && (
                      <Button
                        size="sm"
                        onClick={() => reenviar(l.id)}
                        disabled={reenviando === l.id}
                        className="flex-1"
                      >
                        <Send className="mr-1.5 h-4 w-4" />
                        {reenviando === l.id ? "Reenviando…" : "Reenviar"}
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="contagens" className="mt-3 space-y-3">
            {carC ? (
              <p className="py-10 text-center text-muted-foreground">Carregando…</p>
            ) : contagens.length === 0 ? (
              <p className="py-10 text-center text-muted-foreground">
                Nenhuma contagem registrada.
              </p>
            ) : (
              (contagens as Contagem[]).map((c) => (
                <div key={c.id} className="rounded-lg border border-border bg-card p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-condensed text-lg font-bold">{fmtData(c.data)}</span>
                    <StatusBadge status={c.status} />
                  </div>
                  <ul className="mt-2 space-y-0.5">
                    {c.contagem_itens
                      .slice()
                      .sort((a, b) => a.codigo - b.codigo)
                      .map((i) => (
                        <li key={i.codigo} className="flex justify-between text-sm">
                          <span>
                            {i.codigo} — {descricao(i.codigo)}
                          </span>
                          <strong>
                            {i.valor_planilha !== i.quantidade
                              ? `${i.quantidade} doses (${i.valor_planilha})`
                              : i.quantidade}
                          </strong>
                        </li>
                      ))}
                  </ul>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!editando} onOpenChange={(o) => !o && setEditando(null)}>
        <DialogContent className="flex max-h-[90vh] max-w-2xl flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" /> Editar lançamento
            </DialogTitle>
          </DialogHeader>
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <div className="mb-2 flex items-center gap-3">
              <Label htmlFor="edit-data" className="text-sm font-semibold">
                Data
              </Label>
              <Input
                id="edit-data"
                type="date"
                value={editData}
                onChange={(e) => setEditData(e.target.value)}
                className="w-40"
              />
            </div>
            <CatalogoLista
              itens={itens}
              valores={editValores}
              onMudar={(codigo, v) => setEditValores((prev) => ({ ...prev, [codigo]: v }))}
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setEditando(null)} disabled={salvando}>
              Cancelar
            </Button>
            <Button onClick={salvarEdicao} disabled={salvando}>
              {salvando ? "Salvando…" : "Salvar alterações"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
