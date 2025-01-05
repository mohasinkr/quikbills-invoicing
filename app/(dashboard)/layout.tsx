import { DashboardSidebar } from "@/features/dashboard/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 overflow-y-auto bg-gray-100 p-8">{children}</div>
    </section>
  );
}
