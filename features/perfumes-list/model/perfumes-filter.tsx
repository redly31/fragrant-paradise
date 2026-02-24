"use client"

import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"

export type SortOption = "price-asc" | "price-desc" | "popularity" | "name-asc"

type PerfumesFiltersProps = {
  searchQuery: string
  setSearchQuery: (value: string) => void
  setSortOption: (option: SortOption) => void
}

export function PerfumesFilters({
  searchQuery,
  setSearchQuery,
  setSortOption,
}: PerfumesFiltersProps) {
  return (
    <div className="flex justify-between gap-1">
      <Input
        placeholder="Поиск..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 max-w-75"
      />
      <div className="space-x-2 mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" suppressHydrationWarning>
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setSortOption("price-asc")}>
              Цена: От меньше к большей
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSortOption("price-desc")}>
              Цена: От большей к меньшей
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSortOption("popularity")}>
              Популярность
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSortOption("name-asc")}>
              По алфавиту
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
