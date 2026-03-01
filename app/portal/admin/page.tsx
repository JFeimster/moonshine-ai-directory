import { Header } from "@/components/header/Header";
import { AdminSubmissions } from "@/components/portal/AdminSubmissions";

export const metadata = {
  title: "Admin — Provider Submissions",
  description: "Approve or reject provider submissions."
};

export default function AdminPage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-24">
        <div className="py-8">
          <h1 className="text-3xl font-semibold md:text-4xl">Admin Review</h1>
          <p className="mt-2 text-slate-600">
            Approve submissions to publish them into the product directory automatically.
          </p>
          <div className="mt-3 text-xs text-slate-500">
            Add real auth/roles: only admins should access this route.
          </div>
        </div>

        <AdminSubmissions />
      </main>
    </div>
  );
}
