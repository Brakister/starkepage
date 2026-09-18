import { StarkePage } from "../page";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Unidades",
  description: "Conheça a matriz e as unidades da Stärke Parts em São Paulo, Sorocaba, Campinas e Santos.",
  path: "/unidades",
});

export default function UnidadesPage() {
  return <StarkePage initialSection="estrutura" />;
}
