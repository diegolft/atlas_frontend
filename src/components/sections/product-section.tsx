import { Target, Zap, BarChart3, Shield } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Foco Inteligente",
    description:
      "Algoritmos avançados identificam e eliminam distrações automaticamente.",
  },
  {
    icon: Zap,
    title: "Modo Turbo",
    description:
      "Ative sessões intensivas de trabalho com bloqueio total de interrupções.",
  },
  {
    icon: BarChart3,
    title: "Análise Profunda",
    description:
      "Relatórios detalhados sobre seus padrões de produtividade e progresso.",
  },
  {
    icon: Shield,
    title: "Privacidade Total",
    description:
      "Seus dados nunca saem do seu dispositivo. Segurança em primeiro lugar.",
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

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-500/5"
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
                Interface intuitiva e elegante
              </h3>
              <p className="mb-6 text-muted-foreground">
                Desenvolvido com foco na experiência do usuário. Cada elemento
                foi pensado para minimizar fricção e maximizar resultados.
              </p>
              <ul className="space-y-3">
                {[
                  "Temas escuro e claro",
                  "Atalhos de teclado personalizáveis",
                  "Sincronização entre dispositivos",
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
