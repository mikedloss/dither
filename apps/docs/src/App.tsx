import { useState } from "react";
import { Tabs } from "@base-ui/react/tabs";
import { DitheredImage } from "@dloss/dithered-image";
import { Dither } from "@dloss/dithered-element";
import { CodeBlock } from "./CodeBlock";
import heroSrc from "./assets/hero.png";
import udsSrc from "./assets/uds.png";
import googleSrc from "./assets/google-icon-logo-svgrepo-com.png";
import mcdonaldsSrc from "./assets/mcdonald-s-15-logo-svgrepo-com.png";
import whatsappSrc from "./assets/whatsapp-icon-logo-svgrepo-com.png";
import messengerSrc from "./assets/facebook-messenger-3-logo-svgrepo-com.svg";
import viteSrc from "./assets/vite.svg";
import reactSrc from "./assets/react.svg";
import "./App.css";

const logoOptions = [
  { label: "Hero", src: heroSrc },
  { label: "UDS", src: udsSrc },
  { label: "Google", src: googleSrc },
  { label: "McDonald's", src: mcdonaldsSrc },
  { label: "WhatsApp", src: whatsappSrc },
  { label: "Messenger", src: messengerSrc },
  { label: "Vite", src: viteSrc },
  { label: "React", src: reactSrc },
];

const installCommands = {
  npm: "npm install @dloss/dithered-image",
  yarn: "yarn add @dloss/dithered-image",
  pnpm: "pnpm add @dloss/dithered-image",
  bun: "bun add @dloss/dithered-image",
};

const usageExamples = {
  Component: `import { DitheredImage } from "@dloss/dithered-image"

<DitheredImage
  src="/logo.png"
  invert
  style={{ width: 400, height: 400 }}
/>`,
  Hook: `import { useDitheredImage } from "@dloss/dithered-image"

function Logo() {
  const ref = useDitheredImage("/logo.png", {
    invert: true,
    mouseRadius: 140,
  })
  return <canvas ref={ref} style={{ width: 400, height: 400 }} />
}`,
  Vanilla: `import { createDitheredCanvas } from "@dloss/dithered-image"

const canvas = document.querySelector("canvas")
const cleanup = createDitheredCanvas(canvas, "/logo.png", {
  invert: true,
})

// later: cleanup()`,
};

const demos = [
  {
    title: "Default",
    desc: "Dots compose the logo shape directly.",
    options: {} as Record<string, unknown>,
  },
  {
    title: "Inverted",
    desc: "Logo as negative space inside a dot field.",
    options: { invert: true },
  },
  {
    title: "Preserved colors",
    desc: "Keep the original image colors on each dot.",
    options: { preserveColors: true },
  },
  {
    title: "Dense grid",
    desc: "Higher grid resolution for a tighter, more solid look.",
    options: { gridSize: 220, dotScale: 0.8 },
  },
  {
    title: "Sparse & floaty",
    desc: "Fewer dots with low ease for a dreamy, slow-settling feel.",
    options: { gridSize: 100, ease: 0.04, jitter: 0.5, preserveColors: true },
  },
  {
    title: "Custom color",
    desc: "Any CSS color string works for the dot fill.",
    options: { dotColor: "rgba(99, 102, 241, 0.8)" },
  },
];

function demoToCode(options: Record<string, unknown>): string {
  const props = Object.entries(options)
    .map(([k, v]) => {
      if (v === true) return `  ${k}`;
      if (typeof v === "string") return `  ${k}="${v}"`;
      return `  ${k}={${JSON.stringify(v)}}`;
    })
    .join("\n");
  return `<DitheredImage\n  src="/logo.png"${props ? "\n" + props : ""}\n/>`;
}

function DemoCard({
  demo,
  src,
}: {
  demo: (typeof demos)[number];
  src: string;
}) {
  const [showCode, setShowCode] = useState(false);
  const code = demoToCode(demo.options);

  return (
    <div className="demo-card">
      <div className="demo-preview-wrap">
        <button
          className="demo-code-toggle"
          onClick={() => setShowCode(!showCode)}
          aria-label={showCode ? "Show preview" : "Show code"}
          title={showCode ? "Show preview" : "Show code"}
        >
          {showCode ? (
            <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor"><path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /><path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" /></svg>
          ) : (
            <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor"><path fillRule="evenodd" d="M6.28 5.22a.75.75 0 0 1 0 1.06L2.56 10l3.72 3.72a.75.75 0 0 1-1.06 1.06L.97 10.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Zm7.44 0a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 0 1 0-1.06ZM11.377 2.011a.75.75 0 0 1 .612.867l-2.5 14.5a.75.75 0 0 1-1.478-.255l2.5-14.5a.75.75 0 0 1 .866-.612Z" clipRule="evenodd" /></svg>
          )}
        </button>
        {showCode ? (
          <div className="demo-code-view">
            <CodeBlock code={code} />
          </div>
        ) : (
          <DitheredImage
            src={src}
            className="demo-canvas-wrap"
            {...demo.options}
          />
        )}
      </div>
      <div className="demo-info">
        <h3>{demo.title}</h3>
        <p>{demo.desc}</p>
      </div>
    </div>
  );
}

