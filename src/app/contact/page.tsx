"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="container py-12 px-4 max-w-md">
      <h1 className="text-2xl font-bold tracking-tight">Kontak</h1>
      <p className="text-muted-foreground mt-1 mb-8">
        Kirim pesan dan kami akan membalas secepatnya.
      </p>
      <Card className="shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg">Hubungi kami</CardTitle>
          <CardDescription>
            Atau email ke support@clipdash.example (ganti dengan domain Anda).
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="rounded-lg bg-green-500/10 text-green-700 dark:text-green-400 px-4 py-3 text-sm border border-green-500/20">
              <p className="font-medium">Pesan terkirim.</p>
              <p className="text-muted-foreground mt-1">Kami akan membalas segera.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input id="name" name="name" placeholder="Nama Anda" className="mt-1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="email@contoh.com" className="mt-1" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Pesan</Label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tulis pesan Anda..."
                  className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[100px]"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">Kirim pesan</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
