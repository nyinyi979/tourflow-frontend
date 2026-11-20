"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import heroImg from "@/assets/hero.jpeg";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { signupCustomer } from "../api";
import { getAuthPath, getSafeNextPath } from "@/lib/redirects";
import { useMessages } from "@/lib/i18n/LocaleProvider";

type Form = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const m = useMessages();
  const t = m.register;
  const searchParams = useSearchParams();
  const nextPath = getSafeNextPath(searchParams.get("next"), "/account");
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const signupMutation = useMutation({
    mutationFn: signupCustomer,
    onSuccess: () => {
      const loginPath = new URLSearchParams({
        registered: "1",
        next: nextPath,
      });
      router.push(`/login?${loginPath.toString()}`);
    },
  });

  const update = (k: keyof Form, v: string) => setForm({ ...form, [k]: v });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Partial<Record<keyof Form, string>> = {};
    if (!form.name.trim()) err.name = t.required;
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = m.login.errEmail;
    if (form.password.length < 8) err.password = t.minChars;
    if (form.password !== form.confirm) err.confirm = t.mismatch;
    setErrors(err);
    if (!Object.keys(err).length) {
      signupMutation.mutate({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
    }
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
            <Field
              id="name"
              label={t.fullName}
              value={form.name}
              onChange={(v) => update("name", v)}
              error={errors.name}
              autoComplete="name"
            />
            <Field
              id="email"
              type="email"
              label={m.login.email}
              value={form.email}
              onChange={(v) => update("email", v)}
              error={errors.email}
              autoComplete="email"
            />
            <Field
              id="password"
              type="password"
              label={m.login.password}
              value={form.password}
              onChange={(v) => update("password", v)}
              error={errors.password}
              autoComplete="new-password"
            />
            <Field
              id="confirm"
              type="password"
              label={t.confirm}
              value={form.confirm}
              onChange={(v) => update("confirm", v)}
              error={errors.confirm}
              autoComplete="new-password"
            />
            {signupMutation.isError && (
              <p role="alert" className="text-sm text-destructive">
                {signupMutation.error instanceof Error
                  ? signupMutation.error.message
                  : t.failed}
              </p>
            )}
            <Button type="submit" size="lg" disabled={signupMutation.isPending} className="w-full">
              {signupMutation.isPending ? t.pending : t.submit}
            </Button>
          </form>
          <p className="mt-6 border-t border-foreground/25 pt-5 text-[0.9375rem] text-muted-foreground">
            {t.haveAccount}{" "}
            <Link
              href={getAuthPath("/login", nextPath)}
              className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
            >
              {t.logIn}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  error,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && <p id={`${id}-error`} role="alert" className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
