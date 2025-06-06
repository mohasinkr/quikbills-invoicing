import CreateCustomerDialog from "@/components/customer/create-customer-dialog";
import CustomerListing from "@/components/customer/customer-listing";

const CustomersPage = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Customers List</h1>
        <CreateCustomerDialog />
      </div>
      {/* <CustomerSearchBar /> */}
      <CustomerListing />
    </section>
  );
};

export default CustomersPage;
