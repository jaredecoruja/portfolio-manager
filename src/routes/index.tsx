import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Check, Globe2, Package, Smartphone, TrendingUp, Wallet, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jarede Digital — Soluções para pequenos negócios" },
      {
        name: "description",
        content:
          "Soluções digitais personalizadas para bombonieres, depósitos e pequenos comércios.",
      },
    ],
  }),
  component: Home,
});

const solutions = [
  {
    icon: Package,
    title: "Controle de estoque",
    text: "Saiba o que entrou, o que saiu e quais produtos precisam de reposição.",
  },
  {
    icon: Wallet,
    title: "Visão financeira",
    text: "Acompanhe vendas, despesas e resultado estimado em um só lugar.",
  },
  {
    icon: BarChart3,
    title: "Painel de gestão",
    text: "Transforme os dados da operação em indicadores fáceis de entender.",
  },
  {
    icon: Globe2,
    title: "Presença digital",
    text: "Landing page, Google e canais digitais organizados para sua empresa ser encontrada.",
  },
];

const plans = [
  {
    number: "01",
    title: "Presença Digital",
    subtitle: "Para ser encontrado.",
    price: "A partir de R$ 397",
    features: ["Landing page personalizada", "Perfil da empresa no Google", "Organização dos canais digitais", "WhatsApp e localização"],
  },
  {
    number: "02",
    title: "Gestão do Negócio",
    subtitle: "Para organizar a operação.",
    price: "A partir de R$ 897",
    featured: true,
    features: ["Cadastro de produtos", "Controle de estoque", "Entradas e saídas", "Vendas e despesas", "Painel de indicadores"],
  },
  {
    number: "03",
    title: "Solução Personalizada",
    subtitle: "Para uma operação sob medida.",
    price: "Orçamento personalizado",
    features: ["Fluxo desenhado para o negócio", "Telas e regras personalizadas", "Acesso pelo celular", "Evolução por etapas"],
  },
];

