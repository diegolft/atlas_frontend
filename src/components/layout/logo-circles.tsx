export function LogoCircles({ className }: { className?: string }) {
  return (
    <div className={`relative flex-shrink-0 aspect-square ${className ?? ""}`} aria-hidden>
      <div
        className="absolute rounded-full bg-[rgba(139,92,246,0.9)]"
        style={{
          width: "70%",
          height: "70%",
          top: "15%",
          left: "15%",
        }}
      />
      <div
        className="absolute rounded-full bg-[rgba(139,92,246,0.6)]"
        style={{
          width: "50%",
          height: "50%",
          top: "5%",
          right: "10%",
        }}
      />
      <div
        className="absolute rounded-full bg-[rgba(109,40,217,0.8)]"
        style={{
          width: "45%",
          height: "45%",
          bottom: "5%",
          left: "5%",
        }}
      />
    </div>
  );
}
