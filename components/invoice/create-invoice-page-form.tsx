"use client";

import { createInvoice } from "@/actions/invoice/create-invoice";
import { AutoComplete } from "@/components/ui/autocomplete";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormSelect from "@/components/ui/form-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/ui/loading-spinner";
import MoneyInput from "@/components/ui/money-input";
import { SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TCustomerNames } from "@/schema/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const itemSchema = z.object({
  item_name: z.string().min(1, "Item name is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  total: z.coerce.number(),
});

const invoiceSchema = z.object({
  invoice_id: z.string(), // Auto-generated
  customer_id: z.string().min(1, "Customer is required"),
  status: z.enum(["paid", "unpaid", "overdue"]),
  description: z.string().min(1, "Description is required"),
  due_date: z.string(),
  items: z.array(itemSchema).min(1, "At least one item is required"),
  grand_total: z.coerce.number().min(0, "Total must be greater than 0"),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

type Item = {
  item_name: string;
  quantity: number;
  price: number;
  total: number;
};

const CreateInvoicePageForm = ({
  customerNames,
}: {
  customerNames: TCustomerNames;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [items, setItems] = useState<Item[]>([
    { item_name: "", quantity: 1, price: 0, total: 0 },
  ]);
  const router = useRouter();

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      invoice_id: "Auto-generated",
      customer_id: "",
      status: "unpaid",
      description: "",
      due_date: new Date().toISOString(),
      items: [{ item_name: "", quantity: 1, price: 0, total: 0 }],
      grand_total: 0,
    },
    mode: "onSubmit",
  });

  const calculateTotal = (item: Item) => {
    return item.quantity * item.price;
  };

  const calculateGrandTotal = (items: Item[]) => {
    return items.reduce((sum, item) => sum + calculateTotal(item), 0);
  };

  const updateItems = (updatedItems: Item[]) => {
    setItems(updatedItems);
    const grandTotal = calculateGrandTotal(updatedItems);
    form.setValue("items", updatedItems);
    form.setValue("grand_total", grandTotal);
  };

  const addItem = () => {
    const newItems = [...items, { item_name: "", quantity: 1, price: 0, total: 0 }];
    updateItems(newItems);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      updateItems(newItems);
    }
  };

  const updateItem = (index: number, field: keyof Item, value: string | number) => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [field]: value };
        if (field === "quantity" || field === "price") {
          updatedItem.total = calculateTotal(updatedItem);
        }
        return updatedItem;
      }
      return item;
    });
    updateItems(newItems);
  };

  async function onSubmit(values: InvoiceFormData) {
    setIsSubmitting(true);
    try {
      // For now, we'll aggregate all items into one invoice entry
      // In future, you might want to create separate invoice items
      const aggregatedInvoice = {
        customer_id: values.customer_id,
        description: values.description,
        due_date: values.due_date,
        status: values.status,
        quantity: values.items.reduce((sum, item) => sum + item.quantity, 0),
        total: values.grand_total,
        unit_price: values.grand_total / values.items.reduce((sum, item) => sum + item.quantity, 0), // Average price
      };

      const response = await createInvoice(aggregatedInvoice);
      if (response.error) {
        toast.error("Something went wrong");
        return;
      }

      toast.success("Invoice created successfully");
      router.push("/invoice");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Invoice Header Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="invoice_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice ID</FormLabel>
                  <FormControl>
                    <Input readOnly {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customer_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <AutoComplete
                      name="customer_id"
                      form={form}
                      hideIcon
                      options={customerNames}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect name="status" form={form} placeholder="Status">
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </FormSelect>

            <DatePicker form={form} name="due_date" label="Due Date" />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Enter invoice description"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Items Table */}
          <div>
            <Label className="text-lg font-semibold mb-4 block">Invoice Items</Label>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Item Name</th>
                    <th className="px-4 py-2 text-center">Qty</th>
                    <th className="px-4 py-2 text-right">Price</th>
                    <th className="px-4 py-2 text-right">Total</th>
                    <th className="px-4 py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">
                        <Input
                          placeholder="Item name"
                          value={item.item_name}
                          onChange={(e) => updateItem(index, "item_name", e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 1)}
                          className="text-center"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          value={item.price || ""}
                          onChange={(e) => updateItem(index, "price", parseFloat(e.target.value) || 0)}
                          className="text-right"
                        />
                      </td>
                      <td className="px-4 py-2 text-right">
                        ${item.total.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeItem(index)}
                          disabled={items.length === 1}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <Button type="button" onClick={addItem} variant="outline">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Item
              </Button>

              <div className="text-right">
                <div className="text-lg font-semibold">
                  Total: ${calculateGrandTotal(items).toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/invoice")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <LoadingSpinner label={"Creating Invoice"} />
              ) : (
                "Create Invoice"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateInvoicePageForm;
