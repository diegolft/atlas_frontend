"use client";

import { PageTransition } from "@/components/layout/page-transition";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTransition>{children}</PageTransition>
  );
}
