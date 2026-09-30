import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Instagram, MapPin, Menu, Search, ShoppingBag, Star, Truck, Wallet, X } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/demo-bomboniere")({
  head: () => ({ meta: [{ title: "Doce Mania — Exemplo de página para bomboniere" }] }),
  component: BomboniereDemo,
});

const categories = [
  ["🍬", "Balas & Doces"], ["🍫", "Chocolates"], ["🥤", "Bebidas"],
  ["🥔", "Salgadinhos"], ["🍪", "Biscoitos"], ["🎁", "Kits & Presentes"],
];

const products = [
  ["Fini Tubes Morango", "Balas & Doces", "R$ 8,90", "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=700&q=85"],
  ["Chocolate Crocante", "Chocolates", "R$ 6,50", "https://images.unsplash.com/photo-1575377222312-dd1a5d2d4e5d?auto=format&fit=crop&w=700&q=85"],
  ["Refrigerante Lata", "Bebidas", "R$ 5,00", "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=700&q=85"],
  ["Batata Chips", "Salgadinhos", "R$ 9,90", "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=700&q=85"],
  ["Cookie Recheado", "Biscoitos", "R$ 7,90", "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=700&q=85"],
  ["Kit Festa", "Kits & Presentes", "R$ 39,90", "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=700&q=85"],
];

