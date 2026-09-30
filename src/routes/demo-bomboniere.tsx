import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, Instagram, MapPin, Menu, Search, ShoppingBag, Star, Truck, Wallet, X } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/demo-bomboniere")({
  head: () => ({
    meta: [
      { title: "Doce Mania — Exemplo de página para bomboniere" },
      { name: "description", content: "Demonstração ilustrativa de uma vitrine digital e loja online para bomboniere." },
    ],
  }),
  component: BomboniereDemo,
});

const categories = [
  ["🍬", "Balas & Doces"], ["🍫", "Chocolates"], ["🥤", "Bebidas"], ["🥔", "Salgadinhos"], ["🍪", "Biscoitos"], ["🎁", "Kits & Presentes"],
];

const products = [
  { name: "Fini Tubes Morango", category: "Balas & Doces", price: "R$ 8,90", image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=700&q=85" },
  { name: "Chocolate Crocante", category: "Chocolates", price: "R$ 6,50", image: "https://images.unsplash.com/photo-1575377222312-dd1a5d2d4e5d?auto=format&fit=crop&w=700&q=85" },
  { name: "Refrigerante Lata", category: "Bebidas", price: "R$ 5,00", image: "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=700&q=85" },
  { name: "Batata Chips", category: "Salgadinhos", price: "R$ 9,90", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=700&q=85" },
  { name: "Cookie Recheado", category: "Biscoitos", price: "R$ 7,90", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=700&q=85" },
  { name: "Kit Festa", category: "Kits & Presentes", price: "R$ 39,90", image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=700&q=85" },
];

function BomboniereDemo() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(0);
  const filtered = products.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#3a2118]">
      <div className="bg-[#3a2118] px-4 py-2 text-center text-xs font-medium text-white/90">🎉 Entrega grátis em pedidos acima de R$ 80 • Peça online e receba em casa</div>
      <header className="sticky top-0 z-50 border-b border-[#3a2118]/10 bg-[#fffaf3]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-4">
          <a href="/#planos" className="flex items-center gap-2 text-sm font-bold text-[#3a2118]/65"><ArrowLeft className="h-4 w-4" /> JaredeDigital</a>
          <div className="hidden h-7 w-px bg-[#3a2118]/10 md:block" />
          <a href="#top" className="text-xl font-black tracking-tight text-[#ed4d62]">Doce<span className="text-[#ffb400]">Mania</span> 🍭</a>
          <nav className="ml-auto hidden items-center gap-6 text-sm font-bold md:flex"><a href="#produtos">Produtos</a><a href="#categorias">Categorias</a><a href="#sobre">Sobre</a><a href="#contato">Contato</a></nav>
          <button onClick={() => setMenu(!menu)} className="ml-auto rounded-full p-2 md:hidden">{menu ? <X /> : <Menu />}</button>
          <div className="relative hidden rounded-full bg-white p-2 shadow-sm sm:block"><ShoppingBag className="h-5 w-5" /><span className="absolute -right-1 -top-1 rounded-full bg-[#ed4d62] px-1.5 text-[10px] font-bold text-white">{cart}</span></div>
        </div>
        {menu && <nav className="flex flex-col gap-4 border-t border-[#3a2118]/10 px-5 py-4 text-sm font-bold md:hidden"><a href="#produtos">Produtos</a><a href="#categorias">Categorias</a><a href="#sobre">Sobre</a><a href="#contato">Contato</a></nav>}
      </header>

      <section id="top" className="relative overflow-hidden bg-gradient-to-br from-[#ffd84d] via-[#ffbd3f] to-[#ff806c] px-5 py-14 sm:py-20">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/20 blur-2xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative z-10">
            <span className="inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-wider text-[#ed4d62]">Aquele sabor que alegra o dia ✨</span>
            <h1 className="mt-5 max-w-2xl text-5xl font-black leading-[.92] tracking-tight sm:text-7xl">Tudo que você ama em um só lugar.</h1>
            <p className="mt-6 max-w-xl text-lg font-medium leading-7 text-[#3a2118]/75">Balas, chocolates, salgadinhos, bebidas e aquele docinho que transforma qualquer momento.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#produtos" className="rounded-full bg-[#ed4d62] px-7 py-4 font-black text-white shadow-lg shadow-[#ed4d62]/20 transition-transform hover:-translate-y-1">Ver produtos <ArrowRight className="ml-1 inline h-4 w-4" /></a><a href="#categorias" className="rounded-full bg-white/80 px-7 py-4 font-black">Explorar categorias</a></div>
            <div className="mt-8 flex items-center gap-5 text-sm font-bold"><span>⭐ 4,9/5</span><span>•</span><span>+2 mil clientes</span><span>•</span><span>Entrega local</span></div>
          </div>
          <div className="relative grid grid-cols-2 gap-4">
            <img className="mt-10 h-56 w-full rounded-[2rem] object-cover shadow-xl sm:h-72" src="https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=900&q=85" alt="Doces coloridos" />
            <img className="h-64 w-full rounded-[2rem] object-cover shadow-xl sm:h-80" src="https://images.unsplash.com/photo-1575377222312-dd1a5d2d4e5d?auto=format&fit=crop&w=900&q=85" alt="Chocolate" />
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-2xl bg-white px-5 py-3 text-center shadow-xl"><p className="text-xs font-bold text-[#3a2118]/50">PEDIDOS ONLINE</p><p className="font-black text-[#ed4d62]">Rápido • Fácil • Seguro</p></div>
          </div>
        </div>
      </section>

      <section id="categorias" className="px-5 py-14 sm:py-20"><div className="mx-auto max-w-7xl"><div className="flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-[.18em] text-[#ed4d62]">Encontre seu favorito</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">Compre por categoria</h2></div><span className="hidden text-sm font-bold text-[#3a2118]/45 sm:block">Tudo organizado para você encontrar rápido.</span></div><div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{categories.map(([icon, name]) => <a href="#produtos" key={name} className="group rounded-3xl border border-[#3a2118]/8 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"><div className="text-4xl transition-transform group-hover:scale-110">{icon}</div><p className="mt-3 font-black">{name}</p><p className="mt-1 text-xs font-medium text-[#3a2118]/45">Ver opções <ChevronRight className="inline h-3 w-3" /></p></a>)}</div></div></section>

      <section id="produtos" className="bg-white px-5 py-14 sm:py-20"><div className="mx-auto max-w-7xl"><div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-black uppercase tracking-[.18em] text-[#ed4d62]">Vitrine online</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">Os queridinhos da semana</h2></div><div className="flex w-full max-w-md items-center gap-2 rounded-full border border-[#3a2118]/10 bg-[#fffaf3] px-4 py-3"><Search className="h-5 w-5 text-[#3a2118]/40" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar balas, chocolates, bebidas..." className="w-full bg-transparent text-sm outline-none placeholder:text-[#3a2118]/35" /></div></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((product) => <article key={product.name} className="group overflow-hidden rounded-[1.7rem] border border-[#3a2118]/8 bg-[#fffaf3] transition-all hover:-translate-y-1 hover:shadow-xl"><div className="relative h-64 overflow-hidden bg-[#f5eadb]"><img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-black">{product.category}</span></div><div className="p-5"><p className="text-xs font-bold text-[#ed4d62]">DISPONÍVEL ONLINE</p><h3 className="mt-1 text-xl font-black">{product.name}</h3><div className="mt-4 flex items-end justify-between gap-3"><p className="text-2xl font-black">{product.price}</p><button onClick={() => setCart(cart + 1)} className="rounded-full bg-[#ed4d62] px-5 py-2.5 text-sm font-black text-white transition-transform hover:scale-105">Adicionar</button></div></div></article>)}</div>{filtered.length === 0 && <p className="py-12 text-center font-bold text-[#3a2118]/50">Nenhum produto encontrado. Tente outra busca.</p>}</div></section>

      <section id="sobre" className="px-5 py-14 sm:py-20"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3"><div className="rounded-[2rem] bg-[#3a2118] p-8 text-white"><Truck className="h-8 w-8 text-[#ffd84d]" /><h3 className="mt-6 text-2xl font-black">Receba em casa</h3><p className="mt-3 text-sm leading-6 text-white/65">Escolha seus produtos, informe o endereço e receba seu pedido com praticidade.</p></div><div className="rounded-[2rem] bg-[#ed4d62] p-8 text-white"><Wallet className="h-8 w-8 text-[#ffd84d]" /><h3 className="mt-6 text-2xl font-black">Pagamento fácil</h3><p className="mt-3 text-sm leading-6 text-white/75">Pix, cartão ou outras condições podem ser apresentadas no checkout da loja.</p></div><div className="rounded-[2rem] bg-[#ffd84d] p-8"><Star className="h-8 w-8 text-[#ed4d62]" /><h3 className="mt-6 text-2xl font-black">Sua marca em destaque</h3><p className="mt-3 text-sm leading-6 text-[#3a2118]/65">Uma página própria pode funcionar como vitrine, catálogo e, se desejado, receber pedidos online.</p></div></div></section>

      <section id="contato" className="bg-[#3a2118] px-5 py-16 text-white"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center"><div><p className="text-xs font-black uppercase tracking-[.18em] text-[#ffd84d]">Fale com a Doce Mania</p><h2 className="mt-3 text-4xl font-black">Gostou? Imagine essa página com a sua marca.</h2><p className="mt-5 max-w-xl text-white/65">Logo, cores, fotos, produtos, WhatsApp, Instagram, endereço, horários e todos os detalhes da sua empresa podem ocupar este espaço.</p><div className="mt-7 flex flex-wrap gap-3"><a href="https://wa.me/5500000000000" className="rounded-full bg-[#25D366] px-6 py-3 font-black text-white">WhatsApp</a><a href="#" className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-black"><Instagram className="h-4 w-4" /> Instagram</a></div></div><div className="rounded-[2rem] bg-white/[.06] p-7"><div className="flex items-start gap-4"><MapPin className="mt-1 h-6 w-6 text-[#ffd84d]" /><div><p className="font-black">Visite nossa loja</p><p className="mt-1 text-sm text-white/55">Rua Exemplo, 123 • Seu bairro • Sua cidade</p><p className="mt-3 text-sm font-bold text-[#ffd84d]">Seg a Sáb • 08h às 20h</p></div></div><div className="mt-6 h-32 rounded-2xl bg-white/10" /></div></div></section>

      <footer className="bg-[#fffaf3] px-5 py-8 text-xs leading-5 text-[#3a2118]/50"><div className="mx-auto max-w-7xl"><p><strong>Aviso:</strong> esta é uma demonstração ilustrativa de uma possível página comercial.</p><p>Preços e condições de pagamento válidos exclusivamente para compras efetuadas no site podem diferir da loja física. As imagens dos produtos são meramente ilustrativas.</p><p>Todos os preços e condições comerciais estão sujeitos a alteração sem aviso prévio.</p><p className="mt-3">© 2026 Doce Mania — exemplo de apresentação comercial.</p></div></footer>
    </main>
  );
}
