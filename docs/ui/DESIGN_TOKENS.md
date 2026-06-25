# Design Tokens

## Colour Tokens

| Token | Hex | Use |
| --- | --- | --- |
| `color.background` | `#F7F4EF` | Main page background |
| `color.surface` | `#FEFCF8` | Forms, light surfaces |
| `color.surfaceMuted` | `#EFE8DD` | Section contrast |
| `color.text` | `#252525` | Main text |
| `color.textMuted` | `#6F6A63` | Secondary text |
| `color.border` | `#E4DDD3` | Borders and dividers |
| `color.accentSage` | `#A8B6A1` | Quiet accent |
| `color.accentClay` | `#B58B73` | Primary CTA warmth |
| `color.accentMist` | `#D8E0DF` | Soft section contrast |
| `color.error` | `#9D3F35` | Validation errors |
| `color.success` | `#55745D` | Success states |
| `color.focus` | `#4D6F72` | Focus outline |

## Typography

Recommended implementation:

- Display: `Cormorant Garamond`, `Canela`, or licensed equivalent.
- Body/UI: `Inter`, `Satoshi`, `Avenir`, or licensed equivalent.

| Token | Desktop | Mobile | Line Height | Weight |
| --- | --- | --- | --- | --- |
| `type.display` | 72px | 46px | 1.02 | 400 |
| `type.h1` | 56px | 38px | 1.08 | 400 |
| `type.h2` | 40px | 31px | 1.15 | 400 |
| `type.h3` | 28px | 24px | 1.2 | 450 |
| `type.bodyLarge` | 20px | 18px | 1.65 | 400 |
| `type.body` | 18px | 17px | 1.65 | 400 |
| `type.small` | 15px | 15px | 1.5 | 400 |
| `type.caption` | 13px | 13px | 1.45 | 500 |

Letter spacing: `0`.

## Spacing

Spacing scale: `4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 120, 160`.

Section padding:

- Desktop: 96-160px vertical.
- Tablet: 72-120px vertical.
- Mobile: 56-88px vertical.

## Grid

- Desktop: 12 columns, 24px gutters.
- Tablet: 8 columns, 20px gutters.
- Mobile: 4 columns, 16px gutters.

## Containers

- `container.page`: max 1200px.
- `container.wide`: max 1360px.
- `container.reading`: max 720px.
- `container.form`: max 640px.
- `container.admin`: max 1440px.

## Border Radius

- `radius.none`: 0.
- `radius.xs`: 2px.
- `radius.sm`: 4px.
- `radius.md`: 8px.
- `radius.full`: 999px for circular controls only.

## Shadows And Elevation

Use shadows sparingly.

- `shadow.none`: none.
- `shadow.soft`: `0 8px 24px rgba(37, 37, 37, 0.06)`.
- `shadow.lift`: `0 14px 36px rgba(37, 37, 37, 0.08)`.

Prefer borders over elevation.

## Transitions

- `duration.fast`: 150ms.
- `duration.base`: 250ms.
- `duration.slow`: 450ms.
- `duration.page`: 600ms.
- `ease.soft`: `cubic-bezier(0.22, 1, 0.36, 1)`.
- `ease.standard`: `cubic-bezier(0.4, 0, 0.2, 1)`.

## Image Aspect Ratios

- Hero portrait: `4 / 5`.
- Hero landscape: `16 / 10`.
- Card image: `4 / 3`.
- Article hero: `16 / 9`.
- Gallery portrait: `3 / 4`.
- Gallery landscape: `4 / 3`.
- Logo mark: `1 / 1`.

## Component Sizing

- Header height desktop: 88px, compact 72px.
- Header height mobile: 72px.
- Button height: 48px default, 56px large.
- Input height: 56px.
- Minimum touch target: 44px.

