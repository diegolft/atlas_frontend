import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Básico",
    price: "Grátis",
    description: "Para quem está começando",
    features: [
      "Bloqueio básico de distrações",
      "Relatórios semanais",
      "1 dispositivo",
      "Suporte por email",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "R$ 29",
    period: "/mês",
    description: "Para profissionais",
    features: [
      "Bloqueio inteligente com IA",
      "Relatórios em tempo real",
      "Dispositivos ilimitados",
      "Suporte prioritário 24/7",
      "Integrações avançadas",
      "Modo offline completo",
    ],
    highlighted: true,
  },
  {
    name: "Empresas",
    price: "Personalizado",
    description: "Para equipes",
    features: [
      "Tudo do plano Pro",
      "Painel administrativo",
      "Relatórios de equipe",
      "SSO e SAML",
      "API dedicada",
      "Gerente de conta",
    ],
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="planos" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Planos para cada necessidade
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Escolha o plano ideal para você ou sua equipe. Cancele a qualquer
            momento.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "border-purple-500 bg-gradient-to-b from-purple-500/10 to-transparent"
                  : "border-border/50 bg-card/30 hover:border-purple-500/30"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 rounded-bl-xl bg-purple-500 px-4 py-1 text-xs font-medium text-white">
                  Popular
                </div>
              )}

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

              {plan.name === "Empresas" ? (
                <a href="#faq">
                  <Button
                    className="mb-8 w-full bg-transparent border border-purple-500/30 text-foreground hover:bg-purple-500/10"
                  >
                    Falar com vendas
                  </Button>
                </a>
              ) : (
                <Link href="/login" className="block mb-8">
                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-transparent border border-purple-500/30 text-foreground hover:bg-purple-500/10"
                    }`}
                  >
                    Começar agora
                  </Button>
                </Link>
              )}

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20">
                      <Check className="h-3 w-3 text-purple-400" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
