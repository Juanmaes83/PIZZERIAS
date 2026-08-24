# AI HANDOFF — READ BEFORE DEVELOPING

## Why this file exists

This repository is intended to be understandable and executable by a developer or AI agent entering the project without prior conversational context.

Before changing code, read in this order:

1. `README.md`
2. `docs/PROJECT_BLUEPRINT.md`
3. `docs/AI_HANDOFF.md`
4. `docs/MEDIA_PRODUCTION_GUIDE.md`
5. `docs/TECHNICAL_ARCHITECTURE.md`

If future documents contradict these files, prefer the most recent explicitly approved decision log/document.

---

# 1. Mission

Build a reusable immersive web platform for pizzerias based on five connected modules:

1. Oven
2. Pizza Roulette
3. Pizza Trivial
   - Pizza Quiz
   - Discover Your Pizza
   - Pizza Challenge
4. Build Your Pizza
5. Pizza Table

The platform must be customizable for different restaurants by replacing configuration, media and content rather than rebuilding the frontend.

---

# 2. Hard constraint: NO 3D

Do not introduce runtime 3D as the architecture.

Do not use:

- 3D pizza models;
- 3D ovens;
- GLTF/GLB asset pipelines;
- Three.js scenes as the website base;
- 3D camera navigation;
- 3D physics.

Allowed when justified:

- image compositing;
- video;
- CSS transforms/perspective;
- 2.5D/parallax;
- canvas;
- lightweight WebGL;
- shaders;
- mask/displacement transitions;
- particles or heat distortion.

If a proposed solution needs 3D, stop and design an image/video/compositing alternative first.

---

# 3. Product priority

The objective is not technical spectacle.

Every immersive interaction must connect to a useful restaurant action:

- discover a pizza;
- understand a pizza;
- receive a recommendation;
- customize a pizza;
- add to cart;
- start an order;
- activate a promotion;
- share a challenge.

A beautiful effect that does not improve the product flow should be treated as optional.

---

# 4. Shared truth model

All modules must consume the same canonical pizza records.

Never create separate hard-coded pizza arrays for Oven, Roulette, Trivial, Builder or Table.

Use one product source and module-specific media references.

Expected pattern:

```text
RestaurantConfig
   |
   +-- pizzas[]
   |
   +-- modules
   |
   +-- roulette config
   |
   +-- quiz config
   |
   +-- media registry
```

Each interaction should pass around `pizzaId` or a normalized product object.

---

# 5. Development order

Unless explicitly changed by a later approved decision, work in this order:

## Stage 0 — Foundation

Create:

- app shell;
- design/theme tokens;
- restaurant config;
- pizza schema;
- media registry;
- module feature flags;
- basic analytics event layer;
- responsive foundation.

## Stage 1 — Oven POC

This is the first visual proof.

Target:

- three pizzas;
- user selects one;
- oven/peel sequence responds;
- correct selected pizza appears in foreground;
- CTA works;
- mobile and desktop;
- fallback works.

Do not expand scope until this illusion is validated.

## Stage 2 — Roulette

Target:

- six+ slices;
- deterministic outcome;
- convincing spin/deceleration;
- selected slice foreground reveal;
- maps to correct pizza.

## Stage 3 — Trivial

Implement recommendation mode first, then Quiz and Challenge.

## Stage 4 — Build Your Pizza

2D layer compositing, pricing and Oven handoff.

## Stage 5 — Pizza Table

Integrate the separately developed approved specification.

Do not invent a conflicting Table system while that parallel work is active.

---

# 6. Required reasoning before implementation

For every new interaction, answer these questions in notes/PR description:

1. What user action starts it?
2. What state changes?
3. What media assets are required?
4. Can the media be replaced without code changes?
5. What happens on mobile?
6. What happens with reduced motion?
7. What happens if video/WebGL fails?
8. Which pizza/product ID does the interaction resolve to?
9. What conversion/business action follows?
10. What analytics event proves it was used?

If these are unclear, the interaction is not implementation-ready.

---

# 7. Media is part of engineering

Generated images/videos are not decorative afterthoughts. They are runtime assets with technical constraints.

When requesting/generating media, define:

- aspect ratio;
- locked camera;
- subject placement;
- lighting;
- perspective;
- duration;
- loopability;
- background consistency;
- safe UI zones;
- alpha/masking requirement;
- mobile crop;
- file budget.

