"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const { clientWidth, clientHeight } = document.documentElement;
      const dpr = window.devicePixelRatio || 1;

      sizeRef.current = { width: clientWidth, height: clientHeight, dpr };
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const purpleShades = [
      "rgba(147, 51, 234, 0.9)",
      "rgba(168, 85, 247, 0.8)",
      "rgba(192, 132, 252, 0.7)",
      "rgba(126, 34, 206, 0.8)",
      "rgba(139, 92, 246, 0.75)",
      "rgba(109, 40, 217, 0.85)",
    ];

    const createParticles = (width: number, height: number) => {
      const particles: Particle[] = [];
      const particleCount = Math.floor((width * height) / 5000);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.6 + 0.2,
          color: purpleShades[Math.floor(Math.random() * purpleShades.length)],
        });
      }
      return particles;
    };

    const refreshParticles = () => {
      const { width, height } = sizeRef.current;
      particlesRef.current = createParticles(width, height);
    };

    resizeCanvas();
    refreshParticles();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("resize", refreshParticles);

    const animate = () => {
      const { width, height } = sizeRef.current;
      ctx.clearRect(0, 0, width, height);

      for (const particle of particlesRef.current) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
      }
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("resize", refreshParticles);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
