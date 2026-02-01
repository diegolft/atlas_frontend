"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

const INICIO_PATH = "/inicio";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigationLinks = [
  { name: "Início", href: "/inicio#inicio", isAnchor: true },
  { name: "Produto", href: "/inicio#produto", isAnchor: true },
  { name: "Comparativo", href: "/inicio#comparativo", isAnchor: true },
  { name: "Planos", href: "/inicio#planos", isAnchor: true },
  { name: "FAQ", href: "/inicio#faq", isAnchor: true },
];

function getHashSection() {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash?.slice(1) || "";
  return hash || null;
}

export function NavigationHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    setActiveSection(getHashSection());
    const onHashChange = () => setActiveSection(getHashSection());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: (typeof navigationLinks)[number]) => {
    if (link.isAnchor && pathname === INICIO_PATH) {
      e.preventDefault();
      const id = link.href.split("#")[1];
      const el = id ? document.getElementById(id) : null;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", link.href);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-slate-800">
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex items-center justify-between h-16 md:h-24">
          {/* Logo e Nome da Marca */}
          <Link href="/inicio" className="flex items-center gap-2 md:gap-3 group">
            <div className="relative w-10 h-10 md:w-14 md:h-14 flex-shrink-0">
              <Image
                src="/atlas-logo.png"
                alt="Focus Logo"
                width={56}
                height={56}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-normal text-lg md:text-xl tracking-wide">Focus</span>
              <span className="text-slate-400 text-xs hidden sm:block font-normal">
                O titã que sustenta sua evolução
              </span>
            </div>
          </Link>

          {/* Links de Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-12">
            {navigationLinks.map((link) => {
              const linkSection = link.isAnchor ? link.href.split("#")[1] : null;
              const isActive = link.isAnchor
                ? pathname === INICIO_PATH && linkSection === (activeSection || "inicio")
                : pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-base font-normal tracking-wide transition-colors ${
                    isActive
                      ? "text-[rgba(65,254,179)]"
                      : "text-slate-400 hover:text-[rgba(65,254,179)]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Botões Desktop e Mobile */}
          <div className="flex items-center gap-4">
            {/* Botão de Login Desktop */}
            <Link href="/login" className="hidden md:block">
              <Button
                variant="outline"
                className="bg-transparent border-slate-700 text-slate-300 hover:bg-[rgba(65,254,179)] hover:text-black active:bg-[rgba(65,254,179)] active:text-black rounded-full px-6 py-2"
              >
                Login
              </Button>
            </Link>

            {/* Menu Mobile */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-300 hover:text-[rgba(65,254,179)] hover:bg-slate-800"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-black border-slate-800 p-0">
                <div className="flex flex-col h-full">
                  {/* Header do Sidebar */}
                  <SheetHeader className="p-6 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 flex-shrink-0">
                        <Image
                          src="/atlas-logo.png"
                          alt="Focus Logo"
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <SheetTitle className="text-white font-normal text-lg tracking-wide m-0">
                        Focus
                      </SheetTitle>
                    </div>
                  </SheetHeader>

                  {/* Links de Navegação Mobile */}
                  <nav className="flex-1 px-4 py-6 space-y-2">
                    {navigationLinks.map((link) => {
                      const linkSection = link.isAnchor ? link.href.split("#")[1] : null;
                      const isActive = link.isAnchor
                        ? pathname === INICIO_PATH && linkSection === (activeSection || "inicio")
                        : pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link)}
                          className={`block px-4 py-3 rounded-lg text-base font-normal tracking-wide transition-colors ${
                            isActive
                              ? "text-[rgba(65,254,179)] bg-slate-900"
                              : "text-slate-300 hover:text-[rgba(65,254,179)] hover:bg-slate-900"
                          }`}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Botão de Login Mobile */}
                  <div className="p-4 border-t border-slate-800">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent border-[rgba(65,254,179)] text-[rgba(65,254,179)] hover:bg-[rgba(65,254,179)] hover:text-black rounded-full py-6 text-base font-normal"
                      >
                        Login
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
