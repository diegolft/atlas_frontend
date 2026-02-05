import { Target, Zap, BarChart3, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Foco Inteligente",
    description:
      "O Focus entende quando você precisa de silêncio e reduz distrações sem você pensar nisso.",
  },
  {
    icon: Zap,
    title: "Modo Profundo",
    description:
      "Períodos de trabalho sem interrupções, para entrar no estado de foco real.",
  },
  {
    icon: Sparkles,
    title: "Ambiente de foco guiado",
    description:
      "Um espaço limpo e consistente para você manter o ritmo sem esforço.",
    featured: true,
  },
  {
    icon: BarChart3,
    title: "Clareza de Progresso",
    description:
      "Veja onde sua energia rende mais e pare de trabalhar no escuro.",
  },
  {
    icon: Shield,
    title: "Privacidade por padrão",
    description: "Seus dados são seus. Sem coleta abusiva, sem ruído.",
  },
];

export function ProductSection() {
  return (
    <section id="produto" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Recursos que transformam
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Ferramentas poderosas projetadas para maximizar cada minuto do seu
            dia.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-500/5 ${
                  feature.featured
                    ? "border-purple-500/60 bg-purple-500/10 shadow-lg shadow-purple-500/10"
                    : ""
                }`}
              >
                <div className="mb-4 inline-flex rounded-xl bg-purple-500/10 p-3 text-purple-400 transition-colors group-hover:bg-purple-500/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-purple-900/20 via-background to-purple-800/10 p-8 sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
                Uma interface feita para não atrapalhar seu foco
              </h3>
              <p className="mb-6 text-muted-foreground">
                Tudo foi desenhado para você entender onde está, o que fazer e
                seguir trabalhando sem pensar nisso.
              </p>
              <ul className="space-y-3">
                {[
                  "Visual confortável para longas horas de uso",
                  "Menos cliques. Menos interrupções no fluxo de trabalho",
                  "Continue de onde parou, em qualquer dispositivo",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-600/20 to-purple-900/40">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-purple-500/60">
                    <div className="h-8 w-8 rounded-full bg-purple-500" />
                  </div>
                  <span className="text-lg font-medium text-purple-300">
                    Focus Dashboard
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
