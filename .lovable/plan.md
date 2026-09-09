# Bebidas Leo Chopp

App de controle de retiradas e contagem de bebidas, com envio automático para a planilha de estoque.

## Tela inicial

Apenas dois botões grandes, em português, prontos para uso no celular:
- **RETIRADAS** — lançar saídas de produtos
- **CONTAGEM** — registrar a contagem física por item

Dentro de **RETIRADAS**: botão **RELATÓRIO** no canto superior direito e **ADM** no canto inferior esquerdo.

## Catálogo (usado em RETIRADAS e LANÇAR CONTAGEM)

- Os 82 itens (códigos 1 a 82) lidos da planilha, agrupados em categorias que abrem e fecham: Cerveja 600ml, Cerveja litro, Long necks, Energético, Refrigerante, Águas, Destilados, Vinhos, Espumantes, Whisky.
- Cada item tem botões **−/+** e campo de quantidade digitável.
- Um seletor de **data** no topo (padrão: hoje).
- Contador de itens selecionados e botão de confirmar/enviar.
- Categorias mostram quantos itens já têm quantidade lançada.

## Retiradas → planilha

Ao confirmar, cada item com quantidade maior que zero gera **uma linha** na aba `CONTROLE ENT|SAI 2025`, começando na primeira linha vazia, seguindo o padrão atual da planilha:

| A | C | D | E | G |
|---|---|---|---|---|
| código | data (dd/mm/aa) | SAÍDA | BAR | quantidade |

**Não escreve nas colunas B e F** — essas ficam exatamente como estão na planilha (escrita em duas faixas: A:E e G).

Se o envio à planilha falhar, o lançamento fica salvo no app marcado como "não enviado" e pode ser reenviado.

## Contagem

- Ao abrir, mostra a **contagem atual** como espelho da aba `ALMOXARIFADO`: descrição (coluna B) e estoque disponível (coluna H), somente leitura, com busca e agrupamento por categoria.
- No canto superior direito, botão **LANÇAR CONTAGEM**, que abre uma lista igual à de Retiradas (categorias expansíveis, −/+, quantidade digitável).
- Ao confirmar, a quantidade contada de cada item é gravada na **coluna I** da linha correspondente do item na aba `ALMOXARIFADO`; nenhuma outra coluna é alterada.
- O espelho é recarregado após o lançamento.

## Relatório

- Lista de lançamentos por data, do mais recente para o mais antigo.
- Abrir um lançamento mostra os itens e quantidades.
- **Editar**: mudar quantidades, adicionar ou remover itens; ao salvar, o lançamento é marcado como **editado / pendente de reenvio** (sinalização visível).
- **Reenviar**: apaga as linhas antigas na planilha e grava as novas.
- Abas separadas para Retiradas e Contagens lançadas.

## ADM

- Entrada com senha **0000**.
- Excluir lançamentos e contagens; excluir um lançamento também **remove as linhas correspondentes da planilha**.
- Mostra situação do envio de cada registro.

## Detalhes técnicos

- Lovable Cloud para guardar lançamentos, itens e contagens (tabelas `lancamentos`, `lancamento_itens`, `contagens`), com RLS e grants.
- Catálogo dos 82 itens semeado por migração (código, descrição, categoria), a partir da aba ALMOXARIFADO.
- Conexão Google Sheets do workspace ligada ao projeto; toda a leitura/escrita da planilha ocorre em server functions do TanStack Start (busca a próxima linha vazia e escreve as faixas A:E e G na aba de saídas; lê B/H e escreve I na aba ALMOXARIFADO), nunca no navegador.
- Exclusão na planilha: as linhas gravadas guardam seu número; a remoção limpa essas linhas via `batchUpdate` (deleteDimension) para não deixar buracos.
- Interface mobile-first em português, tema escuro com dourado de chopp, tokens no design system.
