import Link from "next/link";

const APP_NAME = "ClipDash";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
