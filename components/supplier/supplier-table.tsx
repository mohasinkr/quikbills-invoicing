import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Supplier = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  category: string;
  lastOrder: string;
};

const SupplierTable = async () => {
  // TODO: Replace with actual data fetching
  const suppliers: Supplier[] = [
    {
      id: "1",
      name: "Tech Solutions Inc",
      email: "contact@techsolutions.com",
      phone: "+1 234-567-8900",
      status: "active",
      category: "Electronics",
      lastOrder: "2024-01-15",
    },
    {
      id: "2",
      name: "Office Supplies Co",
      email: "sales@officesupplies.com",
      phone: "+1 234-567-8901",
      status: "active",
      category: "Office Supplies",
      lastOrder: "2024-01-10",
    },
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Order</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell className="font-medium">{supplier.name}</TableCell>
              <TableCell>{supplier.category}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell>{supplier.phone}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    supplier.status === "active" ? "default" : "secondary"
                  }
                >
                  {supplier.status}
                </Badge>
              </TableCell>
              <TableCell>{supplier.lastOrder}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/suppliers/${supplier.id}`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SupplierTable;
