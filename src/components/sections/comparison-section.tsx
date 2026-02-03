import { Check, X } from "lucide-react";

const comparisonData = [
  { feature: "Bloqueio inteligente de distrações", focus: true, others: false },
  { feature: "Análise de produtividade com IA", focus: true, others: false },
  { feature: "Sincronização em tempo real", focus: true, others: true },
  { feature: "Privacidade local dos dados", focus: true, others: false },
  {
    feature: "Integrações com outras ferramentas",
    focus: true,
    others: true,
  },
  { feature: "Modo offline completo", focus: true, others: false },
  { feature: "Personalização avançada", focus: true, others: false },
  { feature: "Suporte 24/7 em português", focus: true, others: false },
];

export function ComparisonSection() {
  return (
    <section id="comparativo" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Por que escolher o Focus?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Veja como nos destacamos em relação às alternativas do mercado.
          </p>
        </div>

        <div className="min-w-0 overflow-x-auto rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="min-w-[20rem]">
            <div className="grid grid-cols-3 border-b border-border/50 bg-purple-500/5 px-4 py-4 sm:px-6">
              <div className="min-w-0 text-sm font-medium text-muted-foreground">
                Recurso
              </div>
              <div className="text-center text-sm font-semibold text-purple-400">
                Focus
              </div>
              <div className="text-center text-sm font-medium text-muted-foreground">
                Outros
              </div>
            </div>

            {comparisonData.map((item, index) => (
              <div
                key={item.feature}
                className={`grid grid-cols-3 items-center px-4 py-4 sm:px-6 ${
                index !== comparisonData.length - 1
                  ? "border-b border-border/30"
                  : ""
              }`}
              >
                <div className="min-w-0 text-sm text-foreground">{item.feature}</div>
                <div className="flex justify-center">
                {item.focus ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20">
                    <Check className="h-4 w-4 text-purple-400" />
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted/50">
                    <X className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                {item.others ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted/50">
                    <Check className="h-4 w-4 text-muted-foreground" />
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted/30">
                    <X className="h-4 w-4 text-muted-foreground/50" />
                  </div>
                )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
