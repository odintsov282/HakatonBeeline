import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import AuthForm from '../components/AuthForm/AuthForm'

const RegisterPage = () => {

        const handleRegister = (data) => {
            console.log('Регистрация:', data)
            // тут буде запрос на бэк
        }
        
    return (
        <>
            <Header />
            <Main>
                <AuthForm
                    title='Регистрация'
                    buttonText='Зарегистроваться'
                    onSubmit={handleRegister}
                />
            </Main>
        </>
    )
}

export default RegisterPage