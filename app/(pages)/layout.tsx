import Sidebar from "@/components/ui/sidebar";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex-1 overflow-y-auto bg-background p-8">
        {/* Page content */}
        {children}
      </div>
    </section>
  );
}
