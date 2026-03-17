import { Card, CardHeader, CardContent } from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"

export default function ProductLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Skeleton className="h-137.5 w-full rounded-lg" />
        <Card className="border-0 shadow-none">
          <CardHeader className="p-4 space-y-2">
            <Skeleton className="h-10 w-4/5 max-w-105" />
            <Skeleton className="h-5 w-48" />
          </CardHeader>

          <CardContent className="p-4 pt-6 space-y-6">
            <Skeleton className="h-9 w-44" />
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-5 w-4/6" />
              <Skeleton className="h-5 w-3/4" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
