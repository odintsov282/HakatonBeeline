import { NavLink } from 'react-router-dom'

const HomePage = () => {
    return (
        <>
        <NavLink
        to="/auth"
        >
            Войти или зарегистрироваться
        </NavLink>
        </>
    )
}

export default HomePage