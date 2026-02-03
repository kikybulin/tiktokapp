export const metadata = {
  title: "Terms of Service – ClipDash",
  description: "ClipDash terms of service.",
};

export default function TermsPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Terms of Service</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground space-y-4 text-sm">
        <p><strong>Last updated:</strong> February 2025</p>
        <p>
          By using ClipDash you agree to these terms. If you do not agree, do not use the service.
        </p>
        <h2 className="text-foreground font-semibold pt-4">Use of the service</h2>
        <p>
          ClipDash is provided as-is for managing content workflows. You must provide accurate
          registration information and keep your credentials secure. You are responsible for
          activity under your account.
        </p>
        <h2 className="text-foreground font-semibold pt-4">Third-party connections</h2>
        <p>
          When you connect a third-party account (e.g. via OAuth), you agree to that platform&apos;s
          terms and grant us permission to access the data we need to provide the dashboard. You can
          revoke access from the third-party platform or by disconnecting in our dashboard.
        </p>
        <h2 className="text-foreground font-semibold pt-4">Limitation of liability</h2>
        <p>
          The service is provided free of charge. We are not liable for indirect, incidental, or
          consequential damages arising from your use of ClipDash.
        </p>
        <h2 className="text-foreground font-semibold pt-4">Changes</h2>
        <p>
          We may update these terms. Continued use after changes constitutes acceptance. For questions,
          use the <a href="/contact" className="text-primary underline">Contact</a> page.
        </p>
      </div>
    </div>
  );
}
