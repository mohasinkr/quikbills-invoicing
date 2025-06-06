"use client";

import { ThemeToggle } from "@/components/theme/theme-toggle";

export function FloatingThemeToggle() {
  return (
    <div className="absolute right-4 top-4 z-50">
      <ThemeToggle />
    </div>
  );
}
