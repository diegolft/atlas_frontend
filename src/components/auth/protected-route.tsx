"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { authLib } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if we are on a public route
    const publicRoutes = ["/", "/login", "/register"];
    
    // Protected routes that require authentication
    const protectedRoutes = ["/dashboard"];

    if (publicRoutes.includes(pathname)) {
      setIsAuthenticated(true);
      return;
    }

    // If accessing a protected route, check authentication
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      const hasToken = authLib.isAuthenticated();
      if (!hasToken) {
        router.push("/login");
        return;
      }
    }

    setIsAuthenticated(true);
  }, [router, pathname]);

  // Show loading only for protected routes that require auth check
  const protectedRoutes = ["/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const publicRoutes = ["/", "/login", "/register"];

  if (
    !isAuthenticated &&
    isProtectedRoute &&
    !publicRoutes.includes(pathname)
  ) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner className="size-10" />
      </div>
    );
  }

  return <>{children}</>;
}