const elementDemos = [
  {
    title: "HTML element",
    desc: 'A styled div wrapped in <Dither> with invert mode.',
    options: { invert: true, gridSize: 170 } as Record<string, unknown>,
    children: `<div className="card">
  <div className="icon">D</div>
  <strong>dithered-element</strong>
  <span>This is a plain HTML element, dithered.</span>
</div>`,
    render: (
      <div className="dither-demo-content">
        <div className="dither-demo-icon">D</div>
        <div className="dither-demo-text">
          <strong>dithered-element</strong>
          <span>This is a plain HTML element, dithered.</span>
        </div>
      </div>
    ),
  },
  {
    title: "Color preserved",
    desc: "Element colors carried through to each dot.",
    options: { gridSize: 200, preserveColors: true } as Record<string, unknown>,
    children: `<div className="card">
  <div className="gradient" />
  <strong>Preserved colors</strong>
  <span>Original colors from the element are kept.</span>
</div>`,
    render: (
      <div className="dither-demo-content dither-demo-colorful">
        <div className="dither-demo-gradient" />
        <div className="dither-demo-text">
          <strong>Preserved colors</strong>
          <span>Original colors from the element are kept.</span>
        </div>
      </div>
    ),
  },
];

function elementDemoToCode(
  options: Record<string, unknown>,
  children: string
): string {
  const props = Object.entries(options)
    .map(([k, v]) => {
      if (v === true) return `  ${k}`;
      if (typeof v === "string") return `  ${k}="${v}"`;
      return `  ${k}={${JSON.stringify(v)}}`;
    })
    .join("\n");
  const indent = children.replace(/^/gm, "  ");
  return `<Dither\n${props}\n>\n${indent}\n</Dither>`;
}

function ElementDemoCard({ demo }: { demo: (typeof elementDemos)[number] }) {
  const [showCode, setShowCode] = useState(false);
  const code = elementDemoToCode(demo.options, demo.children);

  return (
    <div className="demo-card">
      <div className="demo-preview-wrap">
        <button
          className="demo-code-toggle"
          onClick={() => setShowCode(!showCode)}
          aria-label={showCode ? "Show preview" : "Show code"}
          title={showCode ? "Show preview" : "Show code"}
        >
          {showCode ? (
            <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor"><path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /><path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" /></svg>
          ) : (
            <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor"><path fillRule="evenodd" d="M6.28 5.22a.75.75 0 0 1 0 1.06L2.56 10l3.72 3.72a.75.75 0 0 1-1.06 1.06L.97 10.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Zm7.44 0a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 0 1 0-1.06ZM11.377 2.011a.75.75 0 0 1 .612.867l-2.5 14.5a.75.75 0 0 1-1.478-.255l2.5-14.5a.75.75 0 0 1 .866-.612Z" clipRule="evenodd" /></svg>
          )}
        </button>
        {showCode ? (
          <div className="demo-code-view">
            <CodeBlock code={code} />
          </div>
        ) : (
          <Dither className="demo-canvas-wrap" {...demo.options}>
            {demo.render}
          </Dither>
        )}
      </div>
      <div className="demo-info">
        <h3>{demo.title}</h3>
        <p>{demo.desc}</p>
      </div>
    </div>
  );
}

const elementInstallCommands = {
  npm: "npm install @dloss/dithered-element",
  yarn: "yarn add @dloss/dithered-element",
  pnpm: "pnpm add @dloss/dithered-element",
  bun: "bun add @dloss/dithered-element",
};

const elementUsageExamples = {
  Basic: `import { Dither } from "@dloss/dithered-element"

<Dither invert gridSize={200}>
  <Card title="Hello" subtitle="World" />
</Dither>`,
  "With deps": `import { Dither } from "@dloss/dithered-element"

// Only re-snapshots when title changes
<Dither deps={[title]} invert>
  <Card title={title} />
</Dither>`,
  "With ref": `import { useRef } from "react"
import { Dither } from "@dloss/dithered-element"
import type { DitherHandle } from "@dloss/dithered-element"

const ref = useRef<DitherHandle>(null)

<Dither ref={ref} deps={[]} invert>
  <Card title={title} />
</Dither>
<button onClick={() => ref.current?.refresh()}>
  Re-capture
</button>`,
};

