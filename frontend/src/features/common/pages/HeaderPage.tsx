import { Badge } from '@/ui/badge'
import { type ReactNode } from 'react'
interface Props {
    children: ReactNode
    length: number
    message: string
}

const HeaderPage = ({ children, length, message }: Props) => {
    return (
        <div className="flex items-center gap-3 mb-8">
            {children}
            <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
                {message}
            </h1>
            <Badge variant="secondary" className="ml-1">
                {length} items
            </Badge>
        </div>

    )
}

export default HeaderPage
