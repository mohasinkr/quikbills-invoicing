import Sidebar from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

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
