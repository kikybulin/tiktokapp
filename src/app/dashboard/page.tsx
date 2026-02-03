import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Dashboard – ClipDash",
  description: "Your ClipDash dashboard.",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Kelola workflow konten Anda dari sini. Hubungkan akun untuk memulai.
        </p>
      </div>

      <Card className="border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Tentang ClipDash</CardTitle>
          <CardDescription className="leading-relaxed">
            ClipDash membantu creator dan brand mengelola konten dalam satu tempat.
            Hubungkan akun video Anda untuk melihat profil dan daftar konten di dashboard ini.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Langkah menghubungkan akun</CardTitle>
          <CardDescription>
            Ikuti langkah berikut untuk demo integrasi dari awal sampai selesai.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>Klik tombol di bawah untuk membuka halaman &quot;Hubungkan akun&quot;.</li>
            <li>Klik &quot;Connect TikTok Account (Sandbox)&quot;.</li>
            <li>Setujui di layar consent platform (atau lihat alur mock jika app belum disetujui).</li>
            <li>Anda akan diarahkan kembali; status akan tampil &quot;connected&quot;.</li>
            <li>Profil dan daftar video dapat dimuat (mock sampai app disetujui).</li>
          </ol>
          <Link
            href="/dashboard/tiktok"
            className={cn(buttonVariants({ size: "lg" }), "inline-flex")}
          >
            Hubungkan akun TikTok (Sandbox)
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
