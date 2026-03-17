import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-0">
      <div className="container mx-auto flex h-16 flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
        <p className="text-sm font-medium leading-none text-muted-foreground uppercase tracking-wider">
          © 2026 Fragrant Paradise
        </p>
        <Link
          href="https://t.me/redly88"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary underline-offset-4 hover:underline"
        >
          @redly88
        </Link>
      </div>
    </footer>
  )
}
