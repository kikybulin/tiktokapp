import Link from "next/link";
import { Button } from "@/components/ui/button";
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
        <p className="text-muted-foreground">Manage your content workflow from here.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project overview</CardTitle>
          <CardDescription>
            ClipDash is a web app for creators and brands to manage their content in one place.
            You can connect your video platform account to see profile and content data in this dashboard.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>TikTok integration demo flow</CardTitle>
          <CardDescription>Step-by-step: connect your account and see the flow end-to-end.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Go to Connect account.</li>
            <li>Click &quot;Connect TikTok Account (Sandbox)&quot;.</li>
            <li>Authorize on the platform consent screen (or see mock flow if app is not yet approved).</li>
            <li>You are redirected back; status shows &quot;connected&quot;.</li>
            <li>Profile and video list can be loaded (mock until app is approved).</li>
          </ol>
          <Button asChild>
            <Link href="/dashboard/tiktok">Connect TikTok Account (Sandbox)</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
