import Sidebar from "@/components/ui/sidebar";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen overflow-hidden">
      {/* <DashboardSidebar /> */}
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-white p-8">{children}</div>
    </section>
  );
}
