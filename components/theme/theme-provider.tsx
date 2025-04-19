"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { usePathname } from "next/navigation";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname();

  // Check if the current path is an auth page
  const isAuthPage =
    pathname?.startsWith("/login") || pathname?.startsWith("/signup");

  // Force light theme for auth pages, use selected theme for other pages
  const forcedTheme = isAuthPage ? "light" : undefined;

  return (
    <NextThemesProvider {...props} forcedTheme={forcedTheme}>
      {children}
    </NextThemesProvider>
  );
}
