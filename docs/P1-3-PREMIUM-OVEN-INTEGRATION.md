# P1.3 — Premium Oven Integration

## Purpose
Replace the technical CSS oven backdrop with a real premium Oven Master image while preserving the approved P1.2 peel mechanics.

## What this phase proves
- the mechanics model survives contact with a realistic oven scene
- a premium oven image can become the interaction surface
- the hearth/corridor requirement is enforced visually, not only in documentation
- fallback remains available if the premium asset is absent

## Included
- embedded premium Oven Master asset (`p1-3-premium-oven.asset.js`)
- runtime detection of premium vs fallback oven
- telemetry for the active oven asset
- premium oven background layer in the LAB
- preserved P1.2 peel states and timings
- CSS fallback oven retained and hidden only when the premium asset loads

## Asset criteria achieved
- visible hearth plane
- central working corridor for the peel
- side/rear flames
- readable physical depth
- no peel baked into the image
- dark artisanal luxury direction

## Important
This is still a static premium integration. Motion-grade media for peel/oven belongs to the next phase.

## Acceptance gate
- Oven Master is visible in the LAB
- P1.2 mechanics remain unchanged
- fallback works if premium media is removed
- pizza identity remains correct
- desktop/mobile remain usable
- no 3D runtime
- visual review required before merge

## Next phase
P1.4 — Motion-grade premium media:
1. lock this Oven Master as environment reference
2. create empty peel / entry / exit motion assets using Seedance 2.0 or Kling
3. incrementally replace the remaining graphic peel illusion without rebuilding the state machine
