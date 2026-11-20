import Image from "next/image";
import heroImg from "@/assets/hero.jpeg";
import { getMessages } from "@/lib/i18n/server";

export default async function AboutPage() {
  const t = (await getMessages()).about;
  const [first, ...rest] = t.paragraphs;
  return (
    <section className="mx-auto max-w-360 px-4 pb-24 pt-12 md:px-8 md:pb-32 md:pt-16">
      <p className="label-mono text-muted-foreground">{t.eyebrow}</p>
      <h1 className="mt-4 max-w-5xl text-balance text-display text-foreground">
        {t.title}
      </h1>

      <div className="relative mt-12 aspect-[16/9] overflow-hidden bg-muted md:mt-16 lg:aspect-[21/9]">
        <Image
          src={heroImg}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover"
        />
      </div>

      <div className="mt-12 grid gap-8 border-t border-foreground pt-8 md:mt-16 md:grid-cols-12 md:pt-10">
        <p className="text-title leading-[1.45] text-foreground md:col-span-7 md:text-[1.5rem]">
          {first}
        </p>
        <div className="space-y-5 md:col-span-4 md:col-start-9">
          {rest.map((p) => (
            <p key={p} className="text-base leading-relaxed text-foreground/75">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
