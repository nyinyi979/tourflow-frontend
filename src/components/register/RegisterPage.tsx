"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import heroImg from "@/assets/hero.jpeg";
import Link from "next/link";
import Image from "next/image";

type Form = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

export default function RegisterPage() {
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});

  const update = (k: keyof Form, v: string) => setForm({ ...form, [k]: v });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Partial<Record<keyof Form, string>> = {};
    if (!form.name.trim()) err.name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email";
    if (form.password.length < 6) err.password = "At least 6 characters";
    if (form.password !== form.confirm) err.confirm = "Passwords don't match";
    setErrors(err);
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
            Wayfare
          </p>
          <blockquote className="mt-4 max-w-md font-display text-3xl leading-tight text-white md:text-4xl">
            "Travel is the only thing you buy that makes you richer."
          </blockquote>
          <cite className="mt-4 text-sm not-italic text-white/70">
            — Anonymous
          </cite>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-16 md:px-12">
        <div className="w-full max-w-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">
            Get started
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-5xl">
            Create your account.
          </h1>
          <form onSubmit={submit} className="mt-10 space-y-5" noValidate>
            <Field
              id="name"
              label="Full name"
              value={form.name}
              onChange={(v) => update("name", v)}
              error={errors.name}
            />
            <Field
              id="email"
              type="email"
              label="Email"
              value={form.email}
              onChange={(v) => update("email", v)}
              error={errors.email}
            />
            <Field
              id="password"
              type="password"
              label="Password"
              value={form.password}
              onChange={(v) => update("password", v)}
              error={errors.password}
            />
            <Field
              id="confirm"
              type="password"
              label="Confirm password"
              value={form.confirm}
              onChange={(v) => update("confirm", v)}
              error={errors.confirm}
            />
            <Button type="submit" size="lg" className="w-full rounded-full">
              Create account
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
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
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
