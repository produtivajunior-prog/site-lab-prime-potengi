import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/layout/SiteLayout";
import { Award, HeartHandshake, Sparkles, Target } from "lucide-react";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem Somos — Laboratório Prime Potengi" },
      { name: "description", content: "Conheça a história e os valores do Laboratório Prime Potengi, referência em análises clínicas em Natal/RN desde 2009." },
      { property: "og:title", content: "Quem Somos — Laboratório Prime Potengi" },
      { property: "og:description", content: "Desde 2009 cuidando da saúde da população de Natal/RN com exames laboratoriais." },
    ],
  }),
  component: QuemSomos,
});

function QuemSomos() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Desde 2009" title="Quem Somos" subtitle="Cuidado próximo, exames precisos e uma trajetória construída paciente a paciente." />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div className="space-y-5 text-base leading-relaxed text-foreground/85">
            <p>
              Desde 2009, o <strong>Laboratório Prime Potengi</strong> atua na área de análises clínicas
              com o compromisso de oferecer um atendimento seguro, acolhedor e acessível à população
              de Natal/RN.
            </p>
            <p>
              Com anos de experiência no cuidado com a saúde, nossa missão é contribuir para a prevenção,
              o acompanhamento e o diagnóstico dos nossos pacientes por meio de exames laboratoriais
              realizados com responsabilidade, atenção e confiança.
            </p>
            <p>
              Ao longo da nossa trajetória, buscamos construir uma relação próxima com cada cliente,
              valorizando não apenas a precisão dos resultados, mas também a qualidade no atendimento,
              a agilidade nos processos e o respeito às necessidades de cada pessoa.
            </p>
            <p>
              Mais do que um laboratório, somos uma empresa que entende a importância de cuidar da saúde
              com seriedade, empatia e compromisso. Por isso, trabalhamos diariamente para entregar uma
              experiência simples, humanizada e confiável.
            </p>
            <p>
              O Laboratório Prime Potengi segue firme em seu propósito de ser uma referência em cuidado
              laboratorial, unindo experiência, confiança e atendimento próximo para promover mais saúde
              e bem-estar.
            </p>
          </div>

          <aside className="rounded-3xl bg-cream p-8 shadow-card">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--primary)]">Nossa trajetória</h3>
            <ol className="mt-6 space-y-6 border-l-2 border-[color:var(--primary)]/30 pl-6">
              {[
                { year: "2009", text: "Fundação do laboratório em Natal/RN." },
                { year: "2014", text: "Expansão com a inauguração de novas unidades." },
                { year: "2020", text: "Reforço das medidas de biossegurança e atendimento domiciliar." },
                { year: "Hoje", text: "5 unidades em Natal, Parnamirim e João Câmara." },
              ].map((t) => (
                <li key={t.year} className="relative">
                  <span className="absolute -left-[34px] top-1 grid h-5 w-5 place-items-center rounded-full bg-[color:var(--primary)] text-[10px] font-bold text-primary-foreground">●</span>
                  <div className="text-sm font-bold text-foreground">{t.year}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Target, t: "Missão", d: "Promover saúde por meio de exames precisos e atendimento humano." },
            { icon: Sparkles, t: "Visão", d: "Ser referência em análises clínicas no Rio Grande do Norte." },
            { icon: HeartHandshake, t: "Valores", d: "Ética, empatia, qualidade e respeito ao paciente." },
            { icon: Award, t: "Compromisso", d: "Padrões rigorosos de qualidade em cada resultado entregue." },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-hero text-primary-foreground"><b.icon className="h-5 w-5" /></span>
              <h4 className="mt-4 text-lg font-bold">{b.t}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
