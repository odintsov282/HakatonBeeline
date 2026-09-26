import { NavLink } from 'react-router-dom'

// Технический стартовый экран для навигации между страницами на время разработки/демо
// (авторизация, диспетчер, инженер). В финальной версии сюда, скорее всего, встанет
// редирект по роли пользователя сразу после логина (см. пометку в AuthPage.jsx).
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