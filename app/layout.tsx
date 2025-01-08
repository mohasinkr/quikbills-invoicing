import "./globals.css";

import { Lato } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/ui/sidebar";


const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight:  ["100", "300", "400", "700", "900"],
  display: "swap",

});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lato.variable}`}>
      <body>
        <main className="flex h-screen">
          <Sidebar />
          {children}
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
