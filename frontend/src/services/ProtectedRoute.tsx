import { Navigate } from 'react-router'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = true

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute