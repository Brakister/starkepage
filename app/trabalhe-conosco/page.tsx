import { pageMetadata } from "../seo";
import CareersPageContent from "./CareersPageContent";

export const metadata = pageMetadata({
  title: "Trabalhe conosco",
  description: "Envie seu currículo para a equipe de RH da Stärke Parts.",
  path: "/trabalhe-conosco",
});

export default function CareersPage() {
  return <CareersPageContent />;
}
