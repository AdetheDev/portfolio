import { MotionReel } from "@/components/motion-reel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = { title: "The Story" };

/** Renders the scroll-driven motion-graphics introduction to Alexander Obiechina. */
export default function StoryPage() {
  return <><SiteHeader /><main id="main"><MotionReel /></main><SiteFooter /></>;
}