const elementApiRows = [
  ["children", "ReactNode", "—", "The element(s) to dither"],
  ["width", "number", "inferred", "Canvas width in CSS pixels"],
  ["height", "number", "inferred", "Canvas height in CSS pixels"],
  ["deps", "DependencyList", "undefined", "Re-snapshot timing: undefined = every render, [] = mount only"],
  ["className", "string", "—", "Class name for the outer wrapper div"],
  ["style", "CSSProperties", "—", "Style for the outer wrapper div"],
  ["ref", "Ref<DitherHandle>", "—", "Exposes .refresh() for imperative re-capture"],
];

const apiRows = [
  ["invert", "boolean", "false", "Dots around logo (true) or dots as logo (false)"],
  ["scale", "number", "0.5", "Logo size as fraction of canvas"],
  ["gridSize", "number", "170", "Sampling grid resolution - more = denser"],
  ["dotScale", "number", "1", "Multiplier for dot size"],
  ["dotColor", "string", '"rgba(40,40,45,0.9)"', "CSS color for dots"],
  ["preserveColors", "boolean", "false", "Use original image colors per-dot"],
  ["mouseRadius", "number", "140", "Cursor repulsion radius (px)"],
  ["mouseForce", "number", "40", "Repulsion strength"],
  ["ease", "number", "0.12", "Spring-back speed (lower = floatier)"],
  ["jitter", "number", "0.3", "Random position offset (fraction of grid unit)"],
  ["padding", "number", "0.22", "Padding around logo (fraction of bbox)"],
  ["cornerRadius", "number", "0.15", "Outer rounded rect corner radius"],
  ["threshold", "number", "245", "Brightness cutoff for logo detection"],
  ["shockwave.speed", "number", "225", "Expansion speed of the shockwave ring"],
  ["shockwave.width", "number", "37", "Width of the shockwave ring"],
  ["shockwave.strength", "number", "20", "Displacement strength of the shockwave"],
  ["shockwave.duration", "number", "675", "Duration of the shockwave (ms)"],
];

