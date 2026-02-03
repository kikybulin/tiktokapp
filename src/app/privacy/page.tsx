export const metadata = {
  title: "Privacy Policy – ClipDash",
  description: "ClipDash privacy policy.",
};

export default function PrivacyPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Privacy Policy</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground space-y-4 text-sm">
        <p><strong>Last updated:</strong> February 2025</p>
        <p>
          ClipDash (&quot;we&quot;, &quot;our&quot;) operates the ClipDash web application. This policy describes
          how we collect, use, and protect your information when you use our service.
        </p>
        <h2 className="text-foreground font-semibold pt-4">Information we collect</h2>
        <p>
          We collect the information you provide when registering (username and password). Passwords are
          stored in hashed form. When you connect a third-party account via OAuth, we store the access
          token and related metadata (e.g. scope, expiry) necessary to display your profile and content
          in the dashboard.
        </p>
        <h2 className="text-foreground font-semibold pt-4">How we use it</h2>
        <p>
          Your data is used to provide the dashboard and linked-account features. We do not sell your
          personal information. We may use aggregated, non-identifying data for improving the service.
        </p>
        <h2 className="text-foreground font-semibold pt-4">Security</h2>
        <p>
          We use industry-standard practices to protect your data, including hashed passwords and secure
          handling of OAuth tokens. Access to the application is over HTTPS.
        </p>
        <h2 className="text-foreground font-semibold pt-4">Contact</h2>
        <p>
          For privacy-related questions, please use the <a href="/contact" className="text-primary underline">Contact</a> page.
        </p>
      </div>
    </div>
  );
}
