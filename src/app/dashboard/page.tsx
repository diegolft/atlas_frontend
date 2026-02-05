"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useLogout } from "@/hooks/use-auth";
import { PageBackground } from "@/components/layout/page-background";
import {
  Brain,
  Dumbbell,
  LayoutDashboard,
  MessageCircle,
  Target,
  User,
  Utensils,
  Wallet,
} from "lucide-react";

export default function DashboardPage() {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <PageBackground>
      <div className="relative flex min-h-screen flex-col">
        <div
          className="pointer-events-none absolute inset-0 bg-black/50"
          aria-hidden="true"
        />
        <aside className="fixed left-4 top-1/2 z-10 hidden -translate-y-1/2 md:block">
          <nav className="mb-3 flex flex-col gap-2 rounded-2xl border border-slate-800/70 bg-slate-950/70 p-2 backdrop-blur">
            <Button
              variant="ghost"
              className="justify-center text-slate-200 hover:bg-slate-800/60"
              aria-label="Chat"
              title="Chat"
            >
              <MessageCircle className="size-5" />
            </Button>
          </nav>
          <nav className="flex flex-col gap-2 rounded-2xl border border-slate-800/70 bg-slate-950/70 p-2 backdrop-blur">
            <Button
              variant="ghost"
              className="justify-center text-slate-200 hover:bg-slate-800/60"
              aria-label="Overview"
              title="Overview"
            >
              <LayoutDashboard className="size-5" />
            </Button>
            <Button
              variant="ghost"
              className="justify-center text-slate-200 hover:bg-slate-800/60"
              aria-label="Target"
              title="Target"
            >
              <Target className="size-5" />
            </Button>
            <Button
              variant="ghost"
              className="justify-center text-slate-200 hover:bg-slate-800/60"
              aria-label="Financeiro"
              title="Financeiro"
            >
              <Wallet className="size-5" />
            </Button>
            <Button
              variant="ghost"
              className="justify-center text-slate-200 hover:bg-slate-800/60"
              aria-label="Treino"
              title="Treino"
            >
              <Dumbbell className="size-5" />
            </Button>
            <Button
              variant="ghost"
              className="justify-center text-slate-200 hover:bg-slate-800/60"
              aria-label="Alimentação"
              title="Alimentação"
            >
              <Utensils className="size-5" />
            </Button>
            <Button
              variant="ghost"
              className="justify-center text-slate-200 hover:bg-slate-800/60"
              aria-label="Comportamento"
              title="Comportamento"
            >
              <Brain className="size-5" />
            </Button>
          </nav>
          <nav className="mt-3 flex flex-col gap-2 rounded-2xl border border-slate-800/70 bg-slate-950/70 p-2 backdrop-blur">
            <Button
              variant="ghost"
              className="justify-center text-slate-200 hover:bg-slate-800/60"
              aria-label="Usuário"
              title="Usuário"
            >
              <User className="size-5" />
            </Button>
          </nav>
        </aside>
        <nav className="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-2xl border border-slate-800/70 bg-slate-950/70 p-2 backdrop-blur md:hidden">
          <Button
            variant="ghost"
            className="justify-center text-slate-200 hover:bg-slate-800/60"
            aria-label="Chat"
            title="Chat"
          >
            <MessageCircle className="size-5" />
          </Button>
          <Button
            variant="ghost"
            className="justify-center text-slate-200 hover:bg-slate-800/60"
            aria-label="Overview"
            title="Overview"
          >
            <LayoutDashboard className="size-5" />
          </Button>
          <Button
            variant="ghost"
            className="justify-center text-slate-200 hover:bg-slate-800/60"
            aria-label="Target"
            title="Target"
          >
            <Target className="size-5" />
          </Button>
          <Button
            variant="ghost"
            className="justify-center text-slate-200 hover:bg-slate-800/60"
            aria-label="Financeiro"
            title="Financeiro"
          >
            <Wallet className="size-5" />
          </Button>
          <Button
            variant="ghost"
            className="justify-center text-slate-200 hover:bg-slate-800/60"
            aria-label="Treino"
            title="Treino"
          >
            <Dumbbell className="size-5" />
          </Button>
          <Button
            variant="ghost"
            className="justify-center text-slate-200 hover:bg-slate-800/60"
            aria-label="Alimentação"
            title="Alimentação"
          >
            <Utensils className="size-5" />
          </Button>
          <Button
            variant="ghost"
            className="justify-center text-slate-200 hover:bg-slate-800/60"
            aria-label="Comportamento"
            title="Comportamento"
          >
            <Brain className="size-5" />
          </Button>
          <Button
            variant="ghost"
            className="justify-center text-slate-200 hover:bg-slate-800/60"
            aria-label="Usuário"
            title="Usuário"
          >
            <User className="size-5" />
          </Button>
        </nav>
        <Button
          variant="outline"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="absolute right-4 top-4 bg-transparent border-slate-700 text-slate-300 hover:bg-[rgba(139,92,246)] hover:text-black active:bg-[rgba(139,92,246)] active:text-black"
        >
          {logoutMutation.isPending ? (
            <>
              <Spinner className="mr-2" />
              Saindo...
            </>
          ) : (
            "Sair"
          )}
        </Button>

        {/* Conteúdo principal */}
        <main className="flex flex-1 items-center justify-center" />
      </div>
    </PageBackground>
  );
}
