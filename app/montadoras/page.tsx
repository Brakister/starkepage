import { StarkePage } from "../page";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Montadoras",
  description:
    "Aplicações especializadas para veículos importados, premium e superesportivos: Porsche, BMW, Mercedes-Benz, Audi, Land Rover, Volvo, Jaguar, MINI, Ferrari e Lamborghini. Peças exatas para cada montadora.",
  path: "/montadoras",
});

export default function MontadorasPage() {
  return <StarkePage initialSection="aplicacoes" />;
}
