"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      const msg = typeof data.error === "string"
        ? data.error
        : data.error?.username?.[0] ?? data.error?.password?.[0] ?? "Pendaftaran gagal. Coba lagi.";
      setError(msg);
      return;
    }
    router.push("/login?registered=1");
    router.refresh();
  }

  return (
    <div className="container flex items-center justify-center min-h-[60vh] py-12 px-4">
      <Card className="w-full max-w-sm shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Buat akun</CardTitle>
          <CardDescription>
            Cukup username dan password. Email tidak wajib.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                required
                minLength={2}
                maxLength={32}
                autoComplete="username"
                placeholder="Contoh: johndoe"
                className="mt-1"
                aria-invalid={!!error}
              />
              <p className="text-xs text-muted-foreground">2–32 karakter.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="Min. 6 karakter"
                className="mt-1"
                aria-invalid={!!error}
              />
            </div>
            {error && (
              <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Membuat akun…" : "Daftar"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-primary font-medium underline underline-offset-4 hover:no-underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
