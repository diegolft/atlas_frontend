"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageBackground } from "@/components/layout/page-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useRegister } from "@/hooks/use-auth";
import { toast } from "sonner";
import { DatePickerField } from "@/components/ui/date-picker-field";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState<{
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  }>({});
  const registerMutation = useRegister();

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 250);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: !name.trim(),
      email: !email.trim(),
      phone: !phone.trim(),
      password: !password.trim(),
      confirmPassword: !confirmPassword.trim(),
    };
    setErrors(newErrors);
    if (
      newErrors.name ||
      newErrors.email ||
      newErrors.phone ||
      newErrors.password ||
      newErrors.confirmPassword
    ) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }
    registerMutation.mutate({
      name,
      email,
      phone,
      password,
      confirmPassword,
      birthday: birthday || undefined,
    });
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
              Criar conta
            </h1>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">
                  Nome
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: false }));
                  }}
                  aria-invalid={errors.name}
                  className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-[rgba(139,92,246)] ${
                    errors.name ? "border-red-500 focus-visible:ring-red-500/40" : ""
                  }`}
                />
              </div>

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
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: false }));
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
                <Label htmlFor="phone" className="text-slate-300">
                  Número
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="11999999999"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone)
                      setErrors((prev) => ({ ...prev, phone: false }));
                  }}
                  aria-invalid={errors.phone}
                  className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-[rgba(139,92,246)] ${
                    errors.phone
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-300">
                  Confirma senha
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword)
                      setErrors((prev) => ({ ...prev, confirmPassword: false }));
                  }}
                  aria-invalid={errors.confirmPassword}
                  className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-[rgba(139,92,246)] ${
                    errors.confirmPassword
                      ? "border-red-500 focus-visible:ring-red-500/40"
                      : ""
                  }`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthday" className="text-slate-300">
                  Data nascimento
                </Label>
                <DatePickerField
                  value={birthday}
                  onChange={(value) => setBirthday(value ?? "")}
                  placeholder="Selecione a data"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full mt-6 bg-[rgba(139,92,246)] text-white hover:bg-[rgba(139,92,246)]/90 rounded-full py-6 font-normal"
            >
              {registerMutation.isPending ? (
                <>
                  <Spinner className="mr-2" />
                  Criando conta...
                </>
              ) : (
                "Criar conta"
              )}
            </Button>

            <p className="text-center text-slate-400 text-xs md:text-sm mt-4 md:mt-6">
              Já tem conta?{" "}
              <Link href="/login" className="text-[rgba(139,92,246)] hover:underline">
                Entrar
              </Link>
            </p>
          </form>
        </div>
      </div>
    </PageBackground>
  );
}
