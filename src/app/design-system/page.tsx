import { notFound } from "next/navigation";
import { AnimationPlayground } from "@/components/system/AnimationPlayground";
import { Button } from "@/components/system/Button";
import { EmptyState, SkeletonCard, SystemCard } from "@/components/system/Card";
import {
  CheckboxField,
  RadioField,
  SelectField,
  TextArea,
  TextInput,
  ToggleField
} from "@/components/system/FormControls";
import { Icon, type IconName } from "@/components/system/icons/Icon";
import { ShowcaseSection } from "@/components/system/Section";
import { ThemeInspector } from "@/components/system/ThemeInspector";
import { formatContrastRatio, getContrastRatio, getWcagStatus } from "@/lib/design-system/contrast";
import { breakpoints, colorTokens, spacingTokens, typeTokens } from "@/lib/design-system/tokens";
import { footerNavigation, primaryNavigation } from "@/lib/navigation";

const sectionLinks = [
  ["Typography", "typography"],
  ["Colours", "colours"],
  ["Buttons", "buttons"],
  ["Forms", "forms"],
  ["Cards", "cards"],
  ["Navigation", "navigation"],
  ["Icons", "icons"],
  ["Grid", "grid"],
  ["Spacing", "spacing"],
  ["Animations", "animations"],
  ["Layouts", "layouts"],
  ["Accessibility", "accessibility"]
] as const;

const iconNames: IconName[] = [
  "arrow",
  "calendar",
  "check",
  "chevron",
  "clock",
  "close",
  "edit",
  "globe",
  "location",
  "menu",
  "play",
  "search",
  "upload",
  "warning"
];

