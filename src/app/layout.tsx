import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ProtectedRoute from "@/components/auth/protected-route";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/providers/query-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema Conexões - ERP Corporativo",
  description: "Sistema de gestão de projetos e relatórios",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="bg-black">
      <body className={`${inter.variable} antialiased bg-black`}>
        <ReactQueryProvider>
          <ProtectedRoute>{children}</ProtectedRoute>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