function App() {
  const [selectedLogo, setSelectedLogo] = useState(0);
  const currentSrc = logoOptions[selectedLogo].src;

  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
        <DitheredImage src={currentSrc} className="hero-canvas" preserveColors />
        <h1>dither</h1>
        <p>
          Interactive dithered dot effects for the web. Turn any image or
          DOM element into a stipple field with cursor repulsion and
          click shockwaves.
        </p>
        <div className="hero-links">
          <a href="https://github.com/mikedloss/dither" target="_blank" rel="noopener noreferrer" className="hero-link">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" /></svg>
            GitHub
          </a>
        </div>
      </section>

      {/* ── @dloss/dithered-image ── */}
      <section className="section">
        <div className="section-header">
          <h2>@dloss/dithered-image</h2>
          <p>
            Dither any image. Works with vanilla JS or React.
            Zero runtime dependencies.
          </p>
          <div className="section-badges">
            <span className="badge">~4 KB gzipped</span>
            <span className="badge">0 dependencies</span>
            <span className="badge">Canvas 2D</span>
            <span className="badge">React / Vanilla</span>
            <a href="https://www.npmjs.com/package/@dloss/dithered-image" target="_blank" rel="noopener noreferrer" className="badge badge-link">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M0 0v16h16V0H0zm13 13h-2V5H8v8H3V3h10v10z" /></svg>
              npm
            </a>
          </div>
        </div>

        <Tabs.Root defaultValue="npm" className="tabs">
          <div className="tabs-list-scroll"><Tabs.List className="tabs-list">
            {Object.keys(installCommands).map((pm) => (
              <Tabs.Tab key={pm} value={pm} className="tabs-tab">
                {pm}
              </Tabs.Tab>
            ))}
            <Tabs.Indicator className="tabs-indicator" />
          </Tabs.List></div>
          {Object.entries(installCommands).map(([pm, cmd]) => (
            <Tabs.Panel key={pm} value={pm} className="tabs-panel">
              <code className="install-code">{cmd}</code>
            </Tabs.Panel>
          ))}
        </Tabs.Root>

        <Tabs.Root defaultValue="Component" className="tabs" style={{ marginTop: 32 }}>
          <div className="tabs-list-scroll"><Tabs.List className="tabs-list">
            {Object.keys(usageExamples).map((label) => (
              <Tabs.Tab key={label} value={label} className="tabs-tab">
                {label}
              </Tabs.Tab>
            ))}
            <Tabs.Indicator className="tabs-indicator" />
          </Tabs.List></div>
          {Object.entries(usageExamples).map(([label, code]) => (
            <Tabs.Panel key={label} value={label} className="tabs-panel">
              <CodeBlock code={code} />
            </Tabs.Panel>
          ))}
        </Tabs.Root>

        <div style={{ marginTop: 48 }}>
          <h3 className="subsection-title">Demos</h3>
          <p className="subsection-desc">Move your mouse over each canvas. Click for a shockwave.</p>
        </div>
        <Tabs.Root
          value={selectedLogo}
          onValueChange={(v) => setSelectedLogo(v as number)}
          className="tabs"
          style={{ marginBottom: 24 }}
        >
          <div className="tabs-list-scroll"><Tabs.List className="tabs-list">
            {logoOptions.map((logo, i) => (
              <Tabs.Tab key={logo.label} value={i} className="tabs-tab logo-tab">
                <img src={logo.src} alt={logo.label} className="logo-tab-icon" />
                {logo.label}
              </Tabs.Tab>
            ))}
            <Tabs.Indicator className="tabs-indicator" />
          </Tabs.List></div>
        </Tabs.Root>
        <div className="demo-grid">
          {demos.map((demo) => (
            <DemoCard key={`${demo.title}-${selectedLogo}`} demo={demo} src={currentSrc} />
          ))}
        </div>

        <div style={{ marginTop: 48 }}>
          <h3 className="subsection-title">Options</h3>
          <p className="subsection-desc">Works with zero config. Tune these to dial in the exact feel you want.</p>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="api-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {apiRows.map(([prop, type, def, desc]) => (
                <tr key={prop}>
                  <td><code>{prop}</code></td>
                  <td><code>{type}</code></td>
                  <td><code>{def}</code></td>
                  <td>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── @dloss/dithered-element ── */}
      <section className="section">
        <div className="section-header">
          <h2>@dloss/dithered-element</h2>
          <p>
            Dither any React component or DOM element.
            Rasterizes children automatically using <a href="https://snapdom.dev" target="_blank" rel="noopener noreferrer">snapDOM</a>.
          </p>
          <div className="section-badges">
            <span className="badge">~1 KB gzipped</span>
            <span className="badge">React</span>
            <a href="https://www.npmjs.com/package/@dloss/dithered-element" target="_blank" rel="noopener noreferrer" className="badge badge-link">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M0 0v16h16V0H0zm13 13h-2V5H8v8H3V3h10v10z" /></svg>
              npm
            </a>
          </div>
        </div>

        <Tabs.Root defaultValue="npm" className="tabs">
          <div className="tabs-list-scroll"><Tabs.List className="tabs-list">
            {Object.keys(elementInstallCommands).map((pm) => (
              <Tabs.Tab key={pm} value={pm} className="tabs-tab">
                {pm}
              </Tabs.Tab>
            ))}
            <Tabs.Indicator className="tabs-indicator" />
          </Tabs.List></div>
          {Object.entries(elementInstallCommands).map(([pm, cmd]) => (
            <Tabs.Panel key={pm} value={pm} className="tabs-panel">
              <code className="install-code">{cmd}</code>
            </Tabs.Panel>
          ))}
        </Tabs.Root>

        <Tabs.Root defaultValue="Basic" className="tabs" style={{ marginTop: 32 }}>
          <div className="tabs-list-scroll"><Tabs.List className="tabs-list">
            {Object.keys(elementUsageExamples).map((label) => (
              <Tabs.Tab key={label} value={label} className="tabs-tab">
                {label}
              </Tabs.Tab>
            ))}
            <Tabs.Indicator className="tabs-indicator" />
          </Tabs.List></div>
          {Object.entries(elementUsageExamples).map(([label, code]) => (
            <Tabs.Panel key={label} value={label} className="tabs-panel">
              <CodeBlock code={code} />
            </Tabs.Panel>
          ))}
        </Tabs.Root>

        <div className="demo-grid" style={{ marginTop: 32 }}>
          {elementDemos.map((demo) => (
            <ElementDemoCard key={demo.title} demo={demo} />
          ))}
        </div>

        <div style={{ marginTop: 48 }}>
          <h3 className="subsection-title">Additional props</h3>
          <p className="subsection-desc">
            All <code>@dloss/dithered-image</code> options above are also accepted, plus:
          </p>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="api-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {elementApiRows.map(([prop, type, def, desc]) => (
                <tr key={prop}>
                  <td><code>{prop}</code></td>
                  <td><code>{type}</code></td>
                  <td><code>{def}</code></td>
                  <td>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Footer */}
      <footer className="footer">
        <p>
          Logos shown in demos are trademarks of their respective owners, used
          for demonstration purposes only. Logo assets sourced
          from <a href="https://www.svgrepo.com" target="_blank" rel="noopener noreferrer">SVG Repo</a>.
        </p>
      </footer>
    </div>
  );
}

export default App;
