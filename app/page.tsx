import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex flex-1 items-center justify-center px-6 py-32">
        <div className="w-full max-w-3xl space-y-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              LinkShortener
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">
              Create short, memorable links and track your traffic with analytics.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="/sign-up">Get Started</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/docs">Learn More</a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
