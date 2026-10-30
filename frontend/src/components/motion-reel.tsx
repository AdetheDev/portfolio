"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore } from "react";
import "./motion-reel.css";

/** Total length of the reel in seconds. Scroll distance is mapped onto this timeline. */
const DURATION = 15;

const NAME_LINES = ["ALEXANDER", "OBIECHINA"];
const WORDS = ["POWERING", "EMPOWERING", "LEADING"];
const SCENES: Array<[number, string]> = [
  [0, "01 · The name"],
  [2.6, "02 · The leader"],
  [6.6, "03 · The numbers"],
  [11.5, "04 · The drive"],
  [13.2, "05 · The mission"],
];

/**
 * KPI figures shown in the reel.
 * "10 years" comes from the ACOB "10 Years of Impact" milestone in design_tokens.md.
 * Entries with `sample: true` are PLACEHOLDERS: replace them with verified figures before launch.
 * The on-screen "sample figures" notice disappears once no entry is marked as a sample.
 */
const KPIS: Array<{ value: number; suffix: string; label: string; sample: boolean }> = [
  { value: 10, suffix: "", label: "Years of ACOB impact", sample: false },
  { value: 500, suffix: "+", label: "Projects delivered", sample: true },
  { value: 36, suffix: "", label: "States reached", sample: true },
  { value: 1000, suffix: "+", label: "Jobs enabled", sample: true },
];
const HAS_SAMPLES = KPIS.some((k) => k.sample);

const BAND_TEXT = "ACOB LIGHTING TECHNOLOGY LIMITED — 10 YEARS OF IMPACT — MD / CEO — ";

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const ease = {
  out: (x: number) => 1 - Math.pow(1 - x, 3),
  expo: (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)),
  inOut: (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  back: (x: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  },
};

/** Sets opacity and hides the element entirely when it is fully transparent. */
function show(el: HTMLElement, opacity: number) {
  el.style.opacity = String(opacity);
  el.style.visibility = opacity <= 0.001 ? "hidden" : "visible";
}

/**
 * Wires the scroll-scrubbed timeline to the stage. Scroll progress is smoothed, and its
 * velocity feeds skew and chromatic offsets so fast scrolling feels kinetic.
 * Returns a cleanup function.
 */
