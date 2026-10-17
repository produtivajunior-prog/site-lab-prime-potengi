import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/layout/SiteLayout";
import { Truck, Home, ShieldCheck, Phone } from "lucide-react";
import { SITE } from "@/lib/site-data";

export const Route = createFileRoute("/atendimento-movel")({
  head: () => ({
    meta: [
      { title: "Atendimento Móvel — Prime Potengi" },
      { name: "description", content: "Coleta domiciliar de exames com segurança, conforto e qualidade pelo Laboratório Prime Potengi." },
      { property: "og:title", content: "Atendimento Móvel — Prime Potengi" },
      { property: "og:description", content: "Coleta de exames onde você estiver." },
    ],
  }),
  component: AtendimentoMovel,
});

function AtendimentoMovel() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Coleta Domiciliar" title="Atendimento Móvel" subtitle="Comodidade e qualidade na coleta dos seus exames, no conforto da sua casa." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="space-y-4 text-base leading-relaxed text-foreground/85">
            <p>
              O atendimento móvel do <strong>Laboratório Prime Potengi</strong> é ideal para idosos, pacientes acamados,
              crianças e qualquer pessoa que prefira realizar a coleta de exames sem precisar se deslocar.
            </p>
            <p>
              Nossos profissionais seguem rigorosos protocolos de biossegurança e atendem com cordialidade e respeito,
              garantindo que sua experiência seja tão tranquila quanto a feita em uma de nossas unidades.
            </p>
          </div>
          <Link
            to="/contato"
            className="inline-flex items-center justify-center gap-2 self-start rounded-full px-7 py-4 text-sm font-bold text-highlight-foreground shadow-elegant transition hover:brightness-110"
            style={{ background: "var(--highlight)" }}
          >
            <Phone className="h-4 w-4" /> Solicitar atendimento
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { icon: Home, t: "No conforto de casa", d: "Sem filas, sem deslocamento. Nós vamos até você." },
            { icon: ShieldCheck, t: "Biossegurança", d: "Profissionais treinados e materiais estéreis." },
            { icon: Truck, t: "Área de cobertura", d: "Natal, Parnamirim e região metropolitana." },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-hero text-primary-foreground"><b.icon className="h-5 w-5" /></span>
              <h4 className="mt-4 text-lg font-bold">{b.t}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-cream p-8 text-center shadow-card sm:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[color:var(--primary)]">Como solicitar</p>
          <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">Ligue ou nos chame no WhatsApp</h3>
          <p className="mt-2 text-muted-foreground">Nossa equipe agenda dia e horário conforme sua disponibilidade.</p>
          <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-base font-bold text-foreground shadow-card hover:bg-secondary">
            <Phone className="h-4 w-4" /> {SITE.telefone}
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
