import AssemblyExplorer from "./assembly-explorer";

const strokeProps = {
  vectorEffect: "non-scaling-stroke" as const,
  "data-trace": "",
};

type ScrollHeadingProps = {
  id: string;
  level: 1 | 2;
  lines: Array<{ text: string; accent?: string }>;
};

function ScrollHeading({ id, level, lines }: ScrollHeadingProps) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <Heading id={id} data-scroll-heading="" aria-label={lines.map((line) => line.text).join(" ")}>
      {lines.map((line) => {
        const accentStart = line.accent ? line.text.indexOf(line.accent) : -1;
        const accentEnd = accentStart + (line.accent?.length ?? 0);
        return (
          <span className="scroll-heading-line" aria-hidden="true" key={line.text}>
            {Array.from(line.text).map((character, index) => (
              <span
                className={index >= accentStart && index < accentEnd ? "scroll-heading-char accent-char" : "scroll-heading-char"}
                data-copy-char=""
                key={`${character}-${index}`}
              >
                {character === " " ? "\u00a0" : character}
              </span>
            ))}
          </span>
        );
      })}
    </Heading>
  );
}

function HeroInstrument() {
  return (
    <figure className="diagram-frame hero-diagram">
      <svg
        viewBox="0 0 760 860"
        role="img"
        aria-labelledby="instrument-title instrument-desc"
      >
        <title id="instrument-title">Annotated nautical observation instrument</title>
        <desc id="instrument-desc">
          A patent-poster drawing of a sextant-like navigation instrument with a
          graduated arc, index arm, sight vane, horizon mirror and reference labels.
        </desc>
        <g className="patent-grid" aria-hidden="true">
          <path d="M40 80H720M40 170H720M40 260H720M40 350H720M40 440H720M40 530H720M40 620H720" />
          <path d="M130 40V700M220 40V700M310 40V700M400 40V700M490 40V700M580 40V700M670 40V700" />
        </g>
        <g className="technical-lines">
          <path {...strokeProps} d="M184 541A258 258 0 0 1 560 168" />
          <path {...strokeProps} d="M205 525A232 232 0 0 1 545 188" />
          <path {...strokeProps} d="M226 509A205 205 0 0 1 527 209" />
          <path {...strokeProps} d="M184 541L560 168L406 523Z" />
          <path {...strokeProps} d="M406 523L370 330L560 168" />
          <path {...strokeProps} d="M370 330L255 240" />
          <path {...strokeProps} d="M255 240L282 205L397 295L370 330Z" />
          <path {...strokeProps} d="M397 295L423 260L580 382L554 416Z" />
          <path {...strokeProps} d="M554 416L580 382L612 407L586 440Z" />
          <circle {...strokeProps} cx="406" cy="523" r="22" />
          <circle {...strokeProps} cx="406" cy="523" r="8" />
          <circle {...strokeProps} cx="370" cy="330" r="12" />
          <rect {...strokeProps} x="344" y="294" width="52" height="70" rx="3" />
          <path {...strokeProps} d="M352 305L388 352M388 305L352 352" />
          <path {...strokeProps} d="M184 541L162 574L188 588L214 550" />
          <path {...strokeProps} d="M406 523L417 594L444 594L432 514" />
          <path {...strokeProps} d="M238 493L248 503M266 456L276 466M302 415L312 425M342 377L352 387M459 261L469 271M501 221L511 231" />
          <path {...strokeProps} d="M189 568L232 585L221 614L178 596Z" />
          <path {...strokeProps} d="M417 594H444V632H417Z" />
          <path {...strokeProps} d="M274 224L234 193M580 382L635 336M370 330L148 315M406 523L604 550M205 525L120 600" />
          <path {...strokeProps} d="M234 193H116M635 336H704M148 315H62M604 550H710M120 600H54" />
        </g>
        <g className="diagram-labels" data-diagram-labels="">
          <text x="66" y="186"><tspan>01</tspan> SIGHT VANE</text>
          <text x="638" y="329"><tspan>02</tspan> TELESCOPE</text>
          <text x="66" y="306"><tspan>03</tspan> HORIZON MIRROR</text>
          <text x="610" y="542"><tspan>04</tspan> INDEX ARM</text>
          <text x="58" y="593"><tspan>05</tspan> GRADUATED ARC</text>
          <text x="380" y="154" className="figure-label">FIG. 01</text>
        </g>
        <g className="title-block" data-diagram-labels="">
          <rect x="40" y="728" width="680" height="94" />
          <path d="M520 728V822M622 728V822M40 776H720" />
          <text x="58" y="760" className="block-title">NAUTICAL OBSERVATION APPARATUS</text>
          <text x="58" y="800">LURNIQHUB TECHNICAL SERIES / GRIT</text>
          <text x="540" y="760">PLATE</text>
          <text x="540" y="800">LH-01</text>
          <text x="640" y="760">REV.</text>
          <text x="640" y="800">02</text>
        </g>
      </svg>
    </figure>
  );
}

