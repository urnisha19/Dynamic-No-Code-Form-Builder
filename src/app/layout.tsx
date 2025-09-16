import "./globals.css";
import Providers from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dynamic Form Builder",
  description: "Build customizable forms dynamically with drag & drop",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
   <body className="min-h-screen antialiased text-[#e0e0e0] bg-[#1a1a2e]" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}