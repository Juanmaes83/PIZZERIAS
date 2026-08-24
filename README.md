# PIZZERIAS — Immersive Pizza Platform

> Working repository name. The final product/brand name will be decided later.

## 1. Project definition

PIZZERIAS is a reusable, customizable immersive web platform for pizzerias.

The objective is **not** to build a one-off restaurant website and **not** to build a 3D website. The objective is to create a modular visual experience that can be adapted to different pizzerias by changing media, menu data, branding, copy, promotions and enabled modules without rebuilding the product from scratch.

The platform should feel cinematic, tactile, playful and premium while remaining practical enough to support real menu discovery, recommendation and ordering flows.

### Core principle

**No 3D.**

The immersive language must be created with:

- real or generated photography;
- cinematic video loops and transition clips;
- image compositing;
- 2.5D/parallax when useful;
- masks and reveal effects;
- CSS transforms and motion;
- canvas/WebGL only when it materially improves an effect;
- lightweight shaders for heat, glow, distortion, fire ambience or transitions;
- audio as an optional enhancement;
- normal HTML/UI for text, buttons, accessibility, SEO and commerce.

Higgsfield can be used as one of the main production tools for creating the photographic and video assets required by the experiences.

---

# 2. The five pillars

The product is organized around five primary experience modules.

## PILLAR 01 — THE OVEN

The oven is the visual and narrative heart of the platform.

### Hero concept

The homepage opens with a large working wood-fired oven. The oven must feel alive through real/generative video rather than 3D rendering:

- active flames;
- embers;
- light variation;
- heat distortion;
- very subtle smoke;
- warm reflections;
- optional environmental sound.

The oven can be built from a high-quality base image combined with video layers, masks and shader/WebGL heat effects, or from a carefully produced seamless video plate.

### Main interaction

The user selects a pizza.

The experience responds with a cinematic sequence:

1. the selected pizza is identified;
2. the oven becomes the visual focus;
3. a pizza peel enters the scene;
4. it appears to reach into the oven;
5. the selected pizza is revealed on the peel;
6. the peel moves toward the camera;
7. the pizza occupies the foreground;
8. the product card appears with name, ingredients, price, allergens and CTA.

The crucial requirement is that the pizza delivered by the oven is the **actual pizza selected by the user**.

The system therefore needs interchangeable media states for each configured pizza or a compositing method that can place the correct pizza onto the peel.

### Business function

The oven is not decoration. It connects discovery to conversion:

`SELECT PIZZA -> OVEN REVEAL -> PRODUCT DETAIL -> ORDER / ADD TO CART`

---

## PILLAR 02 — PIZZA ROULETTE

A gamified discovery and promotional module.

### Visual concept

The roulette is not a casino wheel. It is a complete pizza seen from above, composed of triangular slices. Each slice represents a different pizza from the restaurant.

The slice artwork should be based on real or generated top-down pizza imagery.

### Interaction

1. user activates the roulette;
2. the pizza begins to rotate;
3. acceleration, inertia and deceleration create anticipation;
4. a pointer or visual selection system determines the result;
5. the selected slice separates from the wheel;
6. the slice moves toward the foreground;
7. the corresponding pizza is revealed;
8. the user can view or order it.

The foreground reveal can use layered PNG/WebP/AVIF assets, masks, scale, perspective, blur and motion rather than 3D geometry.

### Optional promotional mode

The roulette can also attach configurable outcomes such as:

- percentage discount;
- free drink;
- free ingredient;
- dessert;
- special menu;
- no-prize outcome;
- pizza of the day;
- limited campaign reward.

Probabilities must be configurable independently from the visible slice count when required.

### Business function

`PLAY -> DISCOVER -> REWARD / PIZZA -> ORDER`

---

## PILLAR 03 — PIZZA TRIVIAL

A pizza-wheel discovery system inspired by the visual logic of Trivial Pursuit wedges, but using pizza slices instead of generic colored wedges.

Each slice represents a specific pizza. A slice is unlocked or discovered through a question.

The module contains **three modes**.

### Mode A — Pizza Quiz

Knowledge-based questions with correct and incorrect answers.

Possible themes:

- ingredients;
- Italian food culture;
- pizza styles;
- cooking methods;
- restaurant history;
- local brand stories;
- fun food trivia.

A correct answer reveals a pizza slice.

The final objective can be to complete the pizza, achieve a score or unlock a reward.

### Mode B — Discover Your Pizza

This is a recommendation engine disguised as a playful experience.

There are no correct answers. Each question captures taste preferences.

Examples:

- spicy / mild / no spice;
- tomato / white base;
- meat / vegetarian;
- classic / adventurous;
- intense / light;
- creamy / fresh;
- simple / loaded.

