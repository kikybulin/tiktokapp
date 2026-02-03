import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const APP_NAME = "ClipDash";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Manage your content workflow in one place
          </h1>
          <p className="text-lg text-muted-foreground">
            {APP_NAME} helps creators and brands plan, organize, and track content—all from a single dashboard.
            Connect your accounts and get a clear view of your pipeline.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register" className={cn(buttonVariants({ size: "lg" }))}>
              Get started free
            </Link>
            <Link href="/docs" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              See how it works
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-12 border-t">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h3 className="font-semibold mb-2">Single dashboard</h3>
            <p className="text-sm text-muted-foreground">
              One place to see all your connected accounts and content status.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="font-semibold mb-2">Secure connection</h3>
            <p className="text-sm text-muted-foreground">
              Connect your accounts via official APIs. You stay in control of your data.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="font-semibold mb-2">No payment required</h3>
            <p className="text-sm text-muted-foreground">
              Free to use. No credit card, no subscription—just sign up and start.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-12 border-t">
        <div className="flex flex-col items-center gap-4 text-center">
          <Image src="/icon.svg" alt={APP_NAME} width={64} height={64} />
          <p className="text-sm text-muted-foreground max-w-md">
            By using {APP_NAME} you agree to our{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">Privacy Policy</Link>
            {" "}and{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-foreground">Terms of Service</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
