import { Trash2 } from 'lucide-react'
import { Button } from './button'
interface Props {
    id: number
    onRemove: (id: number) => void
}

const TrashButton = ({ id, onRemove }: Props) => {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-400 hover:text-red-500 hover:bg-red-50 "
            onClick={() => onRemove(id)}
        >
            <Trash2 className="size-6" />
        </Button>
    )
}

export default TrashButton
