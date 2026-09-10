import { Link } from "@tanstack/react-router";
import { ArrowLeft, Beer } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  titulo: string;
  voltarPara: string;
  acao?: ReactNode;
}

export function Cabecalho({ titulo, voltarPara, acao }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-2xl items-center gap-2 px-3">
        <Link
          to={voltarPara}
          aria-label="Voltar"
          className="flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-accent"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Beer className="h-5 w-5 shrink-0 text-primary" />
          <h1 className="truncate font-condensed text-xl font-bold tracking-wide">{titulo}</h1>
        </div>
        {acao}
      </div>
    </header>
  );
}
