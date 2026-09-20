const QueuedRequestCard = ({ request }) => {
    return (
        <article className="menu__close-card">
            <div className="menu__close-card-info">
                <h3 className="menu__close-card-title">Заявка #{request.id}</h3>
                <p className="menu__close-card-description">
                    {request.when} | {request.address}
                </p>
            </div>
            <p className="menu__close-card-status">{request.status}</p>
        </article>
    )
}

export default QueuedRequestCard