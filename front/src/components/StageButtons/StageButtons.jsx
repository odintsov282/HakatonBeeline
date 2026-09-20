import './StageButtons.css'

const StageButtons = () => {
    return (
        <div className="menu__footer">
            <h2 className="menu__footer-title">ЭТАПЫ ВЫПОЛНЕНИЯ РАБОТЫ:</h2>
            <div className="menu__footer-buttons-stages">
                <button className="menu__footer-button menu__footer-button-take">
                    <p className="button__title">1. Взять заявку</p>
                    <p className="button__description">Выполнено (09:40)</p>
                </button>
                <button className="menu__footer-button menu__footer-button-start">
                    <p className="button__title">2. Начать работу</p>
                    <p className="button__description">Нажмите на адресе</p>
                </button>
                <button className="menu__footer-button menu__footer-button-stop">
                    <p className="button__title">3. Завершить</p>
                    <p className="button__description">Завершить (10:40)</p>
                </button>
            </div>
            <button className="menu__footer-button-revoke">Клиент отменил заявку</button>
        </div>
    )
}

export default StageButtons