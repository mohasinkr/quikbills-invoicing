import CreateCustomerDialog from "@/features/customers/components/create-customer-dialog";
import CustomerTable from "@/features/customers/components/customer-table";

const CustomersPage = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Customers List</h1>
        <CreateCustomerDialog />
      </div>
      {/* <CustomerSearchBar /> */}
      <CustomerTable />
    </section>
  );
};

export default CustomersPage;
