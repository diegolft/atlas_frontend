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
  title: "Focus - Maximize Your Productivity",
  description:
    "Focus helps you achieve more by eliminating distractions and enhancing concentration",
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
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ReactQueryProvider>
          <ProtectedRoute>{children}</ProtectedRoute>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
