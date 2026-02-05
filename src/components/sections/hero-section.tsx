import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center px-4 pt-20"
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span className="text-sm text-purple-300">
            Menos distração. Mais clareza.
          </span>
        </div>

        <h1 className="mb-6 text-balance font-bold tracking-tight text-foreground leading-normal">
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Você não precisa de mais disciplina.
          </span>
          <span className="block whitespace-nowrap bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-3xl text-transparent leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl">
            Precisa de menos distração.
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
          O Focus cria um ambiente de trabalho onde sua atenção para de ser
          sequestrada e você finalmente produz com clareza.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/login">
            <Button
              size="lg"
              className="group bg-purple-600 px-8 text-white hover:bg-purple-700"
            >
              Testar agora
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <a href="#produto">
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500/30 bg-transparent text-foreground hover:bg-purple-500/10 hover:text-purple-300"
            >
              Ver Como Funciona
            </Button>
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8">
          {[
            { value: "+10.000", label: "pessoas organizando o foco diariamente" },
            { value: "98%", label: "relatam mais clareza mental" },
            { value: "Até 2x", label: "mais produtividade em tarefas profundas" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-purple-400 sm:text-3xl">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
