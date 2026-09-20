import { createPortal } from 'react-dom'
import cn from 'classnames'
import './EngineerModal.scss'

const EngineerModal = ({ isOpen, onClose, engineer }) => {
    if (!isOpen || !engineer) return null

    return createPortal(
        <div className="engineer-modal">
            <div className="main-container" onClick={onClose}>
                <div className="modal-card" onClick={(e) => e.stopPropagation()}>

                    <div className="card-header">
                        <div className="user-info">
                            <div className="avatar">👨‍🔧</div>
                            <div className="user-details">
                                <h1>{engineer.name}</h1>
                                <p>{engineer.role} • {engineer.transport}</p>
                            </div>
                        </div>
                        <button type="button" className="close-btn" onClick={onClose}>×</button>
                    </div>

                    <div className="card-body">
                        <div className="left-col">
                            <div className="status-block">
                                <div className="status-block-header">
                                    <span className="label-uppercase">СТАТУС СМЕНЫ</span>
                                    <div className="status-badge">
                                        <span className="dot"></span>
                                        {engineer.status} ({engineer.shift})
                                    </div>
                                </div>
                                <div className="location-block">
                                    <span className="label">Локация:</span>
                                    <p>{engineer.location}</p>
                                </div>
                            </div>

                            <div className="requests-block">
                                <span className="label-requests">
                                    ЗАЯВКИ НА СЕГОДНЯ ({engineer.requests.length})
                                </span>
                                {engineer.requests.map((r) => {
                                    const isActive = r.state === 'active'
                                    return (
                                        <div key={r.id} className={cn('request-item', { active: isActive })}>
                                            <div className="req-header">
                                                <strong>#{r.id} - {r.address}</strong>
                                            </div>
                                            <div className={cn('req-status', isActive ? 'green' : 'gray')}>
                                                {isActive && <span className="dot"></span>}
                                                {r.status}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="right-col">
                            <div className="right-col-body">
                                <div className="equipment-header">
                                    <span className="label-right-col">ОБОРУДОВАНИЕ В БАГАЖНИКЕ (ТМЦ)</span>
                                    <button type="button" className="btn-yellow"
                                        onClick={() => console.log('выдать на багажник')}>
                                        + Выдать на багажник
                                    </button>
                                </div>
                                <span className="sub-label">УСТРОЙСТВА И ТЕРМИНАЛЫ</span>
                                {engineer.equipment.map((d) => (
                                    <div key={d.id} className="device-item">
                                        <div className="device-info">
                                            <strong>{d.title}</strong>
                                            <span className="sn">
                                                S/N: {d.sn} • Состояние:{' '}
                                                <span className="text-green">{d.condition}</span>
                                            </span>
                                        </div>
                                        <div className="device-qty">{d.qty} шт</div>
                                    </div>
                                ))}
                            </div>

                            <div className="card-footer">
                                <div className="footer-right">
                                    <button type="button" className="btn-outline"
                                        onClick={() => console.log('печать акта')}>
                                        Печать акта ТМЦ
                                    </button>
                                    <button type="button" className="btn-red"
                                        onClick={() => console.log('снять со смены')}>
                                        Снять со смены
                                    </button>
                                    <button type="button" className="btn-dark"
                                        onClick={() => console.log('сохранить')}>
                                        Сохранить изменения
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>,
        document.body
    )
}

export default EngineerModal