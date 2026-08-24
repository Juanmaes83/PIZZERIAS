# MEDIA PRODUCTION GUIDE — PIZZERIAS

## Purpose

This project depends on media quality, but the media must also behave like reusable UI assets.

This guide defines how images and videos should be planned and generated so they remain interchangeable, compositable and performant.

Higgsfield is an approved production tool, but the rules below are tool-independent.

---

# 1. Media principle

Do not generate isolated beautiful shots.

Generate **systems of compatible shots**.

For every family of assets, lock:

- camera position;
- focal length / visual perspective;
- horizon;
- pizza scale;
- pizza orientation;
- light direction;
- background;
- shadow direction;
- subject safe zones;
- color temperature.

Consistency is what allows runtime interaction to look convincing.

---

# 2. Required asset families

## Oven family

Potential assets:

- `oven_base_desktop`
- `oven_base_mobile`
- `oven_fire_loop`
- `oven_embers_loop`
- `oven_smoke_overlay`
- `oven_heat_mask`
- `peel_enter`
- `peel_hold`
- `peel_exit`
- `oven_transition_foreground`

Keep text and branding outside the baked video whenever possible.

## Pizza family per product

Recommended:

- hero beauty image;
- top-down image;
- transparent or mask-friendly whole pizza;
- isolated slice;
- oven/reveal-specific plate if required;
- table-specific image if required;
- thumbnail.

All product media must map to a canonical `pizzaId`.

## Roulette family

Need top-down slices with compatible geometry.

Preferred production method:

1. define one canonical pizza-wheel template;
2. define wedge angle/count;
3. create slice assets fitting the same wedge geometry;
4. normalize perspective/scale;
5. render the assembled roulette in-browser.

Do not generate each full roulette as a separate image if the slices must be configurable.

## Trivial family

Can reuse roulette slice assets where visual compatibility allows.

Additional states:

- hidden wedge;
- neutral wedge;
- revealed wedge;
- correct-answer effect;
- wrong-answer effect;
- completed pizza state.

## Build Your Pizza family

Need:

- crust/base;
- sauce states;
- cheese layer(s);
- ingredient clusters;
- finishing ingredients;
- shadows/highlights if separate compositing is needed.

Use a locked top-down camera.

---

# 3. Oven hero production

The oven should feel physically real and premium.

Prioritize:

- authentic wood-fired oven texture;
- believable flame;
- warm bounce;
- dark surrounding contrast;
- visible depth inside the mouth of the oven;
- stable camera;
- no random camera movement in loops;
- no generated text/signage;
- consistent landing zone for the pizza peel.

Avoid:

- excessive fantasy flames;
- impossible oven geometry;
- rapidly changing bricks/texture between frames;
- morphing pizza peel;
- duplicated utensils;
- camera motion that prevents compositing.

The best hero source may be a mostly static plate plus controlled fire/heat layers rather than one fully generative chaotic shot.

---

# 4. Pizza peel sequence

The peel interaction is the central illusion.

For scalable implementation, aim for a sequence where the peel itself is reusable across pizzas.

Ideal structure:

```text
A. peel enters empty / pizza occluded
B. peel reaches oven interior
C. transition/occlusion moment
D. pizza-specific visual becomes visible
E. peel exits
F. foreground product reveal
```

The key is the **occlusion moment**. It gives the frontend an opportunity to swap or composite the selected pizza invisibly.

Useful occlusion devices:

- oven darkness;
- flame flare;
- foreground heat distortion;
- peel crossing a masked region;
- short motion blur;
- camera push;
- steam/smoke.

This is preferable to generating a unique expensive full animation for every pizza if quality holds.

---

# 5. Pizza photography standards

Each pizza must be visually identifiable.

Lock:

- diameter/scale;
- crust thickness range;
- camera angle;
- plate/no plate decision;
- light direction;
- shadow softness;
- background neutrality when isolation is needed.

Avoid AI inconsistencies such as:

- toppings changing between assets;
- incorrect ingredient count;
- impossible melted cheese;
- mismatched crust;
- different pizza shape between top-down and foreground image;
- ingredients appearing/disappearing in video.

The product record should define the canonical ingredient list before generating media.

---

# 6. Roulette asset geometry

If the wheel uses 8 slices, each visual slice needs a 45-degree wedge footprint.

