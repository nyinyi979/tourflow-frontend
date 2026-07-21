"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import heroImg from "@/assets/hero.jpeg";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { loginCustomer } from "../api";
import { customerKeys } from "../queries";
import { setCustomerToken } from "@/lib/customerAuth";
import { getAuthPath, getSafeNextPath } from "@/lib/redirects";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = getSafeNextPath(searchParams.get("next"), "/account");
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: loginCustomer,
    onSuccess: (response) => {
      setCustomerToken(response.token);
      queryClient.setQueryData(customerKeys.me(), {
        statusCode: response.statusCode,
        message: response.message,
        data: response.customer,
      });
      router.replace(nextPath);
      router.refresh();
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) err.email = "Enter a valid email";
    if (!password) err.password = "Password is required";
    setErrors(err);
    if (!Object.keys(err).length) loginMutation.mutate({ email, password });
  };

  return (
    <section className="grid min-h-[calc(100vh-72px)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative flex h-full flex-col justify-end p-14">
          <p className="text-xs uppercase tracking-[0.3em] text-white/80">
            TourFlow
          </p>
          <blockquote className="mt-4 max-w-md font-display text-3xl leading-tight text-white md:text-4xl">
            &ldquo;The world is a book, and those who do not travel read only a page.&rdquo;
          </blockquote>
          <cite className="mt-4 text-sm not-italic text-white/70">
            — Saint Augustine
          </cite>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-16 md:px-12">
        <div className="w-full max-w-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">
            Welcome back
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-5xl">
            Sign in.
          </h1>
          <form onSubmit={submit} className="mt-10 space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password}</p>
              )}
            </div>
            {loginMutation.isError && (
              <p className="text-sm text-destructive">
                {loginMutation.error instanceof Error
                  ? loginMutation.error.message
                  : "Login failed"}
              </p>
            )}
            <Button type="submit" size="lg" disabled={loginMutation.isPending} className="w-full rounded-full">
              {loginMutation.isPending ? "Logging in…" : "Log in"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href={getAuthPath("/register", nextPath)}
              className="text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
