import { Button } from "@/shared/components/ui/button"
import Link from "next/link"
import { UserRound } from "lucide-react"
import { NavLinks } from "./nav-links"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="mb-4 sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto h-16 flex justify-between items-center px-4 max-w-5xl">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <h1 className="font-bold text-xl tracking-tight">
            fragrant <span className="text-primary">paradise</span>
          </h1>
        </Link>

        <div className="flex items-center gap-2 md:gap-8">
          <NavLinks />
          <div className="flex gap-2">
            <ThemeToggle />
            <Button
              asChild
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <Link href="/profile">
                <UserRound className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
