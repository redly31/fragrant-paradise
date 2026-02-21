"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/components/ui/button"

const links = [
  { href: "/", label: "Каталог" },
  { href: "/cart", label: "Корзина" },
  { href: "/favorites", label: "Избранное" },
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-1 relative">
      {links.map((link) => {
        const isActive = pathname === link.href

        return (
          <Button
            key={link.href}
            asChild
            variant="ghost"
            className={cn(
              "relative px-4 py-2 transition-colors duration-300",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-primary",
            )}
          >
            <Link href={link.href}>
              <span className="relative z-10">{link.label}</span>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-secondary rounded-md"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}
