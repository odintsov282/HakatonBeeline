import { useState } from 'react'
import { createPortal } from 'react-dom'
import cn from 'classnames'
import { IconExclamationMark, IconChevronDown } from '@tabler/icons-react'
import './UrgentRequestModal.scss'

const initialForm = {
    priority: 'high',
    clientName: '',
    phone: '',
    address: '',
    faultType: '',
    when: '',
}

const UrgentRequestModal = ({ isOpen, onClose, onSubmit }) => {
    const [form, setForm] = useState(initialForm)

    if (!isOpen) return null

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(form)
        setForm(initialForm)
        onClose()
    }

    return createPortal(
        <div className="urgent-modal">
            <div className="overlay" onClick={onClose}>
                <form
                    className="modal"
                    onClick={(e) => e.stopPropagation()}
                    onSubmit={handleSubmit}
                >
                    <div className="modal-header">
                        <div className="header-left">
                            <div className="icon-circle">
                                <IconExclamationMark size={18} stroke={2.5} />
                            </div>
                            <div className="header-text">
                                <h2>Создание заявки</h2>
                                <p>Аварийный ввод задачи с автоматическим пересчетом маршрута</p>
                            </div>
                        </div>
                        <button type="button" className="close-btn" onClick={onClose}>
                            &times;
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="form-group">
                            <p className="form-title">УРОВЕНЬ ПРИОРИТЕТА</p>
                            <div className="priority-buttons">
                                <button
                                    type="button"
                                    className={cn('priority-btn', { active: form.priority === 'high' })}
                                    onClick={() => setForm((p) => ({ ...p, priority: 'high' }))}
                                >
                                    <span className="dot"></span>
                                    Высокий (авария)
                                </button>
                                <button
                                    type="button"
                                    className={cn('priority-btn', { active: form.priority === 'low' })}
                                    onClick={() => setForm((p) => ({ ...p, priority: 'low' }))}
                                >
                                    низкий
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="clientName">Имя клиента</label>
                            <input id="clientName" name="clientName" type="text" className="form-input"
                                value={form.clientName} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="phone">Номер телефона</label>
                            <input id="phone" name="phone" type="tel" className="form-input"
                                value={form.phone} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="address">
                                Адрес объекта <span className="required">*</span>
                            </label>
                            <input id="address" name="address" type="text" className="form-input"
                                required value={form.address} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="faultType">Тип неисправности</label>
                            <div className="select-wrapper">
                                <select id="faultType" name="faultType" className="form-input"
                                    value={form.faultType} onChange={handleChange}>
                                    <option value=""></option>
                                    <option value="internet">Нет интернета</option>
                                    <option value="tv">Нет ТВ</option>
                                    <option value="phone">Нет телефонии</option>
                                </select>
                                <IconChevronDown size={14} className="select-icon" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="when">Дата, время</label>
                            <div className="select-wrapper">
                                <select id="when" name="when" className="form-input"
                                    value={form.when} onChange={handleChange}>
                                    <option value=""></option>
                                    <option value="now">Сейчас</option>
                                    <option value="later">Позже</option>
                                </select>
                                <IconChevronDown size={14} className="select-icon" />
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="submit" className="btn-submit">Назначить и перестроить</button>
                        <button type="button" className="btn-cancel" onClick={onClose}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    )
}

export default UrgentRequestModal