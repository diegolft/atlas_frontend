"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como o Focus bloqueia distrações?",
    answer:
      "O Focus utiliza algoritmos de IA para identificar padrões de comportamento e bloquear automaticamente aplicativos, sites e notificações que interrompem sua concentração. Você pode personalizar completamente o que é bloqueado.",
  },
  {
    question: "Posso usar o Focus em múltiplos dispositivos?",
    answer:
      "Sim! No plano Pro, você pode sincronizar suas configurações e dados em dispositivos ilimitados. No plano Básico, o uso é limitado a um dispositivo.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Absolutamente. Todos os seus dados de produtividade são processados localmente no seu dispositivo. Nunca enviamos informações pessoais para nossos servidores. Sua privacidade é nossa prioridade.",
  },
  {
    question: "Posso cancelar minha assinatura a qualquer momento?",
    answer:
      "Sim, você pode cancelar sua assinatura a qualquer momento sem taxas ou penalidades. Você continuará tendo acesso aos recursos premium até o final do período já pago.",
  },
  {
    question: "O Focus funciona offline?",
    answer:
      "Sim! O Focus foi projetado para funcionar completamente offline. Todas as funcionalidades de bloqueio e análise funcionam sem conexão com a internet.",
  },
  {
    question: "Existe um período de teste gratuito?",
    answer:
      "Oferecemos 14 dias de teste gratuito do plano Pro para novos usuários. Não é necessário cartão de crédito para começar.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Perguntas frequentes
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Encontre respostas para as dúvidas mais comuns sobre o Focus.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={`faq-${index}`}
              value={`item-${index}`}
              className="overflow-hidden rounded-xl border border-border/50 bg-card/30 px-6 backdrop-blur-sm data-[state=open]:border-purple-500/50"
            >
              <AccordionTrigger className="py-4 text-left text-foreground hover:text-purple-400 hover:no-underline [&[data-state=open]]:text-purple-400">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
