"use client"
import { useState } from "react"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import PerfumeItem from "@/features/perfumes-list/perfume-item"
import { Product } from "@/shared/model/product"

export interface Perfume {
  id: string
  name: string
  volume: string
  price: number
  discountPrice?: number
  subtitle?: string
  image: string
}

const mockPerfumes: Perfume[] = [
  {
    id: "1",
    name: "Chanel No. 5",
    volume: "100ml",
    price: 150,
    discountPrice: 120,
    subtitle: "Timeless floral fragrance",
    image:
      "https://damcdn.samokat.ru/dam-storage-ext-env-prod/2026/01/7d934485-cf8d-4726-a60b-0943f3cb2eef",
  },
  {
    id: "2",
    name: "Dior Sauvage",
    volume: "100ml",
    price: 130,
    subtitle: "Fresh and woody notes",
    image:
      "https://damcdn.samokat.ru/dam-storage-ext-env-prod/2026/01/7d934485-cf8d-4726-a60b-0943f3cb2eef",
  },
  {
    id: "3",
    name: "Gucci Bloom",
    volume: "50ml",
    price: 90,
    discountPrice: 75,
    image:
      "https://damcdn.samokat.ru/dam-storage-ext-env-prod/2026/01/7d934485-cf8d-4726-a60b-0943f3cb2eef",
  },
  {
    id: "4",
    name: "Tom Ford Oud Wood",
    volume: "100ml",
    price: 250,
    subtitle: "Exotic oriental scent",
    image:
      "https://damcdn.samokat.ru/dam-storage-ext-env-prod/2026/01/7d934485-cf8d-4726-a60b-0943f3cb2eef",
  },
  {
    id: "5",
    name: "Yves Saint Laurent Black Opium",
    volume: "90ml",
    price: 140,
    discountPrice: 110,
    image:
      "https://damcdn.samokat.ru/dam-storage-ext-env-prod/2026/01/7d934485-cf8d-4726-a60b-0943f3cb2eef",
  },
  {
    id: "6",
    name: "Creed Aventus",
    volume: "100ml",
    price: 300,
    subtitle: "Fruity and smoky",
    image:
      "https://damcdn.samokat.ru/dam-storage-ext-env-prod/2026/01/7d934485-cf8d-4726-a60b-0943f3cb2eef",
  },
]

type SortOption = "price-asc" | "price-desc" | "popularity" | "name-asc"

type PerfumesListProps = {
  perfumes: Product[]
}

export default function PerfumesList(props: PerfumesListProps) {
  const { perfumes } = props
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortOption, setSortOption] = useState<SortOption>("popularity")

  const sortedPerfumes = [...perfumes].sort((a, b) => {
    if (sortOption === "price-asc")
      return (
        a.priceRange.minVariantPrice.amount -
        b.priceRange.minVariantPrice.amount
      )
    if (sortOption === "price-desc")
      return (
        b.priceRange.minVariantPrice.amount -
        a.priceRange.minVariantPrice.amount
      )
    if (sortOption === "name-asc") return a.title.localeCompare(b.title)
    return 0
  })

  const displayedPerfumes = sortedPerfumes.filter((perfume) =>
    perfume.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">Каталог</h1>
      <div className="block justify-between sm:flex">
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
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortOption("price-desc")}>
                Price: High to Low
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortOption("popularity")}>
                Popularity
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortOption("name-asc")}>
                Name: A-Z
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedPerfumes.map((perfume) => (
          <PerfumeItem perfume={perfume} key={perfume.id} />
        ))}
      </div>
    </div>
  )
}
