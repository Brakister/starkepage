import { StarkePage } from "../page";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Produtos",
  description:
    "Portfólio premium de autopeças: freios, suspensão, amortecedores, filtragem, componentes de motor e sistemas técnicos. Linhas de fabricantes globais como Brembo, Textar, Bosch, TRW, febi, MAHLE e mais.",
  path: "/produtos",
});

export default function ProdutosPage() {
  return <StarkePage initialSection="produtos" />;
}
