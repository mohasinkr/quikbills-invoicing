"use client";

import { AutoComplete } from "@/components/ui/autocomplete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MoneyInput from "@/components/ui/money-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";

const schema = z.object({
  value: z.coerce.number().min(0.01, "Required"),
});

const CreateInvoiceForm = ({ customerNames }: { customerNames: string[] }) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: 0,
    },
    mode: "onTouched",
  });

  function onSubmit(values: z.infer<typeof schema>) {
    // handle submit
  }

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="customer_name">Customer Name</Label>
          {/* <Input id="customer_id " name="clientName" required /> */}
          <AutoComplete
            hideIcon
            options={customerNames}
            emptyMessage="Add kevin?"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Item Description</Label>
          <Textarea
            id="description"
            name="description"
            // value={editingInvoice?.description || ""}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            name="dueDate"
            type="date"
            // value={editingInvoice?.due_date || ""}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalAmount">Total Amount</Label>
          <MoneyInput
            form={form}
            label="Amount"
            name="value"
            placeholder="Enter the amount"
          />
        </div>
        <div className="space-y-2">
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
    </Form>
  );
};

export default CreateInvoiceForm;