For swappable pizza outcomes, composition consistency is more important than artistic variation.

Read `docs/MEDIA_PRODUCTION_GUIDE.md` before generating final media.

---

# 8. Higgsfield

Higgsfield is an approved production option for images and video assets.

It may be used for:

- oven ambience;
- peel movements;
- pizza beauty imagery;
- top-down pizzas;
- slice imagery;
- ingredient/drop sequences;
- restaurant ambience;
- transition plates.

Do not make the frontend dependent on Higgsfield-specific APIs or formats unless explicitly approved later.

The runtime should consume normal optimized image/video assets so another generation tool can replace Higgsfield later.

---

# 9. Performance guardrails

Assume the platform will contain many media assets.

Therefore:

- load only assets required for the current module;
- never preload the full website media library;
- use poster frames;
- provide mobile variants;
- compress aggressively while preserving product quality;
- avoid giant transparent PNGs when AVIF/WebP or masked alternatives work;
- measure hero startup time;
- test low/medium mobile devices;
- support reduced motion;
- support low-bandwidth fallback.

Performance regression is a product regression.

---

# 10. SEO/accessibility boundary

The immersive layer must not consume the entire document structure.

Keep critical restaurant content in semantic HTML:

- restaurant name;
- menu item names;
- descriptions;
- ingredients;
- allergens;
- prices;
- location;
- opening hours;
- contact;
- order CTAs.

Do not bake essential text into videos or images.

Interactive modules need keyboard/touch equivalents when practical.

---

# 11. Roulette implementation rule

Business result and visual animation are separate.

Correct approach:

```text
1. determine result
2. store selected pizza/reward
3. calculate target rotation
4. animate wheel to that target
5. reveal stored result
```

Incorrect approach:

```text
1. spin visually
2. estimate where it stopped
3. guess selected product
```

The first is deterministic, testable and compatible with promotions.

---

# 12. Trivial recommendation rule

Start deterministic.

Use weighted attributes/tags before introducing LLMs.

Requirements:

- same input -> same recommendation;
- score is inspectable;
- recommendation can be explained;
- restaurant can tune weights;
- no API call is needed for baseline use.

AI may later improve copy, explanation or conversation, but should not be required for core matching.

---

# 13. Build Your Pizza rule

Do not over-engineer topping placement initially.

Start with curated 2D layers or ingredient clusters.

The first version should prove:

- visual update;
- ingredient state;
- price update;
- remove/edit;
- resulting custom product;
- Oven handoff.

Only add procedural canvas scattering if curated layers become a real limitation.

---

# 14. Pizza Table coordination rule

Pizza Table is an official pillar but is being developed in a parallel workstream.

Until its specification is merged into this repository:

- reserve compatible data/media hooks;
- do not freeze a conflicting interaction model;
- do not remove it from architecture;
- do not build a speculative replacement.

---

# 15. Definition of done for a module

A module is not done because its animation looks good.

It is done when:

- interaction works;
- selected pizza identity is correct;
- it consumes canonical data;
- media is replaceable;
- mobile works;
- fallback works;
- reduced motion is acceptable;
- CTA/product handoff works;
- analytics are emitted;
- there are no major media-loading regressions;
- documentation is updated.

---

# 16. Do not silently change the concept

If development reveals a limitation that requires changing one of these product principles, document it explicitly before implementing the change.

Especially flag proposals that would:

- introduce 3D;
- remove a pillar;
- merge pillars in a way that loses their distinct purpose;
- make the site dependent on a specific media generator;
- hard-code one restaurant;
- make all immersive experiences mandatory;
- move commerce/product data into visual assets.

---

# 17. Expected working style for AI agents

When taking a development mission:

1. inspect the current repository state;
2. read these documents;
3. identify the smallest testable slice;
4. state assumptions;
5. implement without expanding scope unnecessarily;
6. test the interaction and state mapping;
7. verify desktop/mobile behavior;
8. update documentation if architecture changed;
9. report exactly what is working, what is mocked and what remains unverified.

Never claim visual validation without actually running/viewing the result.

---

# 18. First mission for a new implementation agent

If the repository still contains documentation only, the correct first mission is:

> Build the minimum configurable frontend foundation and an Oven proof-of-concept with three pizzas, using image/video compositing and no 3D. Prove that selecting pizza A/B/C produces the correct foreground pizza after the oven/peel transition on desktop and mobile.

Do not begin by building all five modules at once.
