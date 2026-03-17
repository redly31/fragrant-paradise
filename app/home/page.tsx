"use client"

import { motion } from "framer-motion"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import Link from "next/link"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Home() {
  return (
    <div className="grow bg-background text-foreground min-h-screen flex flex-col font-sans">
      <section className="relative pt-32 pb-20 px-4 md:pt-48 md:pb-32 flex flex-col items-center text-center overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="z-10 max-w-3xl"
        >
          <Badge variant="secondary" className="mb-6">
            fragrant paradise
          </Badge>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">
            Найди свой <span className="italic text-primary">идеальный</span>{" "}
            парфюм
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Откройте для себя коллекцию селективной парфюмерии. Уникальные ноты,
            которые подчеркнут вашу индивидуальность и оставят незабываемый
            шлейф.
          </p>
          <Button size="lg" className="px-8 text-lg" asChild>
            <Link href={"/"}>Смотреть каталог</Link>
          </Button>
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-0 pointer-events-none" />
      </section>
    </div>
  )
}
