import { Card, CardContent } from '@/ui/card'
import { Button } from '@/ui/button'
import type { CartItem } from '@/features/cart/utils/types'
import { Minus, Plus } from 'lucide-react'
import TrashButton from '@/ui/TrashButton'

interface Props {
    item: CartItem
    onUpdateQty: (id: number, delta: number) => void
    onRemove: (id: number) => void
}

const CartItemCard = ({ item, onUpdateQty, onRemove }: Props) => {
    return (
        <Card
            className="overflow-hidden border border-zinc-200 hover:border-zinc-300 transition-colors"
        >
            <CardContent>
                <div className="flex">
                    {/* Product Image */}
                    <div className="w-36 h-36 flex-shrink-0 bg-zinc-100">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col justify-between p-4">
                        <div className="flex justify-between items-start gap-4">
                            <div>
                                {/* NAME */}
                                <p className="text-xs text-zinc-400 uppercase tracking-wider font-medium mb-0.5">
                                    {item.brand}
                                </p>
                                <h3 className="text-lg font-semibold text-zinc-900 leading-snug">
                                    {item.name}
                                </h3>
                                {/* SPECS */}
                                <div className="flex gap-3 mt-1.5">
                                    <span className="text-xs text-zinc-500">
                                        Category:{' '}
                                        <span className="text-zinc-700">
                                            {item.category}
                                        </span>
                                    </span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="text-right flex-shrink-0">
                                <p className="text-lg font-bold text-zinc-900 mt-2">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>

                        {/* Actions Row */}
                        <div className="flex items-center justify-between mt-3">
                            {/* Qty Control */}
                            <div className="flex items-center gap-2 border border-zinc-200 rounded-lg px-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => onUpdateQty(item.id, -1)}
                                    disabled={item.quantity <= 1}
                                >
                                    <Minus className="w-3 h-3" />
                                </Button>
                                <span className="text-sm font-medium w-5 text-center">
                                    {item.quantity}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => onUpdateQty(item.id, 1)}
                                    disabled={item.quantity == item.stock}
                                >
                                    <Plus className="w-3 h-3" />
                                </Button>
                            </div>

                            <div className="flex items-center gap-2">
                                <TrashButton onRemove={onRemove} id={item.id} />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
export default CartItemCard