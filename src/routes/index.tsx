import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Check, Globe2, Package, Smartphone, TrendingUp, Wallet, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JaDigital — Soluções para pequenos negócios" },
      {
        name: "description",
        content: "Soluções digitais personalizadas para bombonieres, depósitos e pequenos comércios.",
      },
    ],
  }),
  component: Home,
});

const solutions = [
  { icon: Package, title: "Controle de estoque", text: "Acompanhe entradas, saídas e o que realmente precisa de reposição." },
  { icon: Wallet, title: "Visão financeira", text: "Organize vendas, despesas e resultados estimados em um só lugar." },
  { icon: BarChart3, title: "Painel operacional", text: "Transforme os dados da operação em indicadores fáceis de entender." },
  { icon: Globe2, title: "Presença digital", text: "Landing page, Google e canais digitais organizados para sua empresa ser encontrada." },
];

const plans = [
  {
    number: "01",
    title: "Presença Digital",
    subtitle: "Para quem precisa ser encontrado e apresentado profissionalmente.",
    ideal: "Ideal para empresas que ainda dependem principalmente de WhatsApp, Instagram, indicação ou divulgação informal.",
    price: "R$ 397 a R$ 697",
    priceLabel: "Faixa inicial",
    features: [
      "Landing page personalizada",
      "Perfil da empresa no Google",
      "Organização das informações do negócio",
      "Botão direto para WhatsApp",
      "Link para Instagram",
      "Localização e mapa",
      "Horários de funcionamento",
      "Apresentação de produtos e serviços",
      "Orientação básica para fotos e avaliações",
    ],
    receives: ["Uma página própria para o negócio", "Presença digital organizada", "Canais de contato conectados"],
    difference: "Você não recebe apenas uma página. Organizamos as principais informações do negócio para facilitar que o cliente encontre, conheça e entre em contato.",
  },
  {
    number: "02",
    title: "Controle Operacional",
    subtitle: "Para quem já possui um negócio funcionando e quer organizar melhor a operação.",
    ideal: "Ideal para bombonieres, depósitos, mercadinhos, lojas e pequenos comércios que já utilizam algum sistema de caixa/PDV, mas precisam de um controle operacional complementar.",
    price: "R$ 897 a R$ 1.497",
    priceLabel: "Faixa inicial",
    featured: true,
    features: [
      "Cadastro de produtos e categorias",
      "Controle de estoque físico",
      "Quantidade disponível e estoque mínimo",
      "Entradas, saídas e ajustes",
      "Histórico de movimentações",
      "Custo de aquisição e preço de venda",
      "Margem estimada por produto",
      "Valor investido e valor potencial de venda",
      "Registro e categorização de despesas",
      "Calculadoras e indicadores operacionais",
      "Dashboard de estoque e movimentações",
      "Acesso pelo celular",
      "Personalização inicial conforme a rotina do estabelecimento",
    ],
    receives: ["Controle do estoque físico", "Histórico de movimentações", "Custos e margens estimadas", "Indicadores operacionais", "Ferramenta adaptada à rotina do negócio"],
    difference: "Não queremos substituir o PDV que a empresa já utiliza. A ferramenta funciona como apoio para acompanhar o que o comerciante precisa controlar na operação física do negócio.",
    note: "O aplicativo não depende de integração com o PDV para funcionar. Quando não houver integração, vendas e outras informações que o cliente quiser acompanhar deverão ser registradas manualmente. Os indicadores são calculados com base nos dados informados.",
  },
  {
    number: "03",
    title: "Solução Personalizada",
    subtitle: "Para negócios que precisam de algo além de uma ferramenta padrão.",
    ideal: "Quando a necessidade ultrapassa o que a ferramenta padrão consegue oferecer e é necessário analisar e desenvolver uma solução específica.",
    price: "Orçamento personalizado",
    priceLabel: "Projeto sob medida",
    features: [
      "Tudo do Plano 2, quando fizer sentido",
      "Fluxos e processos personalizados",
      "Telas e painéis específicos",
      "Campos e regras próprias da empresa",
      "Usuários e permissões",
      "Relatórios personalizados",
      "Indicadores específicos",
      "Automatizações",
      "Integrações com serviços externos, quando viáveis",
      "Recursos adicionais conforme o projeto",
      "Acesso pelo celular ou computador",
      "Evolução por etapas",
    ],
    receives: ["Solução pensada para a necessidade", "Processos personalizados", "Relatórios e indicadores específicos", "Estrutura de usuários conforme o projeto", "Possibilidade de evolução"],
    difference: "Na Oferta 2, adaptamos uma ferramenta existente à rotina do negócio. Na Oferta 3, desenvolvemos uma solução quando a necessidade ultrapassa aquilo que a ferramenta padrão oferece.",
  },
];

