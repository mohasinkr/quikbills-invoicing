import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <body>
        <main className="h-screen bg-white">{children}</main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
