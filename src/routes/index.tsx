import { createFileRoute, Link } from "@tanstack/react-router";
import { Beer, ClipboardList, LogOut } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bebidas Leo Chopp — Controle de Estoque" },
      { name: "description", content: "Lance retiradas de bebidas e registre a contagem física do estoque do bar." },
      { property: "og:title", content: "Bebidas Leo Chopp — Controle de Estoque" },
      { property: "og:description", content: "Lance retiradas de bebidas e registre a contagem física do estoque do bar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <Beer className="mb-4 h-16 w-16 text-primary" />
        <h1 className="text-center font-condensed text-4xl font-bold tracking-wide">
          BEBIDAS LEO CHOPP
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Controle de estoque do bar</p>

        <div className="mt-10 grid w-full max-w-sm gap-4">
          <Link
            to="/retiradas"
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-lg transition-transform active:scale-[0.98]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <LogOut className="h-7 w-7" />
            </span>
            <span>
              <span className="block font-condensed text-2xl font-bold tracking-wide">
                RETIRADAS
              </span>
              <span className="block text-sm text-muted-foreground">
                Lançar saídas de produtos
              </span>
            </span>
          </Link>

          <Link
            to="/contagem"
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-lg transition-transform active:scale-[0.98]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
              <ClipboardList className="h-7 w-7" />
            </span>
            <span>
              <span className="block font-condensed text-2xl font-bold tracking-wide">
                CONTAGEM
              </span>
              <span className="block text-sm text-muted-foreground">
                Registrar a contagem física por item
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
