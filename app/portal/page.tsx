import { Header } from "@/components/header/Header";
import { ProviderSubmitForm } from "@/components/portal/ProviderSubmitForm";

export const metadata = {
  title: "Provider Portal — Moonshine Capital",
  description: "Submit a funding product for review and publication in the Moonshine directory."
};

export default function ProviderPortalPage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24">
        <div className="py-8">
          <h1 className="text-3xl font-semibold md:text-4xl">Provider Onboarding Portal</h1>
          <p className="mt-2 text-slate-600">
            Submit your product once. We review for clarity + compliance, then publish to the directory.
          </p>
          <div className="mt-4 rounded-2xl border bg-white p-4 text-sm text-slate-700">
            <div className="font-semibold">Workflow</div>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>Submit product details</li>
              <li>Admin reviews + approves</li>
              <li>Approved listings publish automatically</li>
            </ol>
            <div className="mt-3 text-xs text-slate-500">
              Demo note: this uses an in-memory store. Replace with a DB for persistence in production.
            </div>
          </div>
        </div>

        <ProviderSubmitForm />
      </main>
    </div>
  );
}
