import "./globals.css";
import { Suspense } from "react";
import { CompareProvider } from "@/components/compare/useCompare";

export const metadata = {
  title: "Moonshine Capital — Funding Product Directory",
  description: "Search and compare funding products by amount, speed, credit score, and industry."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CompareProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </CompareProvider>
      </body>
    </html>
  );
}
