import { NavigationHeader } from "@/components/layout/navigation-header";
import { PageTransition } from "@/components/layout/page-transition";

export default function InicioLayout({
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
