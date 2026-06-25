import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { footerNavigation, languages, legalNavigation } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr] lg:py-20">
        <div>
          <Logo />
          <p className="mt-6 max-w-sm text-base leading-7 text-text-muted">
            A calm digital space for reflection, guided practice, workshops, and personal growth.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-8 gap-y-3">
          {footerNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className="rounded-sm text-sm text-text-muted transition-colors duration-200 hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div>
          <p className="text-sm text-text-muted">Language</p>
          <div className="mt-3 flex gap-2" aria-label="Footer language selector">
            {languages.map((language) => (
              <button
                key={language}
                type="button"
                className="min-h-11 rounded-md border border-border bg-background px-4 text-sm text-text transition-colors duration-200 hover:border-text/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                aria-pressed={language === "PL"}
              >
                {language}
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
            {legalNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className="rounded-sm text-sm text-text-muted transition-colors duration-200 hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border px-5 py-6 text-center text-sm text-text-muted">
        Copyright {new Date().getFullYear()} W Centrum Duszy
      </div>
    </footer>
  );
}
