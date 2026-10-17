import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteLayout, PageHero } from "@/components/layout/SiteLayout";
import { SITE } from "@/lib/site-data";
import { EXAMES_PRECOS, type ExamePreco } from "@/lib/exames-data";
import {
  Check,
  Plus,
  X,
  FileText,
  MessageCircle,
  Printer,
  CalendarCheck,
  ShoppingBasket,
  Search,
} from "lucide-react";
import { useSiteSearch, matches, normalize } from "@/lib/search-context";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços e Exames — Laboratório Prime Potengi" },
      {
        name: "description",
        content:
          "Tabela completa de exames particulares do Laboratório Prime Potengi. Pesquise, monte seu orçamento e envie pelo WhatsApp.",
      },
      { property: "og:title", content: "Serviços — Prime Potengi" },
      {
        property: "og:description",
        content: "Exames laboratoriais com qualidade e atendimento humanizado.",
      },
    ],
  }),
  component: Servicos,
});

const STORAGE_KEY = "primepotengi.orcamento";
const moeda = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function Servicos() {
  const navigate = useNavigate();
  const { query: headerQuery } = useSiteSearch();
  const [localQuery, setLocalQuery] = useState("");
  const [category, setCategory] = useState<string>("Todas");
  const [selected, setSelected] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  // Effective query: header takes precedence if user typed there
  const query = headerQuery || localQuery;

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setSelected(JSON.parse(raw));
    } catch {
      /* noop */
    }
  }, []);
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    } catch {
      /* noop */
    }
  }, [selected]);

  // Categories in original order
  const categories = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const e of EXAMES_PRECOS) {
      if (!seen.has(e.categoria)) {
        seen.add(e.categoria);
        list.push(e.categoria);
      }
    }
    return list;
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(query);
    return EXAMES_PRECOS.filter((e) => {
      if (category !== "Todas" && e.categoria !== category) return false;
      if (!q) return true;
      return matches(query, e.nome, e.categoria);
    });
  }, [query, category]);

  // Group filtered by category (preserving categories order)
  const grouped = useMemo(() => {
    const map = new Map<string, ExamePreco[]>();
    for (const e of filtered) {
      if (!map.has(e.categoria)) map.set(e.categoria, []);
      map.get(e.categoria)!.push(e);
    }
    return categories
      .filter((c) => map.has(c))
      .map((c) => ({ categoria: c, itens: map.get(c)! }));
  }, [filtered, categories]);

  const items = useMemo(
    () => EXAMES_PRECOS.filter((s) => selected.includes(s.id)),
    [selected]
  );
  const total = items.reduce((a, s) => a + s.preco, 0);

  const toggle = (id: string) =>
    setSelected((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );
  const clear = () => setSelected([]);

  function whatsappLink() {
    let texto: string;
    if (items.length === 1) {
      const s = items[0];
      texto = `Gostaria de agendar o seguinte exame: ${s.nome} - ${moeda(s.preco)}`;
    } else {
      const nomes = items.map((s) => s.nome).join(", ");
      texto = `Gostaria de agendar os seguintes exames: ${nomes} - Total: ${moeda(total)}`;
    }
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(texto)}`;
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Análises Clínicas"
        title="Nossos exames e preços."
        subtitle={`Mais de ${EXAMES_PRECOS.length} exames particulares disponíveis. Pesquise, filtre por categoria e monte seu orçamento — envie pelo WhatsApp ou imprima em PDF.`}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {/* Barra de busca + filtro */}
            <div className="sticky top-24 z-10 -mx-4 mb-8 border-y border-border bg-background/95 px-4 py-4 backdrop-blur sm:mx-0 sm:rounded-sm sm:border sm:px-5">
              <label className="flex items-center gap-3 border-b border-border pb-3">
                <Search className="h-5 w-5 shrink-0 text-[color:var(--primary)]" />
                <input
                  type="search"
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  placeholder="Buscar exame — ex.: hemograma, TSH, vitamina D…"
                  className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                {localQuery && (
                  <button
                    type="button"
                    onClick={() => setLocalQuery("")}
                    aria-label="Limpar busca"
                    className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </label>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(["Todas", ...categories] as const).map((c) => {
                  const active = category === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition ${
                        active
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {filtered.length} exame{filtered.length === 1 ? "" : "s"}{" "}
                {query ? `para "${query}"` : "disponíveis"}
              </p>
            </div>

            {/* Lista agrupada por categoria */}
            {grouped.length === 0 && (
              <div className="rounded-sm border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
                Nenhum exame encontrado{query ? ` para "${query}"` : ""}.
              </div>
            )}

            <div className="space-y-12">
              {grouped.map(({ categoria, itens }) => (
                <div key={categoria}>
                  <div className="mb-4 flex items-baseline justify-between border-b border-foreground pb-2">
                    <h2 className="font-display text-xl text-foreground">
                      {categoria}
                    </h2>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {itens.length} exame{itens.length === 1 ? "" : "s"}
                    </span>
                  </div>
                  <ul className="divide-y divide-border">
                    {itens.map((s) => {
                      const isOn = selected.includes(s.id);
                      return (
                        <li
                          key={s.id}
                          className="grid grid-cols-[1fr_auto_auto] items-center gap-3 py-3 sm:gap-5 sm:py-4"
                        >
                          <span className="text-sm text-foreground sm:text-[15px]">
                            {s.nome}
                          </span>
                          <span className="font-display text-sm tabular-nums text-foreground sm:text-base">
                            {moeda(s.preco)}
                          </span>
                          <button
                            onClick={() => toggle(s.id)}
                            aria-pressed={isOn}
                            aria-label={isOn ? `Remover ${s.nome}` : `Adicionar ${s.nome}`}
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition ${
                              isOn
                                ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-primary-foreground"
                                : "border-foreground/25 text-foreground hover:border-foreground"
                            }`}
                          >
                            {isOn ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-sm border border-border bg-cream/50 p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--primary)]">
                Seu orçamento
              </p>
              <h3 className="mt-3 font-display text-3xl text-foreground">
                {items.length === 0
                  ? "Vazio por enquanto"
                  : `${items.length} ${items.length === 1 ? "exame" : "exames"}`}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Valores estimados. A confirmação final é feita pelo atendimento
                conforme convênio ou particular.
              </p>
              {items.length > 0 && (
                <ul className="mt-4 max-h-64 space-y-2 overflow-y-auto pr-1 text-sm">
                  {items.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-start justify-between gap-3 border-b border-dashed border-border pb-2"
                    >
                      <span className="text-foreground/90">{s.nome}</span>
                      <span className="shrink-0 font-display tabular-nums">
                        {moeda(s.preco)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-5 flex items-baseline justify-between border-t border-border pt-5">
                <span className="text-xs uppercase tracking-wider text-foreground/70">
                  Total estimado
                </span>
                <span className="font-display text-3xl tabular-nums text-foreground">
                  {moeda(total)}
                </span>
              </div>
              <button
                disabled={items.length === 0}
                onClick={() => setShowSummary(true)}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-bold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <FileText className="h-4 w-4" /> Gerar orçamento
              </button>
            </div>
          </aside>
        </div>
      </section>

      {items.length > 0 && (
        <div className="sticky bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <ShoppingBasket className="h-4 w-4 text-[color:var(--primary)]" />
              <span className="font-bold">{items.length}</span>
              <span className="text-muted-foreground">·</span>
              <span className="font-display tabular-nums">{moeda(total)}</span>
            </div>
            <button
              onClick={() => setShowSummary(true)}
              className="rounded-full bg-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider text-background"
            >
              Ver orçamento
            </button>
          </div>
        </div>
      )}

      {showSummary && (
        <SummaryDialog
          items={items}
          total={total}
          onClose={() => setShowSummary(false)}
          onClear={() => {
            clear();
            setShowSummary(false);
          }}
          onAgendar={() => {
            setShowSummary(false);
            navigate({ to: "/contato" });
          }}
          whatsappLink={whatsappLink()}
        />
      )}
    </SiteLayout>
  );
}

function SummaryDialog({
  items,
  total,
  onClose,
  onClear,
  onAgendar,
  whatsappLink,
}: {
  items: ExamePreco[];
  total: number;
  onClose: () => void;
  onClear: () => void;
  onAgendar: () => void;
  whatsappLink: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/40 p-4 backdrop-blur-sm sm:p-8 print:static print:bg-transparent print:p-0">
      <div className="relative w-full max-w-3xl rounded-sm bg-background p-8 shadow-elegant print:max-w-none print:shadow-none">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted print:hidden"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="border-b border-border pb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
            Resumo do orçamento
          </p>
          <h2 className="mt-3 font-display text-4xl text-foreground">
            Laboratório Prime Potengi
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Emitido em {new Date().toLocaleDateString("pt-BR")}. Valores
            estimados — confirmação no atendimento.
          </p>
        </div>

        <ul className="mt-6 space-y-3">
          {items.map((s) => (
            <li
              key={s.id}
              className="grid grid-cols-[1fr_auto] gap-x-6 border-b border-dashed border-border pb-3"
            >
              <div>
                <h4 className="font-semibold text-foreground">{s.nome}</h4>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {s.categoria}
                </p>
              </div>
              <span className="font-display text-lg tabular-nums text-foreground">
                {moeda(s.preco)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-baseline justify-between border-t-2 border-foreground pt-4">
          <span className="text-sm font-bold uppercase tracking-wider">
            Total estimado
          </span>
          <span className="font-display text-3xl tabular-nums">
            {moeda(total)}
          </span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 print:hidden">
          <button
            onClick={onAgendar}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)] px-5 py-3 text-sm font-bold text-primary-foreground hover:brightness-110"
          >
            <CalendarCheck className="h-4 w-4" /> Agendar
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-3 text-sm font-bold text-foreground hover:bg-foreground hover:text-background"
          >
            <MessageCircle className="h-4 w-4" /> Enviar por WhatsApp
          </a>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold text-foreground hover:border-foreground"
          >
            <Printer className="h-4 w-4" /> Salvar PDF / Imprimir
          </button>
          <button
            onClick={onClear}
            className="ml-auto text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-destructive"
          >
            Limpar orçamento
          </button>
        </div>
      </div>
    </div>
  );
}
