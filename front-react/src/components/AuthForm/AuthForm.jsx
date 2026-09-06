import { useState } from "react"
import './AuthForm.css'

const AuthForm = ({ title, buttonText, onSubmit }) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ login, password })
    }

    return (
        <>
            <h1 className="main__title">{title}</h1>
            <div className="form__container">
                <form className="form" onSubmit={handleSubmit}>
                <fieldset className="form__fieldset">
                    <input
                    type="text"
                    placeholder="Логин"
                    required
                    className="form__input"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    />
                    <input
                    type="password"
                    placeholder="Пароль"
                    required
                    className="form__input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </fieldset>
                <button className="form__button button" type="submit">
                    {buttonText}
                </button>
                </form>
            </div>

        </>
    )
}

export default AuthForm