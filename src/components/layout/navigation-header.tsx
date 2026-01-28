"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigationLinks = [
  { name: "Início", href: "/inicio" },
  { name: "Produto", href: "/produto" },
  { name: "Planos", href: "/planos" },
  { name: "Feedbacks", href: "/feedbacks" },
  { name: "Comparativo", href: "/comparativo" },
  { name: "FAQ", href: "/faq" },
  { name: "Dashboard", href: "/dashboard" },
];

export function NavigationHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo e Nome da Marca */}
          <Link href="/inicio" className="flex items-center gap-3 group">
            <div className="relative w-14 h-14 flex-shrink-0">
              <Image
                src="/atlas-logo.png"
                alt="Atlas Logo"
                width={56}
                height={56}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-normal text-xl tracking-wide">Atlas</span>
              <span className="text-slate-400 text-xs hidden sm:block font-normal">
                O titã que sustenta sua evolução
              </span>
            </div>
          </Link>

          {/* Links de Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-12">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
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
                          alt="Atlas Logo"
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <SheetTitle className="text-white font-normal text-lg tracking-wide m-0">
                        Atlas
                      </SheetTitle>
                    </div>
                  </SheetHeader>

                  {/* Links de Navegação Mobile */}
                  <nav className="flex-1 px-4 py-6 space-y-2">
                    {navigationLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
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
