import { Navigate } from 'react-router-dom'
import { getSession } from '../../api/session'

const ProtectedRoute = ({ requiredRole, children }) => {
    const user = getSession()

    if (!user) {
        return <Navigate to="/auth" replace />
    }

    if (requiredRole && user.role !== requiredRole) {
        return user.role === 'dispatcher'
            ? <Navigate to="/dispatcher" replace />
            : <Navigate to="/engineer" replace />
    }

    return children
}

export default ProtectedRoute