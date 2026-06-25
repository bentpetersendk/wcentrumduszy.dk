"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { languages, type NavigationItem } from "@/lib/navigation";

type MobileNavigationProps = {
  items: NavigationItem[];
};

export function MobileNavigation({ items }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.25 };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border bg-surface text-text transition-colors duration-200 hover:border-text/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="relative h-4 w-5" aria-hidden="true">
          <span
            className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-200 ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-2 h-px w-5 bg-current transition-opacity duration-200 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 top-4 h-px w-5 bg-current transition-transform duration-200 ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-40 bg-text/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            onClick={() => setIsOpen(false)}
          >
            <motion.nav
              id={panelId}
              aria-label="Mobile navigation"
              className="ml-auto flex min-h-dvh w-[min(88vw,28rem)] flex-col bg-background px-6 py-6 shadow-lift"
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: shouldReduceMotion ? 0 : 24 }}
              transition={transition}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="font-display text-2xl text-text">Menu</span>
                <button
                  type="button"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border bg-surface text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                  aria-label="Close navigation menu"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="relative h-5 w-5" aria-hidden="true">
                    <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 rotate-45 bg-current" />
                    <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 -rotate-45 bg-current" />
                  </span>
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-1 py-4 text-xl text-text transition-colors duration-200 hover:text-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-auto border-t border-border pt-6">
                <p className="mb-3 text-sm text-text-muted">Language</p>
                <div className="flex gap-2" aria-label="Language selector">
                  {languages.map((language) => (
                    <button
                      key={language}
                      type="button"
                      className="min-h-11 rounded-md border border-border px-4 text-sm text-text transition-colors duration-200 hover:border-text/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                      aria-pressed={language === "PL"}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