function Home() {
  return (
    <main className="min-h-screen bg-[#f6f7f2] text-[#10251c]">
      <header className="sticky top-0 z-50 border-b border-[#10251c]/10 bg-[#f6f7f2]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#inicio" className="text-xl font-bold tracking-tight">
            Jarede<span className="text-[#78b82a]">Digital</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a href="#solucoes" className="transition-opacity hover:opacity-60">Soluções</a>
            <a href="#planos" className="transition-opacity hover:opacity-60">Planos</a>
            <a href="#processo" className="transition-opacity hover:opacity-60">Como funciona</a>
          </nav>
          <a href="#contato" className="rounded-full bg-[#10251c] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
            Falar comigo
          </a>
        </div>
      </header>

      <section id="inicio" className="overflow-hidden px-5 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#78b82a]/30 bg-[#78b82a]/10 px-4 py-2 text-sm font-semibold text-[#456d16]">
              <Zap className="h-4 w-4" /> Tecnologia simples para pequenos negócios
            </div>
            <h1 className="max-w-2xl text-5xl font-bold leading-[.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Seu negócio pode ser pequeno. <span className="text-[#78b82a]">Sua gestão não precisa ser.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#10251c]/65">
              Organizamos estoque, vendas e presença digital para bombonieres, depósitos e pequenos comércios terem mais clareza para trabalhar e crescer.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#solucoes" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#78b82a] px-6 py-3.5 font-bold text-[#10251c] transition-transform hover:-translate-y-0.5">
                Conhecer as soluções <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#demonstracao" className="inline-flex items-center justify-center rounded-full border border-[#10251c]/15 px-6 py-3.5 font-bold transition-colors hover:bg-white">
                Ver demonstração
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-[3rem] bg-[#78b82a]/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[#10251c]/10 bg-[#10251c] p-5 shadow-2xl shadow-[#10251c]/20">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs text-white/45">DEMONSTRAÇÃO</p>
                  <h2 className="mt-1 font-bold text-white">Bomboniere Doce Sabor</h2>
                </div>
                <div className="rounded-full bg-[#78b82a]/15 px-3 py-1 text-xs font-semibold text-[#9bd451]">Visão geral</div>
              </div>
              <div className="grid grid-cols-2 gap-3 py-5">
                <Metric label="Vendas do mês" value="R$ 18.450" />
                <Metric label="Resultado estimado" value="R$ 4.180" />
                <Metric label="Estoque" value="R$ 9.230" />
                <Metric label="Estoque baixo" value="17 itens" warning />
              </div>
              <div className="rounded-2xl bg-white/[.06] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/65">Vendas recentes</span>
                  <TrendingUp className="h-4 w-4 text-[#9bd451]" />
                </div>
                <div className="mt-6 flex h-28 items-end gap-2">
                  {[42, 57, 46, 68, 61, 82, 74, 94, 86, 100].map((height, index) => (
                    <div key={index} className="flex-1 rounded-t bg-[#78b82a]/75" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-center text-[11px] text-white/35">Exemplo de interface — os dados são ilustrativos.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#10251c]/10 bg-white/50 px-5 py-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-10 gap-y-3 text-sm font-semibold text-[#10251c]/55">
          <span>Bombonieres</span><span>Depósitos</span><span>Mercadinhos</span><span>Comércio de bairro</span>
        </div>
      </section>

      <section id="solucoes" className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-[#78b82a]">Soluções</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Menos complicação. Mais visão do seu negócio.</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-3xl border border-[#10251c]/10 bg-white p-6 transition-transform hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#78b82a]/12 text-[#5f971d]"><Icon className="h-6 w-6" /></div>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#10251c]/60">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="demonstracao" className="bg-[#10251c] px-5 py-20 text-white lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-[#9bd451]">Demonstração</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Imagine ter isso na palma da mão.</h2>
            <p className="mt-6 max-w-lg leading-7 text-white/60">Um painel simples para acompanhar o que está acontecendo na operação sem depender de várias planilhas.</p>
            <div className="mt-8 space-y-3 text-sm text-white/75">
              {["Vendas de hoje", "Produtos mais vendidos", "Alertas de estoque", "Despesas e resultado estimado"].map((item) => <div key={item} className="flex items-center gap-3"><Check className="h-4 w-4 text-[#9bd451]" />{item}</div>)}
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm rounded-[2.5rem] border-8 border-[#263d31] bg-[#f6f7f2] p-4 text-[#10251c] shadow-2xl">
            <div className="mx-auto mb-5 h-1.5 w-20 rounded-full bg-[#10251c]/15" />
            <div className="rounded-2xl bg-[#10251c] p-4 text-white">
              <p className="text-xs text-white/50">HOJE</p><p className="mt-1 text-2xl font-bold">R$ 1.284,50</p><p className="mt-1 text-xs text-[#9bd451]">+8,4% vs. período anterior</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3"><MiniCard title="Estoque" value="342" /><MiniCard title="Despesas" value="R$ 438" /></div>
            <div className="mt-3 rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs font-semibold text-[#10251c]/50">PRODUTO MAIS VENDIDO</p><p className="mt-2 font-bold">Chocolate ao leite 90g</p><p className="mt-1 text-xs text-[#10251c]/50">42 unidades</p></div>
          </div>
        </div>
      </section>

      <section id="planos" className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#78b82a]">Três caminhos</p><h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Escolha o que faz sentido para o seu momento.</h2></div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.number} className={`relative rounded-3xl border p-7 ${plan.featured ? "border-[#78b82a] bg-[#10251c] text-white shadow-xl" : "border-[#10251c]/10 bg-white"}`}>
                {plan.featured && <div className="absolute right-5 top-5 rounded-full bg-[#78b82a] px-3 py-1 text-xs font-bold text-[#10251c]">Mais completo</div>}
                <p className={`text-sm font-bold ${plan.featured ? "text-[#9bd451]" : "text-[#78b82a]"}`}>{plan.number}</p>
                <h3 className="mt-5 text-2xl font-bold">{plan.title}</h3><p className={`mt-2 ${plan.featured ? "text-white/60" : "text-[#10251c]/55"}`}>{plan.subtitle}</p>
                <p className="mt-8 text-xl font-bold">{plan.price}</p>
                <ul className="mt-7 space-y-3">{plan.features.map((feature) => <li key={feature} className="flex gap-3 text-sm"><Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-[#9bd451]" : "text-[#78b82a]"}`} />{feature}</li>)}</ul>
                <a href="#contato" className={`mt-8 flex items-center justify-center rounded-full px-5 py-3 font-bold ${plan.featured ? "bg-[#78b82a] text-[#10251c]" : "border border-[#10251c]/15"}`}>Quero saber mais</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="processo" className="border-y border-[#10251c]/10 bg-white/50 px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#78b82a]">Como funciona</p><h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Começamos pelo que realmente importa.</h2></div><div className="mt-12 grid gap-8 md:grid-cols-4">{[["01","Conversamos","Entendemos como sua empresa trabalha hoje."],["02","Mapeamos","Identificamos onde a tecnologia pode ajudar."],["03","Criamos","Construímos uma solução adequada à sua realidade."],["04","Evoluímos","A solução pode crescer junto com o negócio."]].map(([n,t,d]) => <div key={n}><span className="text-sm font-bold text-[#78b82a]">{n}</span><h3 className="mt-3 text-xl font-bold">{t}</h3><p className="mt-2 text-sm leading-6 text-[#10251c]/60">{d}</p></div>)}</div></div>
      </section>

      <section id="contato" className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-[#78b82a] px-7 py-12 text-center sm:px-12 lg:py-16"><Smartphone className="mx-auto h-8 w-8" /><h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Seu negócio já funciona. Vamos melhorar o controle dele.</h2><p className="mx-auto mt-5 max-w-2xl text-[#10251c]/65">Conte um pouco sobre sua empresa. A primeira conversa serve para entender sua realidade e mostrar possibilidades.</p><a href="https://wa.me/5581000000000" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#10251c] px-7 py-3.5 font-bold text-white">Falar no WhatsApp <ArrowRight className="h-4 w-4" /></a><p className="mt-4 text-xs text-[#10251c]/50">Troque o número do botão pelo seu WhatsApp antes de publicar.</p></div>
      </section>

      <footer className="border-t border-[#10251c]/10 px-5 py-8 lg:px-8"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-sm text-[#10251c]/55 sm:flex-row"><strong className="text-[#10251c]">JaredeDigital</strong><span>Soluções digitais para pequenos negócios.</span></div></footer>
    </main>
  );
}

function Metric({ label, value, warning = false }: { label: string; value: string; warning?: boolean }) {
  return <div className="rounded-2xl bg-white/[.06] p-4"><p className="text-xs text-white/45">{label}</p><p className={`mt-2 text-xl font-bold ${warning ? "text-[#f2c36b]" : "text-white"}`}>{value}</p></div>;
}

function MiniCard({ title, value }: { title: string; value: string }) {
  return <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-[#10251c]/45">{title}</p><p className="mt-1 text-lg font-bold">{value}</p></div>;
}
