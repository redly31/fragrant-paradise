"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"

import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"

const links = [
  { href: "/", label: "Каталог" },
  { href: "/cart", label: "Корзина" },
  { href: "/favorites", label: "Избранное" },
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <div className="flex items-center">
      <nav className="hidden md:flex items-center gap-1 relative">
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

      <div className="md:hidden">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Открыть меню</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-50 flex gap-1 flex-col">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <DropdownMenuItem
                  key={link.href}
                  asChild
                  className="cursor-pointer"
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "w-full px-2 py-1.5 rounded-sm transition-colors",
                      isActive
                        ? "bg-secondary text-primary font-medium"
                        : "text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
