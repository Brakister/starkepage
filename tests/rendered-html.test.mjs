import assert from "node:assert/strict";
import test from "node:test";

test("renders every public route as an HTML document", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const routes = ["/", "/empresa", "/montadoras", "/produtos", "/fabricantes", "/unidades", "/logistica", "/atendimento", "/trabalhe-conosco"];

  for (const route of routes) {
    const response = await worker.fetch(
      new Request(`http://localhost${route}`, {
        headers: { accept: "text/html" },
      }),
      {
        ASSETS: {
          fetch: async () => new Response("Not found", { status: 404 }),
        },
      },
      {
        waitUntil() {},
        passThroughOnException() {},
      },
    );

    const html = await response.text();
    assert.equal(response.status, 200, route);
    const canonical = `https://starkeparts.com${route === "/" ? "/" : route}`;
    assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1, `${route} has one canonical URL`);
    assert.ok(html.includes(`href="${canonical}"`), `${route} has its own canonical URL`);
    if (route === "/") {
      assert.match(html, /class="hero"/, "Home keeps its introduction");
    } else if (route !== "/trabalhe-conosco") {
      assert.doesNotMatch(html, /class="hero"/, route + " opens without the home introduction");
      assert.match(html, /main--section/, route);
    }
    if (route === "/atendimento") {
      assert.match(html, /id="service-faq-toggle"/);
      assert.match(html, /aria-expanded="false"/);
      assert.equal((html.match(/class="faq-item"/g) ?? []).length, 0);
    }
    if (route === "/empresa") {
      assert.match(html, /company-overview/);
      assert.match(html, /unidade-sao-paulo.webp/);
    }
    if (route === "/unidades") {
      for (const city of ["São Paulo", "Sorocaba", "Campinas", "Santos"]) {
        assert.ok(html.includes('data-city="' + city + '"'), city);
      }
    }
    assert.match(
      response.headers.get("content-type") ?? "",
      /^text\/html\b/i,
      route,
    );
  }
});
