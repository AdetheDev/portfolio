import type { Metadata } from "next";
import { PrototypeDesigner } from "@/components/prototype-designer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Design Lab" };

/** Presents five selectable campaign website concepts and their color themes. */
export default function PrototypesPage() {
  return <><SiteHeader /><main id="main"><section className="prototype-intro wrap"><p className="eyebrow">Design exploration / 01</p><h1>Find the look<br />that <em>moves REAN forward.</em></h1><p>Five distinct homepage concepts. Pick a concept, then try its four custom palettes or let it follow your device theme.</p><PrototypeDesigner /></section></main><SiteFooter /></>;
}
