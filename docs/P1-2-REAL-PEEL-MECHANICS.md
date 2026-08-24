# P1.2 — REAL PEEL MECHANICS

## Why this iteration exists

P1.1 improved timing and continuity but still behaved like a UI object animated between coordinates. Review of real pizza-oven references showed that believable motion comes from a physical tool axis, floor contact, micro-corrections and reverse extraction — not theatrical scale/rotation.

P1.2 replaces the motion model instead of polishing P1.1.

## Physical rules

1. The peel moves almost horizontally relative to the oven hearth.
2. Rotation stays minimal; the handle/paddle relationship must feel rigid.
3. Scale changes are restrained and caused by simulated depth, never used as spectacle.
4. A short CONTACT state establishes that the peel has reached the pizza/hearth.
5. A MICRO_ADJUST state adds the tiny correction seen in real peel handling.
6. The pizza is loaded while the peel is visually occluded by oven darkness/fire.
7. Extraction follows approximately the reverse path.
8. Pizza and peel remain one physical unit during extraction.
9. At the foreground there is a short PRESENT pause before interface copy appears.
10. Only after that pause does the product UI reveal.

## State machine

```text
IDLE
 -> PIZZA_SELECTED
 -> PREPARING
 -> APPROACH
 -> PEEL_ENTER
 -> CONTACT
 -> MICRO_ADJUST
 -> LOAD
 -> EXTRACT
 -> PRESENT
 -> FOREGROUND_REVEAL
 -> PRODUCT_READY
```

## Visual environment change

The temporary CSS oven now exposes a hearth plane. This is not final art; it exists to validate mechanics. The premium Oven Master Frame must therefore include:

- clearly visible oven floor / hearth;
- readable depth inside the oven;
- clean lower lip;
- open central path for peel insertion;
- fire primarily lateral/back rather than covering the whole entry path;
- camera approximately aligned with hearth height;
- stable frontal framing suitable for compositing.

## P1.2 acceptance gate

- peel no longer appears to fly;
- movement feels constrained to a physical working plane;
- contact is perceptible but subtle;
- micro-adjustment feels human rather than random;
- product swap is hidden;
- extraction feels like the reverse of insertion;
- pizza remains attached to the peel until delivery;
- presentation pauses before UI reveal;
- same selected pizza survives the full sequence;
- replay/reset works;
- mobile remains usable;
- no 3D runtime.

## Reference lesson

Realism is created by constraint. The peel should feel like a professional tool operating against a floor and oven geometry, not a graphic element following a decorative curve.
