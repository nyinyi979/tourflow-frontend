import Link from "next/link";
import { getMessages } from "@/lib/i18n/server";

export default async function NotFound() {
  const t = (await getMessages()).notFound;
  return (
    <section className="mx-auto max-w-360 px-4 pb-24 pt-12 md:px-8 md:pb-32 md:pt-16">
      <p
        aria-hidden="true"
        className="select-none text-[38vw] font-medium leading-[0.8] text-foreground md:text-[22rem]"
      >
        404
      </p>
      <div className="mt-10 grid gap-6 border-t border-foreground pt-8 md:grid-cols-12 md:gap-8">
        <h1 className="text-balance text-display text-foreground md:col-span-7">
          {t.title}
        </h1>
        <div className="md:col-span-4 md:col-start-9">
          <p className="text-base leading-relaxed text-foreground/75">{t.body}</p>
          <Link
            href="/"
            className="label-mono mt-6 inline-flex h-11 items-center bg-primary px-5 text-primary-foreground transition-colors hover:bg-foreground"
          >
            {t.back}
          </Link>
        </div>
      </div>
    </section>
  );
}
