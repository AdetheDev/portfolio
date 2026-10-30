import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = { title: "Commitment to Members" };
const commitments = [["01 / 04", "◎", "I will listen.", "Member perspectives should inform the association’s priorities and direction."], ["02 / 04", "↗", "I will connect.", "REAN should help members find ways to learn from and work with one another."], ["03 / 04", "⌁", "I will be clear.", "Members deserve open communication about decisions, priorities and progress."], ["04 / 04", "✳", "I will work with you.", "Lasting progress comes from shared effort across the renewable energy industry."]];
/** Renders the CommitmentPage campaign page. */
export default function CommitmentPage() { return <><SiteHeader /><main id="main"><PageIntro number="05" label="Commitment to members" eyebrow="A promise of partnership" title="REAN works best" emphasis="when we all shape it." description="Leadership should create space for members to contribute, stay informed and see how their association is making progress." />
  <section className="commitment-grid wrap">{commitments.map(([number, icon, title, description], index) => <article className={`commitment-card${index === 0 ? " commitment-feature" : ""}`} key={number}><span className="commitment-count">{number}</span><span className="commitment-symbol">{icon}</span><h2>{title}</h2><p>{description}</p></article>)}</section><section className="contact-panel"><div className="wrap contact-inner"><div><p className="eyebrow">Join the conversation</p><h2>What should REAN<br /><em>focus on next?</em></h2><p>Share your priorities with the campaign team.</p></div><Link className="button button-lime" href="/newsletter">Read campaign updates <span>↗</span></Link></div></section><section className="page-next wrap"><span>More from the campaign</span><Link href="/newsletter"><strong>Newsletter and updates</strong><span>↗</span></Link></section></main><SiteFooter /></>; }


