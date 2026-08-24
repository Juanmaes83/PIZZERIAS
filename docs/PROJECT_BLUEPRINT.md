# PROJECT BLUEPRINT — PIZZERIAS IMMERSIVE PLATFORM

## Purpose of this document

This document defines the product architecture, interaction logic and development boundaries of the PIZZERIAS project so that a new developer or AI can enter the repository and understand what must be built without needing prior conversation context.

The repository name is temporary.

---

# 1. Product thesis

Most pizzeria websites behave like catalogues: logo, hero image, menu, gallery, contact and ordering link.

This project explores a different model:

> **Turn pizza discovery itself into an interactive visual experience, while preserving the clarity and usefulness of a real restaurant website.**

The platform is intended to become reusable across many pizzerias.

Therefore every major experience must satisfy two conditions simultaneously:

1. it creates a memorable interaction;
2. it resolves to a real pizza/product/action.

The system must not become a collection of disconnected visual tricks.

---

# 2. Non-negotiable architecture decision

## NO 3D

Do not introduce 3D models, 3D pizza geometry, 3D ovens or a Three.js scene as the product foundation.

The platform should create the **illusion of physical depth and cinematic interaction** using media and compositing.

Preferred visual techniques:

- photographic assets;
- video plates;
- alpha-channel / transparent assets where supported;
- foreground/background layers;
- masks;
- clipping paths;
- CSS transforms;
- scale, blur, perspective and parallax;
- canvas compositing;
- shader/WebGL effects only when useful;
- scroll or pointer-reactive motion;
- pre-rendered cinematic transitions.

A developer should always ask:

> Can this interaction be achieved more convincingly, more cheaply and more reliably with generated/filmed media plus compositing than with runtime 3D?

For this project, the default answer should be **yes**.

---

# 3. The five official product pillars

## 3.1 Oven

Role: central visual signature and shared finishing/reveal mechanic.

Primary use cases:

- homepage hero;
- pizza selection reveal;
- product transition;
- final step of Build Your Pizza;
- promotional reveals.

Canonical flow:

`user selects pizza -> correct pizza media is resolved -> oven sequence -> peel exits -> pizza foreground reveal -> product information -> CTA`

Important constraint:

The interaction must not fake selection with one generic pizza if the product says another pizza was selected. The media pipeline and runtime must maintain product/media identity.

Potential implementation strategies:

### Strategy A — Pre-rendered full clips per pizza

Best visual fidelity, expensive in asset count.

### Strategy B — Shared oven/peel clip + composited pizza layer

Preferred for scalability if the illusion is convincing.

### Strategy C — Shared start/end clips + product-specific foreground reveal

Lowest production complexity and useful as first prototype.

The first prototype should test B and C before committing to A.

---

## 3.2 Roulette

Role: gamified random discovery and promotion.

The wheel visually behaves like a complete top-down pizza made from different triangular pizza slices.

The UI must separate:

- **visual wheel state**;
- **selection algorithm**;
- **reward logic**;
- **pizza/product resolution**.

This prevents business probabilities from being tied to animation geometry.

Canonical state machine:

```text
idle
 -> ready
 -> spinning
 -> slowing
 -> selected
 -> slice_extract
 -> foreground_reveal
 -> product/reward
 -> order/replay
```

The result should be decided deterministically before or during the spin and the animation should resolve visually to that result.

Never determine the commercial result from approximate visual rotation after the animation.

---

## 3.3 Trivial

Role: interactive discovery through questions.

Shared visual metaphor: pizza wedges/slices form a circular board. Individual slices begin hidden, neutral or partially obscured and are revealed through user answers.

### MODE A — Pizza Quiz

Purpose: entertainment and brand education.

Data:

```ts
QuizQuestion {
  id
  question
  answers[]
  correctAnswer
  explanation?
  unlockPizzaId?
  points?
}
```

Potential outcomes:

- score;
- completed pizza;
- reward;
- badge;
- unlocked menu item.

### MODE B — Discover Your Pizza

Purpose: recommendation and conversion.

This mode should be treated as a lightweight recommendation engine rather than a knowledge quiz.

Each pizza has recommendation tags or weighted attributes.

Example dimensions:

- spice;
- richness;
- meat/vegetarian;
- tomato/white;
- classic/adventurous;
- light/heavy;
- cheese intensity;
- simplicity/loaded.

