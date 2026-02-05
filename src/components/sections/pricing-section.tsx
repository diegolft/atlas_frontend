import Link from "next/link";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Essencial",
    price: "R$ 14,90",
    period: "/mês",
    description: "Para organizar a cabeça e o dia.",
    features: [
      "Organização de tarefas e rotinas",
      "Controle básico de foco",
      "Visão simples de produtividade",
      "Check-in mental diário",
      "IA central ativa",
    ],
    cta: "Quero começar",
    note: "Entra fácil. Cancela difícil.",
    highlighted: false,
  },
  {
    name: "Controle",
    price: "R$ 24,90",
    period: "/mês",
    description: "Para quem quer parar de se sentir perdido.",
    features: [
      "Inclui tudo do Essencial +",
      "Análise de padrões de comportamento",
      "Monitoramento contínuo de foco e energia",
      "Gestão financeira pessoal",
      "Relatórios semanais claros",
      "Sugestões inteligentes da IA",
    ],
    cta: "Quero ter controle",
    note: "Aqui a pessoa sente: isso já tá valendo mais do que eu pago.",
    highlighted: true,
  },
  {
    name: "Alta Performance",
    price: "R$ 39,90",
    period: "/mês",
    description: "Para quem leva a vida a sério.",
    features: [
      "Inclui tudo do Controle +",
      "Análise psicológica mais profunda",
      "Planejamento estratégico de semanas e meses",
      "Projeções financeiras simples",
      "Relatórios avançados de evolução",
      "Ajustes automáticos de rotina",
    ],
    cta: "Quero alta performance",
    note: "Não é pra todos. É pra quem não aceita viver no caos.",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="planos" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Quanto vale ter controle real do seu foco?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Não é sobre acesso. É sobre mudar a forma como você trabalha todos os
            dias.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative overflow-hidden rounded-2xl border p-6 lg:p-7 transition-all duration-300 ${
                plan.highlighted
                  ? "border-purple-500/70 bg-purple-500/10 shadow-lg shadow-purple-500/10"
                  : "border-border/50 bg-card/30 hover:border-purple-500/30"
              }`}
            >
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                {plan.name}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-muted-foreground">{plan.period}</span>
                )}
              </div>

              <Link href="/login" className="block mb-6">
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-transparent border border-purple-500/30 text-foreground hover:bg-purple-500/10"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>

              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm text-muted-foreground">
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground/80">
                {plan.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
