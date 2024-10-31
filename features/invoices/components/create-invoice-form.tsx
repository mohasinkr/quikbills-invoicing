import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const CreateInvoiceForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data: { [key: string]: any } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="customer_name">Customer Name</Label>
        <Input id="customer_id " name="clientName" required />
      </div>
      <div>
        <Label htmlFor="description">Item Description</Label>
        <Textarea
          id="description"
          name="description"
          // value={editingInvoice?.description || ""}
          required
        />
      </div>
      <div>
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          name="dueDate"
          type="date"
          // value={editingInvoice?.due_date || ""}
          required
        />
      </div>
      <div>
        <Label htmlFor="totalAmount">Total Amount</Label>
        <Input
          id="totalAmount"
          name="totalAmount"
          type="number"
          // value={editingInvoice?.amount || ""}
          required
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select name="status">
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Unpaid">Unpaid</SelectItem>
            <SelectItem value="Overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        Create Invoice
      </Button>
    </form>
  );
};

export default CreateInvoiceForm;