Each answer contributes weights to candidate pizzas.

Minimal scoring model:

```text
pizzaScore = sum(answerWeight * pizzaAttributeMatch)
```

Do not use AI/LLM recommendation as the first implementation. A deterministic system is cheaper, faster and auditable.

AI can be added later for conversational explanation or richer personalization.

### MODE C — Pizza Challenge

Purpose: replayability, promotion and social participation.

The Challenge should support configurable campaigns:

```ts
ChallengeCampaign {
  id
  activeFrom
  activeTo
  questions[]
  completionRule
  rewardRule
  shareMessage
}
```

---

## 3.4 Build Your Pizza

Role: customization and direct transaction.

Visual architecture should be 2D compositing.

Recommended stack model:

```text
base crust image
+ sauce layer
+ cheese layer
+ ingredient layers
+ finishing layer
```

Ingredients should not necessarily be rendered as hundreds of independent DOM elements. Pre-rendered clusters can look more realistic and perform better.

Two possible modes:

### Controlled presets

Each topping selection maps to a prepared image layer.

Best for launch.

### Procedural 2D scatter

Canvas places a collection of transparent ingredient sprites using seeded positions.

Potential second stage if necessary.

The completed pizza must produce a normalized custom product object and then enter the Oven flow.

---

## 3.5 Pizza Table

Role: visually rich menu browsing.

The detailed specification is being developed in parallel and is not frozen yet.

Architectural contract that must already be respected:

- consumes the same `Pizza` records as all other modules;
- returns a selected `pizzaId`;
- uses replaceable media references;
- does not require 3D;
- can be loaded independently;
- must be compatible with mobile;
- product selection can hand off to Oven or product detail.

Do not invent a final Pizza Table interaction until the parallel specification is integrated.

---

# 4. Shared product flow

All five modules must connect to one canonical product system.

```text
                RESTAURANT CONFIG
                       |
                   PIZZA DATA
                       |
       +---------------+---------------+
       |               |               |
     OVEN          ROULETTE         TRIVIAL
       |               |               |
       +-------+-------+-------+-------+
               |               |
         BUILD YOUR PIZZA   PIZZA TABLE
               |               |
               +-------+-------+
                       |
                  PRODUCT STATE
                       |
                PRODUCT DETAIL
                       |
               ORDER / RESERVE
```

A module should never create its own duplicate pizza data model.

---

# 5. Suggested domain model

## Restaurant

```ts
interface RestaurantConfig {
  id: string
  slug: string
  name: string
  brand: BrandConfig
  modules: ModuleConfig
  media: RestaurantMedia
  pizzas: Pizza[]
  promotions: Promotion[]
  quiz: QuizConfig
  roulette: RouletteConfig
  ordering: OrderingConfig
}
```

## Pizza

```ts
interface Pizza {
  id: string
  slug: string
  name: string
  description: string
  ingredients: Ingredient[]
  allergens: string[]
  dietaryTags: string[]
  price: number
  media: {
    hero?: string
    top?: string
    transparent?: string
    slice?: string
    ovenReveal?: string
    table?: string
  }
  recommendation: Record<string, number | string | boolean>
  active: boolean
}
```

## Module configuration

```ts
interface ModuleConfig {
  oven: boolean
  roulette: boolean
  trivialQuiz: boolean
  trivialRecommend: boolean
  trivialChallenge: boolean
  buildYourPizza: boolean
  pizzaTable: boolean
}
```

---

# 6. Media registry

Do not scatter hard-coded URLs throughout components.

Create a central media registry.

Example:

```ts
mediaRegistry.oven.hero.desktop
mediaRegistry.oven.hero.mobile
mediaRegistry.oven.peel.enter
mediaRegistry.oven.peel.exit
mediaRegistry.pizzas['diavola'].top
mediaRegistry.pizzas['diavola'].slice
```

Benefits:

- media can be regenerated without rewriting interactions;
- Higgsfield can be replaced later;
- A/B visual testing becomes possible;
- restaurant themes become easier;
- mobile-specific assets can be mapped cleanly.

---

# 7. Interaction layer vs media layer

These two concerns must remain separate.

## Interaction layer decides

- what the user selected;
- current module state;
- what result was generated;
- what pizza/reward corresponds to that result;
- what CTA should appear.

