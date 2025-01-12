import LogoutButton from "@/components/common/logout-button";
import React from "react";

const InvoiceHeader = () => {
  return (
    <header className="mb-8 flex justify-between">
      <h1 className="text-3xl font-bold text-primary">Invoices</h1>
      <LogoutButton />
    </header>
  );
};

export default InvoiceHeader;
