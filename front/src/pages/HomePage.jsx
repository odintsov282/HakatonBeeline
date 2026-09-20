import { NavLink } from 'react-router-dom'

const HomePage = () => {
    return (
        <>
        <NavLink
        to="/auth"
        >
            Войти или зарегистрироваться
        </NavLink>

        <NavLink to="/dispatcher"
        >
            Страница диспетчера
        </NavLink>

        <NavLink
        to="/engineer"
        >
            Страница инженера
        </NavLink>
        </>
    )
}

export default HomePage