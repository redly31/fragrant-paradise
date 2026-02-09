import { Button } from "@/shared/components/ui/button"
import Link from "next/link"
import { UserRound } from "lucide-react"

export default function Header() {
  return (
    <header className="h-16 flex justify-between items-center">
      <h1 className="font-bold">frangrant paradise</h1>
      <nav className="flex items-center">
        <Button asChild variant={"link"}>
          <Link href="/">Каталог</Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link href="/cart">Корзина</Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link href="/favorites">Избранное</Link>
        </Button>
        <Button asChild variant={"outline"}>
          <Link href="/profile">
            <UserRound />
          </Link>
        </Button>
      </nav>
    </header>
  )
}
