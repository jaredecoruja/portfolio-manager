import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, BarChart3, Bell, Boxes, ChevronRight, DollarSign, LayoutDashboard, Menu, Package, Search, ShoppingCart, TrendingUp, Users, Wallet, X } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/demo-gestao")({
  head: () => ({ meta: [{ title: "Gestão do Negócio — Demonstração JaredeDigital" }, { name: "description", content: "Demonstração de um sistema de apoio à operação para pequenos comércios." }] }),
  component: GestaoDemo,
});

const menu = [
  [LayoutDashboard, "Visão geral"], [ShoppingCart, "Vendas"], [Package, "Produtos"], [Boxes, "Estoque"], [Wallet, "Despesas"], [BarChart3, "Relatórios"],
] as const;

const products = [
  ["Chocolate ao leite 90g", "42 un.", "R$ 6,50", "Estoque saudável"],
  ["Fini Tubes Morango", "31 un.", "R$ 8,90", "Estoque saudável"],
  ["Refrigerante Lata", "18 un.", "R$ 5,00", "Estoque baixo"],
  ["Batata Chips", "7 un.", "R$ 9,90", "Repor agora"],
  ["Biscoito recheado", "25 un.", "R$ 4,50", "Estoque saudável"],
];

function GestaoDemo() {
  const [sidebar, setSidebar] = useState(true);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("Visão geral");
  const [notice, setNotice] = useState(true);
  const filtered = products.filter(p => p.join(" ").toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="min-h-screen bg-[#f4f6f1] text-[#10251c]">
      <header className="sticky top-0 z-50 border-b border-[#10251c]/10 bg-white/95 backdrop-blur-md">
        <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
          <a href="/#planos" className="flex items-center gap-2 text-sm font-bold text-[#10251c]/55"><ArrowLeft className="h-4 w-4" /> JaredeDigital</a>
          <div className="hidden h-6 w-px bg-[#10251c]/10 sm:block" />
          <button onClick={() => setSidebar(!sidebar)} className="rounded-xl p-2 hover:bg-[#f4f6f1]"><Menu className="h-5 w-5" /></button>
          <div className="hidden sm:block"><p className="text-xs font-semibold uppercase tracking-wider text-[#10251c]/40">Demonstração</p><p className="text-sm font-black">Gestão do Negócio</p></div>
          <div className="ml-auto flex items-center gap-3"><div className="hidden items-center gap-2 rounded-full border border-[#10251c]/10 bg-[#f4f6f1] px-3 py-2 md:flex"><Search className="h-4 w-4 text-[#10251c]/40" /><span className="text-xs text-[#10251c]/40">Buscar...</span></div><button className="relative rounded-xl p-2 hover:bg-[#f4f6f1]"><Bell className="h-5 w-5" /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#e3a53a]" /></button><div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dceec6] text-xs font-black">JS</div></div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {sidebar && <aside className="fixed z-40 hidden h-[calc(100vh-4rem)] w-60 border-r border-[#10251c]/10 bg-[#10251c] p-4 text-white md:block"><div className="mb-6 rounded-2xl bg-white/[.06] p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#9bd451]">Empresa</p><p className="mt-1 font-black">Bomboniere Doce Sabor</p><p className="mt-1 text-xs text-white/40">Painel administrativo</p></div><nav className="space-y-1">{menu.map(([Icon, label]) => <button key={label} onClick={() => setActive(label)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold ${active===label?"bg-[#78b82a] text-[#10251c]":"text-white/60 hover:bg-white/[.06] hover:text-white"}`}><Icon className="h-4 w-4" />{label}{label==="Estoque"&&<span className="ml-auto rounded-full bg-[#e3a53a] px-2 py-0.5 text-[10px] text-[#10251c]">3</span>}</button>)}</nav><div className="absolute bottom-5 left-4 right-4 rounded-2xl border border-white/10 bg-white/[.04] p-4"><p className="text-xs font-bold text-white/50">DICA</p><p className="mt-2 text-xs leading-5 text-white/55">Use os alertas para identificar produtos que precisam de reposição.</p></div></aside>}

        <section className={`w-full p-4 sm:p-6 lg:p-8 ${sidebar?"md:pl-68":""}`}>
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold text-[#78b82a]">Bom dia, João 👋</p><h1 className="mt-1 text-3xl font-black tracking-tight">{active}</h1><p className="mt-1 text-sm text-[#10251c]/50">Aqui está um resumo da operação.</p></div><div className="rounded-full border border-[#78b82a]/30 bg-[#78b82a]/10 px-4 py-2 text-xs font-bold text-[#4c741d]">● Dados atualizados agora</div></div>

            {notice && <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[#e3a53a]/30 bg-[#fff6df] p-4"><AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#b47b18]" /><div className="flex-1"><p className="text-sm font-black">3 produtos precisam de atenção</p><p className="mt-1 text-xs leading-5 text-[#10251c]/60">O estoque de Refrigerante Lata, Batata Chips e Fini Beijos está abaixo do mínimo configurado.</p></div><button onClick={() => setNotice(false)}><X className="h-4 w-4 text-[#10251c]/40" /></button></div>}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric icon={DollarSign} label="Vendas do mês" value="R$ 18.450,00" trend="+12,4%" /><Metric icon={ShoppingCart} label="Vendas hoje" value="R$ 1.284,50" trend="+8,4%" /><Metric icon={Package} label="Produtos" value="342" trend="17 em alerta" warning /><Metric icon={TrendingUp} label="Resultado estimado" value="R$ 4.180,00" trend="22,7% da venda" /></div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_.8fr]">
              <section className="rounded-3xl border border-[#10251c]/8 bg-white p-5 sm:p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-[#10251c]/40">Desempenho</p><h2 className="mt-1 text-xl font-black">Vendas dos últimos 7 dias</h2></div><BarChart3 className="h-5 w-5 text-[#78b82a]" /></div><div className="mt-8 flex h-56 items-end gap-2 sm:gap-4">{[[54,"Seg"],[68,"Ter"],[49,"Qua"],[78,"Qui"],[64,"Sex"],[91,"Sáb"],[73,"Dom"]].map(([h,d])=><div key={d} className="flex h-full flex-1 flex-col justify-end gap-2"><div className="rounded-t-xl bg-[#78b82a] transition-all hover:opacity-80" style={{height:`${h}%`}} /><p className="text-center text-[10px] font-semibold text-[#10251c]/40">{d}</p></div>)}</div></section>
              <section className="rounded-3xl border border-[#10251c]/8 bg-[#10251c] p-6 text-white"><p className="text-xs font-bold uppercase tracking-wider text-white/40">Resumo financeiro</p><h2 className="mt-1 text-xl font-black">Este mês</h2><div className="mt-7 space-y-5"><Line label="Faturamento" value="R$ 18.450" /><Line label="Despesas" value="R$ 14.270" /><div className="border-t border-white/10 pt-5"><p className="text-xs text-white/40">Resultado estimado</p><p className="mt-1 text-3xl font-black text-[#9bd451]">R$ 4.180</p></div></div></section>
            </div>

            <section className="mt-6 rounded-3xl border border-[#10251c]/8 bg-white p-5 sm:p-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-[#10251c]/40">Estoque</p><h2 className="mt-1 text-xl font-black">Produtos e níveis de reposição</h2></div><div className="flex w-full max-w-xs items-center gap-2 rounded-xl border border-[#10251c]/10 bg-[#f4f6f1] px-3 py-2.5"><Search className="h-4 w-4 text-[#10251c]/40" /><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar produto..." className="w-full bg-transparent text-sm outline-none" /></div></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead><tr className="border-b border-[#10251c]/8 text-xs uppercase tracking-wider text-[#10251c]/40"><th className="pb-3">Produto</th><th className="pb-3">Quantidade</th><th className="pb-3">Preço</th><th className="pb-3">Situação</th><th /></tr></thead><tbody>{filtered.map(p=><tr key={p[0]} className="border-b border-[#10251c]/6 last:border-0"><td className="py-4 font-bold">{p[0]}</td><td className="py-4 text-[#10251c]/60">{p[1]}</td><td className="py-4 font-semibold">{p[2]}</td><td className="py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${p[3]==="Estoque saudável"?"bg-[#78b82a]/12 text-[#4c741d]":"bg-[#fff0d5] text-[#a56d13]"}`}>{p[3]}</span></td><td className="py-4 text-right"><button className="rounded-lg p-2 hover:bg-[#f4f6f1]"><ChevronRight className="h-4 w-4" /></button></td></tr>)}</tbody></table></div></section>

            <section className="mt-6 grid gap-4 md:grid-cols-3"><Quick icon={ShoppingCart} title="Registrar venda" text="Lançar uma nova venda e atualizar o estoque." /><Quick icon={Package} title="Cadastrar produto" text="Adicionar produto, custo, venda e estoque mínimo." /><Quick icon={Wallet} title="Lançar despesa" text="Registrar uma despesa e acompanhar o resultado." /></section>

            <div className="mt-8 rounded-3xl border border-[#78b82a]/25 bg-[#78b82a]/10 p-6"><p className="text-xs font-black uppercase tracking-wider text-[#5f971d]">O que esta demonstração representa</p><div className="mt-3 grid gap-3 text-sm text-[#10251c]/70 sm:grid-cols-2 lg:grid-cols-4"><span>✓ Produtos e categorias</span><span>✓ Compra, venda e margem</span><span>✓ Entradas e saídas de estoque</span><span>✓ Estoque mínimo e alertas</span><span>✓ Registro de vendas</span><span>✓ Despesas categorizadas</span><span>✓ Dashboard e indicadores</span><span>✓ Relatórios e evolução</span></div></div>
          </div>
        </section>
      </div>
      <footer className="border-t border-[#10251c]/10 bg-white px-5 py-7 text-center text-xs leading-5 text-[#10251c]/45">Demonstração ilustrativa de uma possível solução de gestão. Dados, valores e empresa apresentados são fictícios e servem apenas para mostrar como a ferramenta pode apoiar a operação.</footer>
    </main>
  );
}
function Metric({icon:Icon,label,value,trend,warning=false}:{icon:any;label:string;value:string;trend:string;warning?:boolean}){return <div className="rounded-3xl border border-[#10251c]/8 bg-white p-5"><div className="flex items-center justify-between"><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${warning?"bg-[#fff0d5] text-[#b47b18]":"bg-[#78b82a]/12 text-[#5f971d]"}`}><Icon className="h-5 w-5" /></div><span className={`text-xs font-bold ${warning?"text-[#b47b18]":"text-[#5f971d]"}`}>{trend}</span></div><p className="mt-5 text-xs font-semibold text-[#10251c]/45">{label}</p><p className="mt-1 text-2xl font-black tracking-tight">{value}</p></div>}
function Line({label,value}:{label:string;value:string}){return <div className="flex items-center justify-between"><span className="text-sm text-white/55">{label}</span><strong>{value}</strong></div>}
function Quick({icon:Icon,title,text}:{icon:any;title:string;text:string}){return <button className="group flex items-center gap-4 rounded-2xl border border-[#10251c]/8 bg-white p-5 text-left transition-all hover:-translate-y-1 hover:shadow-md"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#10251c] text-[#9bd451]"><Icon className="h-5 w-5" /></div><div><p className="font-black">{title}</p><p className="mt-1 text-xs leading-5 text-[#10251c]/50">{text}</p></div><ChevronRight className="ml-auto h-4 w-4 text-[#10251c]/25 transition-transform group-hover:translate-x-1" /></button>}
