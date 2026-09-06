import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import AuthForm from '../components/AuthForm/AuthForm'

const LoginPage = () => {
    const handleLogin = (data) => {
        console.log('Вход:', data)
        // тут буде запрос на бэк
    }


    return (
        <>
            <Header />
            <Main>
                <AuthForm
                    title="Авторизация"
                    buttonText="Войти"
                    onSubmit={handleLogin}
                />
            </Main>
        </>
    )
}

export default LoginPage