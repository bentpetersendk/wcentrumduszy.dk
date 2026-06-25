import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { languages, primaryNavigation } from "@/lib/navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/92 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-3 focus:text-sm focus:text-text focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-focus"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:h-[88px]">
        <Logo priority />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm text-sm text-text-muted transition-colors duration-200 hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-1" aria-label="Language selector">
            {languages.map((language) => (
              <button
                key={language}
                type="button"
                className="rounded-sm px-2 py-2 text-xs text-text-muted transition-colors duration-200 hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                aria-pressed={language === "PL"}
              >
                {language}
              </button>
            ))}
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center rounded-md bg-text px-5 text-sm text-surface transition-colors duration-200 hover:bg-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
          >
            Contact Joanna
          </Link>
        </div>

        <MobileNavigation items={primaryNavigation} />
      </div>
    </header>
  );
}

