import { Card, CardContent } from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { Calendar } from "lucide-react"

export default function Loading() {
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Skeleton className="h-24 w-24 rounded-full border" />
            <div className="flex-1 space-y-3 text-center sm:text-left">
              <Skeleton className="h-8 w-56 mx-auto sm:mx-0" />
              <Skeleton className="h-5 w-64 mx-auto sm:mx-0" />
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground opacity-0" />
                <Skeleton className="h-5 w-48" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  )
}
