"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import {
  Receipt,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  Building2,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const customerData = {
  id: "1",
  name: "Acme Corp",
  email: "contact@acme.com",
  phone: "(555) 123-4567",
  address: "123 Business Ave, Suite 100",
  joinDate: "2023-01-15",
  status: "Active",
  stats: {
    totalOrders: 45,
    totalInvoices: 52,
    totalPaid: 15420,
    totalPending: 3250,
    overdueInvoices: 2,
    paidInvoices: 48,
    unpaidInvoices: 4,
  },
  recentInvoices: [
    {
      id: "INV-001",
      date: "2024-03-15",
      amount: 1250,
      status: "Paid",
      dueDate: "2024-04-15",
    },
    {
      id: "INV-002",
      date: "2024-03-01",
      amount: 850,
      status: "Overdue",
      dueDate: "2024-03-31",
    },
    {
      id: "INV-003",
      date: "2024-02-15",
      amount: 2100,
      status: "Pending",
      dueDate: "2024-04-15",
    },
  ],
};

export default function CustomerDetailsPage() {
  const params = useParams();
  const [customer] = React.useState(customerData);

  const getStatusColor = (status: string) => {
    const colors = {
      Paid: "bg-green-500",
      Pending: "bg-yellow-500",
      Overdue: "bg-red-500",
    };
    return colors[status as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <Building2 className="h-8 w-8" />
            {customer.name}
          </h1>
          <div className="mt-2 space-y-1 text-muted-foreground">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {customer.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {customer.phone}
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Customer since {new Date(customer.joinDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Badge
          variant={customer.status === "Active" ? "default" : "secondary"}
          className="py-1 text-lg"
        >
          {customer.status}
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${customer.stats.totalPaid.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Amount
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${customer.stats.totalPending.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customer.stats.totalOrders}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overdue Invoices
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customer.stats.overdueInvoices}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Invoices
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customer.stats.totalInvoices}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customer.stats.paidInvoices}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unpaid Invoices
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customer.stats.unpaidInvoices}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customer.recentInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>
                    {new Date(invoice.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${getStatusColor(invoice.status)}`}
                      />
                      {invoice.status}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
