# ACOB Ecosystem — Design Tokens, Effects & Animations System

This document provides the definitive specification for design tokens, visual effects, motion curves, micro-interactions, physics models, and animations implemented across the **ACOB Ecosystem** gateway platform.

---

## 1. ACOB Brand Palette

Primary corporate identity ramp for ACOB Lighting Technology Limited:

| Token Name | Hex Code | Swatch | Description & Usage |
| :--- | :--- | :--- | :--- |
| `--color-brand` | `#008000` | ![#008000](https://placehold.co/15x15/008000/008000.png) | Core official ACOB brand green |
| `--color-brand-bright` | `#22c55e` | ![#22c55e](https://placehold.co/15x15/22c55e/22c55e.png) | Vibrant green for glows, active indicators, and mesh highlights |
| `--color-brand-mint` | `#7dfc9a` | ![#7dfc9a](https://placehold.co/15x15/7dfc9a/7dfc9a.png) | High-contrast neon mint for dark mode text & heading gradients |
| `--color-brand-deep` | `#005c00` | ![#005c00](https://placehold.co/15x15/005c00/005c00.png) | Deep forest green base shade |
| `--color-gold` | `#b8862e` | ![#b8862e](https://placehold.co/15x15/b8862e/b8862e.png) | Warm anniversary gold used in the "10 Years of Impact" pulse badge |

---

## 2. Semantic Color Tokens

Tokens are defined as CSS custom properties in `src/app/globals.css`. Light mode values are tailored with sage green tints to avoid cold neutral greys, while dark mode leverages near-black greens and vivid mint accents.

| Token | Light Theme (`:root`) | Dark Theme (`.dark`) | Intended Role |
| :--- | :--- | :--- | :--- |
| `--background` | `#f4f8f5` | `#03090a` | Viewport ground / page background |
| `--foreground` | `#0b1a10` | `#f2f7f3` | Primary body copy and headings |
| `--muted` | `rgba(11, 26, 16, 0.68)` | `rgba(242, 247, 243, 0.55)` | Secondary body copy and card descriptions |
| `--soft` | `rgba(11, 26, 16, 0.74)` | `rgba(242, 247, 243, 0.65)` | Interactive action links and subtle glyphs |
| `--subtle` | `rgba(11, 26, 16, 0.60)` | `rgba(242, 247, 243, 0.35)` | Tertiary text, copyright notices, and dock labels |
| `--surface` | `rgba(255, 255, 255, 0.72)` | `rgba(255, 255, 255, 0.04)` | Translucent card glass surfaces (with `backdrop-blur-xl`) |
| `--surface-hover` | `rgba(255, 255, 255, 0.92)` | `rgba(255, 255, 255, 0.07)` | Elevated surface hover state |
| `--chip` | `rgba(21, 128, 61, 0.06)` | `rgba(255, 255, 255, 0.06)` | Background fill for tags, pills, and dock items |
| `--line` | `#c9d6cd` *(Sage)* | `rgba(255, 255, 255, 0.10)` | Standard card borders and section dividers |
| `--line-strong` | `#bccbc1` | `rgba(255, 255, 255, 0.12)` | Prominent borders, dock perimeter, and button edges |
| `--accent` | `#15803d` | `#7dfc9a` | Interactive focus, hover, and active text states |
| `--accent-muted` | `#15803d` | `rgba(125, 252, 154, 0.70)` | Monospace domain URLs and secondary links |
| `--glow` | `#16a34a` | `#22c55e` | Focus ring outlines and animated perimeter sheens |
| `--panel` | `#ffffff` | `#0a1710` | Opaque surfaces: dropdowns, overlays, and tooltips |
| `--heading-from` | `#166534` | `#7dfc9a` | Heading gradient start and end stops |
| `--heading-via` | `#16a34a` | `#22c55e` | Heading gradient midpoint stop |
| `--vignette` | `rgba(244, 248, 245, 0.70)` | `rgba(3, 9, 10, 0.70)` | Radial vignette edge-fade masking canvas edges |
| `--panel-shadow` | `rgba(11, 26, 16, 0.22)` | `rgba(0, 0, 0, 0.80)` | Deep elevation drop shadows |
| `--scroll-thumb` | `rgba(21, 128, 61, 0.30)` | `rgba(34, 197, 94, 0.25)` | Custom scrollbar thumb track |
| `--scroll-thumb-hover` | `rgba(21, 128, 61, 0.50)` | `rgba(34, 197, 94, 0.45)` | Custom scrollbar thumb hover state |

---

## 3. Tailwind CSS v4 Theme Mapping

Mapped inline in `src/app/globals.css` via `@theme inline`:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-soft: var(--soft);
  --color-subtle: var(--subtle);
  --color-surface: var(--surface);
  --color-surface-hover: var(--surface-hover);
  --color-chip: var(--chip);
  --color-line: var(--line);
  --color-line-strong: var(--line-strong);
  --color-accent: var(--accent);
  --color-accent-muted: var(--accent-muted);
  --color-glow: var(--glow);
  --color-panel: var(--panel);
  --color-heading-from: var(--heading-from);
  --color-heading-via: var(--heading-via);

  /* ACOB brand ramp */
  --color-brand: #008000;
  --color-brand-bright: #22c55e;
  --color-brand-mint: #7dfc9a;
  --color-brand-deep: #005c00;
  --color-gold: #b8862e;

  /* Typography */
  --font-sans: var(--font-jakarta);
}
```

---

## 4. Typography Tokens

Configured in `src/app/layout.tsx` using `next/font/google`:

- **Primary Font Family**: **Plus Jakarta Sans** (`--font-jakarta`, mapped to `--font-sans`)
  - Subsets: `latin`
  - Display: `swap`
  - Weights:
    - `400` (Regular): Default body copy
    - `500` (Medium): Secondary descriptions
    - `600` (SemiBold): Open action links, active indicators
    - `700` (Bold): Section tags, anniversary badge, tooltips
    - `800` (ExtraBold): Page title (`h1`), platform card titles (`h3`)
- **Monospace Font Family**: `font-mono` (System monospace stack for technical URLs & handles)
- **Text Rendering**: `-webkit-font-smoothing: antialiased`
- **Text Selection**:
  ```css
  ::selection {
    background: rgba(34, 197, 94, 0.3);
    color: var(--foreground);
  }
  ```

---

## 5. Visual Effects & Glassmorphism

### 5.1 Glassmorphism & Surface Treatments
- **Standard Card Surface**: `bg-surface backdrop-blur-xl border border-line`
  - Uses ultra-high backdrop blur (`24px`) with high-transparency alpha layers to sample the underlying animated Verlet neon mesh.
- **Elevated Hover Surface**: `hover:bg-surface-hover hover:border-glow/45`
  - Deepens opacity and illuminates borders with an alpha-tinted glow (`45%`).
- **Card Hover Wash**: An absolute gradient underlay:
  ```html
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-glow/12 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  ```

### 5.2 Vignette & Edge Masks
- **Center-out Radial Vignette**:
  ```css
  bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--vignette)_100%)]
  ```
  Blends the edges of the 3D canvas mesh smoothly into the solid page background.
- **Top / Bottom Linear Edge Fades**:
  - Top: `h-28 bg-gradient-to-b from-background to-transparent`
  - Bottom: `h-28 bg-gradient-to-t from-background to-transparent`

### 5.3 Text Gradient Clip
Used on the hero title spotlight phrase ("one place."):
```css
bg-gradient-to-r from-heading-from via-heading-via to-heading-from bg-clip-text text-transparent
```
- In Light Mode: Transitions from deep forest `#166534` through bright `#16a34a`.
- In Dark Mode: Transitions from bright mint `#7dfc9a` through neon green `#22c55e`.

### 5.4 Elevation & Drop Shadows
- **Dock Tooltip**: `shadow-[0_16px_40px_-14px_var(--panel-shadow)]`
- **Theme Toggle Dropdown**: `shadow-[0_20px_50px_-15px_var(--panel-shadow)]`
- **Launch Modal Overlay**: `shadow-[0_30px_80px_-20px_var(--panel-shadow)]`
- **Social Dock Hover Glow**: `shadow-[0_10px_28px_-8px_var(--brand)]` dynamically tinted to each platform's brand color.

---

## 6. Keyframe Animations & Easing Specifications

### 6.1 Staggered Entrance: `fade-up`
Smooth upward fade applied progressively on initial page render:
```css
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  opacity: 0;
  animation: fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
```

**Stagger Timing Waterfall**:
- Header: `0.00s`
- Main Title (`h1`): `0.10s`
- Subtitle Paragraph: `0.18s`
- Platform Cards: `0.30s + (index * 0.08s)`
  - Card 0 (ACOB Lighting): `0.30s`
  - Card 1 (Matrix ERP): `0.38s`
  - Card 2 (Beverly): `0.46s`
  - Card 3 (Webmail): `0.54s`
- Footer: `0.75s`
- Social Dock Tiles: `0.90s + (index * 0.07s)`

### 6.2 Radar Pulse Badge: `pulse-dot`
Infinite dual-ring radar ping animation for the anniversary milestone badge:
```css
@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);
  }
  50% {
    opacity: 0.85;
    box-shadow: 0 0 0 6px rgba(34, 197, 94, 0);
  }
}

.animate-pulse-dot {
  animation: pulse-dot 2.4s ease-in-out infinite;
}
```

### 6.3 Conic Sheen Comet: `dock-orbit`
A beam of light that continuously traces around the rounded border of the social dock. Leverages CSS `@property` angle registration and dual mask composite clipping:
```css
@property --dock-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes dock-orbit {
  to {
    --dock-angle: 360deg;
  }
}

.dock-sheen::before {
  content: "";
  position: absolute;
  inset: -1px;
  padding: 1px;
  border-radius: inherit;
  background: conic-gradient(
    from var(--dock-angle),
    transparent 0 72%,
    var(--glow) 86%,
    transparent 100%
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.55;
  pointer-events: none;
  animation: dock-orbit 7s linear infinite;
}
```

---

## 7. Interactive Physics & Complex Motion

### 7.1 Verlet Cloth Physics Simulation (`src/components/neon-mesh.tsx`)
A real-time 3D Verlet physics engine rendering an interactive cloth mesh on `<canvas>`:

| Physics Parameter | Value | Behavior |
| :--- | :--- | :--- |
| **Grid Spacing** | `46px` (Desktop) / `58px` (Mobile `<768px`) | Keeps point count optimal for 60fps mobile execution |
| **Solver Iterations** | `4` cycles per frame | Balances cloth stiffness with constraint convergence |
| **Inertia / Damping** | `0.93` | Simulates air drag on point velocities |
| **Spring Hooke Return** | `0.04` | Restores displaced points back toward origin coordinates |
| **Ambient Sine Wave** | `Math.sin(x*0.015 + y*0.015 + time) * 20` | Generates continuous rolling ripples across Z-axis |
| **Wave Speed** | `+0.022` per frame | Ambient background undulation |
| **Camera Perspective** | `620` (Origin: `width/2`, `height/2`) | 3D projective transformation depth |
| **Cursor Lerp Smoothing** | `0.05` factor | Smooth orbital rotation towards cursor angle |
| **Interactive Cursor Radius** | `150px` | Distance threshold for mouse repulsion |
| **Repulsion Force** | `(1 - dist / 150) * 15` | Displaces XY points outward and pushes Z into the screen |
| **Hot Point Proximity** | `85px` threshold | Draws glowing circular dots with radius `1.8 * scale` |
| **Line Stroke Width** | Normal: `0.6 * scale` / Hot: `1.4 * scale` | Dynamic line weight scaling based on proximity & 3D depth |

### 7.2 macOS-Style Dock Magnification (`src/components/social-dock.tsx`)
Interactive cursor proximity magnification calculated via Framer Motion transforms:
- **Proximity Influence Radius (`RANGE`)**: `110px`
- **Tile Dimensions**: Base `36px` $\rightarrow$ Magnified Peak `54px`
- **Glyph Dimensions**: Base `16px` $\rightarrow$ Magnified Peak `23px`
- **Spring Configuration**:
  ```ts
  const spring = { mass: 0.1, stiffness: 170, damping: 12 };
  ```
- **Tap Feedback**: `whileTap={{ scale: 0.9 }}`
- **Tooltip Spring**:
  ```ts
  { type: "spring", stiffness: 400, damping: 28 }
  ```

### 7.3 TikTok Chromatic Aberration Hover Split
On hovering the TikTok social tile, twin cyan and red optical aberration ghost layers diverge behind the mark:
- **Cyan Ghost**: `text-[#25f4ee]`, moves `-1.5px` X, `-1.0px` Y with `opacity: 100%`
- **Red Ghost**: `text-[#fe2c55]`, moves `+1.5px` X, `+1.0px` Y with `opacity: 100%`
- **Duration**: `300ms` ease transition

### 7.4 Card Launch & 3D Flight Transition (`src/components/launch-overlay.tsx`)
When a platform card is clicked, the viewport launches into a perspective flight transition:

```
[ Enter Phase ] ──(720ms Zoom)──> [ Center Stage ] ──(260ms Hold)──> [ Exit Phase ] ──(Navigate)
(Exact Click Rect)             (Hero Modal Size)                  (Rushes Camera 5.5x)
```

1. **Enter Phase (Frame 0-1)**:
   - Captures `getBoundingClientRect()` of source card.
   - Initial modal offsets: `fromX`, `fromY`, `fromScale = Math.min(rect.width / card.w, 0.85)`.
2. **Zoom Phase (`720ms`)**:
   - Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
   - Modal sizes to `Math.min(420, innerWidth * 0.86)` by `Math.min(520, innerHeight * 0.68)`.
   - Centers onto screen at `scale: 1, x: 0, y: 0`.
   - Page background recedes:
     ```css
     .is-launching .page-content {
       transform: scale(0.97);
       filter: blur(2px);
       opacity: 0.5;
       transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease, opacity 0.6s ease;
     }
     ```
3. **Hold Beat (`260ms`)**:
   - Holds card centered while user absorbs destination metadata.
4. **Exit Departure (`560ms`)**:
   - Easing: `[0.4, 0, 0.9, 0.4]` (high acceleration)
   - Keyframe Scale: `[1, 0.94, 5.5]` (slight pullback dip, then explodes 5.5x past the camera)
   - Keyframe Opacity: `[1, 1, 0]` (remains solid until passing the camera horizon)
   - Backdrop: Fades to full opacity `1.0`.
   - Completion: Executes navigation callback `window.location.href = platform.href`.

### 7.5 Theme Toggle Sun/Moon Morph (`src/components/theme-toggle.tsx`)
Smooth 90-degree rotational swap between solar and lunar icons:
- **Sun**: `scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90`
- **Moon**: `scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0`
- **Radio Selection Spring**: Shared layout animation `layoutId="activeTheme"` with `{ type: "spring", stiffness: 300, damping: 30 }`.

---

## 8. Accessibility & Reduced Motion

The application strictly honors `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-fade-up,
  .animate-pulse-dot {
    animation: none;
    opacity: 1;
  }
  .is-launching .page-content {
    transition: none;
  }
  .dock-sheen::before {
    animation: none;
  }
  html {
    scroll-behavior: auto;
  }
}
```

- **Canvas Mesh**: Background lattice renders in a stationary, pinned state with ambient wave and cursor repulsion disabled.
- **Social Dock**: Magnification is suppressed; tiles remain at static `36px` base size.
- **Launch Overlay**: Skipping the 1.5s 3D flight transition; triggers direct navigation within `120ms`.
