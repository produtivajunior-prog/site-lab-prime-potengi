import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight, MapPin, Stethoscope, Truck, FileText,
  ShieldCheck, HeartPulse, Clock, ChevronLeft, ChevronRight, Activity,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SITE, HERO_SLIDES, type HeroSlide } from "@/lib/site-data";
import coleta from "@/assets/lab-3353.jpg.asset.json";
import pipetagem from "@/assets/lab-3354.jpg.asset.json";
import bancada from "@/assets/lab-3355.jpg.asset.json";
import equipeDuo from "@/assets/lab-3356.jpg.asset.json";
import tubos from "@/assets/lab-3357.jpg.asset.json";
import microscopio from "@/assets/lab-3358.jpg.asset.json";
import pipetas from "@/assets/lab-3359.jpg.asset.json";
import analisador from "@/assets/lab-3360.jpg.asset.json";
import equipeTime from "@/assets/lab-3361.jpg.asset.json";
import amostras from "@/assets/lab-3362.jpg.asset.json";

const IMAGES = [coleta.url, equipeTime.url, microscopio.url];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Laboratório Prime Potengi — Exames laboratoriais em Natal/RN" },
      { name: "description", content: "Desde 2009 oferecendo análises clínicas com precisão e atendimento humanizado em Natal, Parnamirim e João Câmara/RN." },
      { property: "og:title", content: "Laboratório Prime Potengi" },
      { property: "og:description", content: "Cuidado, precisão e confiança em cada resultado." },
    ],
    links: [
      { rel: "preload", as: "image", href: IMAGES[0], imagesrcset: `${IMAGES[0]} 1x`, fetchpriority: "high" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <HeroBanner />
      <QuickAccess />
      <Pillars />
      <Stats />
      <Gallery />
      <CTAFinal />
    </SiteLayout>


  );
}

/* =====================================================================
   HERO BANNER — estilo flyer/arte gráfica (exceção ao restante do site)
   ===================================================================== */
