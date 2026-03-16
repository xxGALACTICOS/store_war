import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface Review {
    name: string
    rating: number
    comment: string
}

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`}
            />
        ))}
    </div>
)

const ratingLabel: Record<number, string> = {
    5: 'Excellent',
    4: 'Good',
    3: 'Average',
    2: 'Poor',
    1: 'Terrible',
}

const Feedback = () => {
    const [reviews, setReviews] = useState<Review[]>([
        { name: "Ahmed Ali", rating: 5, comment: "Amazing quality. Delivery was fast." },
        { name: "Sarah Mohamed", rating: 4, comment: "Product is good but packaging could be better." },
        { name: "Omar Hassan", rating: 5, comment: "Best store experience I've had." },
    ])

    const [name, setName] = useState("")
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState("5")

    const addReview = () => {
        if (!name.trim() || !comment.trim()) return
        setReviews([{ name, rating: Number(rating), comment }, ...reviews])
        setName("")
        setComment("")
        setRating("5")
    }

    return (
        <div className="flex flex-col gap-5">

            <div className="grid md:grid-cols-3 gap-4">
                {reviews.map((review, i) => (
                    <Card key={i}>
                        <CardContent className="p-5 space-y-3">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback className="text-sm">
                                        {review.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium text-sm truncate">{review.name}</p>
                                    <StarRating rating={review.rating} />
                                </div>
                                <Badge variant="secondary" className="ml-auto shrink-0 text-xs">
                                    {ratingLabel[review.rating]}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {review.comment}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card>
                <CardContent className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <Label>Name</Label>
                        <Input
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label>Comment</Label>
                        <Textarea
                            className='resize-none'
                            placeholder="Share your experience..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label>Rating</Label>
                        <Select value={rating} onValueChange={setRating}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select rating" />
                            </SelectTrigger>
                            <SelectContent>
                                {[5, 4, 3, 2, 1].map(r => (
                                    <SelectItem key={r} value={String(r)}>
                                        <div className="flex items-center gap-2">
                                            <StarRating rating={r} />
                                            <span className="text-sm">{ratingLabel[r]}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button onClick={addReview} className="w-full">
                        Submit Review
                    </Button>
                </CardContent>
            </Card>

        </div>
    )
}

export default Feedback