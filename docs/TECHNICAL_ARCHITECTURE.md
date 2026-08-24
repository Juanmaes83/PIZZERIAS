# TECHNICAL ARCHITECTURE — PIZZERIAS

## Purpose

This document defines an implementation direction that supports the immersive experience without turning the product into a GPU-heavy 3D website.

The architecture is deliberately media-first and progressively enhanced.

---

# 1. Recommended frontend direction

Suggested baseline:

- Next.js
- React
- TypeScript
- CSS Modules / Tailwind / equivalent design-system approach
- GSAP or Framer Motion for motion orchestration
- native HTML video
- Canvas API when required for compositing
- lightweight WebGL/shader layer only for specific effects
- schema validation for restaurant/pizza configuration

Do not add Three.js unless a later approved decision identifies one isolated technical need that cannot be solved better another way. Three.js is not part of the base architecture.

---

# 2. Core layers

```text
APP SHELL
  |
  +-- Restaurant Config
  +-- Pizza/Product Store
  +-- Theme System
  +-- Module Registry
  +-- Media Registry
  +-- Analytics
  |
  +-- Oven Module
  +-- Roulette Module
  +-- Trivial Module
  +-- Builder Module
  +-- Pizza Table Module
  |
  +-- Product Detail / Commerce Adapter
```

Each experience module should consume shared services rather than import another module's internal implementation.

---

# 3. Suggested source structure

```text
src/
  app/
  components/
    common/
    product/
    media/
  modules/
    oven/
    roulette/
    trivial/
    builder/
    pizza-table/
  config/
    restaurants/
  domain/
    pizza/
    restaurant/
    promotion/
  media/
    registry/
  motion/
  analytics/
  commerce/
  styles/
```

This is a starting direction, not a mandatory exact tree.

---

# 4. Restaurant configuration

The visual application must not hard-code one restaurant.

A restaurant configuration should determine:

- brand tokens;
- module flags;
- menu data;
- media mapping;
- roulette rules;
- trivial questions;
- recommendation weights;
- builder ingredients;
- ordering adapter.

For the first POC this can be a typed local configuration file.

Do not build an admin CMS until the reusable schema has been validated.

---

# 5. Product state

A shared product selection state should make transitions between modules possible.

Minimum useful state:

```ts
type ProductSelection = {
  pizzaId: string
  sourceModule: 'oven' | 'roulette' | 'trivial' | 'builder' | 'pizza-table' | 'menu'
  variantId?: string
  rewardId?: string
}
```

Do not store full duplicated product objects if the canonical record can be resolved by ID.

---

# 6. Module contract

Each module should conceptually support:

```ts
interface ExperienceModule {
  enabled: boolean
  enter(): void
  selectPizza?(pizzaId: string): void
  exit(): void
}
```

The exact implementation may differ, but modules should remain independently loadable and configurable.

---

# 7. Lazy loading

Roulette, Trivial, Builder and Pizza Table can contain substantial media.

Use dynamic imports / route splitting / deferred media loading.

Rule:

> A user visiting the homepage should not download all assets for every optional module.

Suggested behavior:

- preload hero essentials;
- preload probable next interaction only after idle/intent;
- load module bundle when user approaches/opens it;
- load product-specific media after selection or controlled prefetch.

---

# 8. Oven implementation architecture

Potential layer stack:

```text
[HTML product/UI]
[foreground pizza layer]
[peel video/image sequence]
[heat/shader overlay]
[fire/embers overlay]
[oven base video/image]
[background]
```

The central challenge is masking/occlusion so the selected pizza can appear convincingly on the peel.

Possible technical approaches:

### Option 1 — DOM layers + masks

Fastest POC.

- positioned media elements;
- CSS masks/clip paths;
- transforms;
- motion timeline.

### Option 2 — Canvas compositing

Useful if layer blending/masking becomes difficult in DOM.

### Option 3 — Lightweight WebGL compositor

Use only if heat/displacement/masking needs justify it.

The POC should start at Option 1.

---

# 9. Motion orchestration

A timeline-based motion library is recommended for the Oven and Roulette because they require deterministic multi-step sequencing.

For example:

```text
select
 -> lock interaction
 -> focus scene
 -> start peel
 -> occlusion point
 -> swap selected media
 -> exit peel
 -> foreground reveal
 -> unlock CTA
```

Avoid scattered `setTimeout` chains.

Use explicit state machines or timeline callbacks.

---

# 10. Roulette architecture

The roulette should have separate domains:

