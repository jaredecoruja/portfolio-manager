CREATE TABLE public.itens (
  codigo integer PRIMARY KEY,
  descricao text NOT NULL,
  categoria text NOT NULL,
  ordem integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.itens TO anon, authenticated;
GRANT ALL ON public.itens TO service_role;
ALTER TABLE public.itens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Catalogo visivel para todos" ON public.itens FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.lancamentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  data date NOT NULL,
  status text NOT NULL DEFAULT 'pendente',
  enviado_em timestamptz,
  editado boolean NOT NULL DEFAULT false,
  erro text,
  linhas integer[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lancamentos TO anon, authenticated;
GRANT ALL ON public.lancamentos TO service_role;
ALTER TABLE public.lancamentos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lancamentos abertos" ON public.lancamentos FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.lancamento_itens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lancamento_id uuid NOT NULL REFERENCES public.lancamentos(id) ON DELETE CASCADE,
  codigo integer NOT NULL,
  quantidade numeric NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (lancamento_id, codigo)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lancamento_itens TO anon, authenticated;
GRANT ALL ON public.lancamento_itens TO service_role;
ALTER TABLE public.lancamento_itens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Itens de lancamento abertos" ON public.lancamento_itens FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.contagens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  data date NOT NULL,
  status text NOT NULL DEFAULT 'pendente',
  enviado_em timestamptz,
  editado boolean NOT NULL DEFAULT false,
  erro text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contagens TO anon, authenticated;
GRANT ALL ON public.contagens TO service_role;
ALTER TABLE public.contagens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Contagens abertas" ON public.contagens FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.contagem_itens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contagem_id uuid NOT NULL REFERENCES public.contagens(id) ON DELETE CASCADE,
  codigo integer NOT NULL,
  quantidade numeric NOT NULL,
  valor_planilha numeric NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (contagem_id, codigo)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contagem_itens TO anon, authenticated;
GRANT ALL ON public.contagem_itens TO service_role;
ALTER TABLE public.contagem_itens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Itens de contagem abertos" ON public.contagem_itens FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_lancamentos_updated_at BEFORE UPDATE ON public.lancamentos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_contagens_updated_at BEFORE UPDATE ON public.contagens
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.itens (codigo, descricao, categoria, ordem) VALUES
(1,'BRAHMA CHOPP 600ML','CERVEJA 600 ML',1),
(2,'BUDWEISER 600ML','CERVEJA 600 ML',2),
(3,'ORIGINAL 600ML','CERVEJA 600 ML',3),
(4,'AMSTEL LAGER 600 ML','CERVEJA 600 ML',4),
(5,'DEVASSA LAGER 600 ML','CERVEJA 600 ML',5),
(6,'HEINEKEN 600ML','CERVEJA 600 ML',6),
(7,'SPATEN 600ML','CERVEJA 600 ML',7),
(8,'STELLA 600ML','CERVEJA 600 ML',8),
(9,'CERVEJA BRAHMA LITRÃO','CERVEJA LITRO',9),
(10,'CERVEJA AMSTEL LITRÃO','CERVEJA LITRO',10),
(11,'CERVEJA BUDWEISER LITRÃO','CERVEJA LITRO',11),
(12,'CERVEJA DEVASSA LITRÃO','CERVEJA LITRO',12),
(13,'BRAHMA ZERO longneck','LONG NECKS',13),
(14,'BUDWEISER longneck','LONG NECKS',14),
(15,'BUDWEISER ZERO longneck','LONG NECKS',15),
(16,'CORONA longneck','LONG NECKS',16),
(17,'HEINEKEN longneck','LONG NECKS',17),
(18,'HEINEKEN ZERO longneck','LONG NECKS',18),
(19,'AMSTEL ULTRA longneck','LONG NECKS',19),
(20,'PRAYA longneck','LONG NECKS',20),
(21,'BEATS SENSE longneck','LONG NECKS',21),
(22,'SMIRNORF ICE longneck','LONG NECKS',22),
(23,'MONSTER ENERGY','ENERGETICO',23),
(24,'MONSTER ENERGY ZERO','ENERGETICO',24),
(25,'RED BULL TRADICIONAL','ENERGETICO',25),
(26,'RED BULL TROPICAL','ENERGETICO',26),
(27,'RED BULL MELANCIA','ENERGETICO',27),
(28,'REFRIGERANTE ANTÁRTICA 350ML','REFRIGERANTE',28),
(29,'FYS GUARANÁ','REFRIGERANTE',29),
(30,'FYS GUARANÁ ZERO','REFRIGERANTE',30),
(31,'FYS LIMÃO SICILIANO','REFRIGERANTE',31),
(32,'FYS LIMÃO SICILIANO ZERO','REFRIGERANTE',32),
(33,'FYS LARANJA-PERA','REFRIGERANTE',33),
(34,'COCA COLA (KS)','REFRIGERANTE',34),
(35,'COCA COLA (KS) ZERO','REFRIGERANTE',35),
(36,'FANTA (KS)','REFRIGERANTE',36),
(37,'SPRITE (Ks)','REFRIGERANTE',37),
(38,'SCHWEPPES','REFRIGERANTE',38),
(39,'AGUA MINERAL COM GAS','ÁGUAS',39),
(40,'AGUA MINERAL SEM GAS','ÁGUAS',40),
(41,'AGUA TONICA','ÁGUAS',41),
(42,'H2O','ÁGUAS',42),
(43,'LIMONETO','ÁGUAS',43),
(44,'ABSOLUT 1L','DESTILADOS',44),
(45,'ORLOF 1L','DESTILADOS',45),
(46,'SMIRNORF LITRO 998ML','DESTILADOS',46),
(47,'BOLVANA 965ML','DESTILADOS',47),
(48,'PITU 965ML','DESTILADOS',48),
(49,'PITU GOLD 1L','DESTILADOS',49),
(50,'CONHAQUE SÃO JOÃO DA BARRA (ALCATRÃO).','DESTILADOS',50),
(51,'BACARDI 1L','DESTILADOS',51),
(52,'DRINK CAMPARI 998ML','DESTILADOS',52),
(53,'LICOR DE MENTA 720ML','DESTILADOS',53),
(54,'AMARULLA 1L','DESTILADOS',54),
(55,'BALLENA CREME DE MORANGO','DESTILADOS',55),
(56,'BANANAZINHA 900ML','DESTILADOS',56),
(57,'SANGUE DE PUTTA 1L','DESTILADOS',57),
(58,'GIN BEEFEATER 750ML','DESTILADOS',58),
(59,'GIN GORDOONS 750ML','DESTILADOS',59),
(60,'GIN TANQERAY 750ML','DESTILADOS',60),
(61,'GIN ORKAAN 965ML','DESTILADOS',61),
(62,'MARTIN BIANCO 750ML','DESTILADOS',62),
(63,'MARTIN ROSE 750ML','DESTILADOS',63),
(64,'TEQUILA EL JIMADOR 750ML','DESTILADOS',64),
(65,'TEQUILA JOSE CUERVO 750ML','DESTILADOS',65),
(66,'PERGOLA','VINHOS',66),
(67,'QUINTA DO MORGADO','VINHOS',67),
(68,'RESERVADO','VINHOS',68),
(69,'CHOPP DE VINHO 300 ML','VINHOS',69),
(70,'CHOPP DE VINHO 500 ML','VINHOS',70),
(71,'CHANDON','ESPUMANTES',71),
(72,'SALTON','ESPUMANTES',72),
(73,'ESPULMANTE ANIVERSARIO','ESPUMANTES',73),
(74,'BALLATINER´S','WHISKY',74),
(75,'BLACK WHITE 1L','WHISKY',75),
(76,'BLACK WHITE 700ML','WHISKY',76),
(77,'BLACK LABEL','WHISKY',77),
(78,'RED LEBEL 1L','WHISKY',78),
(79,'RED LEBEL 750ML','WHISKY',79),
(80,'CHIVAS','WHISKY',80),
(81,'OLD PAR 1L','WHISKY',81),
(82,'WHITE HORSE','WHISKY',82);