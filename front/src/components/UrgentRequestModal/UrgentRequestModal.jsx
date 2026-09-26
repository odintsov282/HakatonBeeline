import { useState } from 'react'
import { createPortal } from 'react-dom'
import cn from 'classnames'

// Форма срочной заявки диспетчера. Сама модалка данные никуда не отправляет —
// собирает form + priority и отдаёт наверх через onSubmit; вызов createUrgentRequest
// из '../../api/dispatcher' будет в DispatcherPage.jsx, там же, где она открывается
// (см. пометку 🔌 БЭКЕНД в DispatcherPage.jsx рядом с <UrgentRequestModal>).
const UrgentRequestModal = ({ isOpen, onClose, onSubmit }) => {
    const [priority, setPriority] = useState('high')
    const [form, setForm] = useState({ client: '', phone: '', address: '', fault: '', when: '' })

    if (!isOpen) return null

    const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

    return createPortal(
        <div className="urgent-overlay" style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
            <div className="urgent-modal">
                <div className="urgent-modal-header">
                    <div className="urgent-header-left">
                        <div className="urgent-icon-circle">
                            <i className="fa-solid fa-exclamation"></i>
                        </div>
                        <div className="urgent-header-text">
                            <h2>Создание заявки</h2>
                            <p>Аварийный ввод задачи с автоматическим пересчетом маршрута</p>
                        </div>
                    </div>
                    <button className="urgent-close" onClick={onClose}>&times;</button>
                </div>

                <div className="urgent-modal-body">
                    <div className="urgent-form-group">
                        <label>УРОВЕНЬ ПРИОРИТЕТА</label>
                        <div className="urgent-priority-buttons">
                            <button className={cn('urgent-priority-btn', { active: priority === 'high' })}
                                onClick={() => setPriority('high')}>
                                <span className="urgent-dot"></span> Высокий (авария)
                            </button>
                            <button className={cn('urgent-priority-btn', { active: priority === 'low' })}
                                onClick={() => setPriority('low')}>низкий</button>
                        </div>
                    </div>
                    <div className="urgent-form-group">
                        <label>Имя клиента</label>
                        <input type="text" className="urgent-form-input" value={form.client} onChange={set('client')} />
                    </div>
                    <div className="urgent-form-group">
                        <label>Номер телефона</label>
                        <input type="tel" className="urgent-form-input" value={form.phone} onChange={set('phone')} />
                    </div>
                    <div className="urgent-form-group">
                        <label>Адрес объекта <span className="urgent-required">*</span></label>
                        <input type="text" className="urgent-form-input" value={form.address} onChange={set('address')} />
                    </div>
                    <div className="urgent-form-group">
                        <label>Тип неисправности</label>
                        <div className="urgent-select-wrapper">
                            <select className="urgent-form-input" value={form.fault} onChange={set('fault')}>
                                <option value=""></option>
                                <option value="internet">Нет интернета</option>
                                <option value="tv">Нет ТВ</option>
                                <option value="phone">Нет телефонии</option>
                            </select>
                            <i className="fa-solid fa-chevron-down urgent-select-icon"></i>
                        </div>
                    </div>
                    <div className="urgent-form-group">
                        <label>Дата, время</label>
                        <div className="urgent-select-wrapper">
                            <select className="urgent-form-input" value={form.when} onChange={set('when')}>
                                <option value=""></option>
                                <option value="now">Сейчас</option>
                                <option value="later">Позже</option>
                            </select>
                            <i className="fa-solid fa-chevron-down urgent-select-icon"></i>
                        </div>
                    </div>
                </div>

                <div className="urgent-modal-footer">
                    <button className="urgent-btn-submit" onClick={() => onSubmit({ ...form, priority })}>
                        Назначить и перестроить
                    </button>
                    <button className="urgent-btn-cancel" onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default UrgentRequestModal