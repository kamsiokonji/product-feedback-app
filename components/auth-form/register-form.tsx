"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/lib/actions/auth";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { signIn } from "@/lib/auth-client";

export function RegisterForm() {
  const router = useRouter();
  const initialState = {
    errors: {},
  };
  const [state, formAction, pending] = useActionState(register, initialState);
  const [showPassword, setShowPassword] = useState(false);

  const handleOAuthLogin = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("OAuth login failed:", error);
    }
  };

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ backgroundColor: "#AD1FEA" }}
          >
            <Icons.message className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-card-foreground">
            Product Feedback
          </h1>
          <p className="mt-1">Share ideas, vote on features</p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center">
              Create your account
            </CardTitle>
            <CardDescription className="text-center">
              Join the community and start sharing feedback{" "}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* OAuth Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full hover:border-muted transition-colors"
                size="lg"
                onClick={() => handleOAuthLogin()}
              >
                <Icons.google />
                Continue with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2">Or continue with email</span>
              </div>
            </div>

            {/* Email Form */}
            <form action={formAction} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <div>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    name="name"
                    className={`${
                      state?.errors?.name ? "border-destructive" : ""
                    }`}
                  />
                </div>
                {state?.errors?.name && (
                  <p className="text-destructive text-sm">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    className={`${
                      state?.errors?.email ? "border-destructive" : ""
                    }`}
                  />
                </div>
                {state?.errors?.email && (
                  <p className="text-destructive text-sm">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    name="password"
                    className={`${
                      state?.errors?.password ? "border-destructive" : ""
                    }`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <button
                      type="button"
                      className="pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Icons.eyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Icons.eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                {state?.errors?.password && (
                  <p className="text-destructive text-sm">
                    {state.errors.password[0]}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={pending}
                className="w-full"
                size="lg"
              >
                {pending ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            {/* Toggle Sign Up/Sign In */}
            <div className="text-center">
              <span className="text-sm">Already have an account?</span>
              <Button variant="link" asChild>
                <Link href="/login" className="underline">
                  Sign in
                </Link>
              </Button>
            </div>

            {/* <p className="text-xs text-gray-500 text-center leading-relaxed">
              By creating an account, you agree to our{" "}
              <a href="#" className="underline" style={{ color: "#4661E6" }}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline" style={{ color: "#4661E6" }}>
                Privacy Policy
              </a>
            </p> */}
          </CardContent>
        </Card>

        {/* Footer */}
        {/* <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Secure authentication powered by industry standards
          </p>
        </div> */}
        {/* <ForgotPasswordModal
          isOpen={showForgotPassword}
          onClose={() => setShowForgotPassword(false)}
        /> */}
      </div>
    </div>
  );
}
