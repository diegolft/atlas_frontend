"use client";

import { Loader2Icon } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
}

const sizeMap = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
};

export function Loading({
  className,
  size = "md",
  variant = "spinner",
}: LoadingProps) {
  if (variant === "spinner") {
    return (
      <motion.div
        className={cn("flex items-center justify-center", className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Loader2Icon
            role="status"
            aria-label="Loading"
            className={cn(sizeMap[size], "text-primary")}
          />
        </motion.div>
      </motion.div>
    );
  }

  if (variant === "dots") {
    return (
      <motion.div
        className={cn("flex items-center justify-center gap-1.5", className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={cn(
              "rounded-full bg-primary",
              size === "sm"
                ? "size-1.5"
                : size === "md"
                  ? "size-2"
                  : "size-2.5",
            )}
            animate={{
              y: [0, -8, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: index * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    );
  }

  if (variant === "pulse") {
    return (
      <motion.div
        className={cn("flex items-center justify-center", className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={cn(
            "rounded-full bg-primary",
            size === "sm" ? "size-4" : size === "md" ? "size-6" : "size-8",
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    );
  }

  return null;
}

interface LoadingCardProps {
  className?: string;
  message?: string;
}

export function LoadingCard({ className, message }: LoadingCardProps) {
  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-center py-8 gap-3",
        className,
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Loading size="md" variant="spinner" />
      {message && (
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
}
