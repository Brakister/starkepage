import { StarkePage } from "../page";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "A Empresa",
  description:
    "Desde 2016, a Stärke Parts é distribuidora especializada em autopeças premium para veículos importados e de alta performance. Conheça nossa história, estrutura, operações e valores.",
  path: "/empresa",
});

export default function EmpresaPage() {
  return <StarkePage initialSection="institucional" />;
}
