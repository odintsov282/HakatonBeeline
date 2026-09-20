import cn from 'classnames'

const MasterCard = ({ name, transport, shift, ordersCount, isActive, onClick }) => {
    return (
        <article className={isActive ? 'menu__masters-card' : 'menu__masters-card--disabled'}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
        >
            <h3 className={cn('menu__masters-card-title', {
                'menu__masters-card-title--disabled': !isActive,
            })}>
                {name} ({transport})
            </h3>
            <p className={cn('menu__masters-card-description', {
                'menu__masters-card-description--disabled': !isActive,
            })}>
                Смена: {shift} | Заявок: {ordersCount}
            </p>
        </article>
    )
}

export default MasterCard