function createReel(root: HTMLElement, stage: HTMLElement): () => void {
  const all = (k: string) => Array.from(stage.querySelectorAll<HTMLElement>(`[data-a="${k}"]`));
  const one = (k: string) => {
    const el = stage.querySelector<HTMLElement>(`[data-a="${k}"]`);
    if (!el) throw new Error(`motion-reel: missing element ${k}`);
    return el;
  };

  const grid = one("grid");
  const glow = one("glow");
  const title = one("title");
  const letters = all("letter");
  const kicker = one("kicker");
  const photo = one("photo");
  const photoImg = one("photoImg");
  const roleLines = all("roleLine");
  const badge = one("badge");
  const bands = all("band");
  const kpis = all("kpi");
  const kpiNums = all("kpiNum");
  const rings = all("kpiRing");
  const rail = one("rail");
  const railItems = all("railItem");
  const words = all("word");
  const finalEl = one("final");
  const finalLines = all("finalLine");
  const timecode = one("timecode");
  const sceneEl = one("scene");
  const bar = one("bar");
  const hint = one("hint");

  const lastText = new Map<HTMLElement, string>();
  const setText = (el: HTMLElement, text: string) => {
    if (lastText.get(el) !== text) {
      lastText.set(el, text);
      el.textContent = text;
    }
  };

  const KPI_START = 6.9;
  const KPI_SLOT = 1.15;

  /** Renders one frame of the reel at time `t` (seconds) with scroll velocity `v` (-1..1). */
  function apply(t: number, v: number) {
    stage.style.setProperty("--v", v.toFixed(3));

    // Backdrop: moving perspective floor grid and drifting glow
    grid.style.transform = `perspective(700px) rotateX(62deg) translateY(${(t * 70) % 70}px) scale(2.2)`;
    glow.style.transform = `translate(${Math.sin(t * 0.6) * 8}vw, ${Math.cos(t * 0.5) * 6}vh) scale(${
      1 + Math.sin(t * 0.9) * 0.15 + seg(t, 11.4, 13.4) * 0.5
    })`;

    // Scene 1: letters slam up from masks, then the whole title zooms through the camera
    letters.forEach((el, n) => {
      const e = ease.expo(seg(t, 0.15 + n * 0.055, 0.85 + n * 0.055));
      el.style.transform = `translateY(${(1 - e) * 118}%) rotate(${(1 - e) * (n % 2 ? 9 : -9)}deg)`;
    });
    const zoom = ease.inOut(seg(t, 2.35, 3.45));
    title.style.transform = `scale(${1 + seg(t, 0, 2.4) * 0.07 + zoom * 7.5}) skewX(${-v * 8}deg)`;
    show(title, 1 - seg(t, 2.9, 3.4));
    const k = seg(t, 1.5, 2.1);
    show(kicker, k * (1 - seg(t, 2.3, 2.7)));
    kicker.style.transform = `translateY(${(1 - ease.out(k)) * 30}px)`;

    // Scene 2: portrait wipes in, role lines mask-reveal, everything slides out left/right
    const pIn = ease.expo(seg(t, 2.8, 3.9));
    const pOut = ease.inOut(seg(t, 6.1, 6.9));
    show(photo, pIn > 0 && pOut < 1 ? 1 : 0);
    photo.style.clipPath = `inset(0 0 0 ${(1 - pIn) * 100}%)`;
    photo.style.transform = `translateX(${pOut * 115}%)`;
    photoImg.style.transform = `scale(${1.4 - 0.4 * seg(t, 2.8, 6.5)}) translateY(${v * 18}px)`;
    roleLines.forEach((el, i) => {
      const e = ease.expo(seg(t, 3.3 + i * 0.22, 4.0 + i * 0.22));
      const out = ease.inOut(seg(t, 6.0 + i * 0.08, 6.8 + i * 0.08));
      el.style.transform = `translate(${-out * 130}%, ${(1 - e) * 115}%)`;
    });
    const b = seg(t, 4.4, 5.0);
    show(badge, b * (1 - seg(t, 6.0, 6.5)));
    badge.style.transform = `scale(${0.3 + 0.7 * ease.back(b)}) rotate(${(1 - b) * -25}deg)`;

    // Velocity bands: endless marquees that skew with scroll speed
    const bandOp = seg(t, 3.0, 3.7) * (1 - seg(t, 10.9, 11.5));
    bands.forEach((el, i) => {
      const dir = i % 2 ? -1 : 1;
      const pos = (t * 6.5 + Math.abs(v) * 4) % 50;
      show(el, bandOp);
      el.style.transform = `translateX(${dir > 0 ? -pos : pos - 50}%) skewX(${-v * 14}deg)`;
    });

    // Scene 3: KPIs zoom in one at a time and count up; the rail tracks progress
    kpis.forEach((el, i) => {
      const s0 = KPI_START + i * KPI_SLOT;
      const inn = seg(t, s0, s0 + 0.5);
      const out = i < kpis.length - 1 ? seg(t, s0 + 0.9, s0 + KPI_SLOT) : seg(t, 11.1, 11.5);
      const e = ease.expo(inn);
      const o = ease.inOut(out);
      show(el, inn * (1 - o));
      el.style.transform = `translateX(${-o * 55}vw) scale(${(4.2 - 3.2 * e) * (1 - 0.4 * o)})`;
      el.style.filter = inn < 1 ? `blur(${(1 - e) * 14}px)` : "none";
      const value = Number(el.dataset.value ?? 0);
      setText(kpiNums[i], Math.round(value * ease.out(seg(t, s0 + 0.08, s0 + 0.95))).toLocaleString("en-US"));
      const rs = seg(t, s0, s0 + 0.8);
      rings[i].style.transform = `scale(${0.3 + 3 * ease.expo(rs)})`;
      show(rings[i], rs > 0 && rs < 1 ? (1 - rs) * 0.8 : 0);
    });
    const railOp = seg(t, 6.6, 7.1) * (1 - seg(t, 11.1, 11.6));
    show(rail, railOp);
    rail.style.transform = `translate(-50%, ${(1 - railOp) * 30}px)`;
    const active = clamp(Math.floor((t - KPI_START) / KPI_SLOT), 0, kpis.length - 1);
    railItems.forEach((el, i) => {
      el.classList.toggle("is-active", i === active);
      el.classList.toggle("is-done", i < active);
    });

    // Scene 4: keywords fly through the camera
    words.forEach((el, i) => {
      const s = seg(t, 11.5 + i * 0.62, 12.12 + i * 0.62);
      show(el, s > 0 && s < 1 ? Math.pow(Math.sin(Math.PI * s), 0.7) : 0);
      el.style.transform = `scale(${0.25 + Math.pow(s, 1.7) * 4.6}) rotate(${(i - 1) * -3}deg) skewX(${-v * 10}deg)`;
    });

    // Scene 5: closing lockup rises into place
    show(finalEl, seg(t, 13.2, 13.5));
    finalEl.style.transform = `scale(${1 + seg(t, 14, 15) * 0.04})`;
    finalLines.forEach((el, i) => {
      const e = ease.expo(seg(t, 13.2 + i * 0.2, 13.95 + i * 0.2));
      el.style.transform = `translateY(${(1 - e) * 120}%)`;
    });

    // HUD
    show(hint, 1 - seg(t, 0.2, 0.8));
    setText(timecode, `00:${String(Math.min(DURATION, Math.floor(t))).padStart(2, "0")}`);
    setText(sceneEl, [...SCENES].reverse().find(([from]) => t >= from)?.[1] ?? SCENES[0][1]);
    bar.style.transform = `scaleX(${t / DURATION})`;
  }

  const progress = () => {
    const r = root.getBoundingClientRect();
    const total = Math.max(1, r.height - stage.offsetHeight);
    return clamp(-r.top / total);
  };

  let current = progress();
  let last = current;
  let velocity = 0;
  let raf = 0;

  const tick = () => {
    raf = 0;
    const target = progress();
    const d = target - current;
    current = Math.abs(d) < 0.00005 ? target : current + d * 0.14;
    velocity += (clamp((current - last) * 90, -1, 1) - velocity) * 0.2;
    last = current;
    apply(current * DURATION, velocity);
    if (current !== target || Math.abs(velocity) > 0.01) raf = requestAnimationFrame(tick);
  };
  const request = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  apply(current * DURATION, 0);
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request);
  return () => {
    window.removeEventListener("scroll", request);
    window.removeEventListener("resize", request);
    if (raf) cancelAnimationFrame(raf);
  };
}

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia(MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getLive = () => !window.matchMedia(MOTION_QUERY).matches;
const getServerLive = () => false;

/** 15-second scroll-scrubbed motion-graphics introduction to the candidate. Falls back to a static summary without JS or with reduced motion. */
export function MotionReel() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const live = useSyncExternalStore(subscribeMotion, getLive, getServerLive);

  useEffect(() => {
    if (!live || !rootRef.current || !stageRef.current) return;
    return createReel(rootRef.current, stageRef.current);
  }, [live]);

  return (
    <>
    <section ref={rootRef} className={`reel${live ? " is-live" : ""}`} aria-labelledby="reel-heading">
      <h2 className="reel-sr" id="reel-heading">Meet Alexander Obiechina</h2>
      <p className="reel-sr">
        Alexander Obiechina is the Managing Director and CEO of ACOB Lighting Technology Limited, which marks ten years of
        impact, and a candidate for President of the Renewable Energy Association of Nigeria.
      </p>

      <div className="reel-stage" ref={stageRef} aria-hidden="true">
        <div className="reel-floor"><div className="reel-grid" data-a="grid" /></div>
        <div className="reel-glow" data-a="glow" />

        <div className="reel-bands">
          {[0, 1].map((i) => (
            <div className={`reel-band reel-band-${i}`} data-a="band" key={i}>{BAND_TEXT.repeat(8)}</div>
          ))}
        </div>

        <div className="reel-title" data-a="title">
          {NAME_LINES.map((word, li) => (
            <div className={`reel-line${li ? " reel-line-outline" : ""}`} key={word}>
              {[...word].map((c, i) => (
                <span className="reel-mask" key={i}><span className="reel-letter" data-a="letter">{c}</span></span>
              ))}
            </div>
          ))}
        </div>
        <div className="reel-kicker" data-a="kicker">Candidate for REAN President</div>

        <div className="reel-photo" data-a="photo">
          <div className="reel-photo-inner" data-a="photoImg">
            <Image src="/images/candidate-reel.jpg" alt="" fill sizes="(max-width: 800px) 80vw, 40vw" />
          </div>
        </div>
        <div className="reel-role">
          <div className="reel-mask reel-mask-block"><span className="reel-role-big" data-a="roleLine">MD / CEO</span></div>
          <div className="reel-mask reel-mask-block"><span className="reel-role-sub" data-a="roleLine">ACOB Lighting</span></div>
          <div className="reel-mask reel-mask-block"><span className="reel-role-sub" data-a="roleLine">Technology Limited</span></div>
        </div>
        <div className="reel-badge" data-a="badge"><b>10</b><span>Years of<br />impact</span></div>

        {KPIS.map((k, i) => (
          <div className="reel-kpi" data-a="kpi" data-value={k.value} key={k.label}>
            <div className="reel-ring" data-a="kpiRing" />
            <div className="reel-kpi-num"><span data-a="kpiNum">0</span><em>{k.suffix}</em></div>
            <div className="reel-kpi-label">{k.label}{k.sample ? " *" : ""}</div>
            <span className="reel-kpi-index">{String(i + 1).padStart(2, "0")} / {String(KPIS.length).padStart(2, "0")}</span>
          </div>
        ))}
        <ol className="reel-rail" data-a="rail">
          {KPIS.map((k) => (
            <li data-a="railItem" key={k.label}><i />{k.label}</li>
          ))}
        </ol>

        {WORDS.map((w, i) => (
          <div className={`reel-word${i === 1 ? " reel-word-outline" : ""}`} data-a="word" key={w}>{w}</div>
        ))}

        <div className="reel-final" data-a="final">
          <div className="reel-mask reel-mask-block"><span className="reel-final-kicker" data-a="finalLine">REAN Presidential Candidate</span></div>
          <div className="reel-mask reel-mask-block"><span className="reel-final-name" data-a="finalLine">Alexander Obiechina</span></div>
          <div className="reel-mask reel-mask-block"><span className="reel-final-tag" data-a="finalLine">Powering the industry. Empowering our members.</span></div>
        </div>

        <div className="reel-hud">
          <span className="reel-timecode"><b data-a="timecode">00:00</b> / 00:15</span>
          <span className="reel-scene" data-a="scene">01 · The name</span>
          {HAS_SAMPLES && <span className="reel-notice">* Sample figures: confirm before publishing</span>}
          <div className="reel-bar"><i data-a="bar" /></div>
        </div>
        <div className="reel-hint" data-a="hint">Scroll to play <span>↓</span></div>
        <div className="reel-vignette" />
      </div>

      <div className="reel-static wrap">
        <p className="eyebrow">Meet the candidate</p>
        <h2>Alexander Obiechina</h2>
        <p>MD / CEO, ACOB Lighting Technology Limited</p>
        <ul className="reel-static-kpis">
          {KPIS.map((k) => (
            <li key={k.label}><strong>{k.value.toLocaleString("en-US")}{k.suffix}</strong><span>{k.label}{k.sample ? " *" : ""}</span></li>
          ))}
        </ul>
        {HAS_SAMPLES && <p className="reel-static-note">* Sample figures: confirm before publishing</p>}
      </div>
    </section>
    <div className="reel-after wrap">
      <Link className="button button-dark" href="/manifesto">Read the manifesto <span>↗</span></Link>
      <Link className="arrow-link" href="/about">More about Alexander <span>↗</span></Link>
    </div>
    </>
  );
}
