# Component Showcase

## Purpose

This document describes reusable UI components and should later become Storybook documentation. It extends `../COMPONENT_LIBRARY.md`.

## Header

Purpose: orient visitors quietly.

Behaviour: desktop horizontal navigation; mobile drawer.

States: default, scrolled, mobile open, language selected.

Accessibility: semantic nav, skip link, visible focus, current page state.

Animation: soft header compaction after scroll.

Responsive: collapse to drawer below tablet width.

## Button

Purpose: express clear choices.

Variants: primary, secondary, tertiary, icon-only, loading.

States: default, hover, focus, active, disabled, loading.

Accessibility: 44px minimum touch target, clear labels, `aria-busy` when loading.

Animation: colour and border transition 150-250ms.

## Offer Card

Purpose: guide visitors to workshops, courses, meditations, or articles.

Behaviour: whole card clickable only when semantics remain accessible.

States: default, hover, focus, featured.

Accessibility: heading, summary, image alt text, clear link target.

Responsive: 4 columns desktop, 2 tablet, 1 mobile.

## Workshop Card

Purpose: summarize practical event details.

Content: title, date, location, language, status, image, CTA.

States: available, waitlist, sold out, past.

Animation: subtle border and 2px lift.

## Article Card

Purpose: invite low-pressure reading.

Content: image, category, title, excerpt, reading time.

Responsive: grid card on listing, horizontal row for related content.

## Meditation Card

Purpose: preview a calming audio/video resource.

Content: title, theme, duration, access state, play/listen CTA.

States: free, locked, playing preview.

Accessibility: media controls must be keyboard accessible.

## Form Field

Purpose: collect information without friction.

States: default, focus, filled, invalid, disabled, success.

Accessibility: visible label, helper text, error association, autocomplete.

## FAQ Accordion

Purpose: answer practical questions without overwhelming the page.

Behaviour: multiple items can be open unless content gets too long.

States: closed, open, focus.

Animation: height/opacity 250ms; instant when reduced motion.

## Gallery Item

Purpose: show photography with context.

Behaviour: opens lightbox.

States: default, hover, selected.

Accessibility: alt text, caption, keyboard lightbox controls.

## Testimonial

Purpose: build trust through authentic proof.

Variants: featured quote, compact card, related-offer quote.

Accessibility: avoid auto-rotating carousels.

## Newsletter Signup

Purpose: soft conversion.

States: default, submitting, success, duplicate, error.

Copy: short, no pressure.

## Admin Content Card

Purpose: let Joanna quickly understand content status.

States: draft, published, needs SEO, missing image, scheduled.

Accessibility: status text must not rely on colour alone.

## Empty State

Purpose: explain absence calmly.

Examples: no workshops, no articles in language, no search results.

CTA: one helpful next action.

## Toast/Notification

Purpose: confirm admin actions.

Behaviour: non-blocking, short, screen-reader announced.

Tone: "Draft saved" rather than technical messages.

