export function PageBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background com gradiente esverdeado */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black opacity-100"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(65,254,179,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-green-950/20 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(65,254,179,0.05),transparent_70%)]"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
