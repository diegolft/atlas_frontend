import { gsap } from "gsap";
import type React from "react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

const useMedia = (
  queries: string[],
  values: number[],
  defaultValue: number,
): number => {
  const get = () =>
    values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState<number>(get);

  useLayoutEffect(() => {
    const handler = () => setValue(get);
    for (const q of queries) {
      matchMedia(q).addEventListener("change", handler);
    }
    return () => {
      for (const q of queries) {
        matchMedia(q).removeEventListener("change", handler);
      }
    };
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

interface MasonryItem {
  id: string;
  content: React.ReactNode;
  estimatedHeight?: number; // Altura estimada em pixels (opcional, será medida automaticamente se não fornecido)
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
  measuredHeight: number;
}

interface MasonryProps {
  items: MasonryItem[];
  gap?: number;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  className?: string;
  itemClassName?: string;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  gap = 16,
  columns = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 1.02,
  blurToFocus = true,
  className = "",
  itemClassName = "",
}) => {
  const columnsCount = useMedia(
    [
      "(min-width: 1280px)", // xl
      "(min-width: 1024px)", // lg
      "(min-width: 768px)", // md
      "(min-width: 640px)", // sm
    ],
    [columns.xl ?? 5, columns.lg ?? 4, columns.md ?? 3, columns.sm ?? 2],
    columns.xs ?? 1,
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [itemsReady, setItemsReady] = useState(false);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === "random") {
      const dirs = ["top", "bottom", "left", "right"];
      direction = dirs[
        Math.floor(Math.random() * dirs.length)
      ] as typeof animateFrom;
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  // Medir altura real dos itens após renderização
  useLayoutEffect(() => {
    if (itemRefs.current.size === items.length && width > 0) {
      setItemsReady(true);
    }
  }, [items.length, width]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width || !itemsReady) return [];
    const colHeights = new Array(columnsCount).fill(0);
    const totalGaps = (columnsCount - 1) * gap;
    const columnWidth = (width - totalGaps) / columnsCount;

    return items.map((item) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);

      // Tentar obter altura medida, senão usar estimativa ou altura padrão
      const itemElement = itemRefs.current.get(item.id);
      const measuredHeight = itemElement
        ? itemElement.getBoundingClientRect().height
        : (item.estimatedHeight ?? 200); // Altura padrão se não houver medida

      const y = colHeights[col];
      colHeights[col] += measuredHeight + gap;

      return {
        ...item,
        x,
        y,
        w: columnWidth,
        h: measuredHeight,
        measuredHeight,
      };
    });
  }, [columnsCount, items, width, gap, itemsReady]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!itemsReady || grid.length === 0) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            ...(blurToFocus && { filter: "blur(10px)" }),
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 0.8,
            ease: "power3.out",
            delay: index * stagger,
          },
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    hasMounted.current = true;
  }, [grid, itemsReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (id: string) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (id: string) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{
        minHeight:
          grid.length > 0
            ? Math.max(...grid.map((item) => item.y + item.h))
            : 0,
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          ref={(el) => {
            if (el) {
              itemRefs.current.set(item.id, el);
            } else {
              itemRefs.current.delete(item.id);
            }
          }}
          data-key={item.id}
          className={`absolute ${itemClassName}`}
          style={{ willChange: "transform, width, opacity" }}
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={() => handleMouseLeave(item.id)}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default Masonry;
