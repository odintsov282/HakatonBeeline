import Main from '../../components/Main/Main'
import AuthForm from '../../components/AuthForm/AuthForm'
import './AuthPage.css'
import { authRequest } from '../../api/auth'
import { useState } from 'react'
import AuthHeader from '../../components/AuthHeader/AuthHeader'

const AuthPage = () => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleAuth = async (data) => {
        setError('')
        setIsLoading(true)
        try {
            const result = await authRequest(data)
            console.log('Успешно', result)
            localStorage.setItem('token', result.token)
        }   catch (err) {
            setError(err.response?.data?.message || 'Что-то пошло не так')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <AuthHeader />
            <Main>
                <AuthForm
                    title='Войти или зарегистрироваться'
                    buttonText={isLoading ? 'Загрузка...': 'Продолжить'}
                    onSubmit={handleAuth}
                />
                {error && <p className='error-text'>{error}</p>}
            </Main>
        </>
    )
}

export default AuthPage