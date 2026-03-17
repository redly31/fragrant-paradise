"use client"

import React, { useState, useMemo } from "react"
import { useInView } from "react-intersection-observer"
import { Product } from "@/shared/model/product"
import PerfumeItem from "./perfume-item"
import { motion, Variants, AnimatePresence } from "framer-motion"

type GenericListProps<T extends Product> = {
  items: T[]
  title: string
  renderFooter?: (item: T) => React.ReactNode
  pageSize?: number
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: (i % 8) * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
}

export default function PerfumesList<T extends Product>({
  items,
  title,
  renderFooter,
  pageSize = 8,
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              layout
              whileHover={{
                scale: 0.99,
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 1.01,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <PerfumeItem perfume={item}>{renderFooter?.(item)}</PerfumeItem>
            </motion.div>
          ))}
        </AnimatePresence>
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
