import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";

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
    <html lang="en" className={`${manrope.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="h-screen">{children}</main>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
