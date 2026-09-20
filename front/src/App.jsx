import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage/AuthPage"
import DispatcherPage from "./pages/DispatcherPage/DispatcherPage"
import EngineerPage from "./pages/EngineerPage/EngineerPage"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/" element={<HomePage />}/>
                <Route path="/auth" element={<AuthPage />}/>
                <Route path="/dispatcher" element={<DispatcherPage />} />
                <Route path="/engineer" element={<EngineerPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App