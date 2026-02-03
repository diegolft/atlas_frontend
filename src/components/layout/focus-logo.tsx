import Image from "next/image";

export function FocusLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-10 w-10">
        <Image
          src="/focus-logo.PNG"
          alt="Focus"
          fill
          sizes="40px"
          className="object-contain"
          priority
        />
      </div>
      <span className="text-xl font-bold text-foreground">Focus</span>
    </div>
  );
}
