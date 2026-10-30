/** Consistent heading block for an interior page. */
export function PageIntro({ number, label, eyebrow, title, emphasis, description, dark = false }: { number: string; label: string; eyebrow: string; title: string; emphasis?: string; description: string; dark?: boolean }) {
  return <section className={`page-hero${dark ? " page-hero-green" : ""}`}><div className="wrap">
    <div className="section-kicker"><span>{number}</span><span className="kicker-rule" /><span>{label}</span></div>
    <p className="eyebrow">{eyebrow}</p><h1>{title}{emphasis && <><br /><em>{emphasis}</em></>}</h1><p className="page-lede">{description}</p>
  </div></section>;
}
