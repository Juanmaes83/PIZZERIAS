# P0 — PIZZERIA FOUNDATION

## Status

IMPLEMENTED ON BRANCH: `p0/pizzeria-foundation`

P0 exists immediately before P1 / Oven POC.

Its purpose is to convert the cloned restaurant platform into a working pizzeria foundation without rebuilding the inherited engine and without waiting for final premium media.

## P0 contract

P0 must preserve:

- navigation;
- cinematic motion layer;
- Orbital Menu interaction;
- immersive product detail;
- Restaurant/Pizzeria Studio;
- browser-local persistence and fallback;
- image/video media slots;
- responsive behaviour;
- reduced-motion behaviour;
- runtime guard.

P0 changes the product/content layer from generic fine dining to pizza.

## Implemented

### Brand/content

Temporary working brand: `PIZZA LAB`.

The main configuration now speaks in pizzeria language:

- pizza discovery;
- dough;
- fermentation;
- fire;
- pizzaiolo;
- order/reserve conversion.

This brand is a development placeholder, not a final client identity.

### Canonical initial pizza set

Six stable pizza records now exist:

1. `pizza-margherita`
2. `pizza-diavola`
3. `pizza-mortadella`
4. `pizza-tartufo`
5. `pizza-marinara`
6. `pizza-quattro`

Each record already carries:

- stable ID;
- name;
- meta;
- description;
- price;
- image reference;
- ingredients;
- origin;
- technique;
- pairing;
- product note;
- allergens;
- enabled state.

P1 and later modules must resolve these same product identities rather than create duplicate pizza records.

## Placeholder media strategy

P0 deliberately uses placeholders.

`p0-media-registry.js` is the first central media registry and exposes replaceable slots for:

- logo;
- hero;
- dough/fire section;
- atmosphere;
- pizzaiolo;
- six pizza images.

`class4-config.js` contains a resilient fallback copy of those placeholder references so the public runtime does not fail if explicit media-registry loading is not yet wired.

This is temporary. Premium media will replace these references after the page structure and interactions are validated.

## Important architecture rule

Do not bake premium image URLs directly into future Oven, Roulette, Trivial, Builder or Pizza Table interaction logic.

Those modules must resolve media through a central registry / normalized pizza product record.

## What P0 intentionally does NOT build

- Oven sequence;
- peel transition;
- pizza-specific oven reveal;
- Roulette;
- Trivial modes;
- Build Your Pizza;
- final Pizza Table interaction;
- final photography;
- final video;
- final logo/brand;
- ordering backend;
- multi-tenant system.

## Gate to P1 — Oven POC

P1 should start only from this pizzeria-specific product state.

P1 target from the approved blueprint:

- one oven scene;
- three selectable pizzas minimum;
- one shared peel/reveal transition or equivalent;
- product-specific foreground pizza;
- clean reselect/back flow;
- desktop + mobile behaviour;
- lightweight fallback;
- performance measurement.

Recommended first three P1 pizzas:

- Margherita;
- Diavola;
- Mortadella & Pistachio.

They are visually and semantically distinct enough to prove selected-product identity.

## Media replacement rule

Current placeholders are disposable.

When premium assets arrive, replace media references, not interaction code.

P0 success means that changing placeholder assets for premium assets does not require rebuilding navigation, product identity or interaction state.
