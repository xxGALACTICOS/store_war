import { Card, CardContent } from '@/ui/card'
import { type ReactNode } from 'react'

interface Props {
    children: ReactNode
    message: string
}

const EmptyCard = ({ message, children }: Props) => {
    return (
        <Card className="text-center py-20">
            <CardContent>
                {children}
                <p className="text-zinc-500 text-lg">{message}</p>
            </CardContent>
        </Card>)
}

export default EmptyCard
