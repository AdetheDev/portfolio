"use client";

import { useState } from "react";

const prototypes = [
  { id: "editorial", name: "The Editorial", note: "Bold type, generous space, portrait-led." },
  { id: "energy-grid", name: "Energy Grid", note: "Structured blocks, clear priorities, strong geometry." },
  { id: "member-first", name: "Member First", note: "Warm, direct, centered around shared purpose." },
  { id: "field-notes", name: "Field Notes", note: "A journal-like layout with a distinctive sidebar." },
  { id: "new-energy", name: "New Energy", note: "A modular bento system built for campaign updates." },
];

const themes = [
  { id: "canopy", name: "Canopy", colors: ["#123d32", "#d9ed68"] },
  { id: "coast", name: "Coastal", colors: ["#123849", "#76d8c7"] },
  { id: "sun", name: "Solar", colors: ["#56351e", "#f0c95d"] },
  { id: "clay", name: "Earth + Coral", colors: ["#532b2b", "#ed987e"] },
  { id: "system", name: "System", colors: ["#e9e9e2", "#202a27"] },
];

/** Lets a reviewer switch between five layouts and five palette modes. */
export function PrototypeDesigner() {
  const [prototype, setPrototype] = useState("editorial");
  const [theme, setTheme] = useState("canopy");
  const selectedPrototype = prototypes.find((item) => item.id === prototype) ?? prototypes[0];
  const selectedTheme = themes.find((item) => item.id === theme) ?? themes[0];

  return <div className="design-lab">
    <div className="design-controls">
      <div className="selector-block">
        <div className="selector-heading"><div><span className="selector-index">01</span><h2>Choose a prototype</h2></div><span className="selector-count">5 concepts</span></div>
        <div className="prototype-options" role="group" aria-label="Choose a homepage prototype">
          {prototypes.map((item, index) => <button className={`prototype-option${prototype === item.id ? " selected" : ""}`} type="button" aria-pressed={prototype === item.id} onClick={() => setPrototype(item.id)} key={item.id}><span className="option-index">0{index + 1}</span><span className="option-copy"><strong>{item.name}</strong><small>{item.note}</small></span><span className="option-arrow">↗</span></button>)}
        </div>
      </div>
      <div className="selector-block theme-selector">
        <div className="selector-heading"><div><span className="selector-index">02</span><h2>Choose a theme</h2></div><span className="selector-count">4 custom + system</span></div>
        <div className="theme-options" role="group" aria-label="Choose a color theme">
          {themes.map((item) => <button className={`theme-option${theme === item.id ? " selected" : ""}`} type="button" aria-pressed={theme === item.id} onClick={() => setTheme(item.id)} key={item.id}><span className="theme-swatch" aria-hidden="true">{item.colors.map((color) => <i style={{ backgroundColor: color }} key={color} />)}</span><span>{item.name}</span><span className="theme-check">✓</span></button>)}
        </div>
      </div>
    </div>
    <div className="preview-meta"><div><span className="live-dot" />Live preview</div><strong>{selectedPrototype.name}<span> / </span>{selectedTheme.name}</strong><span className="preview-count">{prototypes.length} layouts × {themes.length} themes = 25 options</span></div>
    <div className="prototype-stage" data-prototype={prototype} data-theme={theme}>
      <PrototypePreview prototype={prototype} />
    </div>
    <p className="system-theme-note">System theme follows your device’s light or dark appearance setting. Palette controls change the preview only.</p>
  </div>;
}

/** Draws the selected concept with a shared set of campaign content. */
function PrototypePreview({ prototype }: { prototype: string }) {
  if (prototype === "energy-grid") return <EnergyGridPreview />;
  if (prototype === "member-first") return <MemberFirstPreview />;
  if (prototype === "field-notes") return <FieldNotesPreview />;
  if (prototype === "new-energy") return <NewEnergyPreview />;
  return <EditorialPreview />;
}

/** Displays the typography-led editorial homepage concept. */
function EditorialPreview() {
  return <div className="preview-layout editorial-layout"><PreviewHeader compact /><div className="editorial-hero"><div className="editorial-copy"><span className="preview-eyebrow">A vision for REAN</span><h2>Powering the<br />industry. <em>Empowering</em><br />our members.</h2><p>A stronger REAN. Greater member value. A more influential renewable energy industry.</p><PreviewCta /></div><PortraitCard /><span className="editorial-index">01 / 05<br />LEADERSHIP WITH PURPOSE</span></div><PreviewRibbon /><div className="preview-bottomline"><span>Let’s make REAN work harder for everyone.</span><span>Explore the manifesto ↗</span></div></div>;
}

