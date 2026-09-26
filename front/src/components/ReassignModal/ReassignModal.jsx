import { createPortal } from 'react-dom'
import cn from 'classnames'
import { reassignCandidates } from './mockData'
import './ReassignModal.scss'
// 🔌 БЭКЕНД: reassignCandidates сейчас мок. Заменить на getReassignCandidates(request.id)
// из '../../api/candidates' (useState + useEffect по request.id при открытии модалки,
// так же, как описано в EngineerReplacementModal.jsx для его кандидатов).

// Модалка перепланирования: показывается, когда заявку нужно снять с текущего
// исполнителя (авария, недоступность инженера — см. события в DispatcherPage)
// и назначить кого-то другого из авто-подбора системы.
const ReassignModal = ({ isOpen, onClose, request, onAssign, onReturnToPool, onAutoAssign }) => {
    if (!isOpen || !request) return null

    return createPortal(
        <div className="reassign-modal-wrap">
            <div className="main-conteiner" onClick={onClose}>
                <div className="reassign-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="reassign-header">
                        <div className="reassign-header-titles">
                            <div className="reassign-header-badge">⚡ ПЕРЕПЛАНИРОВАНИЕ</div>
                            <h2 className="reassign-header-title">Назначение нового исполнителя</h2>
                            <p className="reassign-header-subtitle">
                                Выберите мастера для перераспределения заявки{' '}
                                <span className="reassign-header-request">#{request.id}</span>
                            </p>
                        </div>
                        <button type="button" className="reassign-header-close" onClick={onClose}>&times;</button>
                    </div>

                    <div className="reassign-request-info">
                        <div className="reassign-request-left">
                            <div className="reassign-request-title">#{request.id} • {request.address}</div>
                            <div className="reassign-request-detail">
                                Услуга: <strong>{request.service}</strong> | Требуется: <b>{request.equipmentNote}</b>
                            </div>
                            <div className="reassign-request-reason">Причина снятия: {request.reason}</div>
                        </div>
                        <div className="reassign-request-right">
                            <div className="reassign-request-sla">SLA: {request.sla}</div>
                        </div>
                    </div>

                    <div className="reassign-section-label">ДОСТУПНЫЕ ИНЖЕНЕРЫ (АВТО-ПОДБОР СИСТЕМОЙ)</div>

                    {reassignCandidates.map((c) => (
                        <div key={c.id} className={cn('reassign-card', {
                            'reassign-card--optimal': c.isOptimal && !c.reason,
                            'reassign-card--disabled': !!c.reason,
                        })}>
                            <div className="reassign-card-top">
                                <div className="reassign-card-top-left">
                                    <div className="reassign-card-avatar">{c.icon}</div>
                                    <div className="reassign-card-name">
                                        {c.name} <span className="reassign-card-id">(#{c.id})</span>
                                        {c.load && (
                                            <div className="reassign-card-meta">
                                                Авто: {c.transport} • Загрузка: <b>{c.load}</b>
                                            </div>
                                        )}
                                        {c.reason && <div className="reassign-card-reason">{c.reason}</div>}
                                    </div>
                                </div>
                                {c.isOptimal && !c.reason && (
                                    <div className="reassign-card-optimal">★ ОПТИМАЛЬНЫЙ ВЫБОР</div>
                                )}
                            </div>

                            {!c.reason && (
                                <div className="reassign-card-body">
                                    <div className="reassign-card-fields">
                                        <div className="reassign-card-field">
                                            Отклонение: <b className="reassign-card-dev">{c.deviation}</b>
                                        </div>
                                        <div className="reassign-card-field">
                                            ТМЦ: <b className="reassign-card-stock">{c.stock}</b>
                                        </div>
                                    </div>
                                    <div className="reassign-card-actions">
                                        <button type="button"
                                            className={cn('reassign-card-btn', { 'reassign-card-btn--optimal': c.isOptimal })}
                                            onClick={() => onAssign(request.id, c.id)}>
                                            {c.buttonText}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {c.reason && (
                                <div className="reassign-card-body">
                                    <button type="button" className="reassign-card-disabled-btn" disabled>
                                        {c.buttonText}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="reassign-footer">
                        <button type="button" className="reassign-footer-back"
                            onClick={() => onReturnToPool(request.id)}>Вернуть заявку в пул</button>
                        <button type="button" className="reassign-footer-auto"
                            onClick={() => onAutoAssign(request.id)}>⚡ Авто-распределение</button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default ReassignModal