function AssemblyDiagram({ idSuffix = "" }: { idSuffix?: string }) {
  const titleId = `assembly-figure-title${idSuffix}`;
  const descId = `assembly-figure-desc${idSuffix}`;
  return (
    <figure className="diagram-frame assembly-diagram">
      <svg viewBox="0 0 820 650" role="img" aria-labelledby={`${titleId} ${descId}`}>
        <title id={titleId}>Exploded diagram of the LurniqHub rugged Raspberry Pi field unit</title>
        <desc id={descId}>
          Three separated layers show the solar and battery module, the Raspberry
          Pi compute and mesh radio board, and the rugged case with onboard
          storage, aligned along a central assembly axis.
        </desc>
        <g className="assembly-axis" aria-hidden="true">
          <path d="M410 80V574" />
          <path d="M399 96L410 80L421 96M399 558L410 574L421 558" />
        </g>

        {/* 01 — SOLAR + BATTERY */}
        <g className="exploded-layer layer-solar" data-layer="solar">
          <rect x="240" y="55" width="340" height="100" fill="transparent" />
          <path {...strokeProps} d="M250 90H570V145H250Z" />
          <path {...strokeProps} d="M270 98V137M310 98V137M350 98V137M390 98V137M430 98V137M470 98V137M510 98V137M550 98V137" />
          <path {...strokeProps} d="M257 112H273V134H257Z M265 112V98" />
          <path {...strokeProps} d="M468 105H563V137H468Z M505 100H525V105H525Z" />
          <circle {...strokeProps} cx="262" cy="100" r="3.5" />
          <circle {...strokeProps} cx="558" cy="100" r="3.5" />
          <circle {...strokeProps} cx="262" cy="135" r="3.5" />
          <circle {...strokeProps} cx="558" cy="135" r="3.5" />
          <text x="472" y="126" fontSize="9">+</text>
          <text x="548" y="126" fontSize="9">−</text>
          <path {...strokeProps} d="M250 98L154 68H74" />
          <path {...strokeProps} d="M570 98L642 68H752" />
          <g data-layer-label="">
            <text x="74" y="58"><tspan>01</tspan> SOLAR + BATTERY MODULE</text>
            <text x="642" y="58">12V / RESILIENT INPUT</text>
          </g>
        </g>

        {/* 02 — RASPBERRY PI COMPUTE + RADIO */}
        <g className="exploded-layer layer-mesh" data-layer="mesh">
          <rect x="220" y="235" width="380" height="95" fill="transparent" />
          <path {...strokeProps} d="M230 255H590V320H230Z" />
          <path {...strokeProps} d="M370 270H450V315H370Z" />
          <path {...strokeProps} d="M378 258V270M392 258V270M406 258V270M420 258V270M434 258V270M448 258V270" />
          <path {...strokeProps} d="M245 255V246M256 255V246M267 255V246M278 255V246M289 255V246M300 255V246M311 255V246M322 255V246M333 255V246M344 255V246" />
          <path {...strokeProps} d="M590 275H604V289H590Z" />
          <path {...strokeProps} d="M590 296H604V310H590Z" />
          <circle {...strokeProps} cx="240" cy="263" r="4" />
          <circle {...strokeProps} cx="580" cy="263" r="4" />
          <circle {...strokeProps} cx="240" cy="312" r="4" />
          <circle {...strokeProps} cx="580" cy="312" r="4" />
          <path {...strokeProps} d="M235 250A15 15 0 0 1 265 250" />
          <path {...strokeProps} d="M240 250A10 10 0 0 1 260 250" />
          <path {...strokeProps} d="M230 270L135 235H62" />
          <path {...strokeProps} d="M590 270L655 235H760" />
          <g data-layer-label="">
            <text x="62" y="225"><tspan>02</tspan> RASPBERRY PI COMPUTE</text>
            <text x="655" y="225">MESH RADIO / ROUTING</text>
          </g>
        </g>

        {/* 03 — RUGGED CASE + STORAGE */}
        <g className="exploded-layer layer-content" data-layer="content">
          <rect x="260" y="410" width="300" height="100" fill="transparent" />
          <path {...strokeProps} d="M290 430H530L550 452V480L530 500H290L270 480V452Z" />
          <path {...strokeProps} d="M340 438V446M360 438V446M380 438V446M400 438V446M420 438V446M440 438V446M460 438V446" />
          <path {...strokeProps} d="M300 480H330V492H300Z" />
          <path {...strokeProps} d="M480 480H510V492H480Z" />
          <path {...strokeProps} d="M390 460H422V480H398L390 472Z" />
          <circle {...strokeProps} cx="296" cy="436" r="4" />
          <circle {...strokeProps} cx="524" cy="436" r="4" />
          <circle {...strokeProps} cx="296" cy="494" r="4" />
          <circle {...strokeProps} cx="524" cy="494" r="4" />
          <path {...strokeProps} d="M270 452L160 415H70" />
          <path {...strokeProps} d="M550 452L640 415H752" />
          <g data-layer-label="">
            <text x="70" y="405"><tspan>03</tspan> RUGGED CASE + STORAGE</text>
            <text x="640" y="405">SD/SSD — OFFLINE CONTENT</text>
          </g>
        </g>

        <g className="title-block assembly-title-block" data-diagram-labels="">
          <rect x="54" y="592" width="712" height="42" />
          <text x="70" y="618" className="block-title">RUGGED FIELD UNIT — EXPLODED ASSEMBLY / LH-02</text>
          <text x="628" y="618">FIG. 02 / REV. 03</text>
        </g>
      </svg>
    </figure>
  );
}

