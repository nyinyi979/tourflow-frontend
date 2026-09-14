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

type Form = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

export default function RegisterPage() {
  const router = useRouter();
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
    if (!form.name.trim()) err.name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email";
    if (form.password.length < 8) err.password = "At least 8 characters";
    if (form.password !== form.confirm) err.confirm = "Passwords don't match";
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
            &ldquo;Travel is the only thing you buy that makes you richer.&rdquo;
          </blockquote>
          <cite className="mt-4 text-sm not-italic text-white/70">
            — Anonymous
          </cite>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-16 md:px-12">
        <div className="w-full max-w-sm">
          <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-5xl">
            Create your account.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Save your details, complete bookings, and keep every trip in one place.
          </p>
          <form onSubmit={submit} className="mt-10 space-y-5" noValidate>
            <Field
              id="name"
              label="Full name"
              value={form.name}
              onChange={(v) => update("name", v)}
              error={errors.name}
              autoComplete="name"
            />
            <Field
              id="email"
              type="email"
              label="Email"
              value={form.email}
              onChange={(v) => update("email", v)}
              error={errors.email}
              autoComplete="email"
            />
            <Field
              id="password"
              type="password"
              label="Password"
              value={form.password}
              onChange={(v) => update("password", v)}
              error={errors.password}
              autoComplete="new-password"
            />
            <Field
              id="confirm"
              type="password"
              label="Confirm password"
              value={form.confirm}
              onChange={(v) => update("confirm", v)}
              error={errors.confirm}
              autoComplete="new-password"
            />
            {signupMutation.isError && (
              <p role="alert" className="text-sm text-destructive">
                {signupMutation.error instanceof Error
                  ? signupMutation.error.message
                  : "Unable to create account"}
              </p>
            )}
            <Button type="submit" size="lg" disabled={signupMutation.isPending} className="w-full rounded-full">
              {signupMutation.isPending ? "Creating account…" : "Create account"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href={getAuthPath("/login", nextPath)}
              className="text-primary hover:underline"
            >
              Log in
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
