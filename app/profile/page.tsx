import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Separator } from "@/shared/components/ui/separator"
import { Package, Calendar, Settings2 } from "lucide-react"

// types/perfume.ts
export interface Perfume {
  id: string
  name: string
  volume: string
  price: number
  discountPrice?: number
  subtitle?: string
  image: string
}

export type OrderStatus = "delivered" | "processing" | "shipped" | "cancelled"

export interface OrderItem extends Perfume {
  quantity: number
}

export interface Order {
  id: string
  date: string
  status: OrderStatus
  items: OrderItem[]
  totalAmount: number
}

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  createdAt: string
}

export const MOCK_USER: UserProfile = {
  id: "u-1",
  name: "Александр Версаль",
  email: "alex.v@luxury-scents.ru",
  avatar: "https://github.com/shadcn.png",
  createdAt: "12 Октября 2023",
}

export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-7721",
    date: "14.05.2024",
    status: "delivered",
    totalAmount: 42500,
    items: [
      {
        id: "p1",
        name: "Tobacco Vanille",
        subtitle: "Tom Ford",
        volume: "50ml",
        price: 28000,
        image: "/images/perfume/tf-tv.jpg",
        quantity: 1,
      },
      {
        id: "p2",
        name: "Baccarat Rouge 540",
        subtitle: "Maison Francis Kurkdjian",
        volume: "70ml",
        price: 14500,
        image: "/images/perfume/br-540.jpg",
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-8932",
    date: "02.02.2024",
    status: "shipped",
    totalAmount: 18200,
    items: [
      {
        id: "p3",
        name: "Gypsy Water",
        subtitle: "Byredo",
        volume: "100ml",
        price: 18200,
        image: "/images/perfume/byredo-gw.jpg",
        quantity: 1,
      },
    ],
  },
]

const statusMap: Record<
  OrderStatus,
  {
    label: string
    variant: "default" | "secondary" | "outline" | "destructive"
  }
> = {
  delivered: { label: "Доставлено", variant: "secondary" },
  processing: { label: "В обработке", variant: "outline" },
  shipped: { label: "В пути", variant: "default" },
  cancelled: { label: "Отменен", variant: "destructive" },
}

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border">
              <AvatarImage src={MOCK_USER.avatar} alt={MOCK_USER.name} />
              <AvatarFallback>{MOCK_USER.name.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold tracking-tight">
                {MOCK_USER.name}
              </h1>
              <p className="text-muted-foreground">{MOCK_USER.email}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>На сайте с {MOCK_USER.createdAt}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Package className="h-5 w-5" />
          <h2 className="text-xl font-semibold">История покупок</h2>
        </div>

        <div className="grid gap-4">
          {MOCK_ORDERS.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">
                      Заказ {order.id}
                    </CardTitle>
                    <CardDescription>{order.date}</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium">Сумма</p>
                      <p className="text-sm text-muted-foreground">
                        {order.totalAmount.toLocaleString()} ₽
                      </p>
                    </div>
                    <Badge variant={statusMap[order.status].variant}>
                      {statusMap[order.status].label}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={item.id}>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-md border shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.subtitle} • {item.volume}
                          </p>
                        </div>
                        <div className="text-sm">
                          {item.quantity} шт. × {item.price.toLocaleString()} ₽
                        </div>
                      </div>
                      {idx < order.items.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
