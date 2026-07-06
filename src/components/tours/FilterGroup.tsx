export default function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-foreground">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
