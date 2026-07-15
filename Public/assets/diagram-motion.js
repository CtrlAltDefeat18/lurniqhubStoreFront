function prepareTrace(elements, gsap) {
  elements.forEach((element) => {
    const length = Math.max(1, element.getTotalLength());
    gsap.set(element, { strokeDasharray: length, strokeDashoffset: length });
  });
}

export async function initDiagramMotion() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  gsap.registerPlugin(ScrollTrigger);

  document.documentElement.classList.add("motion-ready");
  const contexts = [];

  document.querySelectorAll("[data-scroll-heading]").forEach((heading) => {
    const section = heading.closest("section");
    if (!section) return;
    contexts.push(gsap.context(() => {
      const characters = gsap.utils.toArray("[data-copy-char]", heading);
      gsap.set(characters, { autoAlpha: 0, yPercent: 22 });
      const isRunway = section.classList.contains("reading-runway");
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: isRunway ? "top top" : "top 82%",
          end: isRunway ? "48% top" : "top 24%",
          scrub: 0.65,
        },
      }).to(characters, {
        autoAlpha: 1,
        yPercent: 0,
        stagger: 0.018,
        ease: "none",
      });
    }, heading));
  });

  const hero = document.querySelector(".hero");
  if (hero) {
    contexts.push(gsap.context(() => {
      const traces = gsap.utils.toArray(".hero-diagram [data-trace]", hero);
      const labels = gsap.utils.toArray(".hero-diagram [data-diagram-labels]", hero);
      prepareTrace(traces, gsap);
      gsap.set(labels, { autoAlpha: 0, y: 10 });
      gsap.timeline({
        scrollTrigger: { trigger: hero, start: "top top", end: "68% top", scrub: 0.8 },
      })
        .to(traces, { strokeDashoffset: 0, stagger: 0.018, ease: "none" }, 0)
        .to(labels, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.35 }, 0.55);
    }, hero));
  }

  const assembly = document.querySelector(".assembly");
  if (assembly) {
    contexts.push(gsap.context(() => {
      const figure = assembly.querySelector(".assembly-stage > .assembly-diagram");
      const traces = figure ? gsap.utils.toArray("[data-trace]", figure) : [];
      const solar = figure?.querySelector('[data-layer="solar"]');
      const mesh = figure?.querySelector('[data-layer="mesh"]');
      const content = figure?.querySelector('[data-layer="content"]');
      const labels = figure ? gsap.utils.toArray("[data-layer-label], [data-diagram-labels]", figure) : [];
      prepareTrace(traces, gsap);
      gsap.set(solar, { y: 155, autoAlpha: 0.22 });
      gsap.set(mesh, { y: 0, autoAlpha: 0.38 });
      gsap.set(content, { y: -160, autoAlpha: 0.22 });
      gsap.set(labels, { autoAlpha: 0 });
      gsap.timeline({
        scrollTrigger: { trigger: assembly, start: "top top", end: "62% top", scrub: 0.9 },
      })
        .to([solar, mesh, content], { y: 0, autoAlpha: 1, stagger: 0.06, ease: "none" }, 0)
        .to(traces, { strokeDashoffset: 0, stagger: 0.012, ease: "none" }, 0.08)
        .to(labels, { autoAlpha: 1, stagger: 0.05, duration: 0.25 }, 0.62);
    }, assembly));
  }

  const network = document.querySelector(".network");
  if (network) {
    contexts.push(gsap.context(() => {
      const edges = gsap.utils.toArray(".network-stage [data-edge]", network);
      const nodes = gsap.utils.toArray(".network-stage [data-node]", network);
      prepareTrace(edges, gsap);
      gsap.set(nodes, { autoAlpha: 0, scale: 0.7, transformOrigin: "center" });
      gsap.timeline({
        scrollTrigger: { trigger: network, start: "top top", end: "62% top", scrub: 0.85 },
      })
        .to(edges, { strokeDashoffset: 0, stagger: 0.035, ease: "none" }, 0)
        .to(nodes, { autoAlpha: 1, scale: 1, stagger: 0.05, duration: 0.35 }, 0.3);
    }, network));
  }

  ScrollTrigger.refresh();
  return () => {
    contexts.forEach((context) => context.revert());
    document.documentElement.classList.remove("motion-ready");
  };
}

initDiagramMotion();
