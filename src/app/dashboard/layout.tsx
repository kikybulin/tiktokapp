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
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <nav className="flex gap-4">
          <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Overview
          </Link>
          <Link href="/dashboard/tiktok" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Connect account
          </Link>
        </nav>
        <span className="text-sm text-muted-foreground">Logged in as {session.user?.name}</span>
        <SignOutButton />
      </div>
      {children}
    </div>
  );
}
