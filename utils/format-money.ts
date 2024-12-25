import { DEFAULT_CURRENCY } from "./constants";

export const moneyFormatter = (amount: number): string => {
  return new Intl.NumberFormat(DEFAULT_CURRENCY.LOCALE, {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