function BomboniereDemo() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(0);
  const filtered = products.filter(([name, category]) => `${name} ${category}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fffaf3] text-[#3a2118]">
      <div className="bg-[#3a2118] px-4 py-2 text-center text-[11px] font-bold text-white sm:text-xs">🎉 Entrega grátis em pedidos acima de R$ 80 • Peça online e receba em casa</div>
      <header className="sticky top-0 z-50 border-b border-[#3a2118]/10 bg-[#fffaf3]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-5">
          <a href="/#planos" className="flex shrink-0 items-center gap-1 text-xs font-bold text-[#3a2118]/60 sm:text-sm"><ArrowLeft className="h-4 w-4" /> Voltar</a>
          <div className="h-6 w-px bg-[#3a2118]/10" />
          <a href="#top" className="text-lg font-black tracking-tight text-[#ed4d62] sm:text-xl">Doce<span className="text-[#ffb400]">Mania</span> 🍭</a>
          <nav className="ml-auto hidden items-center gap-6 text-sm font-bold md:flex"><a href="#produtos">Produtos</a><a href="#categorias">Categorias</a><a href="#sobre">Sobre</a><a href="#contato">Contato</a></nav>
          <button aria-label="Abrir menu" onClick={() => setMenu(!menu)} className="ml-auto rounded-xl p-2 md:hidden">{menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          <div className="relative hidden rounded-full bg-white p-2 shadow-sm sm:block"><ShoppingBag className="h-5 w-5" /><span className="absolute -right-1 -top-1 rounded-full bg-[#ed4d62] px-1.5 text-[10px] font-bold text-white">{cart}</span></div>
        </div>
        {menu && <nav className="border-t border-[#3a2118]/10 bg-[#fffaf3] px-4 py-3 md:hidden"><div className="flex flex-col gap-1">{[["Produtos","produtos"],["Categorias","categorias"],["Sobre","sobre"],["Contato","contato"]].map(([label,id]) => <a key={id} onClick={() => setMenu(false)} href={`#${id}`} className="rounded-xl px-3 py-3 text-sm font-bold">{label}</a>)}</div></nav>}
      </header>

      <section id="top" className="relative overflow-hidden bg-gradient-to-br from-[#ffd84d] via-[#ffbd3f] to-[#ff806c] px-4 py-12 sm:px-5 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-10">
          <div className="relative z-10">
            <span className="inline-flex rounded-full bg-white/80 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-[#ed4d62] sm:px-4 sm:text-xs">Aquele sabor que alegra o dia ✨</span>
            <h1 className="mt-4 text-[2.8rem] font-black leading-[.92] tracking-tight sm:mt-5 sm:text-7xl">Tudo que você ama em um só lugar.</h1>
            <p className="mt-5 max-w-xl text-base font-medium leading-6 text-[#3a2118]/75 sm:mt-6 sm:text-lg sm:leading-7">Balas, chocolates, salgadinhos, bebidas e aquele docinho que transforma qualquer momento.</p>
            <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row"><a href="#produtos" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#ed4d62] px-6 py-3.5 text-sm font-black text-white shadow-lg">Ver produtos <ArrowRight className="ml-1 h-4 w-4" /></a><a href="#categorias" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white/80 px-6 py-3.5 text-sm font-black">Explorar categorias</a></div>
            <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-xs font-bold sm:mt-8 sm:gap-5 sm:text-sm"><span>⭐ 4,9/5</span><span>•</span><span>+2 mil clientes</span><span>•</span><span>Entrega local</span></div>
          </div>
          <div className="relative mx-auto grid w-full max-w-lg grid-cols-2 gap-2.5 sm:gap-4">
            <img className="mt-6 h-44 w-full rounded-3xl object-cover shadow-xl sm:mt-10 sm:h-72 sm:rounded-[2rem]" src={products[0][3]} alt="Doces coloridos" />
            <img className="h-52 w-full rounded-3xl object-cover shadow-xl sm:h-80 sm:rounded-[2rem]" src={products[1][3]} alt="Chocolate" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-white px-4 py-2.5 text-center shadow-xl sm:-bottom-5 sm:rounded-2xl sm:px-5 sm:py-3"><p className="text-[9px] font-bold text-[#3a2118]/50 sm:text-xs">PEDIDOS ONLINE</p><p className="text-sm font-black text-[#ed4d62] sm:text-base">Rápido • Fácil • Seguro</p></div>
          </div>
        </div>
      </section>

      <section id="categorias" className="px-4 py-12 sm:px-5 sm:py-20"><div className="mx-auto max-w-7xl"><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#ed4d62] sm:text-xs">Encontre seu favorito</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">Compre por categoria</h2><div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">{categories.map(([icon,name]) => <a href="#produtos" key={name} className="rounded-2xl border border-[#3a2118]/8 bg-white p-4 text-center shadow-sm sm:rounded-3xl sm:p-5"><div className="text-3xl sm:text-4xl">{icon}</div><p className="mt-2 text-sm font-black sm:mt-3 sm:text-base">{name}</p><p className="mt-1 text-[10px] font-medium text-[#3a2118]/45 sm:text-xs">Ver opções →</p></a>)}</div></div></section>

      <section id="produtos" className="bg-white px-4 py-12 sm:px-5 sm:py-20"><div className="mx-auto max-w-7xl"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#ed4d62] sm:text-xs">Vitrine online</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">Os queridinhos da semana</h2></div><div className="mt-5 flex w-full items-center gap-2 rounded-full border border-[#3a2118]/10 bg-[#fffaf3] px-4 py-3 sm:mt-7 sm:max-w-md"><Search className="h-5 w-5 shrink-0 text-[#3a2118]/40" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar produtos..." className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-[#3a2118]/35" /></div><div className="mt-7 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">{filtered.map(([name,category,price,image]) => <article key={name} className="overflow-hidden rounded-2xl border border-[#3a2118]/8 bg-[#fffaf3] shadow-sm sm:rounded-[1.7rem]"><div className="relative h-40 overflow-hidden bg-[#f5eadb] sm:h-64"><img src={image} alt={name} className="h-full w-full object-cover" /><span className="absolute left-2 top-2 rounded-full bg-white px-2 py-1 text-[8px] font-black sm:left-4 sm:top-4 sm:px-3 sm:text-xs">{category}</span></div><div className="p-3 sm:p-5"><p className="text-[8px] font-bold text-[#ed4d62] sm:text-xs">DISPONÍVEL ONLINE</p><h3 className="mt-1 text-sm font-black sm:text-xl">{name}</h3><div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-lg font-black sm:text-2xl">{price}</p><button onClick={() => setCart(cart + 1)} className="min-h-10 rounded-full bg-[#ed4d62] px-3 py-2 text-xs font-black text-white sm:px-5 sm:py-2.5 sm:text-sm">Adicionar</button></div></div></article>)}</div>{filtered.length === 0 && <p className="py-12 text-center font-bold text-[#3a2118]/50">Nenhum produto encontrado.</p>}</div></section>

      <section id="sobre" className="px-4 py-12 sm:px-5 sm:py-20"><div className="mx-auto grid max-w-7xl gap-3 sm:gap-8 lg:grid-cols-3"><InfoCard icon={<Truck />} title="Receba em casa" text="Escolha seus produtos, informe o endereço e receba seu pedido com praticidade." dark /><InfoCard icon={<Wallet />} title="Pagamento fácil" text="Pix, cartão ou outras condições podem ser apresentadas no checkout da loja." pink /><InfoCard icon={<Star />} title="Sua marca em destaque" text="Uma página própria pode funcionar como vitrine, catálogo e, se desejado, receber pedidos online." yellow /></div></section>

      <section id="contato" className="bg-[#3a2118] px-4 py-14 text-white sm:px-5 sm:py-16"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-center"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#ffd84d] sm:text-xs">Fale com a Doce Mania</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">Gostou? Imagine essa página com a sua marca.</h2><p className="mt-4 text-sm leading-6 text-white/65">Logo, cores, fotos, produtos, WhatsApp, Instagram, endereço e horários podem ocupar este espaço.</p><div className="mt-6 flex flex-wrap gap-2.5"><a href="#" className="rounded-full bg-[#25D366] px-5 py-3 text-sm font-black text-white">WhatsApp</a><a href="#" className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-black"><Instagram className="h-4 w-4" /> Instagram</a></div></div><div className="rounded-3xl bg-white/[.06] p-6"><div className="flex items-start gap-3"><MapPin className="mt-1 h-6 w-6 shrink-0 text-[#ffd84d]" /><div><p className="font-black">Visite nossa loja</p><p className="mt-1 text-sm text-white/55">Rua Exemplo, 123 • Seu bairro • Sua cidade</p><p className="mt-3 text-sm font-bold text-[#ffd84d]">Seg a Sáb • 08h às 20h</p></div></div><div className="mt-5 h-24 rounded-2xl bg-white/10 sm:h-32" /></div></div></section>

      <footer className="bg-[#fffaf3] px-4 py-7 text-[10px] leading-5 text-[#3a2118]/50 sm:px-5 sm:text-xs"><div className="mx-auto max-w-7xl"><p><strong>Aviso:</strong> esta é uma demonstração ilustrativa de uma possível página comercial.</p><p>Preços e condições de pagamento válidos exclusivamente para compras efetuadas no site podem diferir da loja física. As imagens dos produtos são meramente ilustrativas.</p><p>Todos os preços e condições comerciais estão sujeitos a alteração sem aviso prévio.</p><p className="mt-2">© 2026 Doce Mania — exemplo de apresentação comercial.</p></div></footer>
    </main>
  );
}

function InfoCard({ icon, title, text, dark, pink, yellow }: { icon: React.ReactNode; title: string; text: string; dark?: boolean; pink?: boolean; yellow?: boolean }) {
  const bg = dark ? "bg-[#3a2118] text-white" : pink ? "bg-[#ed4d62] text-white" : "bg-[#ffd84d] text-[#3a2118]";
  return <div className={`rounded-3xl p-6 sm:p-8 ${bg}`}><div className="h-7 w-7">{icon}</div><h3 className="mt-5 text-xl font-black sm:text-2xl">{title}</h3><p className={`mt-2 text-sm leading-6 ${dark || pink ? "text-white/65" : "text-[#3a2118]/65"}`}>{text}</p></div>;
}
