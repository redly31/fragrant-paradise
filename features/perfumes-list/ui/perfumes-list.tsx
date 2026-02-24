"use client"

import React from "react"
import { Product } from "@/shared/model/product"
import PerfumeItem from "./perfume-item"

type GenericListProps<T extends Product> = {
  items: T[]
  title: string
  renderFooter?: (item: T) => React.ReactNode
}

export default function PerfumesList<T extends Product>(
  props: GenericListProps<T>,
) {
  const { items, title, renderFooter } = props

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <PerfumeItem perfume={item} key={item.id} description={false}>
            {renderFooter?.(item)}
          </PerfumeItem>
        ))}
      </div>
    </div>
  )
}
