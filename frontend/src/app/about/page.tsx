import Link from "next/link";
import Image from "next/image";
import { PageIntro } from "@/components/page-intro";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = { title: "About Alexander" };
/** Renders the AboutPage campaign page. */
export default function AboutPage() { return <><SiteHeader /><main id="main"><PageIntro number="01" label="About Alexander" eyebrow="Leadership with purpose" title="Meet the person" emphasis="behind the purpose." description="A commitment to listen, build trust and help REAN deliver lasting value to its members." />
  <section className="about-feature wrap"><div className="about-portrait"><div className="portrait-placeholder portrait-large portrait-photo"><Image src="/images/candidate-about.jpg" alt="Portrait of Alexander Obiechina" fill sizes="(max-width: 900px) 100vw, 560px" /></div><div className="portrait-tag">ALEXANDER OBIECHINA <span>·</span> REAN PRESIDENTIAL CANDIDATE</div></div><div className="about-copy"><p className="eyebrow">A member-first approach</p><h2>Build on what works.<br /><em>Make room for more.</em></h2><p>Alexander Obiechina is standing for President of the Renewable Energy Association of Nigeria. His vision is to build on REAN’s achievements, strengthen its institutional capacity and work collaboratively with members to advance the industry.</p><p>Add the approved biography, career milestones and details of his service to the renewable energy sector here.</p><Link className="arrow-link" href="/manifesto">Explore the manifesto <span>↗</span></Link></div></section>
  <section className="values-strip"><div className="wrap values-grid"><div><span>01</span><h3>Listen first</h3><p>Understand members’ needs and priorities.</p></div><div><span>02</span><h3>Work together</h3><p>Make progress through collaboration.</p></div><div><span>03</span><h3>Deliver clearly</h3><p>Set priorities and report on progress.</p></div></div></section><section className="page-next wrap"><span>Next</span><Link href="/manifesto"><strong>The manifesto</strong><span>↗</span></Link></section></main><SiteFooter /></>; }


