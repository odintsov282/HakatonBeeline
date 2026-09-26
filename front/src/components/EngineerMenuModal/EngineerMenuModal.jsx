import { useState } from 'react'
import { createPortal } from 'react-dom'
import cn from 'classnames'
import { engineers, trunkEquipment } from './mockData'
import EngineerFormModal from '../EngineerFormModal/EngineerFormModal'
// 🔌 БЭКЕНД: сейчас данные инженера (engineers) и оборудование в багажнике (trunkEquipment) —
// моки. Когда появится бэкенд, самый простой вариант — прокидывать сюда уже загруженного
// инженера из DispatcherPage (он там всё равно есть в масters/масштабнее — через GET
// /engineers/:id) через новый проп, например engineer={...}, вместо engineerId + поиска
// по mock-объекту engineers[engineerId].

// Карточка инженера: статус смены, локация, список заявок на день слева,
// оборудование в багажнике справа. Открывается по клику на карточку мастера
// на странице диспетчера (см. DispatcherPage.jsx).
const EngineerMenuModal = ({ isOpen, engineerId, onClose }) => {
    const [activeRequest, setActiveRequest] = useState(null)
    const [isRemoveConfirm, setIsRemoveConfirm] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)   // EngineerFormModal (изменение)

    if (!isOpen) return null

    const engineer = engineers[engineerId] || engineers['ENG-104']

    return createPortal(
        <div style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(15,23,42,0.55)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            padding: 20, overflowY: 'auto',
        }}>
            <div className="engmenu-modal-card">
                {/* Шапка */}
                <div className="engmenu-card-header">
                    <div className="engmenu-user-info">
                        <div className="engmenu-avatar">{engineer.avatar}</div>
                        <div className="engmenu-user-details">
                            <h1>{engineer.name}</h1>
                            <p>{engineer.role}</p>
                        </div>
                    </div>
                    <button className="engmenu-close" onClick={onClose}>×</button>
                </div>

                <div className="engmenu-card-body">
                    {/* Левая колонка */}
                    <div className="engmenu-left-col">
                        <div className="engmenu-status-block">
                            <div className="engmenu-status-block-header">
                                <span className="engmenu-label-uppercase">СТАТУС СМЕНЫ</span>
                                <div className="engmenu-status-badge">
                                    <span className="engmenu-dot"></span>
                                    {engineer.shift}
                                </div>
                            </div>
                            <div className="engmenu-location-block">
                                <span className="engmenu-label">Локация:</span>
                                <p>{engineer.location}</p>
                            </div>
                        </div>

                        <div className="engmenu-requests-block">
                            <span className="engmenu-label-requests">
                                ЗАЯВКИ НА СЕГОДНЯ ({engineer.requests.length})
                            </span>
                            {engineer.requests.map((r) => (
                                <div key={r.id}
                                    className={cn('engmenu-request-item', { active: activeRequest === r.id || (activeRequest === null && r.active) })}
                                    onClick={() => setActiveRequest(r.id)}
                                    style={{ cursor: 'pointer' }}>
                                    <div className="engmenu-req-header">
                                        <strong>#{r.id} - {r.address}</strong>
                                    </div>
                                    <div className={cn('engmenu-req-status', r.status)}>
                                        {r.status === 'green' && <span className="engmenu-dot"></span>}
                                        {r.statusText}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Правая колонка */}
                    <div className="engmenu-right-col">
                        <div className="engmenu-right-col-body">
                            <div className="engmenu-equipment-header">
                                <span className="engmenu-label-right-col">
                                    ОБОРУДОВАНИЕ В БАГАЖНИКЕ (ТМЦ)
                                </span>
                            </div>
                            <span className="engmenu-sub-label">УСТРОЙСТВА И ТЕРМИНАЛЫ</span>
                            {trunkEquipment.map((item) => (
                                <div key={item.sn} className="engmenu-device-item">
                                    <div className="engmenu-device-info">
                                        <strong>{item.title}</strong>
                                        <span className="engmenu-sn">
                                            {item.sn} • Состояние:{' '}
                                            <span className="engmenu-text-green">{item.condition}</span>
                                        </span>
                                    </div>
                                    <div className="engmenu-device-qty">{item.qty}</div>
                                </div>
                            ))}
                        </div>

                        <div className="engmenu-card-footer">
                            <div className="engmenu-footer-right">
                                <button className="engmenu-btn-outline" onClick={() => setIsEditOpen(true)}>
                                    Изменить информацию
                                </button>
                                <button className="engmenu-btn-outline" onClick={() => console.log('Печать акта ТМЦ')}>
                                    Печать акта ТМЦ
                                </button>
                                {/* 🔌 БЭКЕНД: подтверждение ниже (isRemoveConfirm) должно вызывать
                                    removeEngineerFromShift(engineer.id) из '../../api/dispatcher' */}
                                <button className="engmenu-btn-red" onClick={() => setIsRemoveConfirm(true)}>
                                    Снять со смены
                                </button>
                                <button className="engmenu-btn-dark" onClick={onClose}>
                                    Сохранить изменения
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Подтверждение снятия со смены */}
                {isRemoveConfirm && (
                    <div style={{
                        position: 'absolute', inset: 0, zIndex: 10,
                        background: 'rgba(15,23,42,0.45)', borderRadius: 15,
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                    }}>
                        <div style={{
                            background: '#fff', borderRadius: 14, padding: '25px 24px 20px',
                            width: 295, textAlign: 'center',
                            boxShadow: '0 14px 40px rgba(15,23,42,0.2)',
                        }}>
                            <div style={{ marginBottom: 18, fontSize: 12, fontWeight: 600, color: '#0f172a' }}>
                                ПОДТВЕРЖДЕНИЕ
                            </div>
                            <p style={{ margin: '0 0 25px', color: '#475569', fontSize: 9 }}>
                                Снять {engineer.name} с смены? Его заявки будут перепланированы.
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18 }}>
                                <button style={{
                                    width: 80, height: 20, border: 0, borderRadius: 3,
                                    background: '#ef4444', color: '#fff', fontSize: 7, fontWeight: 600,
                                    cursor: 'pointer',
                                }} onClick={() => { setIsRemoveConfirm(false); onClose() }}>
                                    Снять
                                </button>
                                <button style={{
                                    width: 80, height: 20, border: 0, borderRadius: 3,
                                    background: '#e2e8f0', color: '#475569', fontSize: 7, fontWeight: 600,
                                    cursor: 'pointer',
                                }} onClick={() => setIsRemoveConfirm(false)}>
                                    Отмена
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Изменение данных инженера */}
                <EngineerFormModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}
                    initialData={{
                        fio: engineer.name,
                        birthDate: engineer.birthDate,
                        skills: engineer.skills,
                        phone: engineer.phone,
                        transport: engineer.transport,
                    }}
                    onSubmit={(data) => {
                        // 🔌 БЭКЕНД: заменить console.log на await updateEngineer(engineer.id, data)
                        // из '../../api/dispatcher'
                        console.log('Сохранить инженера:', engineer.id, data)
                    }} />
            </div>
        </div>,
        document.body
    )
}

export default EngineerMenuModal