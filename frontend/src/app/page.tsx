import Link from "next/link";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const pillars = [
  { number: "01", title: "Member value", description: "Make membership more useful, connected and responsive." },
  { number: "02", title: "Industry voice", description: "Bring members together around shared priorities." },
  { number: "03", title: "Practical progress", description: "Champion collaboration and practical sector solutions." },
];

/** Renders the Home campaign page. */
export default function Home() {
  return <><SiteHeader /><main id="main">
    <section className="hero wrap"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" />A vision for REAN</p><h1>Powering the industry.<br /><em>Empowering</em> our members.</h1><p className="hero-lede">A stronger REAN. Greater member value. A more influential renewable energy industry.</p><div className="hero-actions"><Link className="button button-dark" href="/manifesto">Explore the manifesto <span>↗</span></Link><Link className="text-link" href="/about">Meet Alexander <span>→</span></Link></div><div className="hero-note"><span className="note-line" /><span>Candidate for President<br /><strong>Renewable Energy Association of Nigeria</strong></span></div></div>
    <div className="hero-art" aria-label="Candidate portrait"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-sun" /><div className="art-label art-label-top">Renewable energy<br />Nigeria</div><div className="portrait-placeholder portrait-photo"><Image src="/images/candidate-hero.jpg" alt="Portrait of Alexander Obiechina" fill priority sizes="(max-width: 900px) 62vw, 330px" /></div><div className="art-caption"><span>01 / 06</span><span>Leadership with purpose</span></div><div className="art-stamp">A<br />Stronger<br />REAN</div></div></section>
    <section className="ticker"><div className="ticker-track"><span>Member value</span><b>✳</b><span>Collective voice</span><b>✳</b><span>Practical progress</span><b>✳</b><span>Member value</span></div></section>
    <section className="intro-section wrap section-pad"><div className="section-kicker"><span>01</span><span className="kicker-rule" /><span>The opportunity</span></div><div className="intro-grid"><h2>Let’s make REAN<br /><em>work harder</em> for everyone.</h2><div className="intro-text"><p>Nigeria’s renewable energy industry needs an association that connects members to opportunities, strengthens its collective voice, promotes practical solutions and delivers measurable value.</p><p>The vision is to build on REAN’s achievements, strengthen its institutional capacity and work collaboratively with members to advance the industry.</p><Link className="arrow-link" href="/manifesto">Read the full manifesto <span>↗</span></Link></div></div></section>
    <section className="pillars-band"><div className="wrap section-pad"><div className="section-heading"><div><p className="eyebrow">A practical agenda</p><h2>Progress, built <em>together.</em></h2></div><Link className="arrow-link" href="/pillars">Explore the pillars <span>↗</span></Link></div><div className="pillar-preview-grid">{pillars.map((pillar) => <Link className="pillar-card" href="/pillars" key={pillar.number}><span className="pillar-num">{pillar.number}</span><span className="pillar-icon">↗</span><h3>{pillar.title}</h3><p>{pillar.description}</p><span className="card-arrow">↗</span></Link>)}</div></div></section>
    <section className="days-teaser"><div className="wrap days-inner"><div className="days-number">100<span>Days</span></div><div className="days-copy"><p className="eyebrow">Start with listening</p><h2>Clear priorities.<br /><em>Early momentum.</em></h2><p>See the proposed first steps for a more connected and capable association.</p><Link className="button button-light" href="/first-100-days">See the first 100 days <span>↗</span></Link></div><div className="days-decoration">REAN<br />FORWARD</div></div></section>
    <section className="closing-cta"><div className="wrap closing-inner"><p className="eyebrow">The future of REAN is shared</p><h2>Stronger together.<br /><em>Further together.</em></h2><Link className="button button-lime" href="/commitment">Read my commitment <span>↗</span></Link></div></section>
  </main><SiteFooter /></>;
}


