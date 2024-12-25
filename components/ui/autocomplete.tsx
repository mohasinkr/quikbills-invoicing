"use client";

import { Command as CommandPrimitive } from "cmdk";
import { useRef, useCallback, type KeyboardEvent, useState } from "react";
import { Skeleton } from "./skeleton";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

type Option = {
  name: string;
  value: string;
};

type AutoCompleteProps = {
  form: UseFormReturn<any>;
  name: string;
  hideIcon?: boolean;
  options: Option[];
  emptyMessage?: string;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

export const AutoComplete = ({
  form,
  name,
  hideIcon,
  options,
  placeholder,
  disabled,
  isLoading = false,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [inputDisplay, setInputDisplay] = useState(() => {
    const currentValue = form.getValues()[name];
    return options.find((opt) => opt.value === currentValue)?.name || "";
  });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, field: any) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      if (!isOpen) {
        setOpen(true);
      }

      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find(
          (option) => option.name.toLowerCase() === input.value.toLowerCase()
        );
        if (optionToSelect) {
          field.onChange(optionToSelect.value);
          setInputDisplay(optionToSelect.name);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options]
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSelectOption = useCallback(
    (selectedValue: string, field: any) => {
      const selectedOption = options.find((opt) => opt.value === selectedValue);
      if (selectedOption) {
        field.onChange(selectedOption.value);
        setInputDisplay(selectedOption.name);
      }
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [options]
  );

  const handleInputChange = (value: string, field: any) => {
    setInputDisplay(value);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormControl>
            <CommandPrimitive
              onKeyDown={(event) => handleKeyDown(event, field)}
              shouldFilter={false}
            >
              <div>
                <CommandInput
                  hideIcon={hideIcon}
                  ref={inputRef}
                  value={inputDisplay}
                  onValueChange={(value) =>
                    isLoading ? undefined : handleInputChange(value, field)
                  }
                  onBlur={handleBlur}
                  onFocus={() => setOpen(true)}
                  placeholder={placeholder}
                  disabled={disabled}
                  className="text-base"
                />
              </div>
              <div className="relative mt-1">
                <div
                  className={cn(
                    "absolute top-0 z-10 w-full rounded-xl bg-white outline-none animate-in fade-in-0 zoom-in-95",
                    isOpen ? "block" : "hidden"
                  )}
                >
                  <CommandList className="rounded-lg ring-1 ring-slate-200">
                    {isLoading ? (
                      <CommandPrimitive.Loading>
                        <div className="p-1">
                          <Skeleton className="h-8 w-full" />
                        </div>
                      </CommandPrimitive.Loading>
                    ) : null}
                    {options.length > 0 && !isLoading ? (
                      <CommandGroup>
                        {options.map((option) => {
                          const isSelected = field.value === option.value;
                          return (
                            <CommandItem
                              key={option.value}
                              value={option.value}
                              onMouseDown={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                              }}
                              onSelect={() =>
                                handleSelectOption(option.value, field)
                              }
                              className={cn(
                                "flex w-full items-center gap-2",
                                !isSelected ? "pl-8" : null
                              )}
                            >
                              {isSelected ? <Check className="w-4" /> : null}
                              {option.name}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    ) : null}
                    {!isLoading ? (
                      <CommandPrimitive.Empty className="cursor-pointer rounded-sm px-2 py-3 text-center text-sm text-gray-600">
                        Add {inputDisplay}?
                      </CommandPrimitive.Empty>
                    ) : null}
                  </CommandList>
                </div>
              </div>
            </CommandPrimitive>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
