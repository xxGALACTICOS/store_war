import React from 'react'

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center h-full gap-3 text-gray-500">
            <p className="text-lg font-semibold">No products found</p>
            <p className="text-sm">Try a different search term or category.</p>
        </div>

    )
}

export default NotFoundPage
