import logoDecor from '../../assets/logo-decor.svg'
import './Header.css'

const Header = () => {
    return (
        <header className='header'>
            <div className="container header__container">
                <svg width="73" height="73">
                    <use href={logoDecor}></use>
                </svg>
            </div>
        </header>
    )
}

export default Header