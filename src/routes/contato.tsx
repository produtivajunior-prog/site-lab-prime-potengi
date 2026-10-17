import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/layout/SiteLayout";
import { Phone, MessageCircle, Instagram, Mail, MapPin, ExternalLink } from "lucide-react";
import { SITE } from "@/lib/site-data";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Prime Potengi" },
      { name: "description", content: "Fale com o Laboratório Prime Potengi por telefone, WhatsApp, Instagram ou e-mail." },
      { property: "og:title", content: "Contato — Prime Potengi" },
      { property: "og:description", content: "Estamos prontos para atender você." },
    ],
  }),
  component: Contato,
});

function Contato() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Fale conosco" title="Contato" subtitle="Estamos prontos para responder às suas dúvidas e ajudar no que precisar." />

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* WhatsApp — destaque principal */}
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative flex flex-col justify-between rounded-md border border-border bg-background p-8 transition hover:border-[color:var(--primary)] md:col-span-2 md:flex-row md:items-center"
          >
            <div className="absolute inset-y-0 left-0 w-1 rounded-l-md bg-[color:var(--primary)]" />
            <div className="flex items-center gap-5">
              <MessageCircle className="h-7 w-7 shrink-0 text-[color:var(--primary)]" strokeWidth={1.5} />
              <div>
                <div className="label-tag">WhatsApp</div>
                <div className="mt-1 text-lg font-semibold text-foreground">Iniciar conversa</div>
                <p className="mt-1 text-sm text-muted-foreground">Resposta rápida para agendamentos e dúvidas.</p>
              </div>
            </div>
            <ExternalLink className="mt-4 h-5 w-5 shrink-0 text-muted-foreground transition group-hover:text-[color:var(--primary)] md:mt-0" strokeWidth={1.5} />
          </a>

          <ContactItem icon={Phone} label="Telefone" value={SITE.telefone} href={SITE.whatsappUrl} />
          <ContactItem icon={Instagram} label="Instagram" value="@labprimepotengi" href={SITE.instagram} />

          <a
            href={`mailto:${SITE.email}`}
            className="group flex items-center gap-5 rounded-md border border-border bg-background p-8 transition hover:border-[color:var(--primary)] md:col-span-2"
          >
            <Mail className="h-7 w-7 shrink-0 text-[color:var(--primary)]" strokeWidth={1.5} />
            <div className="min-w-0 flex-1">
              <div className="label-tag">E-mail</div>
              <div className="mt-1 text-lg font-semibold text-foreground">{SITE.email}</div>
            </div>
            <ExternalLink className="h-5 w-5 shrink-0 text-muted-foreground transition group-hover:text-[color:var(--primary)]" strokeWidth={1.5} />
          </a>
        </div>
      </section>

      {/* Seção contextual — Unidades */}
      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">Atendimento presencial</h2>
              <p className="mt-1 text-sm text-muted-foreground">Encontre a unidade mais próxima de você em Natal, Parnamirim e João Câmara.</p>
            </div>
            <Link
              to="/unidades"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-[color:var(--primary)]"
            >
              <MapPin className="h-4 w-4 text-[color:var(--primary)]" strokeWidth={1.5} />
              Ver unidades
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ContactItem({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center gap-5 rounded-md border border-border bg-background p-8 transition hover:border-[color:var(--primary)]"
    >
      <Icon className="h-7 w-7 shrink-0 text-[color:var(--primary)]" strokeWidth={1.5} />
      <div className="min-w-0 flex-1">
        <div className="label-tag">{label}</div>
        <div className="mt-1 truncate text-lg font-semibold text-foreground">{value}</div>
      </div>
      {external && (
        <ExternalLink className="h-5 w-5 shrink-0 text-muted-foreground transition group-hover:text-[color:var(--primary)]" strokeWidth={1.5} />
      )}
    </a>
  );
}
