"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const justRegistered = searchParams.get("registered") === "1";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl,
    });
    setLoading(false);
    if (res?.error) {
      setError("Username atau password salah. Cek lagi dan coba login kembali.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="container flex items-center justify-center min-h-[60vh] py-12 px-4">
      <Card className="w-full max-w-sm shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Log in</CardTitle>
          <CardDescription>
            Masuk dengan akun ClipDash Anda untuk mengakses dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {justRegistered && (
            <p className="text-sm text-green-600 dark:text-green-400 bg-green-500/10 rounded-md px-3 py-2 mb-4" role="status">
              Akun berhasil dibuat. Silakan masuk dengan username dan password Anda.
            </p>
          )}
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                required
                autoComplete="username"
                placeholder="Masukkan username"
                className="mt-1"
                aria-invalid={!!error}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Masukkan password"
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
              {loading ? "Memproses…" : "Masuk"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link href="/register" className="text-primary font-medium underline underline-offset-4 hover:no-underline">
              Daftar gratis
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
