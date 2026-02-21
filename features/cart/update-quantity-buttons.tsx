import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { CartProduct } from "@/shared/model/product"
import { Minus, Plus } from "lucide-react"

type UpdateQuantityButtonsProps = {
  item: CartProduct
  handleUpdateQuantity: (id: string, delta: number) => Promise<void>
}

export default function UpdateQuantityButtons(
  props: UpdateQuantityButtonsProps,
) {
  const { item, handleUpdateQuantity } = props
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleUpdateQuantity(item.id, -1)}
        disabled={item.quantity <= 1}
      >
        <Minus className="h-4 w-4" />
      </Button>

      <Input className="w-12 text-center" value={item.quantity} readOnly />

      <Button
        variant="outline"
        size="icon"
        onClick={() => handleUpdateQuantity(item.id, 1)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
