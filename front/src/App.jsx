import { BrowserRouter, Route, Routes } from "react-router-dom"
import DispatcherPage from "./pages/DispatcherPage/DispatcherPage"
import EngineerPage from "./pages/EngineerPage/EngineerPage"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/dispatcher"
                    element={
                        <ProtectedRoute requiredRole="dispatcher">
                            <DispatcherPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/engineer"
                    element={
                        <ProtectedRoute requiredRole="engineer">
                            <EngineerPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
