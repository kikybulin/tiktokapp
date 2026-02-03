"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  connected: boolean;
  authorizeUrl: string | null;
  mockMode: boolean;
  hasToken: boolean;
};

export function TikTokConnectClient({ connected, authorizeUrl, mockMode, hasToken }: Props) {
  const router = useRouter();

  function handleConnect() {
    if (authorizeUrl) {
      window.location.href = authorizeUrl;
    } else {
      router.push("/dashboard/tiktok?error=config");
    }
  }

  return (
    <Card className="border bg-card">
      <CardHeader>
        <CardTitle className="text-lg">Koneksi akun</CardTitle>
        <CardDescription className="leading-relaxed">
          {connected
            ? "Akun Anda sudah terhubung. Anda bisa hubungkan ulang di bawah jika perlu."
            : "Hubungkan akun Anda untuk menampilkan profil dan konten di dashboard."}
          {mockMode && (
            <span className="block mt-2 text-amber-700 dark:text-amber-400 text-sm">
              Mode demo: redirect dan token disimulasikan untuk keperluan demo.
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">
          <span className="text-muted-foreground">Status:</span>{" "}
          <strong>{connected || hasToken ? "Terhubung" : "Belum terhubung"}</strong>
        </p>
        <Button
          onClick={handleConnect}
          variant={connected ? "outline" : "default"}
          size="lg"
        >
          {connected ? "Hubungkan ulang" : "Connect TikTok Account (Sandbox)"}
        </Button>
      </CardContent>
    </Card>
  );
}
