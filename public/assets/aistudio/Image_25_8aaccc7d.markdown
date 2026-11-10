---
name: CardWise Wealth & Rewards
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#44474c'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#525f75'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#0e1c2f'
  on-primary-container: '#77849c'
  inverse-primary: '#bac7e1'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0f0069'
  on-tertiary-container: '#7671ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3fe'
  primary-fixed-dim: '#bac7e1'
  on-primary-fixed: '#0e1c2f'
  on-primary-fixed-variant: '#3a475c'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#e2dfff'
  tertiary-fixed-dim: '#c3c0ff'
  on-tertiary-fixed: '#0f0069'
  on-tertiary-fixed-variant: '#3323cc'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  currency-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  margin: 1rem
  margin-lg: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.875rem
  space-lg: 1.25rem
  space-xl: 1.75rem
  space-2xl: 2.5rem
---

## Brand & Style

The design system establishes a high-trust, premium financial intelligence environment tailored for Indian credit card holders navigating reward programs, cashback structures, and tier optimizations. The aesthetic fuses Modern Financial Institutionalism with subtle tactile clarity—radiating the rigorous stability of a wealth-management bank alongside the dynamic responsiveness of consumer software. 

The emotional tone balances analytical security, calculated precision, and rewarding delight. Visual clutter is stripped away to spotlight fiscal metrics, savings velocity, and redemption clarity in Indian Rupees (₹). Spatial layouts maintain strict optical alignment, controlled contrast, and deliberate micro-moments of elevation rather than ornamental distractions.

## Colors

The palette leverages a sovereign foundation of deep slate and navy tones offset by targeted semantic signals:

- **Primary Anchor (`#0B192C`):** Grounded deep navy used for primary structural headers, hero surfaces, core brand containers, and key interactive commands. Communicates authority and institutional safety.
- **Secondary / Positive Win (`#059669`):** Vibrant emerald green allocated exclusively to positive yields: earned cashback, rupee savings (₹), favorable APR diffs, and return optimizations.
- **Tertiary Accent (`#4F46E5`):** Electric indigo dedicated to system triggers, progress milestones, secondary action items, and automated calculation toggles.
- **Neutral Core (`#1E293B`):** Dense slate blue providing legible text hierarchy, high-contrast tabular borders, and refined structural scaffolding.
- **Warm Gold Accent (`#D97706`):** Dedicated to milestone reward tiers (e.g., Magnus, Infinia, Zenith), accelerated point multipliers, and expiration warnings.

Subtle slate container fills (`#F8FAFC` to `#F1F5F9`) isolate card modules, while surface tints prevent visual glare across dense monetary data streams.

## Typography

Plus Jakarta Sans governs the interface to deliver a crisp geometric footprint with open counters, critical for parsing tabular digits, decimal points, and Indian Rupee (₹) currency symbols on mobile viewports.

- **Monetary Figures & Data:** All currency amounts must utilize explicit tabular figures (`font-variant-numeric: tabular-nums`) to align vertically across statements and breakdown cards. The ₹ symbol sits at optical height without superscription.
- **Hierarchical Discipline:** High-contrast weights (700 and 800) anchor balance totals and annualized return figures, while functional labels (weights 500 and 600) ensure micro-metadata remains legible down to 11px.
- **Scale Compression:** On devices below 390px width, `display-lg-mobile` replaces default display ranks to avoid clipping multiline Rupee calculations.

## Layout & Spacing

The system runs on a strict 4pt/8pt modular rhythm calibrated for thumb-reach ergonomics across mobile screens (360px through 430px base canvas widths):

- **Grid Framework:** A 4-column fluid mobile grid anchored with a default 16px (`1rem`) outer canvas margin. On wider display classes (tablets and expanded foldables), margins scale up to 24px (`1.5rem`) across an 8-column layout.
- **Vertical Rhythm:** Stack modules preserve consistent spacing: `space-xs` (4px) for inline text-and-icon pairings, `space-sm` (8px) between title and value groupings, `space-md` (14px) for inner card padding, and `space-lg` (20px) to separate independent module groupings.
- **Touch Targets:** All clickable interactive areas respect a strict minimum boundary of 48×48px, independent of visual surface size.

