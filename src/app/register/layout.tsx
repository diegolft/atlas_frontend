"use client";

import { PageTransition } from "@/components/layout/page-transition";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTransition>{children}</PageTransition>;
}
