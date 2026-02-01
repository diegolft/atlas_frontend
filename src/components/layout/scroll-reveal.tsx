"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Se true, o conteúdo começa visível (ex.: primeira seção) */
  initialVisible?: boolean;
  /** Atraso em ms antes de iniciar a animação */
  delay?: number;
  /** Lado de onde o conteúdo entra: esquerda ou direita */
  direction?: "left" | "right";
}

export function ScrollReveal({
  children,
  className = "",
  initialVisible = false,
  delay = 0,
  direction = "left",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isVisible, setIsVisible] = useState(initialVisible);
  const [hasAnimated, setHasAnimated] = useState(initialVisible);

  useEffect(() => {
    if (initialVisible) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (hasAnimated) break;
          if (delay > 0) {
            timerRef.current = setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
          } else {
            setIsVisible(true);
            setHasAnimated(true);
          }
          break;
        }
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [initialVisible, delay, hasAnimated]);

  const hiddenTranslate =
    direction === "left" ? "-translate-x-12" : "translate-x-12";

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-x-0"
          : `opacity-0 ${hiddenTranslate}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
