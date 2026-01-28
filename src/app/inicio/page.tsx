"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageBackground } from "@/components/layout/page-background";

export default function InicioPage() {
  const [progressValue, setProgressValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Animação inicial do progresso
    const timer = setTimeout(() => {
      setProgressValue(68);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleProgressHover = () => {
    setIsHovered(true);
    // Aumenta o progresso ao passar o mouse
    setProgressValue(85);
  };

  const handleProgressLeave = () => {
    setIsHovered(false);
    // Volta ao valor original
    setProgressValue(68);
  };

  return (
    <PageBackground>
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Coluna Esquerda - Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[rgba(65,254,179)] bg-transparent">
              <span className="text-sm font-normal text-white tracking-wide">
                IA aplicada a rotina real
              </span>
            </div>

            {/* Título Principal */}
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Transforme dieta, treino e finanças em um único fluxo
            </h1>

            {/* Parágrafo Descritivo */}
            <p className="text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              O Atlas integra diário alimentar, periodização de treino, metas e
              controle financeiro em um painel único com análise de progresso e
              alertas de autossabotagem.
            </p>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-[rgba(65,254,179)] text-black hover:bg-[rgba(65,254,179)]/90 active:bg-[rgba(65,254,179)]/80 rounded-full px-8 py-6 text-base font-normal tracking-wide"
                >
                  Quero começar
                </Button>
              </Link>
              <Link href="/planos">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-[rgba(65,254,179)] hover:text-[rgba(65,254,179)] rounded-full px-8 py-6 text-base font-normal tracking-wide"
                >
                  Ver planos
                </Button>
              </Link>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-slate-800">
              <div>
                <div className="text-4xl font-bold text-white mb-2">92%</div>
                <div className="text-sm text-slate-400 font-normal">
                  aderência média
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">4.8/5</div>
                <div className="text-sm text-slate-400 font-normal">
                  satisfação dos atletas
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">+31%</div>
                <div className="text-sm text-slate-400 font-normal">
                  progresso em 8 semanas
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita - Painel Resumo Inteligente */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6">
                Resumo inteligente
              </h2>

              <div className="space-y-6">
                {/* Status do ciclo atual */}
                <div>
                  <div className="text-sm text-white font-normal mb-4">
                    Status do ciclo atual
                  </div>
                </div>

                {/* Foco com Barra de Progresso Interativa */}
                <div>
                  <div className="text-sm text-white font-normal mb-3">Foco</div>
                  <div
                    className="mb-2 cursor-pointer transition-all duration-300"
                    onMouseEnter={handleProgressHover}
                    onMouseLeave={handleProgressLeave}
                  >
                    <Progress
                      value={progressValue}
                      className="h-2 bg-slate-700"
                      indicatorClassName="bg-[rgba(65,254,179)] transition-all duration-500 ease-out"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-normal">
                      Consistência
                    </span>
                    {isHovered && (
                      <span className="text-xs text-[rgba(65,254,179)] font-normal animate-pulse">
                        {progressValue}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Lista de Status */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[rgba(65,254,179)]"></div>
                    <span className="text-sm text-white font-normal">
                      Treino em alta
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[rgba(65,254,179)]"></div>
                    <span className="text-sm text-white font-normal">
                      Calorias dentro da meta
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[rgba(65,254,179)]"></div>
                    <span className="text-sm text-white font-normal">
                      Gastos controlados
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageBackground>
  );
}
