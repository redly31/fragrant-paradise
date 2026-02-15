import { Product } from "@/shared/model/product"

const FAVORITES_KEY = "user-favorites"
const EMPTY_ARRAY: Product[] = []

let cachedFavorites: Product[] = EMPTY_ARRAY

const getSnapshot = () => {
  if (typeof window === "undefined") return EMPTY_ARRAY

  const raw = localStorage.getItem(FAVORITES_KEY)
  if (!raw) {
    cachedFavorites = EMPTY_ARRAY
    return EMPTY_ARRAY
  }

  try {
    const parsed = JSON.parse(raw) as Product[]
    if (JSON.stringify(parsed) !== JSON.stringify(cachedFavorites)) {
      cachedFavorites = parsed
    }

    return cachedFavorites
  } catch (e) {
    console.error("Error parsing favorites from localStorage", e)
    return EMPTY_ARRAY
  }
}

const listeners = new Set<() => void>()

export const favoritesStore = {
  subscribe(callback: () => void) {
    listeners.add(callback)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === FAVORITES_KEY) callback()
    }
    window.addEventListener("storage", handleStorageChange)
    return () => {
      listeners.delete(callback)
      window.removeEventListener("storage", handleStorageChange)
    }
  },

  getSnapshot,
  getServerSnapshot() {
    return EMPTY_ARRAY
  },

  setState(nextState: Product[]) {
    cachedFavorites = nextState
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextState))
    listeners.forEach((callback) => callback())
  },
}
