import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">
          404
        </p>

        <h1 className="font-display text-5xl">Off the map.</h1>

        <p className="mt-3 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved on.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-full text-background bg-primary px-5 py-2.5"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
