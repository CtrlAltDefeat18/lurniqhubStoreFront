import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete storefront and three accessible diagrams", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Training built/);
  assert.match(html, /The Paradox/);
  assert.match(html, /Toli Senior Secondary School/);
  assert.match(html, /DEDEAT symposium/);
  assert.match(html, /Aphelele Mjobo/);
  assert.match(html, /id="contact"/);
  assert.equal((html.match(/<svg\b/g) ?? []).length, 3);
  assert.match(html, /data-scroll-heading/);
  assert.match(html, /data-copy-char/);
  assert.match(html, /Explore the modular architecture/);
  assert.match(html, /Annotated nautical observation instrument/);
  assert.match(html, /Exploded diagram of the LurniqHub rugged Raspberry Pi field unit/);
  assert.match(html, /LurniqHub Pi-1 through Pi-10 mesh topology/);
  assert.doesNotMatch(html, /<canvas\b|codex-preview|react-loading-skeleton/i);
});

test("removes WebGL and scopes each SVG timeline to its own section", async () => {
  const [layout, page, styles, motion] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/storefront-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../public/assets/diagram-motion.js", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(layout, /three@|three\/addons/i);
  assert.doesNotMatch(`${page}\n${styles}\n${motion}`, /WebGLRenderer|morphTarget|mix-blend-mode/i);
  assert.match(layout, /gsap@3\.13\.0\/index\.js/);
  assert.match(layout, /gsap@3\.13\.0\/ScrollTrigger\.js/);
  assert.ok((motion.match(/gsap\.timeline\(/g) ?? []).length >= 4);
  assert.match(motion, /trigger: hero/);
  assert.match(motion, /trigger: assembly/);
  assert.match(motion, /trigger: network/);
  assert.match(motion, /prefers-reduced-motion: reduce/);
  assert.match(motion, /data-scroll-heading/);
  assert.match(motion, /data-copy-char/);
  assert.match(motion, /scrub: 0\.65/);
  assert.match(page, /data-layer="solar"/);
  assert.match(page, /data-layer="mesh"/);
  assert.match(page, /data-layer="content"/);
  assert.match(page, /AssemblyExplorer/);
  const explorer = await readFile(new URL("../app/assembly-explorer.tsx", import.meta.url), "utf8");
  assert.match(explorer, /aria-modal="true"/);
  assert.match(explorer, /role="tablist"/);
  await assert.rejects(access(new URL("../public/assets/hull-base.glb", import.meta.url)));
  await assert.rejects(access(new URL("../public/assets/hero-scene.js", import.meta.url)));
});

test("renders the named Pi-1 through Pi-10 topology with a compact local payload", async () => {
  const page = await readFile(new URL("../app/storefront-client.tsx", import.meta.url), "utf8");
  for (let index = 1; index <= 10; index += 1) assert.match(page, new RegExp(`Pi-${index}`));
  assert.match(page, /role: "Controller"/);
  assert.match(page, /role: "Router"/);
  assert.match(page, /role: "End Node"/);

  const assetsDir = new URL("../dist/client/assets/", import.meta.url);
  const files = await readdir(assetsDir);
  let localPayload = (await stat(new URL("../public/assets/diagram-motion.js", import.meta.url))).size;
  for (const file of files.filter((name) => /\.(js|css)$/.test(name))) {
    localPayload += (await stat(new URL(file, assetsDir))).size;
  }
  assert.ok(localPayload < 600_000, `Local payload was ${localPayload} bytes`);
});