function HeroBanner() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = HERO_SLIDES.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 6000);
    return () => clearInterval(t);
  }, [paused, total]);

  const go = (n: number) => setIdx(((n % total) + total) % total);

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden"
      style={{ background: "#1a3a7c" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative">
          {HERO_SLIDES.map((s, i) => (
            <HeroSlideView key={s.id} slide={s} image={IMAGES[i]} active={i === idx} />
          ))}
        </div>

        {/* Controles */}
        <div className="relative z-20 flex items-center justify-between gap-4 pb-8">
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "w-10 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Anterior"
              onClick={() => go(idx - 1)}
              className="grid h-10 w-10 place-items-center rounded-md border border-white/30 text-white transition hover:bg-white/10"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <button
              aria-label="Próximo"
              onClick={() => go(idx + 1)}
              className="grid h-10 w-10 place-items-center rounded-md border border-white/30 text-white transition hover:bg-white/10"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSlideView({ slide, image, active }: { slide: HeroSlide; image: string; active: boolean }) {
  return (
    <div
      aria-hidden={!active}
      className={`grid items-center gap-8 py-12 transition-opacity duration-700 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:py-20 ${
        active ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
      }`}
    >
      {/* Lado visual: foto real do laboratório */}
      <div className="relative h-[280px] overflow-hidden rounded-md sm:h-[360px] lg:h-[460px]">
        <img
          src={image}
          alt={slide.title}
          className="h-full w-full object-cover"
          loading={active ? "eager" : "lazy"}
          fetchPriority={active ? "high" : "low"}
          decoding="async"
          sizes="(min-width: 1024px) 640px, 100vw"
        />
      </div>

      {/* Lado conteúdo: blocos empilhados estilo flyer */}
      <div className="relative">
        {/* Bloco principal — azul escuro */}
        <div className="rounded-md px-7 py-8 sm:px-10 sm:py-10" style={{ background: "#1a3a7c" }}>
          <h1
            className="font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-[2.6rem]"
            style={{ letterSpacing: "-0.02em" }}
          >
            {slide.title}
          </h1>
          <p
            className="mt-4 text-lg font-semibold sm:text-xl"
            style={{ color: "#4db8e8" }}
          >
            {slide.subtitle}
          </p>
        </div>

        {/* Bloco de apoio — azul médio */}
        <div
          className="px-7 py-5 text-sm text-white sm:px-10 sm:text-base"
          style={{ background: "#2979c8" }}
        >
          {slide.support}
        </div>

        {/* CTA */}
        <div className="px-7 py-6 sm:px-10" style={{ background: "#143063" }}>
          <Link
            to={slide.ctaTo}
            className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold tracking-wide transition hover:bg-white/90"
            style={{ color: "#1a3a7c", letterSpacing: "0.04em" }}
          >
            {slide.ctaLabel.toUpperCase()} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   Restante da home — estilo institucional clean
   ===================================================================== */
function QuickAccess() {
  const items = [
    { to: "/servicos", icon: Stethoscope, title: "Serviços", desc: "Exames laboratoriais com preparo claro e atendimento ágil." },
    { to: "/unidades", icon: MapPin, title: "Unidades", desc: "5 unidades em Natal, Parnamirim e João Câmara." },
    { to: "/atendimento-movel", icon: Truck, title: "Atendimento Móvel", desc: "Coleta domiciliar com conforto e segurança." },
    { to: "/auth", icon: FileText, title: "Retire seu Exame", desc: "Acesse seus resultados online a qualquer hora." },
  ];
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="label-tag text-[color:var(--primary)]">Acesso rápido</p>
          <h2 className="mt-3 text-3xl text-foreground sm:text-4xl">
            Tudo que você precisa, em um só lugar.
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className="group flex flex-col rounded-lg border border-border bg-background p-7 transition hover:border-[color:var(--primary)]"
            >
              <it.icon className="h-6 w-6 text-[color:var(--primary)]" strokeWidth={1.5} />
              <h3 className="mt-6 text-lg font-semibold text-foreground">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--primary)]">
                Saiba mais
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const items = [
    { icon: ShieldCheck, title: "Resultados confiáveis", desc: "Controle de qualidade rigoroso em todas as etapas analíticas." },
    { icon: HeartPulse, title: "Atendimento humanizado", desc: "Cuidamos de você como gostaríamos de ser cuidados." },
    { icon: Clock, title: "Agilidade", desc: "Coleta rápida e resultados disponíveis no portal online." },
  ];
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label-tag text-[color:var(--primary)]">Por que escolher</p>
          <h2 className="mt-3 text-3xl text-foreground sm:text-4xl">
            Mais do que um laboratório, parceiros da sua saúde.
          </h2>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
          {items.map((p) => (
            <div key={p.title} className="flex flex-col bg-background p-8">
              <p.icon className="h-7 w-7 text-[color:var(--primary)]" strokeWidth={1.5} />
              <h3 className="mt-6 text-lg font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { value: "+50 mil", label: "Pacientes atendidos" },
    { value: "5", label: "Unidades no RN" },
    { value: `+${new Date().getFullYear() - SITE.desde}`, label: "Anos de mercado" },
  ];
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 border-y border-border py-12 md:grid-cols-3">
          {items.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl font-bold text-[color:var(--primary-deep)] sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const photos = [
    { src: equipeDuo.url, alt: "Equipe de biomédicas do Laboratório Prime Potengi", caption: "Nossa equipe" },
    { src: pipetagem.url, alt: "Profissional pipetando amostras no laboratório", caption: "Análises com precisão" },
    { src: tubos.url, alt: "Biomédica segurando tubos de coleta", caption: "Coleta segura" },
    { src: bancada.url, alt: "Bancada de análises clínicas em operação", caption: "Setor técnico" },
    { src: analisador.url, alt: "Amostras sendo processadas no analisador automático", caption: "Tecnologia" },
    { src: pipetas.url, alt: "Profissional com pipetas de vidro no laboratório", caption: "Rotina diária" },
    { src: amostras.url, alt: "Tubos de amostras de sangue identificados", caption: "Rastreabilidade" },
  ];
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 text-center">
          <p className="label-tag text-[color:var(--primary)]">Nosso dia a dia</p>
          <h2 className="mt-3 text-2xl text-foreground sm:text-3xl">
            Atendimento de perto, com o cuidado que você merece.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((p) => (
            <figure key={p.src} className="group overflow-hidden rounded-md border border-border bg-background">
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="px-4 py-2.5 text-xs font-medium text-muted-foreground">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-8 rounded-lg border border-border bg-cream px-8 py-12 sm:px-12 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-2xl text-foreground sm:text-3xl">Pronto para cuidar da sua saúde?</h2>
            <p className="mt-3 text-muted-foreground">
              Agende seu exame ou acesse seus resultados online em poucos cliques.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/servicos"
              className="inline-flex items-center gap-2 rounded-md border-2 px-5 py-3 text-sm font-semibold text-[color:var(--primary)] transition hover:bg-background"
              style={{ borderColor: "var(--primary)" }}
            >
              Ver Serviços
            </Link>
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-highlight-foreground transition hover:brightness-95"
              style={{ background: "var(--highlight)" }}
            >
              Acesse seu Exame <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
