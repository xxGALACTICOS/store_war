import { Button } from "@/ui/button"
import { Card, CardContent } from "@/ui/card"
import { Separator } from "@/ui/separator"
import { ArrowRight } from "lucide-react"

interface Props {
    subtotal: number,
    savings: number,
    shipping: number,
    total: number
}
const OrderSummary = ({ subtotal, savings, shipping, total }: Props) => {
    return (
        <Card className="border border-zinc-200 sticky top-24">
            <CardContent className="p-5">
                <h2 className="font-semibold text-zinc-900 mb-4">
                    Order Summary
                </h2>

                <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between text-zinc-600">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    {savings > 0 && (
                        <div className="flex justify-between text-emerald-600">
                            <span>Savings</span>
                            <span>-${savings.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="flex justify-between text-zinc-600">
                        <span>Shipping</span>
                        <span>
                            {shipping === 0 ? (
                                <span className="text-emerald-600">Free</span>
                            ) : (
                                `$${shipping.toFixed(2)}`
                            )}
                        </span>
                    </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-semibold text-zinc-900 mb-5">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                <Button className="w-full gap-2" size="lg">
                    Checkout
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </CardContent>
        </Card>
    )
}
export default OrderSummary