import { Link } from 'react-router-dom'
import logo from '../../assets/beeline-seeklogo.svg'
import profileIcon from '../../assets/icon-profile.svg'
import './AppHeader.css'

const AppHeader = () => {
    return (
        <header className="menu__header">
            <div className="header__container">
                <Link to="/" className="header__link-logo">
                    <img src={logo} width={44} height={44} alt="Билайн" />
                </Link>
                <div className="header__mini-container">
                    <Link to="/" className="header__link-profile">
                        <img src={profileIcon} width={36} height={40} alt="Профиль" />
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default AppHeader