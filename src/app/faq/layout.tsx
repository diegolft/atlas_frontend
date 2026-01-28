import { NavigationHeader } from "@/components/layout/navigation-header";
import { PageTransition } from "@/components/layout/page-transition";

export default function FAQLayout({
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
