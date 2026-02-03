"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CallbackContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const err = searchParams.get("error");

    if (err) {
      setError(searchParams.get("error_description") || err);
      setStatus("error");
      return;
    }

    if (!code || !state) {
      setError("Missing code or state in URL.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    const redirectUri = typeof window !== "undefined" ? `${window.location.origin}/callback` : "";

    fetch("/api/tiktok/exchange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, state, redirect_uri: redirectUri }),
    })
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(json.error || json.details || res.statusText);
          setStatus("error");
          return;
        }
        setData(json);
        setStatus("success");
      })
      .catch((e) => {
        setError(e.message || "Request failed");
        setStatus("error");
      });
  }, [searchParams]);

  if (status === "idle" || status === "loading") {
    return (
      <div className="container flex items-center justify-center min-h-[40vh] py-12">
        <p className="text-muted-foreground">
          {status === "loading" ? "Exchanging code for token…" : "Loading…"}
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container py-12 max-w-md">
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Token received</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs bg-muted p-4 rounded overflow-auto max-h-60">
            {JSON.stringify(data, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="container flex items-center justify-center min-h-[40vh] py-12">
          <p className="text-muted-foreground">Loading…</p>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
