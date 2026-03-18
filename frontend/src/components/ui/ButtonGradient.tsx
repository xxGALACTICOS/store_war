import type { ReactNode } from "react"

interface Props {
    children: ReactNode
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    className?: string
    color?: string
    disabled?: boolean
}

const ButtonGradient = ({ children, onClick, className = "", color = "", disabled = false }: Props) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center gap-1.5 justify-center
            ${disabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : color
                        ? color
                        : 'bg-gradient-to-r from-[#014e7c] to-[#011c40] hover:from-[#015f96] hover:to-[#012850]'}
            text-white text-xs font-semibold
            px-3 py-1.5 rounded-full shadow-sm
            transition-all duration-200 active:scale-95
            ${className}`}
        >
            {children}
        </button>
    )
}

export default ButtonGradient