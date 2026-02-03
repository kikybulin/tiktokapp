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
        <h1 className="text-2xl font-bold tracking-tight">Hubungkan akun</h1>
        <p className="text-muted-foreground mt-1">
          Hubungkan akun Anda untuk menampilkan profil dan konten di dashboard.
        </p>
      </div>

      {params.connected && (
        <div className="rounded-lg bg-green-500/10 text-green-700 dark:text-green-400 px-4 py-3 text-sm border border-green-500/20" role="status">
          <strong>Berhasil.</strong> Akun sudah terhubung. Anda bisa melihat status di bawah.
        </div>
      )}
      {params.error && (
        <div className="rounded-lg bg-destructive/10 text-destructive px-4 py-3 text-sm border border-destructive/20" role="alert">
          <strong>Terjadi kesalahan:</strong> {params.error}
        </div>
      )}

      <TikTokConnectClient
        connected={!!connection}
        authorizeUrl={authorizeUrl}
        mockMode={mockMode}
        hasToken={!!connection?.accessToken}
      />

      {connection && (
        <Card className="border bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Profil &amp; video</CardTitle>
            <CardDescription className="leading-relaxed">
              Setelah app disetujui dan scope aktif, profil dan daftar video asli akan dimuat di sini.
              Sementara ini yang tampil adalah placeholder.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border bg-muted/30 p-4 text-sm space-y-2">
              <p><span className="text-muted-foreground">Status:</span> <strong>Terhubung</strong></p>
              <p><span className="text-muted-foreground">Scope:</span> {connection.scope ?? "—"}</p>
              <p className="text-muted-foreground pt-2">
                Fitur ambil profil dan daftar video akan aktif setelah app disetujui dan scope dikonfigurasi.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