```text
roulette-engine.ts
  decides result / probability

roulette-motion.ts
  computes animation / target rotation

roulette-view.tsx
  renders slices / pointer / state

roulette-result.tsx
  reveals product/reward
```

This separation allows:

- unit tests for probability logic;
- visual redesign without changing result rules;
- campaign-specific rewards;
- deterministic replay tests.

---

# 11. Trivial architecture

Use one shared wedge visual system with separate engines.

```text
trivial/
  ui/
  quiz-engine/
  recommendation-engine/
  challenge-engine/
```

Do not create three unrelated applications.

### Recommendation engine

Start with deterministic weighted scoring.

Example:

```ts
scorePizza(pizza, answers)
```

Return:

```ts
{
  pizzaId,
  score,
  matchedReasons
}
```

The `matchedReasons` are valuable for explaining why the pizza was recommended.

---

# 12. Builder architecture

For v1, store selected ingredient IDs and derive visual layers.

```ts
BuilderState {
  baseId
  sauceId
  cheeseIds[]
  toppingIds[]
  extras[]
}
```

Derived values:

- total price;
- asset layers;
- allergens;
- dietary status;
- custom order payload.

Prefer deterministic visual variants.

Example:

```text
seed = hash(session + toppingId)
variant = seed % availableVariants
```

This gives variety without random visual changes on every render.

---

# 13. Pizza Table architecture

Until the parallel specification is integrated, preserve only the contract:

```ts
<PizzaTable
  pizzas={pizzas}
  onSelect={(pizzaId) => ...}
/>
```

Do not make other modules depend on internal Pizza Table mechanics.

---

# 14. Shader/WebGL policy

Shaders/WebGL are tools, not the architecture.

Approved potential effects:

- oven heat haze;
- displacement reveal;
- ember particles;
- subtle smoke distortion;
- transition dissolve;
- cursor-reactive parallax;
- mask interpolation.

Every effect needs:

- a visual reason;
- a fallback;
- mobile performance validation;
- no dependency for basic navigation/commerce.

---

# 15. Reduced motion

Respect `prefers-reduced-motion`.

For reduced-motion mode:

- shorten/remove spins;
- replace dramatic scale travel with fades;
- provide immediate roulette result after minimal transition;
- replace peel journey with short crossfade/reveal;
- keep all CTA functionality.

This is both accessibility and performance resilience.

---

# 16. Media failure handling

If a video fails:

- show poster/static frame;
- preserve controls;
- reveal selected product directly;
- do not leave loading overlay indefinitely.

If WebGL is unavailable:

- skip shader;
- continue with CSS/video effect.

The ordering path must never depend on optional visual effects.

---

# 17. Commerce adapter

Do not couple the immersive system to one delivery provider initially.

Define a simple adapter boundary.

Example:

```ts
interface CommerceAdapter {
  addItem(item): Promise<void>
  startOrder(): Promise<void>
}
```

Possible implementations later:

- internal cart;
- restaurant POS integration;
- external ordering URL;
- delivery platform handoff.

For POC use a local/mock adapter clearly labelled as such.

---

# 18. Testing strategy

## Unit tests

Priority:

- product lookup;
- roulette outcome logic;
- reward probability rules;
- Trivial scoring;
- recommendation weighting;
- builder pricing;
- module flags.

## Interaction tests

Verify:

- selected pizza ID survives the complete interaction;
- result reveal matches selected ID;
- repeated interactions reset state correctly;
- keyboard/touch paths work;
- reduced-motion paths work.

## Visual validation

Required for media-driven modules.

Automated tests cannot confirm that a pizza visually sits correctly on a peel or that a reveal looks convincing.

A human/vision review must validate:

- composition;
- masking;
- transitions;
- crop;
- visual continuity;
- mobile output.

Never report visual completion based only on build/test success.

---

# 19. Performance validation

Track at minimum:

- first visible hero frame;
- hero video startup;
- total first-route transfer;
- module bundle size;
- module media transfer;
- animation smoothness on target mobile devices;
- fallback behavior.

Avoid optimizing theoretical micro-details before measuring real media cost.

---

# 20. First code milestone

A good first implementation milestone is:

```text
NEXT.JS APP
  + typed RestaurantConfig
  + 3 Pizza records
  + theme tokens
  + media registry
  + Oven component
  + selection UI
  + simulated peel/reveal timeline
  + correct pizza foreground mapping
  + mobile layout
  + reduced-motion fallback
```

This milestone is intentionally narrow.

Do not build Roulette, Trivial or Builder until the Oven POC establishes a reliable media interaction pattern.
