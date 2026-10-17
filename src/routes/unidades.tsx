import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero } from "@/components/layout/SiteLayout";
import { UNIDADES } from "@/lib/site-data";
import { MapPin, ArrowUpRight, Copy, Check } from "lucide-react";
import { useSiteSearch, matches } from "@/lib/search-context";

export const Route = createFileRoute("/unidades")({
  head: () => ({
    meta: [
      { title: "Unidades — Prime Potengi" },
      { name: "description", content: "Conheça nossas 5 unidades em Natal, Parnamirim e João Câmara/RN." },
      { property: "og:title", content: "Unidades — Prime Potengi" },
      { property: "og:description", content: "Endereços e como chegar às nossas unidades." },
    ],
  }),
  component: Unidades,
});

function Unidades() {
  const { query } = useSiteSearch();
  const list = UNIDADES.filter((u) => matches(query, u.nome, u.endereco, u.cidade, u.cep));
  return (
    <SiteLayout>
      <PageHero eyebrow="Onde estamos" title="Nossas Unidades" subtitle="Cinco unidades estrategicamente localizadas para o seu atendimento em todo o Rio Grande do Norte." />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        {list.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">Nenhuma unidade encontrada para “{query}”.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {list.map((u) => <UnidadeCard key={u.id} u={u} />)}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

function UnidadeCard({ u }: { u: (typeof UNIDADES)[number] }) {
  const [copied, setCopied] = useState(false);
  const fullAddr = `${u.endereco}, ${u.cidade}${u.cep ? `, CEP ${u.cep}` : ""}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fullAddr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  const q = encodeURIComponent(u.mapsQuery);
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-background transition hover:border-[color:var(--primary)]">
      <iframe
        src={`https://www.google.com/maps?q=${q}&output=embed`}
        title={`Mapa — ${u.nome}`}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[200px] w-full border-0"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start gap-3">
          <MapPin className="mt-1 h-5 w-5 shrink-0 text-[color:var(--primary)]" strokeWidth={1.5} />
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-foreground">{u.nome}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{u.endereco}</p>
            <p className="text-sm text-muted-foreground">
              {u.cidade}{u.cep && ` — CEP ${u.cep}`}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${q}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-xs font-semibold text-primary-foreground transition hover:brightness-95"
            style={{ background: "var(--primary)" }}
          >
            Google Maps <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href={`https://waze.com/ul?q=${q}&navigate=yes`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
          >
            Waze <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href={`https://maps.apple.com/?q=${q}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
          >
            Apple Maps <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
          >
            {copied ? <><Check className="h-3.5 w-3.5" /> Copiado</> : <><Copy className="h-3.5 w-3.5" /> Copiar endereço</>}
          </button>
        </div>
      </div>
    </article>
  );
}
