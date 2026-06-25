# CMS Specification

## Goal

Joanna must be able to edit the website without code, Git, GitHub, deployment tools, or technical language. The CMS should feel closer to editing a Facebook page than managing a developer platform.

## Recommended Approach

Build a custom admin interface backed by Supabase rather than exposing Joanna to a generic technical CMS. The admin should use plain labels, guided workflows, previews, autosave, and safe publishing.

## Core Screens

- Dashboard
- Edit Homepage
- Pages
- Workshops
- Courses
- Meditations
- Articles
- Gallery
- Testimonials
- FAQ
- Navigation
- SEO
- Contact Messages
- Settings

## Dashboard

Dashboard shows:

- Upcoming workshops.
- Drafts needing attention.
- Recent contact messages.
- Quick buttons: New article, New workshop, Upload photo, Edit homepage.
- Publishing health: missing images, missing SEO, untranslated content.

## Editing Workflow

1. Joanna opens a content area.
2. She clicks an existing item or creates a new one.
3. The editor shows simple fields with helpful placeholders.
4. Autosave stores drafts.
5. Preview opens the public page in draft mode.
6. Publish confirms visibility and language.
7. The site updates without Joanna touching deployment.

## Image Workflow

1. Upload image.
2. Choose usage: portrait, workshop, gallery, article, social preview.
3. Add alt text or accept a suggested draft.
4. Crop for required ratios.
5. Save to media library.

## Language Workflow

Content has a primary language. Joanna can add translations later. Missing translations should fall back gracefully or hide content depending on page rules.

## Safety Features

- Autosave.
- Draft and published versions.
- Preview before publish.
- Unpublish instead of delete.
- Simple restore history.
- Required field checks.
- Plain-language validation.

## Roles

- Owner: Joanna, full editing access.
- Editor: can edit content but not billing or system settings.
- Developer: technical setup access.

