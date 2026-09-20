import { useState } from "react"
import './AuthForm.css'
import * as yup from 'yup'

const authSchema = yup.object().shape({
    login: yup
    .string()
    .required('Поля не могут быть пустыми')
    .email('Введите корректный email'),

    password: yup
    .string()
    .required('Поля не могут быть пустыми')
    .min(8, 'Не меньше 8 символов')
    .max(30, 'Не больше 30 символов')
    .matches(/^[A-Za-z0-9!@#$%^&*_+-=,.<>?]*$/, 'Пароль должен содержать только латинские буквы, цифры или символы !@#$%^&*_+-=,.<>?'),
})

const AuthForm = ({ title, buttonText, onSubmit }) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [validationError, setValidationError] = useState('')

    const isValid = authSchema.isValidSync({ login, password })

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await authSchema.validate({ login, password })
            setValidationError('')
            onSubmit({ login, password })
        } catch (error) {
            setValidationError(error.message)
        }
    }

    return (
        <>
            <h1 className="main__title">{title}</h1>
            <div className="form__container">
                <form className="form" onSubmit={handleSubmit} noValidate>
                <fieldset className="form__fieldset">
                    <input
                    type="email"
                    placeholder="Email"
                    className="form__input"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    />
                    <input
                    type="password"
                    placeholder="Пароль"
                    className="form__input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </fieldset>
                {validationError && <p className="error-text">{validationError}</p>}
                <button 
                    className={`form__button button ${isValid ? 'form__button--active' : ''}`}
                    type="submit"
                >
                    {buttonText}
                </button>
                </form>
            </div>

        </>
    )
}

export default AuthForm