/** Displays a geometric, card-based renewable energy concept. */
function EnergyGridPreview() {
  return <div className="preview-layout grid-layout"><PreviewHeader compact /><div className="grid-hero"><div className="grid-hero-copy"><span className="preview-eyebrow">REAN / Presidential vision</span><h2>Power a stronger<br /><em>renewable future.</em></h2><p>Make the association more useful, connected and influential.</p><PreviewCta /></div><div className="grid-number-card"><span>OUR SHARED FOCUS</span><strong>REAN<br />FORWARD</strong><b>01 — 05</b></div></div><div className="grid-points"><div><b>01</b><strong>Member value</strong><span>Useful by design</span></div><div><b>02</b><strong>Industry voice</strong><span>Stronger together</span></div><div><b>03</b><strong>Practical progress</strong><span>Built for delivery</span></div></div></div>;
}

/** Displays a centered, people-first campaign concept. */
function MemberFirstPreview() {
  return <div className="preview-layout member-layout"><PreviewHeader compact /><div className="member-hero"><div className="member-orbit orbit-a" /><div className="member-orbit orbit-b" /><span className="preview-eyebrow">A campaign for every member</span><span className="member-mark">AO</span><h2>Stronger <em>together.</em><br />Further together.</h2><p>Listen closely. Work collaboratively. Deliver value members can see.</p><PreviewCta /><div className="member-footer"><span>Alexander Obiechina</span><span>Candidate for REAN President</span></div></div></div>;
}

/** Displays a journal-inspired layout with compact side navigation. */
function FieldNotesPreview() {
  return <div className="preview-layout notes-layout"><aside className="notes-sidebar"><span className="notes-logo">AO<span>+</span></span><small>CAMPAIGN<br />FIELD NOTES</small><nav><span>01 / Home</span><span>02 / About</span><span>03 / Manifesto</span><span>04 / Updates</span></nav><b>REAN<br />PRESIDENT</b></aside><div className="notes-main"><div className="notes-topline"><span>Leadership / Nigeria</span><span>Issue No. 01</span></div><div className="notes-feature"><div><span className="preview-eyebrow">A member-first vision</span><h2>Let’s build<br /><em>what’s next.</em></h2><p>A stronger association starts with listening to the people it represents.</p><PreviewCta /></div><PortraitCard /></div><div className="notes-quote">“Progress is a shared practice.” <span>— A vision for REAN</span></div></div></div>;
}

/** Displays a modular bento layout suited to frequent campaign updates. */
function NewEnergyPreview() {
  return <div className="preview-layout bento-layout"><PreviewHeader compact /><div className="bento-grid"><div className="bento-main"><span className="preview-eyebrow">A stronger REAN starts here</span><h2>New energy<br /><em>for the industry.</em></h2><p>Member value. Collective voice. Practical progress.</p><PreviewCta /></div><div className="bento-portrait"><PortraitCard /></div><div className="bento-stat"><b>100</b><span>DAY ACTION PLAN</span></div><div className="bento-quote"><span>OUR PROMISE</span><strong>Build on progress.<br />Make room for more.</strong></div></div><PreviewRibbon /></div>;
}

/** Shows a consistent campaign wordmark inside the mini-site preview. */
function PreviewHeader({ compact = false }: { compact?: boolean }) {
  return <div className={`preview-header${compact ? " compact" : ""}`}><span className="preview-brand"><b>AO</b><strong>ALEXANDER OBIECHINA<small>FOR REAN PRESIDENT</small></strong></span><nav><span>About</span><span>Vision</span><span>Updates</span></nav><span className="preview-header-cta">Explore ↗</span></div>;
}

/** Provides a reusable abstract portrait placeholder without inventing a likeness. */
function PortraitCard() {
  return <div className="preview-portrait"><div className="portrait-circle" /><div className="portrait-body" /><span>ADD APPROVED PORTRAIT</span><b>AO</b></div>;
}

/** Displays the selected concept's primary action. */
function PreviewCta() {
  return <span className="preview-cta">Explore the manifesto <b>↗</b></span>;
}

/** Displays the repeated message strip used in several prototype concepts. */
function PreviewRibbon() {
  return <div className="preview-ribbon"><span>MEMBER VALUE</span><b>✳</b><span>COLLECTIVE VOICE</span><b>✳</b><span>PRACTICAL PROGRESS</span></div>;
}
