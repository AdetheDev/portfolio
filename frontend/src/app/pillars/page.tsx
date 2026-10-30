import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = { title: "Strategic Pillars" };
const pillars = [["01", "↗", "Member value", "Make REAN membership more useful, responsive and connected to opportunities across the sector.", "Connect"], ["02", "◎", "A stronger industry voice", "Bring members together around shared priorities and strengthen REAN’s role in sector conversations.", "Represent"], ["03", "⌁", "Practical solutions", "Promote constructive collaboration and practical approaches to the challenges members identify.", "Advance"], ["04", "◷", "Institutional strength", "Build the capacity, processes and partnerships that help the association serve members consistently.", "Strengthen"], ["05", "✳", "Transparent delivery", "Set clear priorities, communicate progress and create meaningful ways for members to contribute.", "Deliver"]];
/** Renders the PillarsPage campaign page. */
export default function PillarsPage() { return <><SiteHeader /><main id="main"><PageIntro number="03" label="Strategic pillars" eyebrow="A practical agenda" title="Five priorities." emphasis="One shared future." description="A framework for working with members to build a more effective association and a stronger renewable energy sector." />
  <section className="pillars-list wrap">{pillars.map(([number, icon, title, description, word]) => <article className="pillar-row" key={number}><span className="row-num">{number}</span><span className="row-symbol">{icon}</span><div><h2>{title}</h2><p>{description}</p></div><span className="row-word">{word}</span></article>)}</section><section className="center-cta"><p className="eyebrow">From priorities to action</p><h2>Start with the<br /><em>first 100 days.</em></h2><Link className="button button-dark" href="/first-100-days">See the plan <span>↗</span></Link></section><section className="page-next wrap"><span>Next</span><Link href="/first-100-days"><strong>The first 100 days</strong><span>↗</span></Link></section></main><SiteFooter /></>; }


