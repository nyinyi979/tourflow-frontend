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
import { useMessages } from "@/lib/i18n/LocaleProvider";

export default function LoginPage() {
  const router = useRouter();
  const t = useMessages().login;
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
    if (!/^\S+@\S+\.\S+$/.test(email)) err.email = t.errEmail;
    if (!password) err.password = t.errPassword;
    setErrors(err);
    if (!Object.keys(err).length) loginMutation.mutate({ email, password });
  };

  return (
    <section className="grid min-h-[calc(100svh-var(--header-height))] lg:grid-cols-2">
      <div className="hidden flex-col border-r border-foreground lg:flex">
        <div className="relative flex-1 overflow-hidden bg-muted">
          <Image
            src={heroImg}
            alt=""
            fill
            sizes="50vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>
        <figure className="border-t border-foreground px-8 py-8 xl:px-12">
          <blockquote className="max-w-lg text-balance text-heading text-foreground">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="label-mono mt-4 text-muted-foreground">
            {t.cite}
          </figcaption>
        </figure>
      </div>

      <div className="flex items-center justify-center px-4 py-16 md:px-12">
        <div className="w-full max-w-md">
          <h1 className="text-display text-foreground">
            {t.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground/75">
            {t.lead}
          </p>
          <form onSubmit={submit} className="mt-10 space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && (
                <p id="password-error" role="alert" className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>
            {loginMutation.isError && (
              <p role="alert" className="text-sm text-destructive">
                {loginMutation.error instanceof Error
                  ? loginMutation.error.message
                  : t.failed}
              </p>
            )}
            <Button type="submit" size="lg" disabled={loginMutation.isPending} className="w-full">
              {loginMutation.isPending ? t.pending : t.submit}
            </Button>
          </form>
          <p className="mt-6 border-t border-foreground/25 pt-5 text-[0.9375rem] text-muted-foreground">
            {t.noAccount}{" "}
            <Link
              href={getAuthPath("/register", nextPath)}
              className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
            >
              {t.register}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
