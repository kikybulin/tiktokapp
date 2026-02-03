import Link from "next/link";

const APP_NAME = "ClipDash";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container py-8 md:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted-foreground order-2 md:order-1">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm order-1 md:order-2">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
