export default function DashboardSkeleton() {
  const box = "animate-pulse rounded-2xl bg-slate-200";
  return (
    <div className="space-y-8">
      <div className={`${box} h-16 w-72`} />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <div key={i} className={`${box} h-28`} />)}
      </div>
      <div className={`${box} h-56`} />
    </div>
  );
}