Each answer changes the compatibility score of the restaurant's pizzas.

At the end, one pizza becomes the user's recommendation.

Its slice is revealed and brought into the foreground.

`QUESTIONS -> PREFERENCE PROFILE -> MATCH -> YOUR PIZZA -> ORDER`

This mode has major commercial importance because it turns the menu into guided discovery.

### Mode C — Pizza Challenge

A short challenge designed for repeat engagement, promotions and social sharing.

Example:

`5 QUESTIONS -> 5 SLICES -> SCORE -> BADGE / REWARD -> SHARE / ORDER`

Possible outputs:

- Pizza Master;
- 4/5 score;
- hidden menu unlocked;
- coupon;
- challenge of the week.

---

## PILLAR 04 — BUILD YOUR PIZZA

An interactive pizza constructor.

### Concept

The user starts with a pizza base and adds ingredients visually.

This must be achieved without 3D.

Possible implementation:

- top-down base pizza image;
- transparent ingredient layers;
- pre-rendered ingredient clusters;
- masks and blend modes;
- draggable UI elements;
- compositing in DOM/canvas;
- small motion clips for ingredient drops when useful.

### Experience

1. select base;
2. select sauce;
3. add cheese;
4. add toppings;
5. see the pizza update visually;
6. view price changes;
7. press **BAKE**;
8. transition into the Oven module;
9. oven sequence plays;
10. custom pizza returns on the peel;
11. add to cart / order.

This module should reuse the Oven instead of creating a separate ending.

### Business function

`CREATE -> PERSONALIZE -> BAKE -> REVEAL -> ORDER`

---

## PILLAR 05 — PIZZA TABLE

This module is being developed in parallel in another workstream. It remains one of the five official pillars and must stay architecturally compatible with the rest of the platform.

### Current product intention

Pizza Table is a highly visual menu/discovery interface where pizzas are presented as physical-looking photographic objects arranged on or around a table-like scene.

The user should be able to browse pizzas spatially and bring one into visual focus without using 3D assets.

Possible techniques include:

- perspective-correct photography;
- layered transparent pizza images;
- depth through scale and blur;
- parallax;
- horizontal/vertical camera-like movement;
- masks;
- CSS perspective;
- WebGL shader transitions where justified.

The detailed interaction specification will be integrated from the parallel development work when available.

---

# 3. One platform, not five disconnected demos

The five pillars must share a common product and data model.

```text
                         PIZZERIA PLATFORM
                                |
              +-----------------+-----------------+
              |                 |                 |
           DISCOVER            PLAY             CREATE
              |                 |                 |
         Pizza Table         Roulette        Build Your Pizza
         Menu / Oven         Trivial              |
              |                 |                 |
              +-----------------+-----------------+
                                |
                            SELECT PIZZA
                                |
                              OVEN
                                |
                         PRODUCT / ORDER
```

A pizza selected anywhere in the platform should resolve to the same canonical pizza record.

---

# 4. Platform data model

Every restaurant should be configurable through data rather than hard-coded pages.

Minimum restaurant model:

```ts
Restaurant {
  id
  name
  logo
  brand
  contact
  location
  ordering
  modules
  mediaTheme
  pizzas[]
  promotions[]
  quizConfig
  rouletteConfig
}
```

Minimum pizza model:

```ts
Pizza {
  id
  slug
  name
  shortDescription
  longDescription
  ingredients[]
  allergens[]
  dietaryTags[]
  price
  imageHero
  imageTop
  imageSlice
  imageTransparent
  ovenMedia
  tableMedia
  active
  recommendationTags[]
}
```

Media references should remain replaceable without changing interaction code.

---

# 5. Customization model

The same engine must support different pizzerias.

Configurable elements should include:

- restaurant name;
- logo;
- typography;
- colors;
- copy tone;
- oven imagery/video;
- background imagery/video;
- pizza catalogue;
- pizza photography;
- ingredients;
- prices;
- allergens;
- trivia questions;
- recommendation questions;
- roulette slices;
- roulette probabilities;
- promotions/rewards;
- sound on/off;
- modules enabled/disabled;
- ordering destination;
- reservation links;
- delivery/takeaway configuration.

Example module switches:

```text
[x] Oven
[x] Roulette
[x] Pizza Trivial
[x] Build Your Pizza
[x] Pizza Table
[x] Promotions
[ ] Sound by default
[x] Ordering
```

---

# 6. Media-first technical philosophy

The product should achieve premium visual quality without a heavy 3D runtime.

Preferred stack direction:

