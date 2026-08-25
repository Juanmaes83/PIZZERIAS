# P1 Oven Final — QA Checklist

Validated against the clean final implementation:

- `p1-oven-final.html`
- `p1-oven-final.css`
- `p1-oven-final.js`

## Visual contract

1. Oven is a fixed photographic background and never recreated with CSS geometry.
2. Oven layer never changes during the state machine.
3. Product overlay is `display:none` until `FOREGROUND_REVEAL`.
4. Peel is the only moving physical tool layer.
5. Pizza disc appears at `LOAD` and stays on peel through extraction/presentation.

## QA states

- Initial: `PIZZA_SELECTED`; oven visible; product hidden.
- Mid: `EXTRACT`; oven visible; peel and pizza visible; product hidden.
- Final: `PRODUCT_READY`; oven remains behind; product overlay visible.

## Local browser QA completed

Chromium/Playwright checks:

- computed stage background contains embedded JPEG data URI: PASS
- initial product display: `none`: PASS
- mid state: `EXTRACT`: PASS
- mid product display: `none`: PASS
- final state: `PRODUCT_READY`: PASS
- final product display: `grid`: PASS

The oven background is intentionally embedded in `p1-oven-final.css` so the visual proof has no external oven-image request and cannot regress because of asset path/CDN/cache resolution.