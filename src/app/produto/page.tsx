import { PageBackground } from "@/components/layout/page-background";

export default function ProdutoPage() {
  return (
    <PageBackground>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6 text-white">Produto</h1>
        <p className="text-slate-400">
          Conheça mais sobre nossos produtos e soluções.
        </p>
      </div>
    </PageBackground>
  );
}
