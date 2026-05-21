import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignUpButton, SignInButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Link2,
  BarChart3,
  Zap,
  Shield,
  MousePointerClick,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Instant Link Shortening",
    description:
      "Transform any long URL into a clean, shareable link in seconds. No friction, no hassle.",
  },
  {
    icon: BarChart3,
    title: "Click Analytics",
    description:
      "Track how many times your links are clicked. Understand your audience with real-time data.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Redirects happen in milliseconds. Your visitors won't notice a thing.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Your links are protected and always available. Built on enterprise-grade infrastructure.",
  },
  {
    icon: MousePointerClick,
    title: "Custom Short Codes",
    description:
      "Choose your own short code to make links memorable and on-brand.",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description:
      "Share links on social media, emails, SMS — anywhere your audience is.",
  },
];

const steps = [
  {
    step: "1",
    title: "Create an account",
    description: "Sign up for free in seconds using your email.",
  },
  {
    step: "2",
    title: "Paste your URL",
    description: "Drop in any long link you want to shorten.",
  },
  {
    step: "3",
    title: "Share & track",
    description: "Share your short link and watch the clicks roll in.",
  },
];

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className='flex min-h-screen flex-col bg-background'>
      {/* Hero */}
      <section className='flex flex-1 flex-col items-center justify-center px-6 py-24 text-center'>
        <Badge variant='secondary' className='mb-6 text-sm'>
          Free to get started
        </Badge>
        <h1 className='max-w-3xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl'>
          Short links. <span className='text-primary'>Big impact.</span>
        </h1>
        <p className='mt-6 max-w-xl text-lg text-muted-foreground'>
          Create short, memorable links in seconds and track every click with
          built-in analytics. Built for individuals and teams alike.
        </p>
        <div className='mt-10 flex flex-col gap-4 sm:flex-row'>
          <SignUpButton
            mode='modal'
            appearance={{ baseTheme: dark }}
            forceRedirectUrl='/dashboard'>
            <Button size='lg' className='px-8'>
              Get Started — It&apos;s Free
            </Button>
          </SignUpButton>
          <SignInButton
            mode='modal'
            appearance={{ baseTheme: dark }}
            forceRedirectUrl='/dashboard'>
            <Button size='lg' variant='outline' className='px-8'>
              Sign In
            </Button>
          </SignInButton>
        </div>
      </section>

      <Separator />

      {/* Features */}
      <section className='px-6 py-20'>
        <div className='mx-auto max-w-5xl'>
          <div className='mb-12 text-center'>
            <h2 className='text-3xl font-bold text-foreground'>
              Everything you need
            </h2>
            <p className='mt-3 text-muted-foreground'>
              Simple yet powerful tools to manage and measure your links.
            </p>
          </div>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title} className='border border-border bg-card'>
                <CardHeader className='pb-3'>
                  <div className='mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10'>
                    <Icon className='h-5 w-5 text-primary' />
                  </div>
                  <CardTitle className='text-base'>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* How it works */}
      <section className='px-6 py-20'>
        <div className='mx-auto max-w-3xl'>
          <div className='mb-12 text-center'>
            <h2 className='text-3xl font-bold text-foreground'>How it works</h2>
            <p className='mt-3 text-muted-foreground'>
              Up and running in under a minute.
            </p>
          </div>
          <div className='flex flex-col gap-8 sm:flex-row'>
            {steps.map(({ step, title, description }, idx) => (
              <div
                key={step}
                className='flex flex-1 flex-col items-center text-center'>
                <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold'>
                  {step}
                </div>
                <h3 className='mb-2 font-semibold text-foreground'>{title}</h3>
                <p className='text-sm text-muted-foreground'>{description}</p>
                {idx < steps.length - 1 && (
                  <div className='mt-6 hidden h-px w-full bg-border sm:block' />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section className='px-6 py-20 text-center'>
        <h2 className='text-3xl font-bold text-foreground'>
          Ready to shorten your first link?
        </h2>
        <p className='mt-3 text-muted-foreground'>
          Join for free. No credit card required.
        </p>
        <div className='mt-8'>
          <SignUpButton
            mode='modal'
            appearance={{ baseTheme: dark }}
            forceRedirectUrl='/dashboard'>
            <Button size='lg' className='px-10'>
              Create Free Account
            </Button>
          </SignUpButton>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-border px-6 py-6 text-center text-sm text-muted-foreground'>
        © {new Date().getFullYear()} LinkShortener. All rights reserved.
      </footer>
    </div>
  );
}
