import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-display text-2xl font-medium leading-snug text-foreground sm:text-3xl">
            Cuidado, precisão e confiança em cada resultado.
          </p>
        </div>

        <div className="mt-16 grid gap-12 border-t border-border pt-12 md:grid-cols-3">
          <div>
            <p className="label-tag text-foreground">Contato</p>
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-base font-semibold text-foreground hover:text-[color:var(--primary)]"
            >
              <Phone className="h-4 w-4 text-[color:var(--primary)]" strokeWidth={1.5} />
              {SITE.telefone}
            </a>
            <p className="mt-2 text-sm text-muted-foreground">{SITE.email}</p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-md border border-border text-foreground transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <Link
                to="/unidades"
                aria-label="Unidades"
                className="grid h-9 w-9 place-items-center rounded-md border border-border text-foreground transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
              >
                <MapPin className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          <div>
            <p className="label-tag text-foreground">Navegação</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/quem-somos" className="hover:text-foreground">Quem Somos</Link></li>
              <li><Link to="/servicos" className="hover:text-foreground">Serviços</Link></li>
              <li><Link to="/unidades" className="hover:text-foreground">Unidades</Link></li>
              <li><Link to="/contato" className="hover:text-foreground">Contato</Link></li>
            </ul>
          </div>

          <div>
            <p className="label-tag text-foreground">Institucional</p>
            <p className="mt-4 text-sm font-semibold text-foreground">{SITE.nome}</p>
            <p className="mt-1 text-sm text-muted-foreground">{SITE.razao}</p>
            <p className="text-sm text-muted-foreground">CNPJ: {SITE.cnpj}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {SITE.nome}. Todos os direitos reservados.</span>
          <div className="flex items-center gap-4">
            <Link to="/contato" className="hover:text-foreground">Política de Privacidade</Link>
            <Link to="/auth" className="hover:text-foreground">Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
