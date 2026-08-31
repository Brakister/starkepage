import { StarkePage } from "../page";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Fabricantes",
  description:
    "Marcas globais selecionadas e procedência garantida: febi, SWAG, TRW, LEMFÖRDER, SACHS, Brembo, Textar, Hengst, MAHLE, UFI, Bosch, HELLA, Delphi, Continental, Pierburg e a marca própria Forschen.",
  path: "/fabricantes",
});

export default function FabricantesPage() {
  return <StarkePage initialSection="fabricantes" />;
}