const nodes = [
  { id: "Pi-1", role: "Controller", x: 400, y: 94, className: "controller" },
  { id: "Pi-2", role: "Router", x: 245, y: 235, className: "router" },
  { id: "Pi-3", role: "Router", x: 555, y: 235, className: "router" },
  { id: "Pi-4", role: "End Node", x: 105, y: 410, className: "end-node" },
  { id: "Pi-5", role: "End Node", x: 225, y: 485, className: "end-node" },
  { id: "Pi-6", role: "End Node", x: 335, y: 410, className: "end-node" },
  { id: "Pi-7", role: "End Node", x: 465, y: 410, className: "end-node" },
  { id: "Pi-8", role: "End Node", x: 575, y: 485, className: "end-node" },
  { id: "Pi-9", role: "End Node", x: 695, y: 410, className: "end-node" },
  { id: "Pi-10", role: "End Node", x: 400, y: 555, className: "end-node" },
];

const edges = [
  [400, 118, 245, 211], [400, 118, 555, 211],
  [245, 259, 105, 386], [245, 259, 225, 461], [245, 259, 335, 386],
  [555, 259, 465, 386], [555, 259, 575, 461], [555, 259, 695, 386],
  [245, 259, 400, 531], [555, 259, 400, 531],
];

function NetworkDiagram() {
  return (
    <figure className="diagram-frame network-diagram">
      <svg viewBox="0 0 800 680" role="img" aria-labelledby="network-figure-title network-figure-desc">
        <title id="network-figure-title">LurniqHub Pi-1 through Pi-10 mesh topology across a school building</title>
        <desc id="network-figure-desc">
          A generic single-block school floor plan showing a staffroom, corridor
          and five classrooms, with Pi-1 as controller, Pi-2 and Pi-3 as corridor
          routers, and Pi-4 through Pi-10 as classroom and hall end nodes.
        </desc>

        <g className="floorplan-walls" aria-hidden="true">
          <path d="M50 50H750M750 50V600M750 600H50M50 600V235M50 200V50" />
          <path d="M50 165H390M410 165H750" />
          <path d="M50 270H100M140 270H225M265 270H345M385 270H460M500 270H600M680 270H750" />
          <path d="M190 270V600M300 270V600M430 270V600M530 270V600" />
        </g>
        <g className="floorplan-doors" aria-hidden="true">
          <path d="M50 200A35 35 0 0 1 85 235" />
          <path d="M390 165A20 20 0 0 0 410 145" />
        </g>
        <g className="floorplan-labels" aria-hidden="true">
          <text className="floorplan-label" x="360" y="112">STAFFROOM</text>
          <text className="floorplan-label" x="358" y="222">CORRIDOR</text>
          <text className="floorplan-label" x="95" y="290">CLASSROOM</text>
          <text className="floorplan-label" x="217" y="290">CLASSROOM</text>
          <text className="floorplan-label" x="338" y="290">CLASSROOM</text>
          <text className="floorplan-label" x="452" y="290">CLASSROOM</text>
          <text className="floorplan-label" x="618" y="290">HALL</text>
        </g>

        <g className="network-edges" aria-hidden="true">
          {edges.map(([x1, y1, x2, y2], index) => (
            <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} data-edge="" />
          ))}
        </g>
        <g className="network-nodes">
          {nodes.map((node, index) => (
            <g
              key={node.id}
              className={`network-node ${node.className}`}
              transform={`translate(${node.x} ${node.y})`}
              data-node=""
            >
              <circle r={node.role === "Controller" ? 34 : node.role === "Router" ? 28 : 23} />
              <text className="node-id" y="4">{node.id}</text>
              <text className="node-role" y={node.role === "Controller" ? 55 : 47}>{node.role}</text>
              <text className="node-ref" x={node.role === "Controller" ? 42 : 34} y="-18">
                {String(index + 1).padStart(2, "0")}
              </text>
            </g>
          ))}
        </g>
        <g className="network-legend" data-diagram-labels="">
          <rect x="48" y="612" width="704" height="42" />
          <circle className="controller" cx="78" cy="633" r="8" />
          <text x="94" y="637">CONTROLLER</text>
          <circle className="router" cx="280" cy="633" r="8" />
          <text x="296" y="637">ROUTER</text>
          <circle className="end-node" cx="430" cy="633" r="8" />
          <text x="446" y="637">END NODE</text>
          <text x="610" y="637">LH-03 / REV. 03</text>
        </g>
      </svg>
    </figure>
  );
}

