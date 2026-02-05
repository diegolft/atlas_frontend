import { Check, X } from "lucide-react";

const comparisonData = [
  {
    feature: "Ferramentas",
    focus: "Tudo em um lugar",
    others: "Fragmentado",
  },
  {
    feature: "Treino",
    focus: "Plano claro",
    others: "Sem guia",
  },
  {
    feature: "Dieta",
    focus: "Rotina simples",
    others: "Sem direção",
  },
  {
    feature: "Análise comportamental",
    focus: "Padrões claros",
    others: "Sem leitura real",
  },
  {
    feature: "Finanças",
    focus: "Visão diária",
    others: "Planilhas soltas",
  },
  {
    feature: "Hábitos",
    focus: "Acompanhamento",
    others: "Sem constância",
  },
  {
    feature: "Pontuação",
    focus: "Feedback claro",
    others: "Sem métrica",
  },
];

export function ComparisonSection() {
  return (
    <section id="comparativo" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Por que o Focus funciona quando os outros falham
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            É sobre ter mais funções e ainda resolver todos os seus problemas.
          </p>
        </div>

        <div className="min-w-0 overflow-x-auto rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="min-w-[20rem]">
            <div className="grid grid-cols-3 border-b border-border/50 bg-purple-500/5 px-4 py-4 sm:px-6">
              <div className="min-w-0 text-sm font-medium text-muted-foreground">
                Situação
              </div>
              <div className="text-left text-sm font-semibold text-purple-400 pl-4 sm:pl-6">
                Focus
              </div>
              <div className="text-left text-sm font-medium text-muted-foreground pl-4 sm:pl-6">
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
                <div className="min-w-0 text-sm text-foreground">
                  {item.feature}
                </div>
                <div className="flex items-start gap-2 text-sm text-foreground pl-4 sm:pl-6">
                  <Check className="mt-0.5 h-4 w-4 text-purple-400" />
                  <span>{item.focus}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground pl-4 sm:pl-6">
                  <X className="mt-0.5 h-4 w-4 text-muted-foreground/60" />
                  <span>{item.others}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
