import { StarkePage } from "../page";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Atendimento",
  description:
    "Atendimento especializado para oficinas, lojistas, centros automotivos e proprietários. Identifique a peça certa, tire dúvidas e fale com um especialista Stärke Parts pelo WhatsApp ou Instagram.",
  path: "/atendimento",
});

export default function AtendimentoPage() {
  return <StarkePage initialSection="atendimento" />;
}
