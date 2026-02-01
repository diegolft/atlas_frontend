"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  Wallet,
  Calendar,
  Target,
  Trophy,
  BarChart3,
  Zap,
  Shield,
  Star,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageBackground } from "@/components/layout/page-background";
import { ScrollReveal } from "@/components/layout/scroll-reveal";

const SECTION_IDS = [
  "inicio",
  "produto",
  "comparativo",
  "planos",
  "faq",
] as const;

type PlanPeriod = "mensal" | "trimestral" | "anual";

const PLAN_PRICES: Record<
  PlanPeriod,
  { price: string; from?: string; perDay?: string; cash?: string }
> = {
  mensal: { price: "29,00", from: "39,00", perDay: "0,97", cash: undefined },
  trimestral: { price: "25,00", from: "87,00", perDay: "0,83", cash: "75,00" },
  anual: { price: "20,58", from: "447,00", perDay: "0,68", cash: "247,00" },
};

const PLAN_FEATURES = [
  "Acesso total ao app Web + Mobile",
  "Focus: Sua IA de produtividade diária",
  "Sistema de Gamificação com Níveis e XP",
  "Gestão Financeira Completa",
  "Comunidade Exclusiva de Elite",
  "Suporte Prioritário",
  "Atualizações Semanais",
];

export default function InicioPage() {
  const [progressValue, setProgressValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [planPeriod, setPlanPeriod] = useState<PlanPeriod>("anual");

  useEffect(() => {
    const timer = setTimeout(() => setProgressValue(68), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (hash && SECTION_IDS.includes(hash as (typeof SECTION_IDS)[number])) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  // Atualiza o hash conforme o scroll para destacar o link ativo na navbar
  useEffect(() => {
    const navbarOffset = 120;

    const getActiveSection = (): string => {
      const visible: { id: string; top: number }[] = [];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.bottom > navbarOffset) visible.push({ id, top: rect.top });
      }
      if (visible.length === 0) return SECTION_IDS[0];
      visible.sort((a, b) => a.top - b.top);
      const topmost = visible[0];
      return topmost.top <= navbarOffset ? topmost.id : visible[0].id;
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const section = getActiveSection();
        const currentHash = window.location.hash?.slice(1) || "inicio";
        if (section !== currentHash) {
          history.replaceState(null, "", `/inicio#${section}`);
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleProgressHover = () => {
    setIsHovered(true);
    setProgressValue(85);
  };

  const handleProgressLeave = () => {
    setIsHovered(false);
    setProgressValue(68);
  };

  return (
    <PageBackground>
      <div className="min-h-screen">
        {/* Seção Início */}
        <section
          id="inicio"
          className="scroll-mt-16 min-h-screen flex items-center"
        >
          <ScrollReveal initialVisible className="w-full">
          <div className="container mx-auto px-4 pt-3 md:pt-5 lg:pt-8 pb-10 md:pb-16 lg:pb-24 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
              <div className="lg:col-span-2 space-y-5 md:space-y-8">
                <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-[rgba(65,254,179)] bg-transparent">
                  <span className="text-xs md:text-sm font-normal text-white tracking-wide">
                    IA aplicada a rotina real
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Crie disciplina sem depender de motivação.
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
                  Focus organiza. Você executa.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                  <Link href="/login">
                    <Button
                      size="lg"
                      className="bg-[rgba(65,254,179)] text-black hover:bg-[rgba(65,254,179)]/90 active:bg-[rgba(65,254,179)]/80 rounded-full px-8 py-6 text-base font-normal tracking-wide"
                    >
                      Quero começar
                    </Button>
                  </Link>
                  <a href="#planos">
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-[rgba(65,254,179)] hover:text-[rgba(65,254,179)] rounded-full px-8 py-6 text-base font-normal tracking-wide"
                    >
                      Ver planos
                    </Button>
                  </a>
                </div>
                <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 md:pt-12 border-t border-slate-800">
                  <div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">
                      92%
                    </div>
                    <div className="text-xs md:text-sm text-slate-400 font-normal">
                      aderência média
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">
                      4.8/5
                    </div>
                    <div className="text-xs md:text-sm text-slate-400 font-normal">
                      satisfação dos atletas
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">
                      +31%
                    </div>
                    <div className="text-xs md:text-sm text-slate-400 font-normal">
                      progresso em 8 semanas
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 md:p-6 shadow-xl">
                  <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">
                    Resumo inteligente
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <div className="text-sm text-white font-normal mb-4">
                        Status do ciclo atual
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-white font-normal mb-3">
                        Foco
                      </div>
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
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[rgba(65,254,179)]" />
                        <span className="text-sm text-white font-normal">
                          Treino em alta
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[rgba(65,254,179)]" />
                        <span className="text-sm text-white font-normal">
                          Calorias dentro da meta
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[rgba(65,254,179)]" />
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
          </ScrollReveal>
        </section>

        {/* Seção Produto - O Arsenal Completo */}
        <section
          id="produto"
          className="scroll-mt-16 min-h-screen flex items-center py-6 md:py-10"
        >
          <ScrollReveal direction="left" className="w-full">
          <div className="container mx-auto px-4 py-6 md:py-10 w-full">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wide mb-3 md:mb-4 px-2">
                O{" "}
                <span className="text-red-500">ARSENAL</span>{" "}
                COMPLETO
              </h2>
              <p className="text-slate-300 text-base md:text-lg px-2">
                Focus comanda. Você executa.{" "}
                <span className="text-[rgba(65,254,179)]">
                  Resultados aparecem.
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {/* Tarefas Diárias - Verde */}
              <div
                className="rounded-2xl border bg-slate-900/40 backdrop-blur-sm p-4 md:p-6 lg:p-8 transition-all duration-300 hover:border-[rgba(65,254,179,0.5)] card-glow-green"
                style={{
                  borderColor: "rgba(65,254,179,0.28)",
                  boxShadow: "0 0 24px rgba(65,254,179,0.035)",
                }}
              >
                <ClipboardList
                  className="h-10 w-10 md:h-12 md:w-12 mb-3 md:mb-4"
                  strokeWidth={1.5}
                  style={{ color: "rgba(65,254,179,0.88)" }}
                />
                <h3 className="text-base md:text-lg font-bold uppercase tracking-wide mb-2 md:mb-3 text-white">
                  Tarefas Diárias
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Crie, organize, EXECUTE. Focus cobra cada uma. Dashboard mostra
                  progresso em tempo real.
                </p>
              </div>

              {/* Controle Financeiro - Vermelho suave */}
              <div
                className="rounded-2xl border bg-slate-900/40 backdrop-blur-sm p-4 md:p-6 lg:p-8 transition-all duration-300 hover:border-[rgba(248,113,113,0.5)] card-glow-red"
                style={{
                  borderColor: "rgba(248,113,113,0.28)",
                  boxShadow: "0 0 24px rgba(248,113,113,0.035)",
                }}
              >
                <Wallet
                  className="h-10 w-10 md:h-12 md:w-12 mb-3 md:mb-4"
                  strokeWidth={1.5}
                  style={{ color: "rgba(248,113,113,0.88)" }}
                />
                <h3 className="text-base md:text-lg font-bold uppercase tracking-wide mb-2 md:mb-3 text-white">
                  Controle Financeiro
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Receitas, despesas, orçamento. Veja onde cada centavo vai. Focus
                  alerta quando estourar.
                </p>
              </div>

              {/* Sistema de Hábitos - Azul suave */}
              <div
                className="rounded-2xl border bg-slate-900/40 backdrop-blur-sm p-4 md:p-6 lg:p-8 transition-all duration-300 hover:border-[rgba(96,165,250,0.5)] card-glow-blue"
                style={{
                  borderColor: "rgba(96,165,250,0.28)",
                  boxShadow: "0 0 24px rgba(96,165,250,0.035)",
                }}
              >
                <Calendar
                  className="h-10 w-10 md:h-12 md:w-12 mb-3 md:mb-4"
                  strokeWidth={1.5}
                  style={{ color: "rgba(96,165,250,0.88)" }}
                />
                <h3 className="text-base md:text-lg font-bold uppercase tracking-wide mb-2 md:mb-3 text-white">
                  Sistema de Hábitos
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Construa hábitos inquebráveis. Focus registra sequências. Cada
                  dia conta.
                </p>
              </div>

              {/* Metas & Sprints - Roxo suave */}
              <div
                className="rounded-2xl border bg-slate-900/40 backdrop-blur-sm p-4 md:p-6 lg:p-8 transition-all duration-300 hover:border-[rgba(192,132,252,0.5)] card-glow-purple"
                style={{
                  borderColor: "rgba(192,132,252,0.28)",
                  boxShadow: "0 0 24px rgba(192,132,252,0.035)",
                }}
              >
                <Target
                  className="h-10 w-10 md:h-12 md:w-12 mb-3 md:mb-4"
                  strokeWidth={1.5}
                  style={{ color: "rgba(192,132,252,0.88)" }}
                />
                <h3 className="text-base md:text-lg font-bold uppercase tracking-wide mb-2 md:mb-3 text-white">
                  Metas & Sprints
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Defina metas. Focus divide em sprints. 60 dias de foco total.
                  Resultados concretos.
                </p>
              </div>

              {/* Gamificação Militar - Laranja suave */}
              <div
                className="rounded-2xl border bg-slate-900/40 backdrop-blur-sm p-4 md:p-6 lg:p-8 transition-all duration-300 hover:border-[rgba(251,146,60,0.5)] card-glow-orange"
                style={{
                  borderColor: "rgba(251,146,60,0.28)",
                  boxShadow: "0 0 24px rgba(251,146,60,0.035)",
                }}
              >
                <Trophy
                  className="h-10 w-10 md:h-12 md:w-12 mb-3 md:mb-4"
                  strokeWidth={1.5}
                  style={{ color: "rgba(251,146,60,0.88)" }}
                />
                <h3 className="text-base md:text-lg font-bold uppercase tracking-wide mb-2 md:mb-3 text-white">
                  Gamificação Militar
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Ganhe XP. Suba de rank. Desbloqueie conquistas. Disciplina vira
                  jogo épico.
                </p>
              </div>

              {/* Relatórios Inteligentes - Âmbar suave */}
              <div
                className="rounded-2xl border bg-slate-900/40 backdrop-blur-sm p-4 md:p-6 lg:p-8 transition-all duration-300 hover:border-[rgba(251,191,36,0.5)] card-glow-amber"
                style={{
                  borderColor: "rgba(251,191,36,0.28)",
                  boxShadow: "0 0 24px rgba(251,191,36,0.035)",
                }}
              >
                <BarChart3
                  className="h-10 w-10 md:h-12 md:w-12 mb-3 md:mb-4"
                  strokeWidth={1.5}
                  style={{ color: "rgba(251,191,36,0.88)" }}
                />
                <h3 className="text-base md:text-lg font-bold uppercase tracking-wide mb-2 md:mb-3 text-white">
                  Relatórios Inteligentes
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Focus gera relatórios automáticos. Identifica padrões. Sugere
                  otimizações.
                </p>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </section>

        {/* Seção Comparativo */}
        <section
          id="comparativo"
          className="scroll-mt-16 min-h-screen flex items-center py-6 md:py-10"
        >
          <ScrollReveal direction="right" className="w-full">
          <div className="container mx-auto px-4 py-6 md:py-10 w-full">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-wide mb-3 px-2">
                Compare e escolha
              </h2>
              <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto px-2">
                Veja por que o <span className="text-[rgba(65,254,179)] font-medium">Focus</span> é a escolha certa para sua rotina.
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[640px] rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
                {/* Header da tabela */}
                <div className="grid grid-cols-4 border-b border-slate-800">
                  <div className="p-4 md:p-5 text-slate-400 text-sm font-medium">
                    Recurso
                  </div>
                  <div
                    className="relative p-4 md:p-5 text-center font-bold text-white text-sm md:text-base"
                    style={{
                      backgroundColor: "rgba(65,254,179,0.15)",
                      borderLeft: "1px solid rgba(65,254,179,0.3)",
                      borderRight: "1px solid rgba(65,254,179,0.3)",
                    }}
                  >
                    <span className="text-[rgba(65,254,179)]">Focus</span>
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 block"
                      style={{ backgroundColor: "rgba(65,254,179)" }}
                    />
                  </div>
                  <div className="p-4 md:p-5 text-center text-slate-400 text-sm font-medium bg-slate-800/30">
                    Outras ferramentas
                  </div>
                  <div className="p-4 md:p-5 text-center text-slate-400 text-sm font-medium bg-slate-800/30">
                    Planilhas
                  </div>
                </div>

                {/* Linhas do comparativo */}
                {[
                  { feature: "Tarefas diárias com cobrança", focus: true, outros: true, planilhas: false },
                  { feature: "Controle financeiro integrado", focus: true, outros: false, planilhas: true },
                  { feature: "Sistema de hábitos e sequências", focus: true, outros: false, planilhas: false },
                  { feature: "Metas e sprints (60 dias)", focus: true, outros: false, planilhas: false },
                  { feature: "Gamificação (XP, níveis, conquistas)", focus: true, outros: false, planilhas: false },
                  { feature: "Relatórios inteligentes e padrões", focus: true, outros: true, planilhas: false },
                  { feature: "IA de produtividade", focus: true, outros: false, planilhas: false },
                  { feature: "Suporte prioritário", focus: true, outros: false, planilhas: false },
                  { feature: "Acesso Web + Mobile", focus: true, outros: true, planilhas: true },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-4 border-b border-slate-800/80 text-sm md:text-base ${
                      i % 2 === 1 ? "bg-slate-800/20" : ""
                    }`}
                  >
                    <div className="p-4 md:p-5 text-slate-300">
                      {row.feature}
                    </div>
                    <div
                      className="p-4 md:p-5 flex items-center justify-center border-l border-r border-[rgba(65,254,179,0.2)]"
                      style={{ backgroundColor: "rgba(65,254,179,0.06)" }}
                    >
                      {row.focus ? (
                        <Check className="h-5 w-5 md:h-6 md:w-6 text-[rgba(65,254,179)]" strokeWidth={2.5} />
                      ) : (
                        <X className="h-5 w-5 md:h-6 md:w-6 text-slate-600" strokeWidth={2} />
                      )}
                    </div>
                    <div className="p-4 md:p-5 flex items-center justify-center bg-slate-800/20">
                      {row.outros ? (
                        <Check className="h-5 w-5 md:h-6 md:w-6 text-slate-500" strokeWidth={2} />
                      ) : (
                        <X className="h-5 w-5 md:h-6 md:w-6 text-slate-600" strokeWidth={2} />
                      )}
                    </div>
                    <div className="p-4 md:p-5 flex items-center justify-center bg-slate-800/20">
                      {row.planilhas ? (
                        <Check className="h-5 w-5 md:h-6 md:w-6 text-slate-500" strokeWidth={2} />
                      ) : (
                        <X className="h-5 w-5 md:h-6 md:w-6 text-slate-600" strokeWidth={2} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-slate-500 text-xs md:text-sm mt-6 px-2">
              Focus reúne em um só lugar o que outras ferramentas e planilhas não oferecem.
            </p>
          </div>
          </ScrollReveal>
        </section>

        {/* Seção Planos */}
        <section
          id="planos"
          className="scroll-mt-16 min-h-screen flex items-center py-6 md:py-10"
        >
          <ScrollReveal direction="left" className="w-full">
          <div className="container mx-auto px-4 py-6 md:py-10 w-full max-w-2xl mx-auto">
            <div className="text-center mb-6 md:mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wide mb-2 md:mb-3 px-2">
                Ative seu general.{" "}
                <span className="text-[rgba(65,254,179)]">Domine</span> sua
                rotina.
              </h2>
              <p className="text-slate-400 text-base md:text-lg px-2">
                Oferta única de lançamento.{" "}
                <span className="text-[rgba(65,254,179)]">Garanta agora.</span>
              </p>
            </div>

            <div
              className="rounded-2xl border bg-slate-900/50 backdrop-blur-sm p-4 md:p-6 lg:p-8 transition-all"
              style={{
                borderColor: "rgba(65,254,179,0.28)",
                boxShadow: "0 0 32px rgba(65,254,179,0.06)",
              }}
            >
              {/* Badge */}
              <div className="flex justify-center mb-4 md:mb-6">
                <span
                  className="inline-flex items-center gap-1.5 md:gap-2 rounded-full px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-medium text-white"
                  style={{ backgroundColor: "rgba(65,254,179,0.2)" }}
                >
                  <Zap className="h-3.5 w-3.5 md:h-4 md:w-4 text-[rgba(65,254,179)]" strokeWidth={2} />
                  <span className="whitespace-nowrap">Oferta Única de Lançamento</span>
                </span>
              </div>

              {/* Toggle: Mensal, Trimestral, Anual */}
              <div className="flex justify-center mb-6 md:mb-8 overflow-x-auto">
                <div
                  className="inline-flex rounded-xl p-0.5 md:p-1 gap-0 flex-shrink-0"
                  style={{ backgroundColor: "rgba(15,23,42,0.8)" }}
                >
                  {(["mensal", "trimestral", "anual"] as const).map((period) => {
                    const isSelected = planPeriod === period;
                    return (
                      <div key={period} className="relative flex">
                        <button
                          type="button"
                          onClick={() => setPlanPeriod(period)}
                          className={`relative rounded-lg px-3 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-medium transition-all ${
                            isSelected
                              ? "text-black"
                              : "text-slate-400 hover:text-slate-300"
                          }`}
                          style={{
                            backgroundColor: isSelected
                              ? "rgba(65,254,179)"
                              : "transparent",
                          }}
                        >
                          {period === "mensal" && "Mensal"}
                          {period === "trimestral" && "Trimestral"}
                          {period === "anual" && "Anual"}
                        </button>
                        {period === "anual" && (
                          <span
                            className="absolute -top-2 right-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-black whitespace-nowrap"
                            style={{ backgroundColor: "rgba(65,254,179)" }}
                          >
                            Melhor
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Preço */}
              <div className="text-center mb-4 md:mb-6">
                {PLAN_PRICES[planPeriod].from && (
                  <p className="text-slate-500 text-xs md:text-sm line-through mb-1">
                    De R$ {PLAN_PRICES[planPeriod].from}
                  </p>
                )}
                <p className="text-slate-400 text-base md:text-lg">
                  por{" "}
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    R$ {PLAN_PRICES[planPeriod].price}
                  </span>
                  /mês
                </p>
                {PLAN_PRICES[planPeriod].cash && (
                  <p className="text-[rgba(65,254,179)] text-sm mt-2">
                    ou à vista de R$ {PLAN_PRICES[planPeriod].cash}
                  </p>
                )}
                {PLAN_PRICES[planPeriod].perDay && (
                  <p className="text-slate-500 text-xs mt-1">
                    R$ {PLAN_PRICES[planPeriod].perDay}/dia
                  </p>
                )}
              </div>

              {/* CTA */}
              <Link href="/login" className="block mb-6 md:mb-8">
                <Button
                  className="w-full rounded-xl py-4 md:py-6 text-sm md:text-base font-semibold uppercase tracking-wide text-black hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "rgba(65,254,179)" }}
                >
                  Ativar Focus agora
                  <Zap className="ml-2 h-4 w-4 md:h-5 md:w-5" strokeWidth={2} />
                </Button>
              </Link>

              {/* Destaques */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-slate-800">
                <div className="flex flex-col items-center gap-1 md:gap-2 text-center">
                  <Shield
                    className="h-5 w-5 md:h-6 md:w-6 text-[rgba(65,254,179)]/80"
                    strokeWidth={1.5}
                  />
                  <span className="text-slate-400 text-[10px] md:text-xs">Compra segura</span>
                </div>
                <div className="flex flex-col items-center gap-1 md:gap-2 text-center">
                  <Zap
                    className="h-5 w-5 md:h-6 md:w-6 text-[rgba(65,254,179)]/80"
                    strokeWidth={1.5}
                  />
                  <span className="text-slate-400 text-[10px] md:text-xs">Acesso imediato</span>
                </div>
                <div className="flex flex-col items-center gap-1 md:gap-2 text-center">
                  <Star
                    className="h-5 w-5 md:h-6 md:w-6 text-[rgba(65,254,179)]/80"
                    strokeWidth={1.5}
                  />
                  <span className="text-slate-400 text-[10px] md:text-xs">
                    Satisfação garantida
                  </span>
                </div>
              </div>

              {/* Lista de benefícios */}
              <ul className="space-y-2 md:space-y-3">
                {PLAN_FEATURES.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 md:gap-3 text-slate-300 text-xs md:text-sm"
                  >
                    <Check
                      className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-[rgba(65,254,179)]"
                      strokeWidth={2.5}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </ScrollReveal>
        </section>

        {/* Seção FAQ */}
        <section
          id="faq"
          className="scroll-mt-16 min-h-screen flex items-center py-6 md:py-10"
        >
          <ScrollReveal direction="right" className="w-full">
          <div className="container mx-auto px-4 py-6 md:py-10 w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white px-2">FAQ</h1>
            <p className="text-slate-400 max-w-2xl text-sm md:text-base px-2">
              Perguntas frequentes sobre o sistema.
            </p>
          </div>
          </ScrollReveal>
        </section>
      </div>
    </PageBackground>
  );
}
