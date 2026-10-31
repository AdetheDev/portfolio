"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const links = [["Home", "/"], ["About", "/about"], ["Story", "/story"], ["Manifesto", "/manifesto"], ["Pillars", "/pillars"], ["First 100 days", "/first-100-days"], ["Newsletter", "/newsletter"]];

/** Shared responsive navigation for campaign pages. */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header">
    <Link className="brand" href="/" aria-label="Alexander Obiechina campaign home"><span className="brand-mark">AO<span>↗</span></span><span className="brand-copy">ALEXANDER<br />OBIECHINA<small>FOR REAN PRESIDENT</small></span></Link>
    <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-nav" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
    <nav className={`site-nav${menuOpen ? " is-open" : ""}`} id="site-nav" aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href} className={pathname === href ? "active" : undefined} aria-current={pathname === href ? "page" : undefined} onClick={() => setMenuOpen(false)}>{label}</Link>)}</nav>
    <ThemeToggle />
    <Link className="header-cta" href="/manifesto">Explore the vision <span>↗</span></Link>
  </header>;
}
