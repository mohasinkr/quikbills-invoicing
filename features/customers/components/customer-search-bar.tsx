"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CustomerSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function CustomerSearchBar() {
  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };
  return (
    <div className="flex items-center space-x-2">
      <Search className="h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search customers..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
}
