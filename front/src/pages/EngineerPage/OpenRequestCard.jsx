const OpenRequestCard = ({ request }) => {
    return (
        <article className="menu__open-card">
            <h3 className="menu__open-card-title">Заявка #{request.id}</h3>
            <p className="menu__open-card-data">
                Дата визита:{' '}
                <span className="menu__open-card-data-accent">{request.date}</span>
            </p>
            <p className="menu__open-card-time">
                Окно:{' '}
                <span className="menu__open-card-time-accent">{request.window}</span>
                {' '}| Адрес: {request.address}
            </p>
            <p className="menu__open-card-service">Услуга: {request.service}</p>

            <h4 className="menu__open-card-equipments-title">НЕОБХОДИМОЕ ОБОРУДОВАНИЕ:</h4>
            <div className="menu__open-card-equipments">
                {request.equipment.map((item) => (
                    <div key={item.id} className="menu__open-card-equipment">
                        <p className="menu__open-card-equipment-title">{item.title}</p>
                        <p className="menu__open-card-equipment-quantity">{item.qty} шт</p>
                    </div>
                ))}
            </div>
        </article>
    )
}

export default OpenRequestCard