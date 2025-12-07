"use client";
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

import { moneyFormatter } from "@/utils/format-money";

type TextInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  onChange?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function MoneyInput(props: TextInputProps) {
  const initialValue = props.form.getValues()[props.name];
  const [displayValue, setDisplayValue] = useState(() =>
    initialValue ? moneyFormatter(initialValue) : ""
  );

  const handleChange = (
    formOnChange: (value: number) => void,
    inputValue: string
  ) => {
    if (props.readOnly) return; // Don't handle changes for read-only inputs

    const digits = inputValue.replace(/\D/g, "");

    const numericValue = Number(digits) / 100;

    const formatted = moneyFormatter(numericValue);
    setDisplayValue(formatted);
    formOnChange(numericValue);

    // Call external onChange callback if provided
    if (props.onChange) {
      props.onChange();
    }
  };

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel>{props.label}</FormLabel> */}
          <FormControl>
            <Input
              placeholder={props.placeholder || "₹0.00"}
              type="text"
              className={props.className}
              readOnly={props.readOnly}
              name={field.name}
              ref={field.ref}
              onChange={(ev) => handleChange(field.onChange, ev.target.value)}
              onKeyDown={props.onKeyDown}
              value={displayValue}
              inputMode="numeric"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
