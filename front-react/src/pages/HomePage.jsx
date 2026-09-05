import { NavLink } from 'react-router-dom'

const HomePage = () => {
    return (
        <>
        <NavLink
        to="/reg"
        >
            Регистрация
        </NavLink>

        <NavLink
        to="/log"
        >
            Вход
        </NavLink>
        </>
    )
}

export default HomePage