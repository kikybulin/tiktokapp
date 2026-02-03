import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const APP_NAME = "ClipDash";

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-14 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold shrink-0">
          <Image src="/icon.svg" alt="" width={28} height={28} />
          <span>{APP_NAME}</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Navigasi utama">
          <Link href="/features" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors">
            Fitur
          </Link>
          <Link href="/docs" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors">
            Docs
          </Link>
          <Link href="/contact" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors">
            Kontak
          </Link>
          <span className="w-px h-4 bg-border mx-1 hidden sm:block" aria-hidden />
          {session ? (
            <Link href="/dashboard" className="shrink-0">
              <Button variant="default" size="sm">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login" className="shrink-0">
                <Button variant="ghost" size="sm">Masuk</Button>
              </Link>
              <Link href="/register" className="shrink-0">
                <Button size="sm">Daftar</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
