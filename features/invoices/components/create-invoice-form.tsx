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
import { Input } from "@/components/ui/input";

const schema = z.object({
  unit_price: z.coerce.number().min(0.0, "Amount is required"),
  description: z.string().min(1, "Item description is required"),
  quantity: z.coerce.number().min(1, "Atleast one item is required"),
  total: z.coerce.number().min(0.0, "Total amount is required"),
  dueDate: z.date().transform((date) => date.toISOString()),
  status: z.enum(["Paid", "Unpaid", "Overdue"]),
  customerName: z.string().min(1, "Required"),
});

const CreateInvoiceForm = ({ customerNames }: { customerNames: string[] }) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      unit_price: 0,
      description: "",
      quantity: 1,
      total: 0,
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
        <div>
          <Label htmlFor="customer_name">Customer Name</Label>
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

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  {...field}
                  onChange={(e) => {
                    form.setValue(
                      "total",
                      Number(e.target.value) * form.getValues("unit_price")
                    );
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DatePicker form={form} name="dueDate" label="Due Date" />

        <MoneyInput form={form} label="Unit Price" name="unit_price" />

        <FormField
          control={form.control}
          name="total"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Amount</FormLabel>
              <FormControl>
                <Input type="number" readOnly {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue="Unpaid">
            <SelectTrigger>
              <SelectValue />
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
