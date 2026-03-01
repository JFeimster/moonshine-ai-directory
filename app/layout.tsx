import "./globals.css";
import { CompareProvider } from "@/components/compare/useCompare";

export const metadata = {
  title: "Moonshine Capital — Funding Product Directory",
  description: "Search and compare funding products by amount, speed, credit score, and industry."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CompareProvider>{children}</CompareProvider>
      </body>
    </html>
  );
}
