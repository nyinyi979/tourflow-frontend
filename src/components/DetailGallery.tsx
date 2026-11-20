"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Large photograph with a strip of thumbnails beneath; square, unframed. */
export function DetailGallery({
  images,
  title,
  max = 5,
}: {
  images: { id: string; url: string }[];
  title: string;
  max?: number;
}) {
  const [active, setActive] = useState(0);
  const shown = images.slice(0, max);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden bg-muted sm:aspect-[16/9] lg:aspect-[2/1]">
        <Image
          src={shown[active]?.url || "https://placehold.co/1200x600"}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {shown.length > 1 && (
          <span className="tag absolute bottom-2.5 right-2.5">
            {String(active + 1).padStart(2, "0")} / {String(shown.length).padStart(2, "0")}
          </span>
        )}
      </div>
      {shown.length > 1 && (
        <div
          className="mt-2.5 grid gap-2.5"
          style={{ gridTemplateColumns: `repeat(${Math.max(shown.length, 4)}, minmax(0, 1fr))` }}
        >
          {shown.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${title} ${i + 1}`}
              aria-pressed={active === i}
              className={cn(
                "relative aspect-[4/3] cursor-pointer overflow-hidden bg-muted outline-offset-2 transition-opacity",
                active === i
                  ? "outline outline-1 outline-foreground"
                  : "opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={img.url}
                alt=""
                fill
                sizes="(min-width: 768px) 20vw, 25vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Mono label above a ruled section of detail content. */
export function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="label-mono border-b border-foreground pb-3 text-foreground">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
