import { ActivityCard } from "@/components/ActivityCard";
import { activities } from "@/lib/mocks";

export default function ActivitiesPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">
        Single-day experiences
      </p>
      <h1 className="max-w-3xl text-balance font-display text-5xl leading-tight text-foreground md:text-7xl">
        One afternoon. Something worth remembering.
      </h1>
      <div className="mt-16 max-w-4xl space-y-10">
        {activities.map((a) => (
          <ActivityCard key={a.id} activity={a} />
        ))}
      </div>
    </section>
  );
}
