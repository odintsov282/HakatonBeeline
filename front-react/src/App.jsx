import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/reg" element={<RegisterPage />}/>
                <Route path="/log" element={<LoginPage />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App