- React / Next.js;
- TypeScript;
- modern CSS;
- Framer Motion or GSAP for sequencing;
- native video with optimized codecs;
- Canvas when compositing requires it;
- lightweight WebGL for effects that CSS/video cannot achieve efficiently;
- shaders only where they materially improve immersion;
- image/video CDN and aggressive responsive optimization;
- normal semantic HTML for menus, information and commerce.

### Potential shader/WebGL uses

Allowed:

- heat haze over the oven;
- flame/glow enhancement;
- smoke distortion;
- liquid/wave transition;
- displacement between scenes;
- subtle depth/parallax response;
- masked slice reveals;
- particles/embers if lightweight.

Not allowed as the base architecture:

- 3D pizza models;
- 3D oven models;
- Three.js scene as the whole website;
- WebGL-only navigation;
- unnecessary GPU-heavy rendering.

---

# 7. Higgsfield media pipeline

Higgsfield may be used to create or animate:

- wood-fired oven hero plates;
- burning fire loops;
- pizza peel entering/exiting oven;
- pizza beauty shots;
- overhead pizza photography;
- individual pizza slices;
- ingredient drops;
- custom-pizza bake/reveal clips;
- cinematic restaurant ambience;
- transition plates.

Production must aim for **reusable media systems**, not isolated beautiful clips.

Where interaction requires multiple pizza outcomes, media should be generated with locked composition, camera, perspective and lighting so assets can be swapped seamlessly.

See `docs/MEDIA_PRODUCTION_GUIDE.md`.

---

# 8. UX principles

1. **The pizza is the interface.**
2. Every spectacle must lead somewhere useful.
3. Interaction should always preserve a path to the actual menu/order.
4. Mobile is a primary target, not a reduced desktop version.
5. The first meaningful interaction must happen quickly.
6. Heavy media must never block basic restaurant information.
7. Every immersive experience requires a graceful lightweight fallback.
8. Motion should feel physical but never make ordering slower.
9. Each module should be independently activatable.
10. The entire experience must remain brand-customizable.

---

# 9. Performance requirements

The project will be media-heavy, therefore performance is a product requirement.

Required strategy:

- responsive image formats: AVIF/WebP where appropriate;
- multiple media resolutions;
- lazy-loading below-the-fold video;
- poster frames;
- short seamless loops;
- preload only the first essential hero assets;
- mobile-specific media when necessary;
- reduced-motion mode;
- image/video fallbacks for shader effects;
- avoid downloading inactive module assets;
- dynamic loading of Roulette/Trivial/Builder/Table experiences.

The visual system must degrade gracefully on lower-powered devices.

---

# 10. Initial development order

Recommended sequence:

### Phase 0 — Foundation

- shared restaurant schema;
- pizza schema;
- configurable theme;
- media registry;
- module registry;
- responsive shell.

### Phase 1 — Oven prototype

Prove the core illusion first:

`selection -> peel -> correct pizza -> foreground product reveal`

### Phase 2 — Roulette

Prove:

`spin -> deterministic result -> slice extraction -> product mapping`

### Phase 3 — Trivial

Implement the three modes independently over the same UI system.

### Phase 4 — Build Your Pizza

Implement layered visual construction and connect its finish to the Oven.

### Phase 5 — Pizza Table

Integrate the parallel Pizza Table specification into the shared platform model.

### Phase 6 — Restaurant templating

Prove that a second fictional restaurant can be launched by replacing configuration and media instead of rewriting components.

This is the test that validates the platform concept.

---

# 11. Definition of success

The project is successful when:

- it feels noticeably more immersive than a normal restaurant website;
- it remains fast enough to use on real mobile devices;
- a pizza discovered in any module maps to the same product/order object;
- the five pillars can be enabled independently;
- another pizzeria can be created mainly through configuration and replacement media;
- no 3D assets or 3D scene architecture are required;
- Higgsfield or equivalent media can be replaced later without rebuilding the frontend;
- another AI/developer can understand and extend the system from repository documentation alone.

---

# 12. Repository documentation

Start here, then continue with:

- `docs/PROJECT_BLUEPRINT.md` — product, system and interaction architecture.
- `docs/AI_HANDOFF.md` — operating instructions for any AI/developer entering the repository.
- `docs/MEDIA_PRODUCTION_GUIDE.md` — how images/video should be produced so they remain interactive and swappable.
- `docs/TECHNICAL_ARCHITECTURE.md` — implementation constraints and recommended frontend architecture.

---

## Current status

**Concept definition / documentation foundation.**

No implementation should begin by introducing 3D. The first technical proof should be the **Oven interaction**, because it validates the central visual language and the media-compositing strategy that the other modules can reuse.
