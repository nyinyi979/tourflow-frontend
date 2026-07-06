"use client";
import Link from "next/link";

export default function Error() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1>This page didn&apos;t load</h1>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
