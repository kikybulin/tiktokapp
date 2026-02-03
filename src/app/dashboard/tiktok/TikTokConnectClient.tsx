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
    <Card>
      <CardHeader>
        <CardTitle>Account connection</CardTitle>
        <CardDescription>
          {connected
            ? "Your account is linked. You can disconnect and reconnect below if needed."
            : "Connect your account to enable profile and content in the dashboard."}
          {mockMode && (
            <span className="block mt-2 text-amber-600 dark:text-amber-400">
              Mock mode is on: OAuth redirect and token exchange are simulated for demo.
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium mb-2">
          Status: {connected || hasToken ? "Connected" : "Not connected"}
        </p>
        <Button
          onClick={handleConnect}
          variant={connected ? "outline" : "default"}
        >
          {connected ? "Reconnect account" : "Connect TikTok Account (Sandbox)"}
        </Button>
      </CardContent>
    </Card>
  );
}
