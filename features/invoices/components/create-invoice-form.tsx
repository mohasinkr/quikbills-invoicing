"use client";

import { AutoComplete } from "@/components/ui/autocomplete";
import { Button } from "@/components/ui/button";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DatePicker from "@/components/ui/date-picker";
import { format } from "date-fns";

const schema = z.object({
  amount: z.coerce.number().min(0.01, "Amount is required"),
  description: z.string().min(1, "Item description is required"),
  dueDate: z.date().transform((date) => format(date, "dd-MM-yyyy")),
  status: z.enum(["Paid", "Unpaid", "Overdue"]),
  customerName: z.string().min(1, "Required"),
});

const CreateInvoiceForm = ({ customerNames }: { customerNames: string[] }) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 0,
      description: "",
      dueDate: new Date().toISOString(),
      status: "Unpaid",
      customerName: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    console.table(values);
    // const response = await createInvoice(values);
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="customer_name">Customer Name</Label>
          {/* <Input id="customer_id " name="clientName" required /> */}
          <AutoComplete
            name="customerName"
            form={form}
            hideIcon
            options={customerNames}
            emptyMessage="Add kevin?"
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter item description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <DatePicker form={form} name="dueDate" label="Due Date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalAmount">Total Amount</Label>
          <MoneyInput
            form={form}
            label="Amount"
            name="amount"
            placeholder="Enter the amount"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue="Unpaid">
            <SelectTrigger>
              <SelectValue  />
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
