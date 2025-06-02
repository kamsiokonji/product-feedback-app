"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/lib/actions/auth";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const initialState = {
    errors: {},
  };
  const [state, formAction, pending] = useActionState(register, initialState);

  console.log(state);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);
    }
  }, [state?.success]);

  useEffect(() => {
    if (state?.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state?.redirectTo]);

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        action={formAction}
        className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="p-8 pb-6">
          <div>
            {/* <Link href="/" aria-label="go home">
              <LogoIcon />
            </Link> */}
            <h1 className="text-title mb-1 mt-4 text-xl font-semibold">
              Create a Tailark Account
            </h1>
            <p className="text-sm">Welcome! Create an account to get started</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button type="button" variant="outline">
              <Icons.google className="h-4 w-4" />
              <span>Google</span>
            </Button>
          </div>

          <hr className="my-4 border-dashed" />

          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="block text-sm">
                Full name
              </Label>
              <Input type="text" name="name" id="name" />
              {state?.errors?.name && (
                <p className="text-sm text-red-500">{state.errors.name[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input type="email" name="email" id="email" />
              {state?.errors?.email && (
                <p className="text-sm text-red-500">{state.errors.email[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pwd" className="text-title text-sm">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                className="input sz-md variant-mixed"
              />
              {state?.errors?.password && (
                <p className="text-sm text-red-500">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            <Button className="w-full" disabled={pending}>
              {pending ? "loading" : "Continue"}
            </Button>
          </div>
        </div>

        <div className="bg-muted rounded-(--radius) border p-3">
          <p className="text-accent-foreground text-center text-sm">
            Have an account ?
            <Button asChild variant="link" className="px-2">
              <Link href="#">Sign In</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
