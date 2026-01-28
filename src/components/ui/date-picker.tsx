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

interface DatePickerProps {
  value?: string;
  onChange?: (date: string | undefined) => void;
  placeholder?: string;
  className?: string;
}

// Helper function to parse date string (yyyy-MM-dd) as local date, not UTC
function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Selecione uma data",
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const date = value ? parseLocalDate(value) : undefined;

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Format using local date components to avoid timezone issues
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      onChange?.(formattedDate);
    } else {
      onChange?.(undefined);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal h-[42px] overflow-hidden",
            !date && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-1 size-4 shrink-0" />
          {date ? (
            <span className="truncate">
              {format(date, "dd/MM/yyyy", { locale: ptBR })}
            </span>
          ) : (
            <span className="truncate">{placeholder}</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto p-0" showCloseButton={false}>
        <DialogTitle className="sr-only">Selecionar data</DialogTitle>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          captionLayout="dropdown"
          fromYear={1900}
          toYear={new Date().getFullYear() + 50}
        />
      </DialogContent>
    </Dialog>
  );
}
