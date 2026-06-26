import Link from "next/link";
import type { ReactNode } from "react";
import { signOutAction } from "@/lib/cms/actions";

const adminNavigation = [
  { label: "Dashboard", href: "/admin" },
  { label: "Homepage", href: "/admin/homepage" },
  { label: "Pages", href: "/admin/pages/about" },
  { label: "Workshops", href: "/admin/workshops" },
  { label: "Articles", href: "/admin/articles" },
  { label: "Meditations", href: "/admin/meditations" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "Messages", href: "/admin/messages" },
  { label: "Newsletter", href: "/admin/newsletter" },
  { label: "Settings", href: "/admin/settings" }
];

export function AdminShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[16rem_1fr] lg:py-10">
      <aside className="h-fit rounded-md border border-border bg-surface p-4">
        <p className="px-3 text-caption uppercase text-text-muted">CMS</p>
        <nav className="mt-4 grid gap-1" aria-label="Admin navigation">
          {adminNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className="rounded-md px-3 py-3 text-sm text-text-muted transition-colors hover:bg-surface-muted hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={signOutAction} className="mt-4 border-t border-border pt-4">
          <button
            type="submit"
            className="min-h-11 w-full rounded-md px-3 text-left text-sm text-text-muted transition-colors hover:bg-surface-muted hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            Logout
          </button>
        </form>
      </aside>
      <div>
        <div className="mb-8">
          <p className="text-caption uppercase text-text-muted">W Centrum Duszy admin</p>
          <h1 className="mt-2 text-h1 text-text">{title}</h1>
          <p className="mt-4 max-w-3xl text-body text-text-muted">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
