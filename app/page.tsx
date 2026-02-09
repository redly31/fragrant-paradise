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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Heart, ShoppingCart, Filter, ArrowUpDown } from "lucide-react"

interface Perfume {
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

type FilterOption =
  | "Chanel"
  | "Dior"
  | "Gucci"
  | "Tom Ford"
  | "Yves Saint Laurent"
  | "Creed"
  | "All"

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortOption, setSortOption] = useState<SortOption>("popularity")
  const [filterOption, setFilterOption] = useState<FilterOption>("All")
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

  const sortedPerfumes = [...mockPerfumes].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price
    if (sortOption === "price-desc") return b.price - a.price
    if (sortOption === "name-asc") return a.name.localeCompare(b.name)
    return 0
  })

  const filteredPerfumes = sortedPerfumes.filter(
    (perfume) =>
      filterOption === "All" ||
      perfume.name.toLowerCase().includes(filterOption.toLowerCase()),
  )

  const displayedPerfumes = filteredPerfumes.filter((perfume) =>
    perfume.name.toLowerCase().includes(searchQuery.toLowerCase()),
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
              <Button variant="outline" size="icon">
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

          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter by Brand</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={filterOption === "All" ? "default" : "outline"}
                  onClick={() => {
                    setFilterOption("All")
                    setIsFilterOpen(false)
                  }}
                >
                  All
                </Button>
                <Button
                  variant={filterOption === "Chanel" ? "default" : "outline"}
                  onClick={() => {
                    setFilterOption("Chanel")
                    setIsFilterOpen(false)
                  }}
                >
                  Chanel
                </Button>
                <Button
                  variant={filterOption === "Dior" ? "default" : "outline"}
                  onClick={() => {
                    setFilterOption("Dior")
                    setIsFilterOpen(false)
                  }}
                >
                  Dior
                </Button>
                <Button
                  variant={filterOption === "Gucci" ? "default" : "outline"}
                  onClick={() => {
                    setFilterOption("Gucci")
                    setIsFilterOpen(false)
                  }}
                >
                  Gucci
                </Button>
                <Button
                  variant={filterOption === "Tom Ford" ? "default" : "outline"}
                  onClick={() => {
                    setFilterOption("Tom Ford")
                    setIsFilterOpen(false)
                  }}
                >
                  Tom Ford
                </Button>
                <Button
                  variant={
                    filterOption === "Yves Saint Laurent"
                      ? "default"
                      : "outline"
                  }
                  onClick={() => {
                    setFilterOption("Yves Saint Laurent")
                    setIsFilterOpen(false)
                  }}
                >
                  YSL
                </Button>
                <Button
                  variant={filterOption === "Creed" ? "default" : "outline"}
                  onClick={() => {
                    setFilterOption("Creed")
                    setIsFilterOpen(false)
                  }}
                >
                  Creed
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedPerfumes.map((perfume) => (
          <div
            key={perfume.id}
            className="border rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={perfume.image}
              alt={perfume.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="font-semibold text-lg">{perfume.name}</h3>
            <p className="text-sm text-muted-foreground">{perfume.volume}</p>
            {perfume.subtitle && (
              <p className="text-xs text-muted-foreground mb-2">
                {perfume.subtitle}
              </p>
            )}
            <div className="flex items-center space-x-2 mb-2">
              {perfume.discountPrice ? (
                <>
                  <span className="text-lg font-bold">
                    ${perfume.discountPrice}
                  </span>
                  <span className="text-sm line-through text-muted-foreground">
                    ${perfume.price}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold">${perfume.price}</span>
              )}
            </div>
            <div className="flex space-x-2 mt-auto">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
