"use client";

import { NavigationHeader } from "@/components/layout/navigation-header";
import { PageTransition } from "@/components/layout/page-transition";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationHeader />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
