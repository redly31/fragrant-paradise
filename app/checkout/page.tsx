import { Button } from "@/shared/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group"
import { Separator } from "@/shared/components/ui/separator"
import { CreditCard, Truck, ShieldCheck } from "lucide-react"

export default function CheckoutPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
        Оформление заказа
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Truck className="h-5 w-5" /> Доставка
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Имя</Label>
                  <Input id="first-name" placeholder="Иван" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Фамилия</Label>
                  <Input id="last-name" placeholder="Иванов" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Адрес</Label>
                <Input id="address" placeholder="Улица, дом, квартира" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Город</Label>
                  <Input id="city" placeholder="Москва" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Почтовый индекс</Label>
                  <Input id="zip" placeholder="101000" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Оплата
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="card" className="grid gap-4">
                <div className="flex items-center space-x-3 space-y-0 border rounded-md p-4 cursor-pointer hover:bg-accent transition-colors">
                  <RadioGroupItem value="card" id="card" />
                  <Label
                    htmlFor="card"
                    className="flex flex-1 justify-between items-center cursor-pointer"
                  >
                    <span>Банковская карта</span>
                    <div className="flex gap-1">
                      <div className="w-8 h-5 bg-slate-200 rounded text-[10px] flex items-center justify-center">
                        VISA
                      </div>
                      <div className="w-8 h-5 bg-slate-200 rounded text-[10px] flex items-center justify-center">
                        MC
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 space-y-0 border rounded-md p-4 cursor-pointer hover:bg-accent transition-colors">
                  <RadioGroupItem value="crypto" id="crypto" />
                  <Label htmlFor="crypto" className="flex-1 cursor-pointer">
                    Криптовалюта (USDT)
                  </Label>
                </div>
              </RadioGroup>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Номер карты</Label>
                  <Input id="card-number" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="expiry">Срок действия</Label>
                    <Input id="expiry" placeholder="ММ/ГГ" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Ваш заказ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Chanel No. 5 x 1
                  </span>
                  <span>$120.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gucci Bloom x 1</span>
                  <span>$75.00</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Подытог</span>
                  <span>$195.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span className="text-green-600">Бесплатно</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Итого</span>
                <span>$195.00</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" size="lg">
                Оплатить сейчас
              </Button>
              <p className="text-[12px] text-center text-muted-foreground flex items-center justify-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Ваши данные защищены
                шифрованием TLS
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
