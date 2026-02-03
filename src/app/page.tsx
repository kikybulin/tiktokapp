import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const APP_NAME = "ClipDash";

const features = [
  {
    title: "Satu dashboard",
    description: "Satu tempat untuk melihat semua akun terhubung dan status konten Anda.",
  },
  {
    title: "Koneksi aman",
    description: "Hubungkan akun lewat API resmi. Data tetap di bawah kendali Anda.",
  },
  {
    title: "Tanpa biaya",
    description: "Gratis. Tanpa kartu kredit atau langganan—cukup daftar dan mulai.",
  },
];

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="container py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl md:leading-tight">
            Kelola workflow konten dalam satu tempat
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {APP_NAME} membantu creator dan brand merencanakan, mengatur, dan melacak konten—semua dari satu dashboard.
            Hubungkan akun Anda dan lihat pipeline konten dengan jelas.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/register" className={cn(buttonVariants({ size: "lg" }))}>
              Daftar gratis
            </Link>
            <Link href="/docs" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              Lihat cara kerja
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16 md:py-20 border-t">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="border bg-card transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Legal strip */}
      <section className="container py-10 border-t">
        <div className="flex flex-col items-center gap-4 text-center">
          <Image src="/icon.svg" alt="" width={48} height={48} className="opacity-80" />
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            Dengan menggunakan {APP_NAME} Anda setuju dengan{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground transition-colors">
              Kebijakan Privasi
            </Link>
            {" "}dan{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-foreground transition-colors">
              Ketentuan Layanan
            </Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
