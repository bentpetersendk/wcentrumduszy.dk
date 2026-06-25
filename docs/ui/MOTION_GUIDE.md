# Motion Guide

## Principle

Motion should feel like breath: slow enough to soften the experience, subtle enough not to become the experience.

## Reduced Motion

Respect `prefers-reduced-motion`. When enabled:

- remove parallax
- remove scroll reveals
- keep state changes instant or near-instant
- preserve focus and content visibility

## Page Transitions

Use a 450-600ms fade with slight vertical settling for public pages. Admin pages should transition faster, around 150-250ms.

## Section Reveals

Default reveal:

- opacity: 0 to 1
- translateY: 12px to 0
- duration: 450ms
- easing: soft

Stagger child elements by 80ms maximum.

## Hover Effects

Buttons: background, border, or text colour shift only.

Cards: 2px lift or border emphasis, no dramatic shadow.

Images: optional 1.02 scale over 450ms; never crop important faces.

## Scrolling

Use natural browser scroll. Do not scroll-jack. Smooth anchor scrolling is acceptable if it respects reduced motion.

## Parallax

Parallax should be rare. If used, limit to slow background movement on large atmospheric images. Never use parallax on text or form controls.

## Image Reveal

Images may reveal with opacity and slight vertical movement. Avoid masks that feel theatrical. No wipe effects.

## Card Interactions

Cards should respond like paper being gently lifted:

- border darkens slightly
- image scale may increase subtly
- title link underline may appear

## Loading Animations

Use skeleton blocks with warm neutral shimmer only if subtle. Prefer static skeletons when reduced motion is active.

## Accordion Animation

Accordion opens over 250ms with height and opacity. Closing should be slightly faster, around 180ms.

## Admin Motion

Admin motion should be practical:

- autosave indicator fades
- publish confirmation appears quickly
- drag-and-drop uses clear position feedback
- no decorative page transitions

