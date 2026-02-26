"use client"

import React, { useState, useMemo } from "react"
import { useInView } from "react-intersection-observer"
import { Product } from "@/shared/model/product"
import PerfumeItem from "./perfume-item"

type GenericListProps<T extends Product> = {
  items: T[]
  title: string
  renderFooter?: (item: T) => React.ReactNode
  pageSize?: number
}

export default function PerfumesList<T extends Product>({
  items,
  title,
  renderFooter,
  pageSize = 12,
}: GenericListProps<T>) {
  const [displayCount, setDisplayCount] = useState(pageSize)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  React.useEffect(() => {
    if (inView && displayCount < items.length) {
      setDisplayCount((prev) => Math.min(prev + pageSize, items.length))
    }
  }, [inView, items.length, pageSize, displayCount])

  const visibleItems = useMemo(
    () => items.slice(0, displayCount),
    [items, displayCount],
  )

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      <div className="grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleItems.map((item) => (
          <PerfumeItem perfume={item} key={item.id}>
            {renderFooter?.(item)}
          </PerfumeItem>
        ))}
      </div>

      {displayCount < items.length && (
        <div
          ref={ref}
          className="h-20 w-full flex items-center justify-center mt-10"
        >
          <div className="animate-pulse text-gray-400">Загрузка...</div>
        </div>
      )}
    </div>
  )
}
