# Accessibility Checklist

## Standard

Target WCAG 2.2 AA for public site and CMS.

## Keyboard Navigation

- All interactive elements reachable by keyboard.
- Focus order follows visual order.
- Skip link present.
- No keyboard traps.
- Drawer, modal, and lightbox trap focus while open.
- Escape closes overlays.

## Screen Readers

- Semantic landmarks: header, nav, main, footer.
- One H1 per page.
- Headings are hierarchical.
- Buttons and links have clear accessible names.
- Form errors are announced.
- Toast messages use polite live regions.

## Reduced Motion

- Respect `prefers-reduced-motion`.
- Disable parallax and scroll reveals.
- Keep essential state changes understandable without animation.

## Focus States

- Visible focus on all controls.
- Minimum 2px outline or equivalent.
- Focus colour must contrast against background.

## Forms

- Labels always visible.
- Required fields indicated in text.
- Errors connected to fields.
- Validation messages explain how to fix the issue.
- Inputs support autocomplete where relevant.

## Alt Text

- Every meaningful image has alt text.
- Decorative images use empty alt text.
- Portrait alt text identifies Joanna only when relevant.
- Gallery images need captions and usage context in CMS.

## Colour Contrast

- Body text: 4.5:1 minimum.
- Large text: 3:1 minimum.
- UI boundaries and focus indicators: 3:1 minimum.
- Do not rely on colour alone for status.

## Touch Targets

- Minimum 44px target size.
- Adequate spacing between adjacent controls.
- Mobile menu links use full-width tap rows.

## Reading Order

- Mobile reading order must match intended meaning.
- Image/text split layouts should not place captions before context.
- Admin tables must remain navigable by screen reader.

## Language Switching

- Set document language per locale.
- Mark language names clearly.
- Use `hreflang` on public pages.
- Preserve the visitor's selected language where possible.

## Media

- Audio/video controls accessible by keyboard.
- Transcripts for meditations.
- Captions for video when speech is present.
- No autoplay audio.

## CMS

- Joanna must be able to publish using keyboard alone.
- Draft/published states must use text and colour.
- Image upload must expose progress and errors.
- Preview mode must be clearly labelled.

