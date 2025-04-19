import { DEFAULT_CURRENCY } from "./constants";

export const moneyFormatter = (
  amount: number,
  currency: string = "INR"
): string => {
  return new Intl.NumberFormat(DEFAULT_CURRENCY.LOCALE, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
