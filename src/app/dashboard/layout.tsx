import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/SignOutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="container py-6 px-4">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <nav className="flex gap-1" aria-label="Dashboard navigation">
          <Link
            href="/dashboard"
            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
          >
            Ringkasan
          </Link>
          <Link
            href="/dashboard/tiktok"
            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
          >
            Hubungkan akun
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground" title="Akun Anda">
            Halo, <strong className="text-foreground">{session.user?.name}</strong>
          </span>
          <SignOutButton />
        </div>
      </div>
      {children}
    </div>
  );
}
