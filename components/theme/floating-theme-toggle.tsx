"use client";

import { ThemeToggle } from "@/components/theme/theme-toggle";

export function FloatingThemeToggle() {
  return (
    <div className="absolute right-4 bottom-4 z-50">
      <ThemeToggle />
    </div>
  );
}
