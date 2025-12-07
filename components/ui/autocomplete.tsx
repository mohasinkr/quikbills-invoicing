"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { Check } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { UseFormReturn } from "react-hook-form";
import {
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Skeleton } from "./skeleton";
import { ScrollArea } from "./scroll-area";
import { useDebouncedCallback } from "use-debounce";

type Option = {
  name: string;
  value: string;
};

type AutoCompleteProps = {
  form: UseFormReturn<any>;
  name: string;
  hideIcon?: boolean;
  options: Option[];
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onAddNew?: (value: string) => void;
};

export const AutoComplete = ({
  form,
  name,
  hideIcon,
  options,
  placeholder,
  disabled,
  isLoading = false,
  onAddNew,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");

  const debouncedSetFilteredInput = useDebouncedCallback((value: string) => {
    setDebouncedInput(value);
  }, 300);

  // Sync inputValue with form value
  useEffect(() => {
    const subscription = form.watch((value, { name: fieldName }) => {
      if (fieldName === name) {
        const selectedOption = options.find((opt) => opt.value === value[name]);
        setInputValue(selectedOption?.name || "");
        setDebouncedInput(selectedOption?.name || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [form, name, options]);

  // Filter options based on input
  const filteredOptions = useMemo(() => {
    if (!debouncedInput) return options;

    return options.filter((option) =>
      option.name.toLowerCase().includes(debouncedInput.toLowerCase())
    );
  }, [options, debouncedInput]);

  // Check if current input matches any option exactly
  const hasExactMatch = useMemo(() => {
    return options.some(
      (option) => option.name.toLowerCase() === debouncedInput.toLowerCase()
    );
  }, [options, debouncedInput]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, field: any) => {
      const input = inputRef.current;
      if (!input) return;

      if (!isOpen) {
        setOpen(true);
      }

      if (event.key === "Enter") {
        event.preventDefault();

        if (inputValue === "") return;

        const optionToSelect = options.find(
          (option) => option.name.toLowerCase() === inputValue.toLowerCase()
        );

        if (optionToSelect) {
          field.onChange(optionToSelect.value);
          setInputValue(optionToSelect.name);
          setDebouncedInput(optionToSelect.name);
        } else if (onAddNew) {
          onAddNew(inputValue);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options, onAddNew, inputValue]
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSelectOption = useCallback(
    (selectedValue: string, field: any) => {
      const selectedOption = options.find((opt) => opt.value === selectedValue);
      if (selectedOption) {
        field.onChange(selectedOption.value);
        setInputValue(selectedOption.name);
        setDebouncedInput(selectedOption.name);
      }
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [options]
  );

  const handleInputChange = (value: string) => {
    setInputValue(value);
    debouncedSetFilteredInput(value);
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
                  value={inputValue}
                  onValueChange={handleInputChange}
                  onBlur={handleBlur}
                  onFocus={() => {}}
                  onClick={() => setOpen(true)}
                  placeholder={placeholder}
                  disabled={disabled}
                  className="text-base"
                />
              </div>
              <div className="relative mt-1">
                {isOpen && (
                  <div className="absolute top-0 z-10 w-full rounded-xl bg-white outline-none animate-in fade-in-0 zoom-in-95 dark:bg-black">
                    <CommandList className="rounded-lg ring-1 ring-slate-200">
                      {isLoading ? (
                        <CommandPrimitive.Loading>
                          <div className="p-1">
                            <Skeleton className="h-8 w-full" />
                          </div>
                        </CommandPrimitive.Loading>
                      ) : null}
                      <CommandGroup>
                        <ScrollArea className="h-auto max-h-40">
                          {filteredOptions.length > 0 &&
                            !isLoading &&
                            filteredOptions.map((option) => {
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
                                  {isSelected ? (
                                    <Check className="w-4" />
                                  ) : null}
                                  {option.name}
                                </CommandItem>
                              );
                            })}
                          {!isLoading && inputValue && !hasExactMatch && (
                            <CommandItem
                              className="pl-8"
                              onSelect={() => onAddNew && onAddNew(inputValue)}
                            >
                              Add {inputValue}?
                            </CommandItem>
                          )}
                        </ScrollArea>
                      </CommandGroup>
                    </CommandList>
                  </div>
                )}
              </div>
            </CommandPrimitive>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
