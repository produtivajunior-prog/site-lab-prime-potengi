import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { SearchProvider } from "@/lib/search-context";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <SearchProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </SearchProvider>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="label-tag mb-5 text-[color:var(--primary)]">{eyebrow}</p>
          )}
          <h1 className="text-4xl text-foreground sm:text-5xl lg:text-[3.2rem]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
