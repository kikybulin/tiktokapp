import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Scopes – ClipDash Docs",
  description: "OAuth scopes used by ClipDash and what they are for.",
};

const SCOPES = [
  {
    scope: "user.info.basic",
    purpose: "Read basic profile information (display name, avatar) to show in the dashboard after the user connects their account.",
  },
  {
    scope: "video.list",
    purpose: "List the user's videos so they can see their content in the dashboard. Used only for overview and planning, not for publishing.",
  },
];

export default function ScopesPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Scopes explanation</h1>
      <p className="text-muted-foreground mb-8">
        We request only the permissions needed for the dashboard. Below is what each scope is used for.
      </p>
      <div className="space-y-4">
        {SCOPES.map((s) => (
          <Card key={s.scope}>
            <CardHeader>
              <CardTitle className="font-mono text-base">{s.scope}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{s.purpose}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
