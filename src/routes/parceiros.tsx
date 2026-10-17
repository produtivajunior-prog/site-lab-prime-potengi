import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/layout/SiteLayout";
import { PARCEIROS } from "@/lib/site-data";
import { useSiteSearch, matches } from "@/lib/search-context";

export const Route = createFileRoute("/parceiros")({
  head: () => ({
    meta: [
      { title: "Parceiros e Convênios — Prime Potengi" },
      { name: "description", content: "Convênios e parceiros aceitos pelo Laboratório Prime Potengi." },
      { property: "og:title", content: "Parceiros — Prime Potengi" },
      { property: "og:description", content: "Confira os convênios e planos atendidos." },
    ],
  }),
  component: Parceiros,
});

function LogoMark({ nome, sigla }: { nome: string; sigla: string }) {
  // Logo "wordmark" placeholder consistente — substituível por SVG real depois.
  return (
    <svg
      viewBox="0 0 220 80"
      className="h-12 w-auto max-w-[160px]"
      role="img"
      aria-label={nome}
    >
      <g>
        <circle cx="34" cy="40" r="22" fill="currentColor" opacity="0.18" />
        <text
          x="34"
          y="46"
          textAnchor="middle"
          fontFamily="Fraunces, serif"
          fontSize="22"
          fontWeight="500"
          fill="currentColor"
        >
          {sigla}
        </text>
        <text
          x="68"
          y="48"
          fontFamily="Manrope, sans-serif"
          fontSize="20"
          fontWeight="700"
          letterSpacing="-0.5"
          fill="currentColor"
        >
          {nome}
        </text>
      </g>
    </svg>
  );
}

function Parceiros() {
  const { query } = useSiteSearch();
  const list = PARCEIROS.filter((p) => matches(query, p.nome, p.sigla));
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Convênios"
        title="Quem caminha conosco"
        subtitle="Trabalhamos com os principais planos de saúde e convênios da região."
      />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        {list.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum parceiro encontrado para “{query}”.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {list.map((p) => (
              <div
                key={p.nome}
                className="group flex h-24 items-center justify-center rounded-md border border-border bg-background px-4 text-muted-foreground/60 grayscale transition-all duration-300 hover:text-[color:var(--primary)] hover:grayscale-0"
                title={p.nome}
              >
                <LogoMark nome={p.nome} sigla={p.sigla} />
              </div>
            ))}
          </div>
        )}
        <p className="mt-16 max-w-xl text-sm text-muted-foreground">
          A lista é atualizada constantemente. Em caso de dúvida sobre cobertura, entre em contato conosco.
        </p>
      </section>
    </SiteLayout>
  );
}
