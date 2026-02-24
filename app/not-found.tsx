import { Button } from "@/shared/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <>
      <h1 className="text-2xl font-bold">Страница не найдена :(</h1>
      <Button asChild className="mt-4">
        <Link href={"/"}>На главную</Link>
      </Button>
    </>
  )
}
