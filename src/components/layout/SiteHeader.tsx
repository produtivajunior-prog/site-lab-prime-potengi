import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Search, Phone, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site-data";
import { useSiteSearch } from "@/lib/search-context";
import logoAsset from "@/assets/logo-prime-potengi.jpg.asset.json";

const NAV = [
  { to: "/quem-somos", label: "Quem Somos" },
  { to: "/servicos", label: "Serviços" },
  { to: "/parceiros", label: "Parceiros" },
  { to: "/unidades", label: "Unidades" },
  { to: "/atendimento-movel", label: "Atendimento Móvel" },
  { to: "/contato", label: "Contato" },
  
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { query, setQuery } = useSiteSearch();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      {/* Top row */}
      <div className="mx-auto flex max-w-7xl items-center gap-8 px-4 py-5 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center" aria-label="Laboratório Prime Potengi">
          <img
            src={logoAsset.url}
            alt="Laboratório Prime Potengi"
            className="h-10 w-auto sm:h-12"
            width={880}
            height={220}
          />
        </Link>

        {/* Search */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="hidden flex-1 md:block"
          role="search"
        >
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar nesta página"
              className="h-11 w-full rounded-md border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[color:var(--primary)] focus:outline-none focus:ring-1 focus:ring-[color:var(--primary)]"
            />
          </div>
        </form>

        {/* Phone — outline, ícone linear */}
        <a
          href={SITE.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="ml-auto hidden items-center gap-2.5 border-l border-border pl-6 text-foreground transition hover:text-[color:var(--primary)] sm:inline-flex"
        >
          <Phone className="h-4 w-4 text-[color:var(--primary)]" strokeWidth={1.75} />
          <span className="leading-tight">
            <span className="block text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Fale conosco
            </span>
            <span className="block text-[15px] font-semibold tracking-tight">{SITE.telefone}</span>
          </span>
        </a>

        <button
          className="ml-auto grid h-10 w-10 place-items-center rounded-md text-foreground hover:bg-surface lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Bottom row: navigation */}
      <div className="hidden border-t border-border lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
          <nav className="flex flex-1 items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="relative px-4 py-4 text-[13px] font-medium tracking-[0.04em] text-foreground transition hover:text-[color:var(--primary)]"
                activeProps={{
                  className:
                    "text-[color:var(--primary-deep)] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-[color:var(--primary)]",
                }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-[13px] font-semibold tracking-[0.03em] text-highlight-foreground transition hover:brightness-95"
            style={{ background: "var(--highlight)" }}
          >
            Acesse seu Exame <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 p-4">
            <form onSubmit={(e) => e.preventDefault()} className="relative md:hidden">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar nesta página"
                className="h-11 w-full rounded-md border border-border bg-background pl-10 pr-4 text-sm focus:border-[color:var(--primary)] focus:outline-none"
              />
            </form>
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-3 text-sm font-semibold text-foreground sm:hidden"
            >
              <Phone className="h-4 w-4 text-[color:var(--primary)]" /> {SITE.telefone}
            </a>
            <nav className="flex flex-col">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-foreground hover:bg-surface"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-semibold text-highlight-foreground"
              style={{ background: "var(--highlight)" }}
            >
              Acesse seu Exame <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
