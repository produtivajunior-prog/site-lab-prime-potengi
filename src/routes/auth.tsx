import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout, PageHero } from "@/components/layout/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { cpfToAuthEmail, formatCpf, isValidCpf, onlyDigits } from "@/lib/cpf";
import { z } from "zod";
import { FileText, Loader2, LogIn, UserPlus } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Retire seu Exame — Prime Potengi" },
      { name: "description", content: "Acesse seus resultados de exames online. Entre com CPF e senha." },
      { property: "og:title", content: "Área do Paciente — Prime Potengi" },
      { property: "og:description", content: "Resultados de exames online, com segurança." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/exames", replace: true });
    });
  }, [navigate]);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Área do Paciente"
        title="Retire seu Exame"
        subtitle="Acesse com seu CPF para ver e baixar seus resultados a qualquer hora."
      />
      <section className="mx-auto max-w-md px-4 py-14 sm:px-6">
        <div className="rounded-3xl bg-card p-8 shadow-elegant">
          <div className="mb-6 flex rounded-full bg-secondary p-1 text-sm font-bold">
            <button
              onClick={() => setMode("login")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 transition ${mode === "login" ? "bg-background text-foreground shadow-card" : "text-muted-foreground"}`}
            >
              <LogIn className="h-4 w-4" /> Entrar
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 transition ${mode === "signup" ? "bg-background text-foreground shadow-card" : "text-muted-foreground"}`}
            >
              <UserPlus className="h-4 w-4" /> Cadastrar
            </button>
          </div>

          {mode === "login" ? <LoginForm /> : <SignupForm onDone={() => setMode("login")} />}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Ao continuar você concorda com nossa{" "}
            <Link to="/contato" className="underline">política de privacidade</Link>.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

const loginSchema = z.object({
  cpf: z.string().refine(isValidCpf, "CPF inválido"),
  senha: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
});

function LoginForm() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const r = loginSchema.safeParse({ cpf, senha });
    if (!r.success) { setErr(r.error.issues[0].message); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: cpfToAuthEmail(cpf),
      password: senha,
    });
    setLoading(false);
    if (error) { setErr("CPF ou senha incorretos."); return; }
    navigate({ to: "/exames", replace: true });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-foreground/80">CPF</label>
        <input
          inputMode="numeric"
          autoComplete="username"
          value={cpf}
          onChange={(e) => setCpf(formatCpf(e.target.value))}
          placeholder="000.000.000-00"
          className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-[color:var(--primary)]"
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-foreground/80">Senha</label>
        <input
          type="password"
          autoComplete="current-password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-[color:var(--primary)]"
        />
      </div>
      {err && <p className="text-sm font-semibold text-destructive">{err}</p>}
      <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-card transition hover:brightness-110 disabled:opacity-60" style={{ background: "var(--primary)" }}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
        Acessar meus exames
      </button>
    </form>
  );
}

const signupSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  cpf: z.string().refine(isValidCpf, "CPF inválido"),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z.string().trim().min(8, "Telefone inválido").max(20),
  senha: z.string().min(6, "Mínimo 6 caracteres").max(72),
});

function SignupForm({ onDone }: { onDone: () => void }) {
  const [form, setForm] = useState({ nome: "", cpf: "", email: "", telefone: "", senha: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const r = signupSchema.safeParse(form);
    if (!r.success) { setErr(r.error.issues[0].message); return; }
    setLoading(true);
    const cpfDigits = onlyDigits(form.cpf);
    const { error } = await supabase.auth.signUp({
      email: cpfToAuthEmail(cpfDigits),
      password: form.senha,
      options: {
        emailRedirectTo: `${window.location.origin}/exames`,
        data: {
          nome: form.nome,
          cpf: cpfDigits,
          email_contato: form.email,
          telefone: form.telefone,
        },
      },
    });
    setLoading(false);
    if (error) {
      setErr(error.message.includes("registered") ? "Este CPF já possui cadastro." : error.message);
      return;
    }
    setOk(true);
    setTimeout(onDone, 1500);
  }

  if (ok) {
    return (
      <div className="rounded-2xl bg-cream p-6 text-center">
        <p className="text-base font-bold text-foreground">Cadastro realizado!</p>
        <p className="mt-1 text-sm text-muted-foreground">Já pode entrar com seu CPF e senha.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <SField label="Nome completo" value={form.nome} onChange={(v) => setForm({ ...form, nome: v })} />
      <SField label="CPF" value={form.cpf} onChange={(v) => setForm({ ...form, cpf: formatCpf(v) })} placeholder="000.000.000-00" inputMode="numeric" />
      <SField label="E-mail para contato" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
      <SField label="Telefone" value={form.telefone} onChange={(v) => setForm({ ...form, telefone: v })} placeholder="(84) 00000-0000" />
      <SField label="Senha" type="password" value={form.senha} onChange={(v) => setForm({ ...form, senha: v })} />
      {err && <p className="text-sm font-semibold text-destructive">{err}</p>}
      <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-card hover:brightness-110 disabled:opacity-60" style={{ background: "var(--primary)" }}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
        Criar cadastro
      </button>
    </form>
  );
}

function SField({ label, value, onChange, type = "text", placeholder, inputMode }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; inputMode?: any }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-wider text-foreground/80">{label}</label>
      <input type={type} value={value} placeholder={placeholder} inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)} maxLength={255}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-[color:var(--primary)]" />
    </div>
  );
}
