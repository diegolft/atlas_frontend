import Link from "next/link";
import { FocusLogo } from "./focus-logo";

export function Footer() {
  return (
    <footer className="border-t border-border/40 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link href="/">
            <FocusLogo />
          </Link>
          <p className="text-sm text-muted-foreground">
            © 2026 Focus. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
