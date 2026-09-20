const UnallocatedCard = ({ request, onConfirm, onChange }) => {
    return (
        <article className="menu__unallocated-card">
            <h3 className="menu__unallocated-card-title">Заявка #{request.id}</h3>
            <p className="menu__unallocated-card-data">
                Дата визита:{' '}
                <span className="menu__unallocated-card-data-accent">{request.date}</span>
            </p>
            <p className="menu__unallocated-card-time">
                Окно:{' '}
                <span className="menu__unallocated-card-time-accent">{request.window}</span>
                {' '}| Адрес: {request.address}
            </p>
            <p className="menu__unallocated-card-service">Услуга: {request.service}</p>

            <div className="menu__unallocated-card-footer">
                <h4 className="menu__unallocated-card-footer-title">НАЗНАЧЕНИЕ СИСТЕМОЙ:</h4>
                <div className="menu__unallocated-card-footer-descriptions">
                    <p className="menu__unallocated-card-footer-name">{request.suggested.name}</p>
                    <p className="menu__unallocated-card-footer-info">({request.suggested.note})</p>
                </div>
                <div className="menu__unallocated-card-footer-buttons">
                    <button className="menu__button-confirmation" onClick={() => onConfirm(request.id)}>
                        Утвердить выбор
                    </button>
                    <button className="menu__button-change" onClick={() => onChange(request.id)}>
                        Изменить мастера
                    </button>
                </div>
            </div>
        </article>
    )
}

export default UnallocatedCard