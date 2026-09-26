import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './EngineerFormModal.css'

const TRANSPORTS = ['Велосипед', 'Автомобиль', 'Без транспорта']

const EMPTY_FORM = { fio: '', birthDate: '', skills: '', phone: '', transport: '' }

// Универсальная форма инженера: одна и та же модалка используется и для создания
// нового мастера (initialData не передан), и для редактирования существующего
// (initialData есть — см. isEdit). onSubmit ничего сам не отправляет на бэкенд,
// решение о том, createEngineer или updateEngineer вызывать, — на стороне того,
// кто эту модалку открывает (DispatcherPage.jsx — создание, EngineerMenuModal.jsx — правка).
const EngineerFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [form, setForm] = useState(EMPTY_FORM)
    const [isTransportOpen, setIsTransportOpen] = useState(false)

    const isEdit = !!initialData

    useEffect(() => {
        if (isOpen) {
            setForm(initialData ? { ...EMPTY_FORM, ...initialData } : EMPTY_FORM)
            setIsTransportOpen(false)
        }
    }, [isOpen, initialData])

    if (!isOpen) return null

    const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

    const canSubmit = form.fio && form.birthDate && form.skills && form.phone && form.transport

    const handleSubmit = () => {
        if (!canSubmit) return
        onSubmit?.(form)
        onClose()
    }

    return createPortal(
        <div className="engform-overlay" onClick={onClose}>
            <div className="engform-card" onClick={(e) => e.stopPropagation()}>
                <div className="engform-header">
                    <div className="engform-header-left">
                        <div className="engform-avatar">👨‍🔧</div>
                        <h2 className="engform-title">
                            {isEdit ? 'Изменение Инженера' : 'Создание Инженера'}
                        </h2>
                    </div>
                    <button type="button" className="engform-close" aria-label="Закрыть" onClick={onClose}>×</button>
                </div>

                <div className="engform-body">
                    <label className="engform-field">
                        <span className="engform-label">ФИО</span>
                        <input className="engform-input" value={form.fio} onChange={set('fio')} />
                    </label>

                    <label className="engform-field">
                        <span className="engform-label">Дата рождения</span>
                        <input className="engform-input" value={form.birthDate} onChange={set('birthDate')} placeholder="ДД.ММ.ГГГГ" />
                    </label>

                    <label className="engform-field">
                        <span className="engform-label">Навыки</span>
                        <input className="engform-input" value={form.skills} onChange={set('skills')} />
                    </label>

                    <label className="engform-field">
                        <span className="engform-label">Номер телефона</span>
                        <input className="engform-input" value={form.phone} onChange={set('phone')} placeholder="+7 ..." />
                    </label>

                    <div className="engform-field">
                        <span className="engform-label">Транспорт</span>
                        <div className="engform-select-wrap">
                            <button type="button"
                                className="engform-input engform-select"
                                onClick={() => setIsTransportOpen(!isTransportOpen)}>
                                <span className={form.transport ? '' : 'engform-select-placeholder'}>
                                    {form.transport || 'Выберите транспорт'}
                                </span>
                                <span className="engform-chevron">⌄</span>
                            </button>
                            {isTransportOpen && (
                                <div className="engform-options">
                                    {TRANSPORTS.map((t) => (
                                        <button key={t} type="button" className="engform-option"
                                            onClick={() => { setForm((prev) => ({ ...prev, transport: t })); setIsTransportOpen(false) }}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="engform-footer">
                    <button type="button" className="engform-submit" disabled={!canSubmit} onClick={handleSubmit}>
                        {isEdit ? 'Сохранить' : 'Создать Мастера'}
                    </button>
                    <button type="button" className="engform-cancel" onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default EngineerFormModal
