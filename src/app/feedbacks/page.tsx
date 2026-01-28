import { PageBackground } from "@/components/layout/page-background";

export default function FeedbacksPage() {
  return (
    <PageBackground>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6 text-white">Feedbacks</h1>
        <p className="text-slate-400">
          Veja o que nossos clientes estão dizendo sobre nós.
        </p>
      </div>
    </PageBackground>
  );
}
