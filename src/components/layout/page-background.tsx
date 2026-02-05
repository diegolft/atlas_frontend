import { FloatingParticles } from "./floating-particles";

export function PageBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background com gradiente roxo escuro */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-black via-slate-950 to-black opacity-100"></div>
      <div className="pointer-events-none fixed inset-0 bg-black/20"></div>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black"></div>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.06),transparent_70%)]"></div>
      
      <FloatingParticles />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
