"use client";
import { useEffect, useState } from "react";
import { moneyFormatter } from "@/utils/format-money";

// Mock API call to get currency settings
const getCurrencySettings = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));

  // Mock response - in real app this would come from backend
  return {
    currency: "INR",
    symbol: "₹",
    locale: "en-IN"
  };
};

type CurrencyDisplayProps = {
  value: number;
  className?: string;
};

export default function CurrencyDisplay({ value, className = "" }: CurrencyDisplayProps) {
  const [currencyCode, setCurrencyCode] = useState("INR"); // Default to INR

  useEffect(() => {
    const loadCurrencySettings = async () => {
      try {
        const settings = await getCurrencySettings();
        setCurrencyCode(settings.currency);
      } catch (error) {
        console.error("Failed to load currency settings:", error);
        // Keep default INR on error
      }
    };

    loadCurrencySettings();
  }, []);

  const formattedValue = moneyFormatter(value, currencyCode);

  return (
    <span className={className}>
      {formattedValue}
    </span>
  );
}
