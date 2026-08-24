# P1.1 — PHYSICAL DELIVERY MOTION

## Purpose

Refine the first Oven POC after visual review of the recorded prototype. The architecture remains unchanged; this iteration improves the physical choreography of the peel and the continuity between oven exit and product hero.

## Approved review findings

The P1 skeleton works, but two areas were visibly too prototype-like:

1. pizza peel movement felt like a flat CSS translation rather than a physical object moving in depth;
2. the final pizza reveal broke continuity by turning the delivered pizza into a separate UI card.

## P1.1 changes

### Peel trajectory

The peel now moves through explicit motion phases:

`foreground start -> approach -> oven entry -> micro-pause/occlusion -> first exit -> delivery -> peel drops out`

The motion changes scale and rotation as well as X/Y translation to create perspective.

### Timing

Target sequence is approximately 3.4 seconds:

- 0.00 preparation
- 0.25 peel starts
- 0.67 second approach phase
- 1.23 occlusion / brake
- 1.46 selected pizza resolved
- 1.66 exit begins
- 2.04 foreground acceleration
- 2.49 delivery pose
- 2.83 hero reveal + peel exits downward
- 3.38 PRODUCT_READY

### Occlusion

The oven moment now increases glow, darkness and blur around the swap window so the media replacement is less readable.

### Product hero continuity

The oven remains visible behind the final state. The selected pizza grows into the foreground and the copy follows it, rather than replacing the scene with a fully opaque product card.

### Product identity

P1.1 preserves the same product contract:

- `pizza-margherita`
- `pizza-diavola`
- `pizza-mortadella`

The same selected record drives the peel image, final hero image, title, copy and price.

## Premium media contract

The current drawn oven remains a temporary technical fallback only.

The intended next visual replacement is:

`CSS oven placeholder -> approved premium Oven Master Frame -> motion layers / video based on the same master reference`

Do not treat the CSS oven as final art direction.

## Gate

P1.1 is ready for visual review when:

- repeated selections still resolve the correct pizza;
- motion feels more physical than P1.0;
- the swap point is harder to perceive;
- the peel visually delivers rather than simply traverses the screen;
- the same pizza appears to become the final hero;
- reset/replay remain stable;
- mobile remains usable.
