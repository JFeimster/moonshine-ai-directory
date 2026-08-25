import { Header } from "@/components/header/Header";
import { ToolsDirectory } from "@/components/tools/ToolsDirectory";

export const metadata = {
  title: "Funding Tools — Moonshine Capital",
  description: "Calculators, estimators, scorecards, and funding workflow tools from Moonshine Capital."
};

export default function ToolsPage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-24">
        <div className="py-8">
          <h1 className="text-3xl font-semibold md:text-4xl">Funding Tools</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Use calculators, estimators, and scorecards to understand cash-flow gaps, funding fit, repayment impact, and next steps.
          </p>
        </div>

        <ToolsDirectory />
      </main>
    </div>
  );
}
