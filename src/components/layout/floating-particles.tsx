"use client";

const PARTICLE_COUNT = 50;

function particlePosition(index: number) {
  const left = ((index * 7 + 13) % 97) + 1;
  const top = ((index * 11 + 17) % 97) + 1;
  const size = 2 + (index % 3);
  const duration = 9 + (index % 12);
  const delay = (index * 0.3) % 6;
  return { left, top, size, duration, delay };
}

export function FloatingParticles() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden
    >
      {Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const { left, top, size, duration, delay } = particlePosition(i);
        return (
          <div
            key={i}
            className="absolute rounded-full bg-[rgba(65,254,179)] animate-float will-change-transform"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: 0.2 + (i % 5) * 0.06,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
