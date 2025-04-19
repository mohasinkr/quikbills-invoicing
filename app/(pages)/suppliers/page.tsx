import CreateSupplierDialog from "@/components/supplier/create-supplier-dialog";
import SupplierTable from "@/components/supplier/supplier-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "quikBills Suppliers",
  description: "Manage your suppliers",
};

const SuppliersPage = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Suppliers List</h1>
        <CreateSupplierDialog />
      </div>
      <SupplierTable />
    </section>
  );
};

export default SuppliersPage;