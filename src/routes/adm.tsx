import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Lock, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Cabecalho } from "@/components/Cabecalho";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  excluirContagem,
  excluirLancamento,
  getItens,
  listarContagens,
  listarLancamentos,
} from "@/lib/app.functions";

export const Route = createFileRoute("/adm")({
  head: () => ({
    meta: [{ title: "ADM — Bebidas Leo Chopp" }],
  }),
  component: Adm,
});

const SENHA = "0000";

type Exclusao =
  | { tipo: "lancamento"; id: string; data: string }
  | { tipo: "contagem"; id: string; data: string }
  | null;

function Adm() {
  const qc = useQueryClient();
  const [autenticado, setAutenticado] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem("adm-ok") === "1",
  );
  const [senha, setSenha] = useState("");
  const [erroSenha, setErroSenha] = useState(false);
  const [exclusao, setExclusao] = useState<Exclusao>(null);
  const [excluindo, setExcluindo] = useState(false);

  const { data: itens = [] } = useQuery({
    queryKey: ["itens"],
    queryFn: () => getItens(),
    staleTime: 5 * 60 * 1000,
    enabled: autenticado,
  });
  const { data: lancamentos = [] } = useQuery({
    queryKey: ["lancamentos"],
    queryFn: () => listarLancamentos(),
    enabled: autenticado,
  });
  const { data: contagens = [] } = useQuery({
    queryKey: ["contagens"],
    queryFn: () => listarContagens(),
    enabled: autenticado,
  });

  const descricao = (codigo: number) =>
    itens.find((i) => i.codigo === codigo)?.descricao ?? `Item ${codigo}`;
  const fmtData = (iso: string) => iso.split("-").reverse().join("/");

  function entrar() {
    if (senha === SENHA) {
      sessionStorage.setItem("adm-ok", "1");
      setAutenticado(true);
      setErroSenha(false);
    } else {
      setErroSenha(true);
      setSenha("");
    }
  }

  async function confirmarExclusao() {
    if (!exclusao) return;
    setExcluindo(true);
    try {
      if (exclusao.tipo === "lancamento") {
        await excluirLancamento({ data: { id: exclusao.id } });
        await qc.invalidateQueries({ queryKey: ["lancamentos"] });
        toast.success("Lançamento excluído do app e da planilha.");
      } else {
        await excluirContagem({ data: { id: exclusao.id } });
        await qc.invalidateQueries({ queryKey: ["contagens"] });
        toast.success("Contagem excluída do app e da planilha.");
      }
      setExclusao(null);
    } catch (err) {
      toast.error(`Erro ao excluir: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setExcluindo(false);
    }
  }

  if (!autenticado) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Cabecalho titulo="ADM" voltarPara="/retiradas" />
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="w-full max-w-xs rounded-2xl border border-border bg-card p-6">
            <Lock className="mx-auto mb-3 h-8 w-8 text-primary" />
            <h2 className="text-center font-condensed text-2xl font-bold">ÁREA RESTRITA</h2>
            <p className="mt-1 text-center text-sm text-muted-foreground">Digite a senha</p>
            <Input
              type="password"
              inputMode="numeric"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && entrar()}
              className="mt-4 text-center text-2xl tracking-[0.5em]"
              maxLength={4}
              autoFocus
            />
            {erroSenha && (
              <p className="mt-2 text-center text-sm text-destructive">Senha incorreta.</p>
            )}
            <Button className="mt-4 w-full" onClick={entrar}>
              Entrar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-10">
      <Cabecalho titulo="ADM — EXCLUSÕES" voltarPara="/retiradas" />
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
            {lancamentos.length === 0 ? (
              <p className="py-10 text-center text-muted-foreground">Nenhum lançamento.</p>
            ) : (
              (lancamentos as any[]).map((l) => (
                <div key={l.id} className="rounded-lg border border-border bg-card p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-condensed text-lg font-bold">{fmtData(l.data)}</span>
                    <div className="flex items-center gap-2">
                      {l.status === "enviado" ? (
                        <Badge className="bg-primary text-primary-foreground">Enviado</Badge>
                      ) : (
                        <Badge variant="destructive">Pendente</Badge>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          setExclusao({ tipo: "lancamento", id: l.id, data: l.data })
                        }
                      >
                        <Trash2 className="mr-1 h-4 w-4" /> Excluir
                      </Button>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-0.5">
                    {(l.lancamento_itens as any[])
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
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="contagens" className="mt-3 space-y-3">
            {contagens.length === 0 ? (
              <p className="py-10 text-center text-muted-foreground">Nenhuma contagem.</p>
            ) : (
              (contagens as any[]).map((c) => (
                <div key={c.id} className="rounded-lg border border-border bg-card p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-condensed text-lg font-bold">{fmtData(c.data)}</span>
                    <div className="flex items-center gap-2">
                      {c.status === "enviado" ? (
                        <Badge className="bg-primary text-primary-foreground">Enviado</Badge>
                      ) : (
                        <Badge variant="destructive">Pendente</Badge>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setExclusao({ tipo: "contagem", id: c.id, data: c.data })}
                      >
                        <Trash2 className="mr-1 h-4 w-4" /> Excluir
                      </Button>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-0.5">
                    {(c.contagem_itens as any[])
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

      <AlertDialog open={!!exclusao} onOpenChange={(o) => !o && setExclusao(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir registro</AlertDialogTitle>
            <AlertDialogDescription>
              {exclusao?.tipo === "lancamento"
                ? "O lançamento será apagado do app e as linhas correspondentes serão removidas da planilha de saídas."
                : "A contagem será apagada do app e os valores serão removidos da coluna de contagem da planilha."}
              {exclusao && (
                <>
                  {" "}
                  Data: <strong>{fmtData(exclusao.data)}</strong>. Essa ação não pode ser desfeita.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={excluindo}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmarExclusao}
              disabled={excluindo}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {excluindo ? "Excluindo…" : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
