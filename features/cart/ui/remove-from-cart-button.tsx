import { Button } from "@/shared/components/ui/button"
import { Trash } from "lucide-react"
import { CartProduct } from "@/shared/model/product"

type RemoveFromCartButtonProps = {
  item: CartProduct
  handleRemove: (id: string) => Promise<void>
}

export function RemoveFromCartButton(props: RemoveFromCartButtonProps) {
  const { handleRemove, item } = props
  return (
    <Button
      variant="outline"
      size="icon"
      className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50"
      onClick={() => handleRemove(item.id)}
    >
      <Trash className="h-4 w-4" />
    </Button>
  )
}
