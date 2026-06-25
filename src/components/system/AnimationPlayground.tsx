"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/system/Button";

const demos = ["Fade", "Reveal", "Card lift", "Accordion", "Image reveal", "Modal", "Drawer", "Loading"] as const;

export function AnimationPlayground() {
  const [runId, setRunId] = useState(0);
  const [open, setOpen] = useState(true);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const reduced = useReducedMotion();
  const duration = reduced ? 0 : 0.45;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="secondary" onClick={() => setRunId((value) => value + 1)}>
          Replay animations
        </Button>
        <Button variant="ghost" onClick={() => setOpen((value) => !value)}>
          Toggle accordion
        </Button>
        <Button variant="ghost" onClick={() => setModal(true)}>
          Open modal
        </Button>
        <Button variant="ghost" onClick={() => setDrawer(true)}>
          Open drawer
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {demos.slice(0, 4).map((demo, index) => (
          <motion.div
            key={`${demo}-${runId}`}
            initial={{ opacity: 0, y: demo === "Reveal" ? 12 : 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration, delay: reduced ? 0 : index * 0.06 }}
            className="rounded-md border border-border bg-surface p-5"
          >
            <p className="text-caption uppercase text-text-muted">{demo}</p>
            <p className="mt-3 text-small text-text-muted">Duration {duration}s. Reduced motion removes movement.</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        whileHover={reduced ? undefined : { y: -2 }}
        className="rounded-md border border-border bg-surface p-6"
      >
        <p className="font-display text-3xl">Hover card lift</p>
        <p className="mt-2 text-small text-text-muted">Cards move only 2px and never become theatrical.</p>
      </motion.div>

      <div className="rounded-md border border-border bg-surface">
        <button
          type="button"
          className="flex w-full items-center justify-between p-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          <span className="font-medium">Accordion animation</span>
          <span aria-hidden="true">{open ? "Close" : "Open"}</span>
        </button>
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.25 }}
              className="overflow-hidden"
            >
              <p className="border-t border-border p-5 text-small text-text-muted">
                Accordion content should appear calmly and remain understandable with motion disabled.
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {modal ? (
          <motion.div
            className="fixed inset-0 z-[120] grid place-items-center bg-text/20 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(false)}
          >
            <motion.div
              className="max-w-md rounded-md bg-surface p-6 shadow-lift"
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : 12 }}
              onClick={(event) => event.stopPropagation()}
            >
              <h3 className="font-display text-3xl">Modal</h3>
              <p className="mt-3 text-small text-text-muted">Focus trapping will be added when modal appears in production flows.</p>
              <Button className="mt-5" onClick={() => setModal(false)}>
                Close modal
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {drawer ? (
          <motion.div className="fixed inset-0 z-[120] bg-text/20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.aside
              className="ml-auto min-h-dvh w-[min(90vw,24rem)] bg-surface p-6 shadow-lift"
              initial={{ x: reduced ? 0 : 32 }}
              animate={{ x: 0 }}
              exit={{ x: reduced ? 0 : 32 }}
            >
              <h3 className="font-display text-3xl">Drawer</h3>
              <p className="mt-3 text-small text-text-muted">Used for mobile navigation and future focused panels.</p>
              <Button className="mt-5" onClick={() => setDrawer(false)}>
                Close drawer
              </Button>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

