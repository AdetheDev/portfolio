import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = { title: "Newsletter & Updates" };
/** Renders the NewsletterPage campaign page. */
export default function NewsletterPage() { return <><SiteHeader /><main id="main"><PageIntro number="06" label="Newsletter & updates" eyebrow="News from the campaign" title="Ideas, news and" emphasis="industry progress." description="Updates from Alexander Obiechina and the renewable energy community." />
  <section className="newsletter-content wrap"><div className="newsletter-toolbar"><div><p className="eyebrow">The latest</p><h2>Campaign updates</h2></div><span className="cms-status"><span />Publishing workspace connection pending</span></div><div className="newsletter-empty"><div className="empty-icon">✳</div><p className="eyebrow">A space for the latest</p><h3>New updates will appear here.</h3><p>When the publishing workspace is connected, approved campaign updates and newsletter editions will be listed here.</p><Link className="arrow-link" href="/manifesto">Explore the campaign vision <span>↗</span></Link></div></section>
  <section className="newsletter-signup"><div className="wrap signup-inner"><div><p className="eyebrow">Keep in touch</p><h2>Follow the conversation.</h2><p>Subscription signup can be connected when the campaign mailing-list provider is selected.</p></div><span className="signup-placeholder">Email signup<br /><small>To be connected</small></span></div></section><section className="page-next wrap"><span>Explore</span><Link href="/first-100-days"><strong>The first 100 days</strong><span>↗</span></Link></section></main><SiteFooter /></>; }