function Home() {
  return (
    <main className="min-h-screen bg-[#f6f7f2] text-[#10251c]">
      <header className="sticky top-0 z-50 border-b border-[#10251c]/10 bg-[#f6f7f2]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#inicio" className="text-xl font-bold tracking-tight">Ja<span className="text-[#78b82a]">Digital</span></a>
          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a href="#solucoes">Soluções</a><a href="#planos">Ofertas</a><a href="#processo">Como funciona</a>
          </nav>
          <a href="#contato" className="rounded-full bg-[#10251c] px-5 py-2.5 text-sm font-semibold text-white">Falar comigo</a>
        </div>
      </header>

      <section id="inicio" className="overflow-hidden px-5 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#78b82a]/30 bg-[#78b82a]/10 px-4 py-2 text-sm font-semibold text-[#456d16]"><Zap className="h-4 w-4" /> Tecnologia simples para pequenos negócios</div>
            <h1 className="max-w-2xl text-5xl font-bold leading-[.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Seu negócio pode ser pequeno. <span className="text-[#78b82a]">Sua gestão não precisa ser.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#10251c]/65">Organizamos presença digital e controles operacionais para pequenos negócios terem mais clareza para trabalhar e crescer.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#planos" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#78b82a] px-6 py-3.5 font-bold text-[#10251c]">Conhecer as ofertas <ArrowRight className="h-4 w-4" /></a><a href="#demonstracao" className="inline-flex items-center justify-center rounded-full border border-[#10251c]/15 px-6 py-3.5 font-bold">Ver demonstração</a></div>
          </div>
          <div className="relative">
            <div className="absolute -inset-8 rounded-[3rem] bg-[#78b82a]/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[#10251c]/10 bg-[#10251c] p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4"><div><p className="text-xs text-white/45">DEMONSTRAÇÃO</p><h2 className="mt-1 font-bold text-white">Bomboniere Doce Sabor</h2></div><div className="rounded-full bg-[#78b82a]/15 px-3 py-1 text-xs font-semibold text-[#9bd451]">Visão geral</div></div>
              <div className="grid grid-cols-2 gap-3 py-5"><Metric label="Vendas informadas" value="R$ 18.450" /><Metric label="Resultado estimado" value="R$ 4.180" /><Metric label="Estoque físico" value="R$ 9.230" /><Metric label="Estoque baixo" value="17 itens" warning /></div>
              <div className="rounded-2xl bg-white/[.06] p-4"><div className="flex items-center justify-between"><span className="text-sm font-medium text-white/65">Movimentação recente</span><TrendingUp className="h-4 w-4 text-[#9bd451]" /></div><div className="mt-6 flex h-28 items-end gap-2">{[42,57,46,68,61,82,74,94,86,100].map((height,index)=><div key={index} className="flex-1 rounded-t bg-[#78b82a]/75" style={{height:`${height}%`}} />)}</div></div>
              <p className="mt-3 text-center text-[11px] text-white/35">Exemplo de interface — dados ilustrativos.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#10251c]/10 bg-white/50 px-5 py-6"><div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-10 gap-y-3 text-sm font-semibold text-[#10251c]/55"><span>Bombonieres</span><span>Depósitos</span><span>Mercadinhos</span><span>Comércio de bairro</span></div></section>

      <section id="solucoes" className="px-5 py-20 lg:px-8 lg:py-28"><div className="mx-auto max-w-6xl"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#78b82a]">Soluções</p><h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Menos complicação. Mais visão do seu negócio.</h2></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{solutions.map(({icon:Icon,title,text})=><article key={title} className="rounded-3xl border border-[#10251c]/10 bg-white p-6 transition-transform hover:-translate-y-1"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#78b82a]/12 text-[#5f971d]"><Icon className="h-6 w-6" /></div><h3 className="mt-6 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#10251c]/60">{text}</p></article>)}</div></div></section>

      <section id="demonstracao" className="bg-[#10251c] px-5 py-20 text-white lg:px-8 lg:py-28"><div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-[#9bd451]">Demonstração</p><h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Uma ferramenta de apoio na palma da mão.</h2><p className="mt-6 max-w-lg leading-7 text-white/60">O objetivo é organizar informações importantes da operação sem exigir que o pequeno comerciante abandone as ferramentas que já utiliza.</p><div className="mt-8 space-y-3 text-sm text-white/75">{["Controle de estoque físico","Movimentações registradas","Despesas e custos","Indicadores estimados"].map(item=><div key={item} className="flex items-center gap-3"><Check className="h-4 w-4 text-[#9bd451]" />{item}</div>)}</div></div><div className="mx-auto w-full max-w-sm rounded-[2.5rem] border-8 border-[#263d31] bg-[#f6f7f2] p-4 text-[#10251c] shadow-2xl"><div className="mx-auto mb-5 h-1.5 w-20 rounded-full bg-[#10251c]/15" /><div className="rounded-2xl bg-[#10251c] p-4 text-white"><p className="text-xs text-white/50">HOJE</p><p className="mt-1 text-2xl font-bold">R$ 1.284,50</p><p className="mt-1 text-xs text-[#9bd451]">Resultado estimado</p></div><div className="mt-3 grid grid-cols-2 gap-3"><MiniCard title="Estoque" value="342" /><MiniCard title="Despesas" value="R$ 438" /></div><div className="mt-3 rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs font-semibold text-[#10251c]/50">CONTROLE FÍSICO</p><p className="mt-2 font-bold">Chocolate ao leite 90g</p><p className="mt-1 text-xs text-[#10251c]/50">42 unidades encontradas</p></div></div></div></section>

      <section id="planos" className="px-5 py-20 lg:px-8 lg:py-28"><div className="mx-auto max-w-6xl"><div className="max-w-4xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#78b82a]">Três caminhos</p><h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Escolha o que faz sentido para o seu momento.</h2><p className="mt-5 text-lg leading-7 text-[#10251c]/60">Cada negócio está em uma fase diferente. Começamos pelo que resolve a necessidade atual e evoluímos conforme a empresa cresce.</p></div><div className="mt-12 grid items-start gap-5 lg:grid-cols-3">{plans.map(plan=><PlanCard key={plan.number} plan={plan} />)}</div>
        <div className="mt-8 rounded-3xl border border-[#78b82a]/30 bg-[#78b82a]/10 p-6 sm:p-8"><div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div><p className="text-sm font-bold uppercase tracking-[.15em] text-[#5f971d]">🔧 Suporte & Evolução</p><h3 className="mt-2 text-2xl font-bold">Depois da implantação, o relacionamento pode continuar.</h3><p className="mt-3 max-w-2xl text-sm leading-6 text-[#10251c]/65">Acompanhamento mensal para suporte, pequenas correções, manutenção, ajustes e pequenas melhorias. Projetos maiores podem ser orçados separadamente.</p></div><div className="shrink-0 rounded-2xl bg-white px-5 py-4 text-center shadow-sm"><p className="text-xs font-bold uppercase tracking-wide text-[#10251c]/45">A partir de</p><p className="mt-1 text-2xl font-bold">R$ 79/mês</p></div></div></div>
      </div></section>

      <section id="processo" className="border-y border-[#10251c]/10 bg-white/50 px-5 py-20 lg:px-8 lg:py-24"><div className="mx-auto max-w-6xl"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#78b82a]">Como funciona</p><h2 className="mt-3 text-4xl font-bold tracking-tight">Entender. Construir. Evoluir.</h2></div><div className="mt-10 grid gap-4 md:grid-cols-4">{[["01","Entender","Conversamos sobre o negócio e o problema que precisa ser resolvido."],["02","Definir","Escolhemos a solução, o escopo e o que realmente faz sentido."],["03","Construir","Desenvolvemos e organizamos a ferramenta ou presença digital."],["04","Evoluir","Após a entrega, a solução pode receber ajustes e melhorias."]].map(([n,t,d])=><article key={n} className="rounded-3xl bg-[#10251c] p-6 text-white"><p className="text-sm font-bold text-[#9bd451]">{n}</p><h3 className="mt-4 text-xl font-bold">{t}</h3><p className="mt-3 text-sm leading-6 text-white/60">{d}</p></article>)}</div></div></section>

      <section id="contato" className="px-5 py-20 lg:px-8 lg:py-28"><div className="mx-auto max-w-4xl rounded-[2rem] bg-[#10251c] p-8 text-center text-white sm:p-12"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#9bd451]">Vamos conversar</p><h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Qual problema você gostaria de resolver?</h2><p className="mx-auto mt-5 max-w-2xl leading-7 text-white/60">A primeira conversa serve para entender sua realidade e identificar qual caminho faz sentido para o seu negócio.</p><a href="https://wa.me/5581980000000" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#78b82a] px-7 py-3.5 font-bold text-[#10251c]">Falar pelo WhatsApp <ArrowRight className="h-4 w-4" /></a></div></section>

      <footer className="border-t border-[#10251c]/10 px-5 py-8 lg:px-8"><div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-[#10251c]/55 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 JaDigital. Soluções digitais para pequenos negócios.</p><p>Presença digital • Controle operacional • Soluções personalizadas</p></div></footer>
    </main>
  );
}

function PlanCard({ plan }: { plan: (typeof plans)[number] }) {
  return <article className={`relative rounded-3xl border p-7 ${plan.featured ? "border-[#78b82a] bg-[#10251c] text-white shadow-xl lg:-translate-y-2" : "border-[#10251c]/10 bg-white"}`}>
    {plan.featured && <div className="absolute right-5 top-5 rounded-full bg-[#78b82a] px-3 py-1 text-xs font-bold text-[#10251c]">⭐ Mais procurado</div>}
    <p className={`text-sm font-bold ${plan.featured ? "text-[#9bd451]" : "text-[#78b82a]"}`}>{plan.number}</p>
    <h3 className="mt-5 pr-24 text-2xl font-bold">{plan.title}</h3>
    <p className={`mt-3 text-sm leading-6 ${plan.featured ? "text-white/65" : "text-[#10251c]/60"}`}>{plan.subtitle}</p>
    <div className={`mt-5 rounded-2xl p-4 ${plan.featured ? "bg-white/[.06]" : "bg-[#f6f7f2]"}`}><p className={`text-xs font-bold uppercase tracking-wide ${plan.featured ? "text-[#9bd451]" : "text-[#78b82a]"}`}>Ideal para</p><p className={`mt-2 text-sm leading-6 ${plan.featured ? "text-white/70" : "text-[#10251c]/65"}`}>{plan.ideal}</p></div>
    <p className={`mt-7 text-xs font-semibold uppercase tracking-wide ${plan.featured ? "text-white/45" : "text-[#10251c]/45"}`}>{plan.priceLabel}</p><p className="mt-1 text-xl font-bold">{plan.price}</p>
    <div className="mt-7"><p className="text-sm font-bold">O que entregamos</p><ul className="mt-4 space-y-3">{plan.features.map(feature=><li key={feature} className="flex gap-3 text-sm leading-5"><Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-[#9bd451]" : "text-[#78b82a]"}`} /><span>{feature}</span></li>)}</ul></div>
    {plan.receives && <div className={`mt-7 border-t pt-6 ${plan.featured ? "border-white/10" : "border-[#10251c]/10"}`}><p className="text-sm font-bold">O cliente recebe</p><ul className="mt-4 space-y-3">{plan.receives.map(item=><li key={item} className="flex gap-3 text-sm"><Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-[#9bd451]" : "text-[#78b82a]"}`} />{item}</li>)}</ul></div>}
    <div className={`mt-7 rounded-2xl p-4 ${plan.featured ? "bg-[#78b82a]/10" : "bg-[#78b82a]/8"}`}><p className={`text-xs font-bold uppercase tracking-wide ${plan.featured ? "text-[#9bd451]" : "text-[#5f971d]"}`}>Diferencial JaDigital</p><p className={`mt-2 text-sm leading-6 ${plan.featured ? "text-white/75" : "text-[#10251c]/65"}`}>{plan.difference}</p></div>
    {plan.note && <div className={`mt-4 rounded-2xl border p-4 text-xs leading-5 ${plan.featured ? "border-white/10 text-white/55" : "border-[#10251c]/10 text-[#10251c]/55"}`}><strong>Importante:</strong> {plan.note}</div>}
    <a href={plan.number === "01" ? "/demo-bomboniere" : plan.number === "02" ? "/demo-gestao" : "#contato"} className={`mt-8 flex items-center justify-center gap-2 rounded-full px-5 py-3 font-bold ${plan.featured ? "bg-[#78b82a] text-[#10251c]" : "border border-[#10251c]/15"}`}>{plan.number === "01" ? "Ver exemplo da página" : plan.number === "02" ? "Ver demonstração do sistema" : "Quero saber mais"}<ArrowRight className="h-4 w-4" /></a>
  </article>;
}

function Metric({ label, value, warning = false }: { label: string; value: string; warning?: boolean }) {
  return <div className="rounded-2xl bg-white/[.06] p-4"><p className="text-xs text-white/45">{label}</p><p className={`mt-2 text-lg font-bold ${warning ? "text-[#9bd451]" : "text-white"}`}>{value}</p></div>;
}

function MiniCard({ title, value }: { title: string; value: string }) {
  return <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs font-semibold text-[#10251c]/50">{title}</p><p className="mt-2 font-bold">{value}</p></div>;
}
