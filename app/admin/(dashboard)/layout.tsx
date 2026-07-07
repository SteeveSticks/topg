import { AdminHeader } from "@/components/admin/admin-header";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-base">
      <AdminHeader />
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}