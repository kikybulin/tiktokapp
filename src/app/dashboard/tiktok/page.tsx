import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getTikTokAuthorizeUrl, isMockTikTok } from "@/lib/tiktok-auth";
import { TikTokConnectClient } from "./TikTokConnectClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Connect account – ClipDash",
  description: "Connect your account to the dashboard.",
};

export default async function TikTokDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ connected?: string; error?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const params = await searchParams;
  const connection = await prisma.tiktokConnection.findUnique({
    where: { userId: session.user.id },
  });
  const authorizeUrl = getTikTokAuthorizeUrl(session.user.id);
  const mockMode = isMockTikTok();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Connect account</h1>
        <p className="text-muted-foreground">
          Link your account to show profile and content in the dashboard.
        </p>
      </div>

      {params.connected && (
        <div className="rounded-md bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 text-sm">
          Account connected successfully.
        </div>
      )}
      {params.error && (
        <div className="rounded-md bg-destructive/10 text-destructive px-4 py-2 text-sm">
          Error: {params.error}
        </div>
      )}

      <TikTokConnectClient
        connected={!!connection}
        authorizeUrl={authorizeUrl}
        mockMode={mockMode}
        hasToken={!!connection?.accessToken}
      />

      {connection && (
        <Card>
          <CardHeader>
            <CardTitle>Profile / videos</CardTitle>
            <CardDescription>
              After app approval and with valid scopes, real profile and video list will load here.
              Until then, a placeholder is shown.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded border bg-muted/50 p-4 font-mono text-sm">
              <p className="text-muted-foreground">Status: connected</p>
              <p className="text-muted-foreground mt-1">
                Scope: {connection.scope ?? "—"}
              </p>
              <p className="text-muted-foreground mt-2">
                Fetch profile / list videos will be active after the app is approved and scopes are set.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
