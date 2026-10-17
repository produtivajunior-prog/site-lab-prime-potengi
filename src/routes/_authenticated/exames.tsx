import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout, PageHero } from "@/components/layout/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { Download, FileText, LogOut, Loader2, Inbox } from "lucide-react";
import { formatCpf } from "@/lib/cpf";

export const Route = createFileRoute("/_authenticated/exames")({
  head: () => ({
    meta: [
      { title: "Meus Exames — Prime Potengi" },
      { name: "description", content: "Acesse e baixe seus resultados de exames." },
    ],
  }),
  component: Exames,
});

type Profile = { nome: string; cpf: string };
type Exame = { id: string; nome_arquivo: string; storage_path: string; data_postagem: string };

function Exames() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [exames, setExames] = useState<Exame[] | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const [{ data: prof }, { data: exs }] = await Promise.all([
        supabase.from("profiles").select("nome, cpf").maybeSingle(),
        supabase.from("exames").select("id, nome_arquivo, storage_path, data_postagem").order("data_postagem", { ascending: false }),
      ]);
      setProfile(prof);
      setExames(exs ?? []);
    })();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  async function baixar(e: Exame) {
    setDownloading(e.id);
    const { data, error } = await supabase.storage.from("exames").createSignedUrl(e.storage_path, 60);
    setDownloading(null);
    if (error || !data) { alert("Não foi possível gerar o link. Tente novamente."); return; }
    window.open(data.signedUrl, "_blank");
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow={profile ? `Olá, ${profile.nome.split(" ")[0]}` : "Carregando..."}
        title="Meus Exames"
        subtitle={profile ? `CPF ${formatCpf(profile.cpf)}` : ""}
      />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-extrabold">Resultados disponíveis</h2>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary">
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>

        {exames === null ? (
          <div className="grid place-items-center rounded-3xl bg-card p-16 shadow-card">
            <Loader2 className="h-7 w-7 animate-spin text-[color:var(--primary)]" />
          </div>
        ) : exames.length === 0 ? (
          <div className="grid place-items-center rounded-3xl bg-cream p-16 text-center shadow-card">
            <Inbox className="h-10 w-10 text-[color:var(--primary)]" />
            <p className="mt-4 text-lg font-bold">Nenhum exame disponível ainda</p>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Assim que seus exames forem postados, eles aparecerão aqui para download.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {exames.map((e) => (
              <li key={e.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-hero text-primary-foreground">
                  <FileText className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-bold text-foreground">{e.nome_arquivo}</p>
                  <p className="text-xs text-muted-foreground">
                    Postado em {new Date(e.data_postagem).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <button
                  onClick={() => baixar(e)}
                  disabled={downloading === e.id}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-primary-foreground shadow-card hover:brightness-110 disabled:opacity-60"
                  style={{ background: "var(--primary)" }}
                >
                  {downloading === e.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
                  Baixar PDF
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </SiteLayout>
  );
}
