import Sidebar from "@/components/ui/sidebar";
import { FloatingThemeToggle } from "@/components/theme/floating-theme-toggle";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex-1 overflow-y-auto bg-background p-8">
        {/* Floating theme toggle */}
        <FloatingThemeToggle />

        {/* Page content */}
        {children}
      </div>
    </section>
  );
}
