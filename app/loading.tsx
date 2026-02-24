import { Skeleton } from "@/shared/components/ui/skeleton"

export default function Loading() {
  return (
    <div>
      <Skeleton className="w-full h-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-120" />
        ))}
      </div>
    </div>
  )
}
