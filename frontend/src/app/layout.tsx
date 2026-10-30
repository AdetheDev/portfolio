import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import "./campaign.css";
import "./scroll.css";
import "./prototypes.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700", "800"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: { default: "Alexander Obiechina for REAN President", template: "%s | Alexander Obiechina for REAN President" },
  description: "A stronger REAN. Greater member value. A more influential renewable energy industry.",
};

/** Applies the saved or system theme before first paint to avoid a light flash. */
const themeInit = `try{var t=localStorage.getItem("rean-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

/** Wraps campaign routes in the shared document shell. */
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en" className={jakarta.variable} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeInit }} /></head><body><div className="scroll-progress" aria-hidden="true" />{children}</body></html>;
}