export default function StorefrontClient() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="LurniqHub home">Lurniq<span>Hub</span></a>
        <nav aria-label="Primary navigation">
          <a href="#paradox">Paradox</a>
          <a href="#traction">Traction</a>
          <a href="#founders">Founders</a>
          <a className="nav-cta" href="#contact">Partner with us</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero section-shell reading-runway" id="top" aria-labelledby="hero-title">
          <div className="section-index">01 / GRIT</div>
          <div className="hero-stage reading-stage">
            <div className="hero-copy">
            <p className="eyebrow">Wild Coast, South Africa - Offline-first</p>
              <ScrollHeading id="hero-title" level={1} lines={[
                { text: "Training built here.", accent: "here." },
                { text: "Standards recognised everywhere." },
              ]} />
            <p className="hero-intro">
              Solar-powered, STCW-aligned maritime learning delivered through a
              classroom-scale Raspberry Pi mesh network.
            </p>
            <a className="text-link" href="#paradox">Understand the paradox <span aria-hidden="true">↓</span></a>
            </div>
            <HeroInstrument />
          </div>
        </section>

        <section className="paradox section-shell content-section" id="paradox" aria-labelledby="paradox-title">
          <div className="section-index">02 / THE PARADOX</div>
          <div className="content-card wide-card">
            <p className="eyebrow">One immovable rule</p>
            <ScrollHeading id="paradox-title" level={2} lines={[{ text: "The Paradox" }]} />
            <div className="paradox-grid">
              <p className="lead-copy">
                Maritime certification is global. A certificate earned in a rural
                Eastern Cape classroom has to mean exactly what the same certificate
                means anywhere else in the world.
              </p>
              <div className="body-copy">
                <p>
                  But learners who need that training most are often furthest from it.
                  Simulation equipment, stable connectivity and specialist instructors
                  rarely exist in the communities that need them most.
                </p>
                <p className="pull-quote">Delivery has to be radically local. Standards cannot be.</p>
                <p>
                  LurniqHub keeps a standardised, STCW-aligned core, then adapts delivery
                  to the school in front of it: solar where the grid is unreliable,
                  offline-first content where connectivity is thin, and a mesh network
                  that serves a classroom without assuming a data centre.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="assembly section-shell content-section reading-runway" id="assembly" aria-labelledby="assembly-title">
          <div className="section-index">03 / ASSEMBLY</div>
          <div className="assembly-stage reading-stage">
            <div className="assembly-heading">
              <p className="eyebrow">How it works</p>
              <ScrollHeading id="assembly-title" level={2} lines={[
                { text: "A classroom-scale" },
                { text: "system.", accent: "system." },
              ]} />
              <p>
                A standardised learning core, separated into three practical layers so
                each school can deploy what its conditions require.
              </p>
              <AssemblyExplorer><AssemblyDiagram idSuffix="-explorer" /></AssemblyExplorer>
            </div>
            <AssemblyDiagram />
          </div>
          <div className="system-list" aria-label="LurniqHub system layers">
            <article><span>01</span><h3>Solar power</h3><p>Learning stays available where grid reliability cannot be assumed.</p></article>
            <article><span>02</span><h3>Raspberry Pi mesh</h3><p>Low-power nodes serve the classroom as one resilient local network.</p></article>
            <article><span>03</span><h3>Offline content</h3><p>Course material lives close to the learner, not behind a fragile connection.</p></article>
          </div>
        </section>

        <section className="traction section-shell content-section dark-section" id="traction" aria-labelledby="traction-title">
          <div className="section-index">04 / TRACTION</div>
          <div className="traction-layout">
            <div><p className="eyebrow">Evidence, not aspiration</p><ScrollHeading id="traction-title" level={2} lines={[{ text: "Built from the" }, { text: "field outward.", accent: "field" }]} /></div>
            <ol className="traction-list">
              <li><span>FIELD PILOT</span><h3>Toli Senior Secondary School</h3><p>A maritime school in Lusikisiki on South Africa&apos;s Wild Coast - and LurniqHub&apos;s launchpad for proving offline-first delivery in the conditions it was designed for.</p></li>
              <li><span>STAKEHOLDER PRESENCE</span><h3>DEDEAT symposium</h3><p>Bringing the model into the Eastern Cape&apos;s economic and education conversation with the people positioned to help it scale.</p></li>
              <li><span>RESEARCH FOUNDATION</span><h3>Frugal scalability, tested</h3><p>The venture is the empirical vehicle for MCom research into how local delivery can preserve non-negotiable global standards.</p></li>
            </ol>
          </div>
        </section>

        <section className="network section-shell content-section reading-runway" id="network" aria-labelledby="network-title">
          <div className="section-index">05 / SIGNAL</div>
          <div className="network-stage reading-stage">
            <div className="network-copy">
              <p className="eyebrow">The network is the product truth</p>
              <ScrollHeading id="network-title" level={2} lines={[
                { text: "One room. Many nodes." },
                { text: "No data centre.", accent: "No" },
              ]} />
            <p>
              The signal is literal: a low-power Raspberry Pi mesh that lets devices
              find learning content locally. The same architecture can travel to the
              next school without pretending every school is the same.
            </p>
            <p className="topology-map">
              <span>Role map</span> Pi-1 controller / Pi-2-Pi-3 routers / Pi-4-Pi-10 end nodes
            </p>
              <dl className="signal-specs">
              <div><dt>Core</dt><dd>STCW-aligned</dd></div>
              <div><dt>Delivery</dt><dd>Offline-first</dd></div>
              <div><dt>Power</dt><dd>Solar-ready</dd></div>
              </dl>
            </div>
            <NetworkDiagram />
          </div>
        </section>

        <section className="founders section-shell content-section" id="founders" aria-labelledby="founders-title">
          <div className="section-index">06 / FOUNDERS</div>
          <div className="founders-intro">
            <p className="eyebrow">Co-founded in the Eastern Cape</p>
            <ScrollHeading id="founders-title" level={2} lines={[{ text: "Aphelele + Siya", accent: "+" }]} />
            <p className="lead-copy">Building at the intersection of maritime education, frugal systems and field-led research.</p>
          </div>
          <div className="founder-list">
            <article><span>AM</span><div><p className="eyebrow">Co-founder</p><h3>Aphelele Mjobo</h3><p>The work starts with a practical question: how can the most remote classroom meet the same threshold as the best-connected one?</p></div></article>
            <article><span>SY</span><div><p className="eyebrow">Co-founder</p><h3>Siya</h3><p>Co-building the field model that turns a standardised maritime learning core into infrastructure a real school can use.</p></div></article>
          </div>
        </section>

        <section className="contact section-shell content-section" id="contact" aria-labelledby="contact-title">
          <div className="section-index">07 / MAKE CONTACT</div>
          <div className="contact-inner">
            <p className="eyebrow">Partner - Fund - Follow</p>
            <ScrollHeading id="contact-title" level={2} lines={[{ text: "Help the signal reach" }, { text: "the next classroom.", accent: "next" }]} />
            <p>We are speaking with funders, partner schools, public-sector stakeholders and research collaborators who believe geography should not decide the standard of a learner&apos;s future.</p>
            <a className="primary-cta" href="mailto:hello@lurniqhub.tech">Start a conversation <span aria-hidden="true">↗</span></a>
          </div>
          <footer>
            <a href="https://lurniqhub.tech">lurniqhub.tech</a>
            <p>Offline-first by design. Global-standard by intent.</p>
            <p>Eastern Cape - South Africa</p>
          </footer>
        </section>
      </main>
    </>
  );
}
