"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionContextValue = {
  openValue: string;
  setOpenValue: (value: string) => void;
  collapsible: boolean;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null,
);

type AccordionItemContextValue = { value: string };

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(
  null,
);

type AccordionProps = {
  type?: "single" | "multiple";
  collapsible?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
};

function Accordion({
  type = "single",
  collapsible = false,
  value,
  defaultValue = "",
  onValueChange,
  className,
  children,
}: AccordionProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const openValue = value !== undefined ? value : internalValue;

  const setOpenValue = React.useCallback(
    (next: string) => {
      const nextValue =
        type === "single" && collapsible && next === openValue ? "" : next;
      if (value === undefined) setInternalValue(nextValue);
      onValueChange?.(nextValue);
    },
    [type, collapsible, openValue, value, onValueChange],
  );

  const ctx: AccordionContextValue = {
    openValue,
    setOpenValue,
    collapsible: type === "single" && collapsible,
  };

  return (
    <AccordionContext.Provider value={ctx}>
      <div data-slot="accordion" className={className}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

type AccordionItemProps = {
  value: string;
  className?: string;
  children: React.ReactNode;
};

function AccordionItem({ value, className, children }: AccordionItemProps) {
  const itemCtx: AccordionItemContextValue = { value };
  const isOpen = React.useContext(AccordionContext)?.openValue === value;

  return (
    <AccordionItemContext.Provider value={itemCtx}>
      <div
        data-slot="accordion-item"
        data-state={isOpen ? "open" : "closed"}
        className={cn("border-b last:border-b-0", className)}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

type AccordionTriggerProps = {
  className?: string;
  children: React.ReactNode;
};

function AccordionTrigger({ className, children }: AccordionTriggerProps) {
  const accordionCtx = React.useContext(AccordionContext);
  const itemCtx = React.useContext(AccordionItemContext);

  if (!accordionCtx || !itemCtx) return null;

  const isOpen = accordionCtx.openValue === itemCtx.value;

  return (
    <div className="flex">
      <button
        type="button"
        data-slot="accordion-trigger"
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        onClick={() => accordionCtx.setOpenValue(itemCtx.value)}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </button>
    </div>
  );
}

type AccordionContentProps = {
  className?: string;
  children: React.ReactNode;
};

function AccordionContent({ className, children }: AccordionContentProps) {
  const accordionCtx = React.useContext(AccordionContext);
  const itemCtx = React.useContext(AccordionItemContext);

  if (!accordionCtx || !itemCtx) return null;

  const isOpen = accordionCtx.openValue === itemCtx.value;

  return (
    <div
      data-slot="accordion-content"
      data-state={isOpen ? "open" : "closed"}
      className="overflow-hidden text-sm transition-[max-height] duration-200 ease-out"
      style={{ maxHeight: isOpen ? "500px" : "0" }}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
