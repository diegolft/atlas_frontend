"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface DatePickerFieldProps {
  value?: string;
  onChange?: (date: string | undefined) => void;
  placeholder?: string;
  className?: string;
}

function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function DatePickerField({
  value,
  onChange,
  placeholder = "Selecione uma data",
  className,
}: DatePickerFieldProps) {
  const [open, setOpen] = useState(false);
  const date = value ? parseLocalDate(value) : undefined;

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      onChange?.(`${year}-${month}-${day}`);
    } else {
      onChange?.(undefined);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal h-[42px] rounded-full border border-purple-500/50 bg-slate-800/50 text-white hover:bg-slate-800/70",
            !date && "text-slate-500",
            className,
          )}
        >
          <CalendarIcon className="mr-1 size-4 shrink-0 text-slate-400" />
          {date ? (
            <span className="truncate">
              {format(date, "dd/MM/yyyy", { locale: ptBR })}
            </span>
          ) : (
            <span className="truncate">{placeholder}</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-auto p-0 rounded-2xl border border-purple-500/50 bg-slate-900/95 text-white shadow-lg"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Selecionar data</DialogTitle>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          captionLayout="dropdown"
          fromYear={1900}
          toYear={new Date().getFullYear() + 50}
          className="rounded-2xl bg-transparent"
        />
      </DialogContent>
    </Dialog>
  );
}
