import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import logo from "@/assets/ampliaedu-logo.png";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Nova senha — AmpliaEdu" }] }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => { if (data.session) setReady(true); });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Senha atualizada!");
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center mb-8">
          <img src={logo} alt="" className="h-12 w-12 mb-3" />
          <h1 className="text-2xl font-bold">Defina sua nova senha</h1>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
          {!ready ? (
            <p className="text-sm text-muted-foreground text-center">
              Link inválido ou expirado. <Link to="/auth" search={{ mode: "forgot" }} className="text-brand hover:underline">Solicitar novo link</Link>
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="password">Nova senha</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="h-11" />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-11 bg-brand hover:bg-brand/90 text-brand-foreground">
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Atualizar senha
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}