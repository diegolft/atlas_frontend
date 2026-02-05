"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "Como o Focus bloqueia distrações?",
    answer:
      "O Focus entende seus padrões de uso e identifica o que mais quebra seu foco ao longo do dia. A partir disso, ele reduz estímulos desnecessários, organiza prioridades e te mantém no que realmente importa — sem você precisar configurar tudo manualmente.",
  },
  {
    question: "Posso usar o Focus em múltiplos dispositivos?",
    answer:
      "Sim. Seu ambiente de foco acompanha você. Tudo fica sincronizado para que suas tarefas, rotina e progresso estejam sempre atualizados, independente do dispositivo.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Sim. Seus dados são seus. O Focus foi criado com privacidade como princípio, não como detalhe. As informações ficam protegidas e nunca são usadas para outros fins.",
  },
  {
    question: "Posso cancelar minha assinatura a qualquer momento?",
    answer:
      "Pode cancelar quando quiser, sem burocracia. Sem multas, sem letras miúdas.",
  },
  {
    question: "O Focus funciona offline?",
    answer:
      "Algumas funcionalidades funcionam offline, e o restante sincroniza automaticamente quando você se reconecta.",
  },
  {
    question: "Existe um período de teste gratuito?",
    answer:
      "Não existe plano gratuito. O Focus foi criado para quem leva o próprio tempo a sério. Ainda assim, você pode cancelar a qualquer momento se não fizer sentido pra você.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Dúvidas comuns antes de começar
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Se algo ainda estiver passando pela sua cabeça, provavelmente está
            aqui.
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

        <div className="mt-12 text-center">
          <p className="mb-4 text-sm text-muted-foreground">
            Se você chegou até aqui, já sabe que precisa disso.
          </p>
          <Link href="/register">
            <Button className="bg-purple-600 text-white hover:bg-purple-700">
              Começar agora
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
