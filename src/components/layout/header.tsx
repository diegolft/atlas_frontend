"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FocusLogo } from "./focus-logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Produto", href: "#produto" },
  { label: "Comparativo", href: "#comparativo" },
  { label: "Planos", href: "#planos" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (href: string) => {
    if (pathname !== "/") {
      router.push(`/${href}`);
      setMobileMenuOpen(false);
      return;
    }

    if (href === "#inicio") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/">
          <FocusLogo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => scrollToSection(item.href)}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-purple-500/10 hover:text-purple-400"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Login Button */}
        <div className="hidden md:block">
          <Link href="/login">
            <Button className="bg-purple-600 text-white hover:bg-purple-700">
              Entrar
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rounded-lg p-2 text-foreground md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-lg md:hidden">
          <nav className="flex flex-col px-4 py-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className="rounded-lg px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-purple-500/10 hover:text-purple-400"
              >
                {item.label}
              </button>
            ))}
            <Link href="/login" className="mt-4 block">
              <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                Entrar
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
