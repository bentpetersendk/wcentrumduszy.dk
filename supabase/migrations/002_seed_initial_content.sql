insert into public.content_entries (type, status, slug, language, title, subtitle, excerpt, hero_image_path, hero_image_alt, body, metadata, seo, published_at)
values
('page', 'published', '', 'pl', 'Homepage', 'Return to the quiet center within you.', 'Reflection, guided practice, workshops, and personal growth with Joanna Radek-Petersen.', '/photos/portraits/joanna-radek-01.webp', 'Joanna Radek-Petersen seated in a bright calm room, holding a cup.',
'[
  {"type":"paragraph","text":"W Centrum Duszy is Joanna Radek-Petersen''s space for reflection, guided practice, workshops, and personal growth."},
  {"type":"paragraph","text":"You do not need to become someone else. You can begin by listening to what is already asking for care."}
]'::jsonb,
'{}'::jsonb,
'{"title":"W Centrum Duszy","description":"Reflection, guided practice, workshops, and personal growth with Joanna Radek-Petersen.","canonical":"/","socialImage":"/photos/portraits/joanna-radek-01.webp"}'::jsonb,
now()),
('page', 'published', 'about', 'pl', 'About Joanna', 'A calm, grounded presence for reflective inner work.', 'Meet Joanna Radek-Petersen and the intention behind W Centrum Duszy.', '/photos/portraits/joanna-radek-11.webp', 'Joanna Radek-Petersen smiling softly in natural light.',
'[
  {"type":"paragraph","text":"Joanna created W Centrum Duszy as a space for people who want to meet themselves with honesty, tenderness, and steadiness."},
  {"type":"heading","text":"How Joanna works"},
  {"type":"paragraph","text":"Sessions and group spaces are built around careful listening, guided reflection, and practical integration."}
]'::jsonb,
'{}'::jsonb,
'{"title":"About Joanna Radek-Petersen","description":"Learn about Joanna Radek-Petersen and the calm reflective practice behind W Centrum Duszy.","canonical":"/about","socialImage":"/photos/portraits/joanna-radek-11.webp"}'::jsonb,
now()),
('page', 'published', 'family-constellations', 'pl', 'Family Constellations', 'A reflective way to notice inherited patterns, loyalties, and inner movements.', 'A gentle introduction to family constellations and how this work may support insight.', '/photos/portraits/joanna-radek-04.webp', 'Joanna Radek-Petersen looking out over a quiet green view.',
'[
  {"type":"paragraph","text":"Family constellations can help reveal patterns that often remain invisible in everyday life."},
  {"type":"list","style":"bullet","items":["Understanding repeated relationship patterns","Finding a calmer relationship to family history","Creating space for a new inner movement"]},
  {"type":"callout","text":"Family constellations are reflective and experiential. They are not a substitute for medical, psychiatric, or crisis support."}
]'::jsonb,
'{}'::jsonb,
'{"title":"Family Constellations","description":"A grounded introduction to family constellations with Joanna Radek-Petersen.","canonical":"/family-constellations","socialImage":"/photos/portraits/joanna-radek-04.webp"}'::jsonb,
now()),
('page', 'published', 'contact', 'pl', 'Contact', 'You are welcome to write with a quiet first hello.', 'Ask a question, share a workshop inquiry, or begin a gentle conversation.', '/photos/portraits/joanna-radek-17.webp', 'Joanna Radek-Petersen smiling warmly.',
'[
  {"type":"paragraph","text":"Use the form to send Joanna a message. You do not need to have the perfect words before reaching out."}
]'::jsonb,
'{}'::jsonb,
'{"title":"Contact Joanna","description":"Contact Joanna Radek-Petersen at W Centrum Duszy.","canonical":"/contact","socialImage":"/photos/portraits/joanna-radek-17.webp"}'::jsonb,
now()),
('page', 'published', 'newsletter', 'pl', 'Newsletter', 'Quiet notes when you want to stay close without deciding today.', 'Receive articles, meditations, and workshop updates.', null, null,
'[
  {"type":"paragraph","text":"The newsletter is a gentle way to stay connected to new reflective writing, audio practices, and upcoming workshops."}
]'::jsonb,
'{}'::jsonb,
'{"title":"Newsletter","description":"Join the W Centrum Duszy newsletter for quiet notes, meditations, articles, and workshop updates.","canonical":"/newsletter"}'::jsonb,
now()),
('page', 'published', 'legal/privacy', 'pl', 'Privacy Policy', 'How personal information is handled with care.', 'Privacy information for visitors, newsletter subscribers, and people contacting Joanna.', null, null,
'[{"type":"paragraph","text":"W Centrum Duszy collects only the information needed to respond to messages, manage newsletter subscriptions, and provide requested services."}]'::jsonb,
'{}'::jsonb,
'{"title":"Privacy Policy","description":"Privacy policy for W Centrum Duszy.","canonical":"/legal/privacy"}'::jsonb,
now()),
('page', 'published', 'legal/cookies', 'pl', 'Cookie Policy', 'A simple note about cookies and site preferences.', 'Cookie information for W Centrum Duszy.', null, null,
'[{"type":"paragraph","text":"The website may use essential cookies for login, security, and basic site functionality."}]'::jsonb,
'{}'::jsonb,
'{"title":"Cookie Policy","description":"Cookie policy for W Centrum Duszy.","canonical":"/legal/cookies"}'::jsonb,
now()),
('page', 'published', 'legal/terms', 'pl', 'Terms & Conditions', 'Plain-language terms for using this website.', 'Terms and conditions for W Centrum Duszy.', null, null,
'[{"type":"paragraph","text":"The information on this website is offered for reflection and education."}]'::jsonb,
'{}'::jsonb,
'{"title":"Terms & Conditions","description":"Terms and conditions for W Centrum Duszy.","canonical":"/legal/terms"}'::jsonb,
now()),
('workshop', 'published', 'returning-to-yourself', 'pl', 'Returning To Yourself', 'A small reflective workshop for noticing patterns and creating inner space.', 'Guided reflection, practical integration, and calm conversation.', '/photos/portraits/joanna-radek-13.webp', 'Joanna Radek-Petersen preparing materials at a table.',
'[
  {"type":"paragraph","text":"This workshop creates a gentle group space to notice patterns, listen inward, and take one grounded step toward change."},
  {"type":"list","style":"bullet","items":["What keeps repeating","Where your attention is needed","How to meet yourself without pressure"]}
]'::jsonb,
'{"format":"Guided reflection and conversation","date":"Booking details to be confirmed","location":"Copenhagen / online option","languageLabel":"Polish","capacity":"8 participants","price":"To be confirmed"}'::jsonb,
'{"title":"Returning To Yourself Workshop","description":"A small reflective workshop with Joanna Radek-Petersen.","canonical":"/workshops/returning-to-yourself","socialImage":"/photos/portraits/joanna-radek-13.webp"}'::jsonb,
now()),
('meditation', 'published', 'five-minute-pause', 'pl', 'A five-minute pause', 'A short guided practice for returning to the breath.', 'A gentle audio practice for when everything feels like too much.', '/photos/portraits/joanna-radek-16.webp', 'Joanna Radek-Petersen seated calmly in a reflective pose.',
'[{"type":"paragraph","text":"This short practice invites you to pause, breathe, and meet the present moment without solving everything at once."}]'::jsonb,
'{"duration":"5 min","theme":"Breath","accessLevel":"Free","category":"Calm"}'::jsonb,
'{"title":"A Five-Minute Pause Meditation","description":"A short guided meditation from W Centrum Duszy.","canonical":"/meditations/five-minute-pause","socialImage":"/photos/portraits/joanna-radek-16.webp"}'::jsonb,
now()),
('article', 'published', 'the-permission-to-pause', 'pl', 'The permission to pause', 'Why a quiet moment can be the beginning of real change.', 'A reflective note on presence, pressure, and listening inward.', '/photos/portraits/joanna-radek-04.webp', 'Joanna Radek-Petersen looking over a quiet view.',
'[
  {"type":"paragraph","text":"Many people arrive at inner work with a feeling that they should already know what to do."},
  {"type":"quote","text":"Sometimes the most important step is simply allowing yourself to pause."}
]'::jsonb,
'{"category":"Reflection","tags":["pause","presence","patterns"]}'::jsonb,
'{"title":"The Permission to Pause","description":"A reflective article on presence and inner listening.","canonical":"/articles/the-permission-to-pause","socialImage":"/photos/portraits/joanna-radek-04.webp"}'::jsonb,
now())
on conflict (slug, language) do nothing;

insert into public.media_assets (bucket, path, folder, alt, caption, sort_order)
values
('media', 'photos/portraits/joanna-radek-01.webp', 'gallery', 'Joanna seated with a cup.', 'A quiet first hello.', 10),
('media', 'photos/portraits/joanna-radek-11.webp', 'gallery', 'Joanna smiling through flowers.', 'Warmth and presence.', 20),
('media', 'photos/portraits/joanna-radek-13.webp', 'gallery', 'Joanna preparing workshop materials.', 'Preparing a reflective space.', 30),
('media', 'photos/portraits/joanna-radek-17.webp', 'gallery', 'Joanna smiling warmly.', 'Contact portrait.', 40)
on conflict (bucket, path) do nothing;