If it uses 6 slices, each uses 60 degrees.

Do not assume every restaurant must use the same count. The UI should support a sensible configured range.

The frontend can clip rectangular/isolation assets into wedges when practical, but pre-shaped wedge imagery may produce more convincing crust boundaries.

Test both.

Critical requirement:

When the winning slice leaves the wheel, the foreground asset must visually correspond to the same pizza.

---

# 7. Foreground reveal language

The project should develop a shared reveal language across modules.

Possible motion recipe:

1. selected pizza/slice separates;
2. surrounding content slightly de-emphasizes;
3. subject translates forward;
4. scale increases;
5. background blur or vignette subtly increases;
6. product data fades/slides in;
7. CTA becomes primary.

This creates continuity between Oven, Roulette, Trivial and Table.

---

# 8. Build Your Pizza asset rules

Ingredient layers should be visually realistic without requiring simulation.

Recommended method for v1:

- generate 2–4 distribution variants per topping;
- use deterministic selection based on pizza/session seed;
- composite the chosen transparent layer;
- preserve a consistent light/shadow system.

Example:

```text
pepperoni_cluster_a
pepperoni_cluster_b
pepperoni_cluster_c
mushroom_cluster_a
mushroom_cluster_b
...
```

This looks less repetitive than one fixed overlay while remaining much simpler than 3D or physics.

---

# 9. Video duration strategy

Interactive media should be short.

Prefer:

- ambience loops: 2–6 seconds seamless;
- transition clips: 0.5–2.5 seconds;
- reveal clips: 1–3 seconds;
- longer video only where the user deliberately chooses to watch.

Do not make users wait through 8–15 second hero animations to reach the menu.

---

# 10. Desktop and mobile production

Do not rely only on center-cropping 16:9 media.

For major hero media, create:

- landscape version;
- portrait/mobile version;
- poster frame for each.

The action zone must survive crop changes.

For the oven, the oven mouth and peel path need explicit safe zones.

---

# 11. Suggested naming convention

Use predictable names.

Example:

```text
/media/
  oven/
    base-desktop.avif
    base-mobile.avif
    fire-loop.webm
    peel-enter.webm
  pizzas/
    margherita/
      hero.avif
      top.avif
      transparent.webp
      slice.webp
    diavola/
      ...
```

If assets are hosted externally, keep the same logical structure in the media registry.

---

# 12. Optimization targets

Exact budgets should be validated experimentally, but production should aim for:

- images delivered at the rendered size, not original master size;
- modern image codecs;
- short efficient video loops;
- no unnecessary 4K asset on small mobile screens;
- avoid alpha video unless it clearly solves a problem worth the cost;
- generate separate mobile variants instead of sending desktop masters;
- preload only essential first-view assets.

Keep production masters separately from web delivery assets.

---

# 13. Higgsfield prompt strategy

For asset families, prompts should explicitly demand continuity.

Each prompt should specify:

- reference image/board if available;
- locked composition;
- exact camera angle;
- no visible text;
- no logo unless intentionally baked into environment;
- no camera drift unless requested;
- consistent lighting;
- exact action path;
- start/end frame behavior;
- no object morphing;
- no extra hands/tools/objects;
- aspect ratio;
- duration for video.

When producing variants for different pizzas, change only the pizza-specific attributes whenever possible.

---

# 14. Validation checklist for any media asset

Before approving an asset for runtime, verify:

- Is the pizza/product identity correct?
- Does the framing match the family?
- Can it be swapped with sibling assets?
- Is there unexpected text?
- Are there AI morphing artifacts?
- Does the lighting remain consistent?
- Does the start/end frame work for transition or loop?
- Is the subject in the expected safe zone?
- Does it work at mobile crop?
- Is there enough negative space for UI if needed?
- Is the web-delivery size acceptable?

A visually beautiful asset that fails compositing consistency should not be approved.

---

# 15. First media production mission

For the first Oven POC, produce only what is necessary to validate the system:

1. one oven hero plate/loop;
2. one reusable peel movement sequence or suitable transitional clip;
3. three pizza foreground assets with locked composition;
4. three pizza selection thumbnails;
5. one mobile hero variant;
6. poster/fallback assets.

Do not produce the entire menu before the interaction strategy is proven.
