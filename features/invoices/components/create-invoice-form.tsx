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
import { createInvoice } from "../actions/create-invoice";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import LoadingStatus from "@/components/ui/loading-status";

const schema = z.object({
  unit_price: z.coerce.number().min(0.0, "Amount is required"),
  description: z.string().min(1, "Item description is required"),
  quantity: z.coerce.number().min(1, "Atleast one item is required"),
  total: z.coerce.number().min(0.0, "Total amount is required"),
  due_date: z.date().transform((date) => date.toISOString()),
  status: z.enum(["paid", "unpaid", "overdue"]),
  customer_id: z.string().min(1, "Required"),
});

type InvoiceFormProps = {
  customerNames: Array<{ name: string; value: string }>;
};

const CreateInvoiceForm = ({ customerNames }: InvoiceFormProps) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      unit_price: 0,
      description: "",
      quantity: 1,
      total: 0,
      due_date: new Date().toISOString(),
      status: "unpaid",
      customer_id: "",
    },
    mode: "onSubmit",
  });

  // const { pending } = useFormStatus();

  async function onSubmit(values: z.infer<typeof schema>) {
    console.table(values);
    try {
      const response = await createInvoice(values);
      if (response) {
        toast.success("Invoice created successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="customer_name">Customer Name</Label>
          <AutoComplete
            name="customer_id"
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

        <DatePicker form={form} name="due_date" label="Due Date" />

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
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
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
