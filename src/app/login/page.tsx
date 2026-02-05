"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageBackground } from "@/components/layout/page-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useLogin } from "@/hooks/use-auth";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState<{ email?: boolean; password?: boolean }>(
    {},
  );
  const loginMutation = useLogin();

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 250);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      email: !email.trim(),
      password: !password.trim(),
    };
    setErrors(newErrors);
    if (newErrors.email || newErrors.password) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }
    loginMutation.mutate({ email, password });
  };

  return (
    <PageBackground>
      <div className="min-h-screen flex items-center justify-center px-4 pt-2 md:pt-4 pb-8 md:pb-12">
        <div className="w-full max-w-sm">
          <form
            onSubmit={handleSubmit}
            className={`rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 md:p-8 shadow-xl transition-opacity duration-500 ease-out ${
              showForm ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">
              Entrar
            </h1>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: false }));
                  }}
                  aria-invalid={errors.email}
                  className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-[rgba(139,92,246)] ${
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500/40"
                      : ""
                  }`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: false }));
                  }}
                  aria-invalid={errors.password}
                  className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-[rgba(139,92,246)] ${
                    errors.password
                      ? "border-red-500 focus-visible:ring-red-500/40"
                      : ""
                  }`}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full mt-6 bg-[rgba(139,92,246)] text-white hover:bg-[rgba(139,92,246)]/90 rounded-full py-6 font-normal"
            >
              {loginMutation.isPending ? (
                <>
                  <Spinner className="mr-2" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>

            <p className="text-center text-slate-400 text-xs md:text-sm mt-4 md:mt-6">
              Não tem conta?{" "}
              <Link
                href="/register"
                className="text-[rgba(139,92,246)] hover:underline"
              >
                Registre-se agora
              </Link>
            </p>
          </form>
        </div>
      </div>
    </PageBackground>
  );
}
