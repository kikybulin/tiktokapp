import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Documentation – ClipDash",
  description: "How ClipDash integrates with video platforms and how to use the app.",
};

export default function DocsPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Documentation</h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-2">How integration works</h2>
          <p className="text-muted-foreground">
            ClipDash uses official platform OAuth so you can link your account to the dashboard.
            You log in to ClipDash with your own username and password. Linking a video account
            is a separate step: from the dashboard you click &quot;Connect account&quot;, authorize
            in the platform&apos;s consent screen, and you are redirected back. We then store
            an access token (and optional refresh token) to show profile and content data in the app.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Scopes</h2>
          <p className="text-muted-foreground mb-2">
            We request only the permissions needed for the dashboard. See the full list and explanations:
          </p>
          <Link href="/docs/scopes" className="text-primary underline underline-offset-4">
            Scopes explanation →
          </Link>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">App Review Notes (for reviewers)</h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Review context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                This app is a web application for creators and brands to manage their content workflow.
                It is free and does not require payment.
              </p>
              <p>
                <strong>Login:</strong> Users sign in to the application using an internal username and password
                (registration and login are provided on this site). We do not use any third-party login kit
                for signing into the application itself.
              </p>
              <p>
                <strong>Platform OAuth:</strong> The platform OAuth flow is used only to connect a user&apos;s
                video account to their ClipDash dashboard. It is not used to log the user into the app.
              </p>
              <p>
                <strong>End-to-end flow:</strong> Register → Log in → Dashboard → Connect account (OAuth) →
                Callback → Status &quot;connected&quot; → Dashboard can show profile/video data (mock until approved).
                The website URL you are reviewing is the same domain used in the OAuth redirect and in production.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
