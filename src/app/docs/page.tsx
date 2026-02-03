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
          <h2 className="text-xl font-semibold mb-2">Login Kit for Desktop (PKCE)</h2>
          <p className="text-muted-foreground mb-2">
            For desktop apps, use PKCE and a localhost redirect URI. Register the redirect URI in your app&apos;s <strong>Login Kit</strong> product configuration on TikTok for Developers.
          </p>

          <h3 className="text-sm font-semibold mt-4 mb-2">Redirect URI rules (TikTok)</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm mb-3">
            <li>Max 10 URIs per app; each &lt; 512 characters.</li>
            <li>Absolute URI only: <code className="bg-muted px-1 rounded">http://</code> or <code className="bg-muted px-1 rounded">https://</code>. No query or fragment.</li>
            <li>Host: only <code className="bg-muted px-1 rounded">localhost</code> or <code className="bg-muted px-1 rounded">127.0.0.1</code>.</li>
            <li>Port required. Wildcard <code className="bg-muted px-1 rounded">*</code> is supported (e.g. <code className="bg-muted px-1 rounded">http://127.0.0.1:*/callback/</code>).</li>
          </ul>
          <p className="text-muted-foreground text-sm mb-2">Contoh valid:</p>
          <ul className="list-disc list-inside text-muted-foreground text-sm mb-3 font-mono">
            <li>http://localhost:3455/callback/</li>
            <li>http://127.0.0.1:*/callback/</li>
            <li>https://127.0.0.1:3455/callback/</li>
          </ul>

          <h3 className="text-sm font-semibold mt-4 mb-2">Flow</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
            <li><strong>GET</strong> <code className="bg-muted px-1 rounded">/api/tiktok/authorize-desktop?redirect_uri=http://localhost:3455/callback/</code> → returns <code className="bg-muted px-1 rounded">{"{ url, state }"}</code>. Open <code>url</code> in the browser.</li>
            <li>User authorizes; TikTok redirects to your redirect_uri with <code>code</code> and <code>state</code>.</li>
            <li><strong>POST</strong> <code className="bg-muted px-1 rounded">/api/tiktok/exchange</code> with body <code className="bg-muted px-1 rounded">{"{ code, state, redirect_uri }"}</code> (same redirect_uri as in step 1) → returns access token.</li>
          </ul>
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