export default function DesignSystemPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="bg-background">
      <ThemeInspector />
      <div className="mx-auto max-w-[1360px] px-5 py-14 sm:px-8 lg:py-20">
        <header className="max-w-4xl">
          <p className="text-caption uppercase text-text-muted">Development and QA only</p>
          <h1 className="mt-3 text-display text-text">Internal Design System</h1>
          <p className="mt-6 text-body-large text-text-muted">
            Reusable primitives, tokens, accessibility notes, and component states for W Centrum Duszy.
            This route is intentionally blocked in production.
          </p>
        </header>

        <div className="sticky top-[88px] z-20 mt-10 rounded-md border border-border bg-surface/95 p-4 backdrop-blur">
          <label htmlFor="design-system-search" className="sr-only">
            Search design system sections
          </label>
          <input
            id="design-system-search"
            type="search"
            placeholder="Search tokens, components, states..."
            className="min-h-12 w-full rounded-md border border-border bg-background px-4 text-small outline-none focus:border-focus focus:ring-2 focus:ring-focus/20"
          />
          <nav className="mt-4 flex flex-wrap gap-2" aria-label="Design system sections">
            {sectionLinks.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-sm border border-border px-3 py-2 text-caption text-text-muted transition-colors hover:border-text/30 hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <ShowcaseSection
          id="typography"
          title="Typography"
          description="Responsive editorial type tokens for desktop, tablet, mobile, light mode, and future dark mode."
        >
          <div className="grid gap-4">
            {typeTokens.map((token) => (
              <article key={token.token} className="rounded-md border border-border bg-surface p-6">
                <div className="mb-5 flex flex-wrap gap-x-6 gap-y-2 text-caption text-text-muted">
                  <span>{token.name}</span>
                  <code>{token.token}</code>
                  <span>Desktop {token.desktop}</span>
                  <span>Mobile {token.mobile}</span>
                  <span>LH {token.lineHeight}</span>
                </div>
                <p className={`${token.className} text-text`}>{token.sample}</p>
              </article>
            ))}
            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-md border border-border bg-surface p-6 text-body text-text-muted">
                <h3 className="font-display text-3xl text-text">Lists and links</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5">
                  <li>Use lists when they improve scanning.</li>
                  <li>
                    Links should be <a className="underline underline-offset-4" href="#typography">clear and visible</a>.
                  </li>
                </ul>
              </article>
              <blockquote className="rounded-md border border-border bg-surface p-6 font-display text-3xl leading-tight text-text">
                &ldquo;Change can be gentle and still be real.&rdquo;
                <footer className="mt-4 font-sans text-caption text-text-muted">Quote style</footer>
              </blockquote>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="colours"
          title="Colours"
          description="Token swatches with example usage and calculated contrast status."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {colorTokens.map((token) => {
              const foreground = token.foreground ?? "#252525";
              const ratio = getContrastRatio(foreground, token.hex);
              return (
                <article key={token.token} className="overflow-hidden rounded-md border border-border bg-surface">
                  <div className="min-h-28 p-5" style={{ backgroundColor: token.hex, color: foreground }}>
                    <p className="font-medium">{token.name}</p>
                    <p className="mt-2 text-sm">{token.usage}</p>
                  </div>
                  <dl className="grid gap-2 p-5 text-small">
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-muted">Token</dt>
                      <dd><code>{token.token}</code></dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-muted">Hex</dt>
                      <dd>{token.hex}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-muted">Contrast</dt>
                      <dd>{formatContrastRatio(ratio)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-muted">WCAG</dt>
                      <dd>{getWcagStatus(ratio)}</dd>
                    </div>
                  </dl>
                </article>
              );
            })}
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="buttons" title="Buttons" description="All button variants, sizes, and states.">
          <div className="grid gap-6 rounded-md border border-border bg-surface p-6">
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="text">Text button</Button>
              <Button variant="icon" icon={<Icon name="search" />}>Search</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg">Large</Button>
              <Button size="sm">Small</Button>
              <Button disabled>Disabled</Button>
              <Button isLoading>Loading</Button>
              <Button aria-pressed="true">Pressed</Button>
            </div>
            <p className="text-small text-text-muted">
              Keyboard focus uses the focus token, all touch targets are at least 44px, and loading uses `aria-busy`.
            </p>
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="forms" title="Forms" description="Accessible form controls and validation states.">
          <div className="grid gap-6 lg:grid-cols-2">
            <TextInput id="name" label="Your name" helper="Autocomplete enabled." autoComplete="name" required />
            <TextInput id="email" label="Email address" error="Please add a valid email address." type="email" />
            <TextInput id="success" label="Published URL" success="Looks good." defaultValue="/workshops/calm" />
            <TextInput id="disabled" label="Disabled input" disabled defaultValue="Not editable" />
            <TextArea id="message" label="Message" helper="Give the visitor room to write." />
            <SelectField id="topic" label="What would you like to ask about?" helper="Dropdown pattern.">
              <option>Workshop</option>
              <option>Course</option>
              <option>General question</option>
            </SelectField>
            <TextInput id="date" label="Date picker placeholder" type="date" helper="Replace with calendar when needed." />
            <div className="space-y-4 rounded-md border border-border bg-surface p-5">
              <CheckboxField id="newsletter" label="Join newsletter" helper="Checkbox helper text remains visible." />
              <RadioField id="radio-workshop" name="format" label="Workshop" />
              <RadioField id="radio-course" name="format" label="Course" />
              <ToggleField id="published-toggle" label="Published" helper="Switch state uses text and colour." checked />
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="cards" title="Cards" description="Reusable card patterns for content, admin, loading, and empty states.">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {["Workshop", "Course", "Article", "Meditation", "Quote", "Gallery", "Feature", "Admin"].map((title) => (
              <SystemCard key={title} title={`${title} card`} meta="Component">
                Purpose, behaviour, states, accessibility notes, and usage guidance are visible in isolation.
              </SystemCard>
            ))}
            <SkeletonCard />
            <EmptyState title="No workshops yet" text="Empty states explain the absence calmly and offer one useful next step." action={<Button variant="secondary">Add workshop</Button>} />
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="navigation" title="Navigation" description="Desktop, tablet, mobile, drawer, language switcher, breadcrumb, and footer patterns.">
          <div className="space-y-6">
            <div className="rounded-md border border-border bg-surface p-5">
              <nav className="flex flex-wrap items-center gap-5" aria-label="Desktop example">
                {primaryNavigation.map((item) => <a key={item.href} href={item.href} className="text-small text-text-muted">{item.label}</a>)}
                <Button size="sm">Contact Joanna</Button>
              </nav>
            </div>
            <div className="rounded-md border border-border bg-surface p-5">
              <p className="text-caption uppercase text-text-muted">Breadcrumb</p>
              <nav className="mt-3 text-small text-text-muted" aria-label="Breadcrumb">
                Home / Workshops / Calm Presence
              </nav>
            </div>
            <div className="rounded-md border border-border bg-surface p-5">
              <p className="text-caption uppercase text-text-muted">Footer links</p>
              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                {footerNavigation.map((item) => <a key={item.href} href={item.href} className="text-small text-text-muted">{item.label}</a>)}
              </div>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="icons" title="Icons" description="Functional outline icons at approved sizes and stroke weight.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {iconNames.map((name) => (
              <article key={name} className="rounded-md border border-border bg-surface p-5">
                <p className="text-caption uppercase text-text-muted">{name}</p>
                <div className="mt-4 flex items-center gap-5">
                  {[16, 20, 24, 32].map((size) => <Icon key={size} name={name} size={size} label={`${name} icon ${size}px`} />)}
                </div>
                <p className="mt-4 text-caption text-text-muted">Stroke 1.75px. Label when semantic.</p>
              </article>
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="grid" title="Grid" description="Responsive grid, container widths, reading width, and spacing examples.">
          <div className="space-y-6">
            {breakpoints.map((breakpoint) => (
              <article key={breakpoint.name} className="rounded-md border border-border bg-surface p-5">
                <p className="text-caption uppercase text-text-muted">{breakpoint.name} {breakpoint.value}</p>
                <div className="mt-4 grid gap-2" style={{ gridTemplateColumns: `repeat(${breakpoint.columns}, minmax(0, 1fr))` }}>
                  {Array.from({ length: breakpoint.columns }).map((_, index) => (
                    <div key={index} className="h-12 rounded-sm bg-mist" />
                  ))}
                </div>
                <p className="mt-3 text-small text-text-muted">{breakpoint.columns} columns, {breakpoint.gutter}px gutter.</p>
              </article>
            ))}
            <div className="rounded-md border border-border bg-surface p-5">
              <div className="mx-auto max-w-[720px] rounded-sm bg-surface-muted p-6 text-center text-small">Reading width 720px</div>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="spacing" title="Spacing" description="The approved spacing scale rendered as real measurement blocks.">
          <div className="grid gap-3">
            {spacingTokens.map((space) => (
              <div key={space.token} className="grid items-center gap-4 rounded-md border border-border bg-surface p-4 md:grid-cols-[8rem_1fr_16rem]">
                <code>{space.token}</code>
                <div className="h-5 rounded-sm bg-clay/70" style={{ width: `${space.value}px` }} />
                <p className="text-small text-text-muted">{space.value}px - {space.usage}</p>
              </div>
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="animations" title="Animations" description="Live motion playground with replay and reduced-motion behaviour.">
          <AnimationPlayground />
        </ShowcaseSection>

        <ShowcaseSection id="layouts" title="Layout Playground" description="No page content, only future layout structures.">
          <div className="grid gap-6">
            {["Hero", "Two-column", "Editorial article", "Workshop detail", "Gallery", "Quote section", "Newsletter", "Footer"].map((layout) => (
              <article key={layout} className="rounded-md border border-border bg-surface p-5">
                <p className="text-caption uppercase text-text-muted">{layout}</p>
                <div className="mt-4 grid min-h-40 gap-4 md:grid-cols-2">
                  <div className="rounded-sm bg-surface-muted" />
                  <div className="space-y-3">
                    <div className="h-8 w-2/3 rounded bg-surface-muted" />
                    <div className="h-3 rounded bg-surface-muted" />
                    <div className="h-3 w-5/6 rounded bg-surface-muted" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection id="accessibility" title="Accessibility Notes" description="Every exported component must carry these QA checks forward.">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Keyboard test: reachable, visible focus, no traps.",
              "Screen reader notes: semantic names and state announcements.",
              "Contrast check: AA for text and 3:1 for UI boundaries.",
              "Touch target size: 44px minimum.",
              "Reduced motion behaviour: no required animation.",
              "ARIA notes: use native elements first, ARIA only when needed."
            ].map((note) => (
              <div key={note} className="rounded-md border border-border bg-surface p-5 text-small text-text-muted">
                {note}
              </div>
            ))}
          </div>
        </ShowcaseSection>

        <div className="mt-20 rounded-md border border-border bg-surface p-6">
          <p className="text-caption uppercase text-text-muted">Future dark mode</p>
          <div className="mt-4 rounded-md bg-text p-6 text-surface">
            <p className="font-display text-3xl">Reserved for meditation listening contexts only.</p>
            <p className="mt-3 text-small text-surface/75">Dark mode remains a future theme and is not part of the initial public brand.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
