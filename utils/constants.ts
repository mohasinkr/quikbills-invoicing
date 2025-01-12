import { DashboardIcon } from "@radix-ui/react-icons";
import { Receipt, Settings, Truck, Users } from "lucide-react";

// Payment Status Constants
export const PAYMENT_STATUS = {
  PAID: "paid",
  UNPAID: "unpaid",
  OVERDUE: "overdue",
} as const;

export type PaymentStatusType =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

// HTTP Status Constants
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Form Constants
export const FORM_MESSAGES = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Please enter a valid email",
  MIN_LENGTH: (length: number) => `Must be at least ${length} characters`,
  MAX_LENGTH: (length: number) => `Must be less than ${length} characters`,
} as const;

// Currency Constants
export const DEFAULT_CURRENCY = {
  CODE: "INR",
  SYMBOL: "₹",
  LOCALE: "en-IN",
} as const;

export const SIDEBAR_ITEMS = [
  {
    icon: DashboardIcon,
    label: "Dashboard",
    href: "/",
    description: "Manage your invoices",
  },
  {
    icon: Receipt,
    label: "Invoices",
    href: "/invoice",
    description: "Manage your invoices",
  },
  {
    icon: Users,
    label: "Customers",
    href: "/customers",
    description: "View and manage customers",
  },
  {
    icon: Truck,
    label: "Suppliers",
    href: "/suppliers",
    description: "Manage your suppliers",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
    description: "System preferences",
  },
];

export const SUCCESS_MESSAGES = {
  CUSTOMER_CREATED: "Customer created successfully",
  INVOICE_CREATED: "Invoice created successfully",
};
