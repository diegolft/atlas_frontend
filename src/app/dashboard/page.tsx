"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useLogout } from "@/hooks/use-auth";
import { PageBackground } from "@/components/layout/page-background";

export default function DashboardPage() {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <PageBackground>
      <div className="flex min-h-screen flex-col">
        {/* Header com botão de logout */}
        <header className="border-b border-slate-800 bg-transparent">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="bg-transparent border-slate-700 text-slate-300 hover:bg-[rgba(139,92,246)] hover:text-black active:bg-[rgba(139,92,246)] active:text-black"
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
          </div>
        </header>

        {/* Conteúdo principal */}
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Bem-vindo ao sistema
            </h2>
            <p className="text-slate-400">Dashboard em construção</p>
          </div>
        </main>
      </div>
    </PageBackground>
  );
}
