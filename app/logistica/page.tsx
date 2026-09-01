import { StarkePage } from "../page";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Logística",
  description:
    "Logística capilarizada e expedição para todo o Brasil. Estrutura em São Paulo, Sorocaba, Campinas e Santos com rastreio seguro e entrega ágil de autopeças premium.",
  path: "/logistica",
});

export default function LogisticaPage() {
  return <StarkePage initialSection="logistica" />;
}
