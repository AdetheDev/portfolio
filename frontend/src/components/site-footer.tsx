import Link from "next/link";

/** Shared footer for campaign pages. */
export function SiteFooter() {
  return <footer className="site-footer"><div className="wrap footer-top">
    <Link className="brand brand-footer" href="/"><span className="brand-mark">AO<span>↗</span></span><span className="brand-copy">ALEXANDER<br />OBIECHINA<small>FOR REAN PRESIDENT</small></span></Link>
    <p>Powering the industry.<br />Empowering our members.</p>
    <nav aria-label="Footer navigation"><Link href="/about">About</Link><Link href="/manifesto">Manifesto</Link><Link href="/pillars">Pillars</Link><Link href="/newsletter">Newsletter</Link></nav>
  </div><div className="wrap footer-bottom"><span>© 2026 Alexander Obiechina</span><span>Built for the future of renewable energy in Nigeria.</span></div></footer>;
}
