export default function SignInPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl bg-card p-6 shadow-soft">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="mt-2 text-sm text-slate-600">
          Saving products requires an account. Wire this to your auth provider.
        </p>
        <button className="mt-6 w-full rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90">
          Continue
        </button>
      </div>
    </main>
  );
}
