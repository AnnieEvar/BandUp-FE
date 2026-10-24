export default function DashboardSkeleton() {
  const box = "animate-pulse rounded-2xl bg-slate-200";
  return (
    <div className="space-y-4">
      <div className={`${box} h-16 w-72`} />
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className={`${box} h-28`} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className={`${box} h-56 lg:col-span-2`} />
        <div className={`${box} h-56`} />
      </div>
      <div className={`${box} h-48`} />
    </div>
  );
}
