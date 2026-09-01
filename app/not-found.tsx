import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "./seo";

export const metadata: Metadata = pageMetadata({
  title: "Página não encontrada",
  description:
    "A página que você procura não existe ou foi movida. Conheça a Stärke Parts e explore nossos produtos, montadoras, fabricantes e atendimento especializado.",
  path: "/404",
});

export default function NotFound() {
  return (
    <main id="topo" className="landing landing--404">
      <header className="masthead">
        <Link className="wordmark" href="/" aria-label="Stärke Parts, início">
          <img src="/starke-parts-logo.png" alt="" />
        </Link>
      </header>

      <section className="landing-hero landing-hero--404">
        <div className="landing-hero__photo" aria-hidden="true" />
        <div className="landing-hero__content">
          <p className="eyebrow eyebrow--light">ERRO 404 · PÁGINA NÃO ENCONTRADA</p>
          <h1 id="landing-title">
            Essa peça<br />não existe por aqui.<em />
          </h1>
          <p>
            A página que você procura foi movida ou não existe. Mas a Stärke Parts tem as peças
            certas para o seu veículo — conheça nossas soluções.
          </p>
          <div className="landing-hero__actions">
            <Link className="button button--yellow" href="/produtos">
              Ver produtos <span>→</span>
            </Link>
            <Link className="button button--ghost" href="/">
              Voltar ao início
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
