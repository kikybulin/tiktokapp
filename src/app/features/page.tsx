import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Features – ClipDash",
  description: "What ClipDash offers for creators and brands.",
};

export default function FeaturesPage() {
  const features = [
    {
      title: "Unified dashboard",
      description: "View all connected accounts and content in one place. No switching between apps.",
    },
    {
      title: "Account linking",
      description: "Link your video platform accounts via secure OAuth. We never store your password.",
    },
    {
      title: "Content overview",
      description: "See profile info and video lists (when approved) to plan and track your pipeline.",
    },
    {
      title: "Internal auth",
      description: "Log in with your ClipDash username and password. No social login required for the app.",
    },
  ];

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-2xl text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Features</h1>
        <p className="mt-2 text-muted-foreground">
          Everything you need to manage your content workflow.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {features.map((f) => (
          <Card key={f.title}>
            <CardHeader>
              <CardTitle>{f.title}</CardTitle>
              <CardDescription>{f.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