## Media layer decides

- what asset is currently shown;
- how it transitions;
- how masking/compositing behaves;
- whether an effect uses CSS, video, canvas or WebGL.

This separation is critical for long-term reuse.

---

# 8. Proposed route structure

Final URL design can change, but a first architecture may be:

```text
/
/menu
/roulette
/discover
/challenge
/build
/table
/pizza/[slug]
/order
```

For white-label/multi-restaurant architecture later:

```text
/[restaurant]/...
```

or domain-based tenancy.

Do not build multi-tenant infrastructure before a single configurable restaurant prototype works.

---

# 9. Progressive enhancement

Every module needs three visual capability levels.

## Level A — Premium

Video + compositing + lightweight shaders/WebGL + motion.

## Level B — Standard

Video/image + CSS motion, no shader dependency.

## Level C — Fallback

Static optimized media + standard menu/product controls.

Business actions must work at every level.

---

# 10. Mobile behavior

This platform must be designed mobile-first even though cinematic prototypes may begin on desktop.

Key mobile rules:

- use portrait-specific crops where required;
- avoid tiny wheel slices;
- interaction targets >= practical touch size;
- foreground reveals must not hide CTA/data;
- do not autoplay sound;
- respect bandwidth/data saver considerations;
- preload less media than desktop;
- do not load inactive module assets;
- test Safari iOS as a first-class target.

---

# 11. Analytics events

Every module should emit normalized analytics events.

Examples:

```text
module_view
pizza_selected
oven_started
oven_reveal_complete
roulette_started
roulette_result
quiz_answered
recommendation_complete
challenge_complete
builder_ingredient_added
builder_complete
pizza_table_selected
add_to_cart
order_started
```

Each event should include restaurant ID, pizza ID when available and source module.

This will allow the platform to answer whether immersive interactions actually improve discovery/conversion.

---

# 12. First proof-of-concept target

Do not attempt all five pillars simultaneously.

The first proof should validate the visual grammar.

## Oven POC

Deliver one working page with:

- one oven scene;
- three selectable pizzas;
- one shared peel transition or equivalent;
- product-specific pizza foreground image;
- clean transition back/reselect;
- desktop + mobile behavior;
- lightweight fallback;
- performance measurement.

### Why this first

If the oven cannot convincingly create a selected-pizza reveal using media/compositing without 3D, the central concept needs adjustment before building the other modules.

---

# 13. Second validation target

## Roulette POC

Use at least six visually distinct pizza slices.

Prove:

- spin state;
- deterministic selection;
- result alignment;
- slice extraction illusion;
- correct product mapping;
- restart/replay;
- mobile interaction.

---

# 14. Third validation target

## Trivial Recommendation POC

Start with Mode B before the other Trivial modes because it has the strongest direct product value.

Prove:

- 5–7 preference questions;
- deterministic weighting;
- recommendation among at least six pizzas;
- explainable recommendation;
- handoff to product/Oven.

Then add Quiz and Challenge using the same wedge UI.

---

# 15. What must NOT happen

Do not:

- rebuild pizza records separately in each module;
- choose 3D because it seems more technically impressive;
- create long cinematic videos that block user control;
- require a large download before menu information is usable;
- bake product names/prices into generated videos;
- make all text part of imagery;
- generate inconsistent pizza camera angles that cannot be composited;
- lock frontend code to one restaurant brand;
- build the CMS before proving the experience;
- use AI where deterministic logic is enough;
- make the experience inaccessible without motion.

---

# 16. Platform test

Before calling the architecture reusable, clone the configuration into a second fictional restaurant.

Change:

- brand;
- logo;
- typography;
- oven media;
- pizza menu;
- product images;
- quiz content;
- roulette content;
- promotions.

If the second restaurant requires major component rewrites, the system is not yet a platform.

---

# 17. Long-term opportunity

Once the five pillars work as a configurable platform, possible extensions include:

- campaign-specific roulette landing pages;
- QR experiences at the restaurant table;
- seasonal pizza discovery games;
- loyalty/rewards;
- local-store variants;
- multi-language menus;
- reservation integration;
- takeaway/delivery integrations;
- franchise templates;
- analytics dashboard;
- CMS/self-service onboarding.

These are later layers. The first objective is to prove the five-pillar immersive interaction system.
