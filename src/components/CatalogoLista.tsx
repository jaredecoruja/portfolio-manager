import { Minus, Plus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface ItemCatalogo {
  codigo: number;
  descricao: string;
  categoria: string;
  ordem: number;
}

export const CATEGORIAS_DOSE = ["DESTILADOS", "WHISKY"];

interface Props {
  itens: ItemCatalogo[];
  valores: Record<number, number>;
  onMudar: (codigo: number, valor: number) => void;
  modoDose?: boolean; // true na contagem: DESTILADOS/WHISKY contam em doses
}

export function agruparPorCategoria(itens: ItemCatalogo[]): [string, ItemCatalogo[]][] {
  const mapa = new Map<string, ItemCatalogo[]>();
  for (const item of itens) {
    const lista = mapa.get(item.categoria) ?? [];
    lista.push(item);
    mapa.set(item.categoria, lista);
  }
  return [...mapa.entries()];
}

export function CatalogoLista({ itens, valores, onMudar, modoDose }: Props) {
  const grupos = agruparPorCategoria(itens);
  return (
    <Accordion type="multiple" className="w-full">
      {grupos.map(([categoria, lista]) => {
        const total = lista.reduce((s, i) => s + (valores[i.codigo] ?? 0), 0);
        const emDose = modoDose && CATEGORIAS_DOSE.includes(categoria);
        return (
          <AccordionItem key={categoria} value={categoria} className="border-border">
            <AccordionTrigger className="px-3 py-3 hover:no-underline">
              <span className="flex w-full items-center justify-between pr-2 font-condensed text-lg font-semibold tracking-wide">
                {categoria}
                {total > 0 && (
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-sm font-bold text-primary-foreground">
                    {total}
                  </span>
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-2">
              <ul className="divide-y divide-border">
                {lista.map((item) => {
                  const qtd = valores[item.codigo] ?? 0;
                  return (
                    <li key={item.codigo} className="flex items-center gap-2 px-3 py-2.5">
                      <span className="w-8 shrink-0 text-sm font-semibold text-muted-foreground">
                        {item.codigo}
                      </span>
                      <span className="min-w-0 flex-1 text-sm font-medium leading-tight">
                        {item.descricao}
                      </span>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <button
                          type="button"
                          aria-label="Diminuir"
                          onClick={() => onMudar(item.codigo, Math.max(0, qtd - 1))}
                          className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary text-secondary-foreground active:scale-95"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center text-base font-bold tabular-nums">
                          {qtd}
                        </span>
                        <button
                          type="button"
                          aria-label="Aumentar"
                          onClick={() => onMudar(item.codigo, qtd + 1)}
                          className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground active:scale-95"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {emDose && total > 0 && (
                <p className="px-3 pt-1 text-xs text-muted-foreground">
                  Contado em doses: 1 dose = 50 ml
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