## Elevation & Depth

Visual depth is achieved through balanced atmospheric shadows and surface tonal layering rather than intrusive multi-colored glows:

- **Level 0 (Flat Canvas):** Neutral tinted background (`#F8FAFC`). No shadow. Holds layout structures, non-interactive lists, and background guides.
- **Level 1 (Resting Cards):** Pure white `#FFFFFF` surface accompanied by a subtle slate-tinted ambient drop: `0px 2px 8px -2px rgba(11, 25, 44, 0.06), 0px 1px 3px 0px rgba(11, 25, 44, 0.04)`. Outlined with a fine structural border (`1px solid #E2E8F0`).
- **Level 2 (Active Cards & Overlays):** Interactive card tiers in active or expanded state: `0px 10px 24px -4px rgba(11, 25, 44, 0.10), 0px 4px 8px -2px rgba(11, 25, 44, 0.04)`.
- **Level 3 (Sticky Bottom Sheets & Drawers):** Critical actions, bottom redemption trays, and floating optimization banners: `0px -8px 30px 0px rgba(11, 25, 44, 0.12)`.
- **Glass Accents:** Translucent frosted filters (`backdrop-filter: blur(12px)`) with an 85% alpha fill are strictly limited to fixed top navigation bars and persistent sticky calculation docks.

## Shapes

The interface implements a cohesive curvature scale to balance tactile softness with data-dense efficiency:

- **Core Radius (`roundedness: 2` / 8px):** Applied to standard text fields, micro-badges, tabular chips, and utility buttons.
- **Component Enclosures (`rounded-lg` / 16px):** Standard for primary cards, reward-point breakdown tiles, and bottom-sheet containers.
- **Hero Containers (`rounded-xl` / 24px):** Reserved for primary credit card preview stacks and full-bleed performance dashboards.
- **Full Pill (`rounded-full`):** Strictly used for quick-filter toggles, verification chips, and contextual status dots.

## Components

### Buttons
- **Primary:** Full fill `#0B192C` with text in `#FFFFFF`. Height: 50px. Corner radius: 12px. Active feedback triggers an inner 5% black tint.
- **Secondary / Action:** Fill `#4F46E5` with `#FFFFFF` text for core reward-optimizer triggers (e.g., "Calculate Best Card").
- **Tertiary / Subdued:** Ghost button with `#1E293B` text, background transparent, active state filled with `#F1F5F9`.

### Credit Card Stack
- Aspect ratio: 1.586:1. Multi-card representations use stacked overlapping absolute cards with an offset of 14px vertically and a 4% scale reduction per card tier behind the active surface. Active front card casts Level 2 elevation.
- Display surface displays bank identifier, issuer logo, network badge, reward rate badge (e.g., "3.3% Base / 10% SmartBuy"), and dynamic total reward balance in ₹.

### Micro-Badges & Freshness Chips
- Compact dimensions: height 22px, padding 2px 8px, font token `label-sm`.
- **Verified Policy Chip:** Muted emerald outline (`#A7F3D0`), soft green tint (`#ECFDF5`), deep green text (`#065F46`), preceded by a 6px solid emerald active verification dot to signal updated milestone rules.
- **Point Expiry Indicator:** Amber tint (`#FFFBEB`), text `#B45309`, paired with clock icon.

### Form Inputs & Selectors
- Height: 48px. Background: `#FFFFFF`. Border: 1.5px solid `#E2E8F0`. Focus state: border shifts to Indigo (`#4F46E5`) with an ambient 3px indigo wash at 15% opacity (`box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15)`).
- Dedicated INR prefix `₹` locked inline in semi-bold slate `#64748B`.

### Reward Comparison Table
- Striped alternating row backgrounds (`#FFFFFF` to `#F8FAFC`).
- Sticky primary column containing card identifier. Comparison attributes (Reward Rate, Forex Markup, Lounge Access, Net ₹ Yield) arranged along horizontal friction-less scroll vectors.
- Highlight cells: The mathematically superior option across any metric receives an emerald outline frame with an inner `#ECFDF5` background highlight.