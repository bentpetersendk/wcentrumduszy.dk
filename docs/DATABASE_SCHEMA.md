# Database Schema

## Platform

Recommended database: Supabase Postgres with Row Level Security. The schema should separate content, media, bookings, and admin users while supporting multilingual publishing from day one.

## Core Tables

`profiles`

- `id uuid primary key`
- `email text`
- `full_name text`
- `role text`
- `avatar_asset_id uuid`
- `created_at timestamptz`

`languages`

- `code text primary key`
- `name text`
- `is_default boolean`
- `is_enabled boolean`

`content_items`

- `id uuid primary key`
- `type text`
- `slug text`
- `language text references languages(code)`
- `translation_group_id uuid`
- `status text`
- `title text`
- `excerpt text`
- `body jsonb`
- `seo jsonb`
- `published_at timestamptz`
- `created_by uuid`
- `updated_by uuid`
- `created_at timestamptz`
- `updated_at timestamptz`

## Specialized Content

`workshops`

- `id uuid primary key`
- `content_item_id uuid references content_items(id)`
- `format text`
- `theme text`
- `starts_at timestamptz`
- `ends_at timestamptz`
- `location_id uuid`
- `capacity int`
- `price_amount numeric`
- `price_currency text`
- `booking_status text`

`courses`

- `id uuid primary key`
- `content_item_id uuid references content_items(id)`
- `format text`
- `access_level text`
- `price_amount numeric`
- `price_currency text`
- `enrollment_status text`

`course_modules`

- `id uuid primary key`
- `course_id uuid`
- `title text`
- `description text`
- `sort_order int`

`course_lessons`

- `id uuid primary key`
- `module_id uuid`
- `title text`
- `body jsonb`
- `media_asset_id uuid`
- `duration_minutes int`
- `sort_order int`

`meditations`

- `id uuid primary key`
- `content_item_id uuid references content_items(id)`
- `theme text`
- `duration_seconds int`
- `audio_asset_id uuid`
- `video_asset_id uuid`
- `transcript text`
- `access_level text`

## Media

`assets`

- `id uuid primary key`
- `type text`
- `bucket text`
- `path text`
- `filename text`
- `alt_text text`
- `caption text`
- `credit text`
- `usage_rights text`
- `language text`
- `metadata jsonb`
- `created_at timestamptz`

`galleries`

- `id uuid primary key`
- `title text`
- `description text`
- `language text`
- `slug text`

`gallery_assets`

- `gallery_id uuid`
- `asset_id uuid`
- `sort_order int`
- `caption_override text`

## Engagement

`bookings`

- `id uuid primary key`
- `workshop_id uuid`
- `course_id uuid`
- `customer_name text`
- `customer_email text`
- `status text`
- `quantity int`
- `notes text`
- `created_at timestamptz`

`newsletter_subscribers`

- `id uuid primary key`
- `email text unique`
- `language text`
- `status text`
- `source text`
- `consented_at timestamptz`

`contact_messages`

- `id uuid primary key`
- `name text`
- `email text`
- `reason text`
- `message text`
- `language text`
- `status text`
- `created_at timestamptz`

`testimonials`

- `id uuid primary key`
- `quote text`
- `display_name text`
- `context text`
- `language text`
- `consent_status text`
- `featured boolean`
- `related_content_id uuid`

`faq_items`

- `id uuid primary key`
- `question text`
- `answer text`
- `language text`
- `category text`
- `related_content_id uuid`
- `sort_order int`
- `status text`

## Navigation and Settings

`navigation_items`

- `id uuid primary key`
- `label text`
- `url text`
- `language text`
- `parent_id uuid`
- `sort_order int`
- `is_visible boolean`

`site_settings`

- `key text primary key`
- `value jsonb`
- `updated_at timestamptz`

## Security

- Public users can read published content only.
- Joanna and approved admins can create and edit content.
- Contact messages, bookings, and subscribers are admin-only.
- Storage buckets should separate public images from private course files.

