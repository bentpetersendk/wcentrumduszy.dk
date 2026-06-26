import { LoginForm } from "@/components/admin/LoginForm";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ redirectTo?: string }> }) {
  const params = await searchParams;

  return (
    <section className="mx-auto max-w-md px-5 py-20 sm:px-8">
      <p className="text-caption uppercase text-text-muted">Admin</p>
      <h1 className="mt-2 text-h1 text-text">Sign in</h1>
      <LoginForm redirectTo={params.redirectTo ?? "/admin"} />
    </section>
  );
}
