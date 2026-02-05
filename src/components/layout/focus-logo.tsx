import Image from "next/image";

export function FocusLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-12 w-12">
        <Image
          src="/focus-logo.PNG"
          alt="Focus"
          fill
          sizes="48px"
          className="object-contain"
          priority
        />
      </div>
      <span className="text-xl font-bold text-foreground">Focus</span>
    </div>
  );
}
