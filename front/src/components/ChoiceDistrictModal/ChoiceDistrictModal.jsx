import { useState } from 'react'
import { createPortal } from 'react-dom'

// 🔌 БЭКЕНД: список районов сейчас захардкожен. Заменить на getDistrictsList()
// из '../../api/districts' (useState([]) + useEffect при открытии модалки).
const DISTRICTS = ['Самарский район', 'ZOV район', 'Московский район', 'рай ON']

// Эндпоинт бэкендера, отдающего CSV по району.
// Когда бэк развернётся — просто проверьте, что путь совпадает с его swagger/докой.
const EXPORT_URL = (district) => `/api/districts/export?district=${encodeURIComponent(district)}`

const ChoiceDistrictModal = ({ isOpen, onClose }) => {
    const [district, setDistrict] = useState(null)
    const [isOpenList, setIsOpenList] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)

    if (!isOpen) return null

    const saveBlob = (blob, filename) => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
    }

    const downloadCsv = async () => {
        if (!district || isDownloading) return
        setIsDownloading(true)
        try {
            const res = await fetch(EXPORT_URL(district))
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const blob = await res.blob()
            saveBlob(blob, `${district}.csv`)
        } catch (err) {
            // Бэкенд ещё не развернул endpoint — сообщаем, ничего не ломаем
            console.warn(`[CSV] Эндпоинт ${EXPORT_URL(district)} недоступен (${err.message}). Данные не скачаны.`)
        } finally {
            setIsDownloading(false)
        }
    }

    return createPortal(
        <main className="choice-district__page" style={{
            position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15,23,42,0.55)'
        }}>
            <section className="modal__choice-district">
                <header className="choice-district__header">
                    <button className="btn__delete" type="button" onClick={() => setIsDeleteOpen(true)}>
                        Удаление данных по району
                    </button>
                    <button className="btn__cross" type="button" aria-label="Закрыть" onClick={onClose}>
                        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M1.08047 15.3601L0.000468805 14.2801L6.56047 7.68009L0.000468805 1.08009L1.08047 8.72612e-05L7.64047 6.60009L14.1605 8.72612e-05L15.2405 1.08009L8.68047 7.68009L15.2405 14.2801L14.1605 15.3601L7.64047 8.80009L1.08047 15.3601Z" fill="#94A3B8"/>
                        </svg>
                    </button>
                </header>

                <div className="choice-district__body">
                    <details className="choice-district__select" open={isOpenList}>
                        <summary className="choice-district__select-button"
                            onClick={(e) => { e.preventDefault(); setIsOpenList(!isOpenList) }}>
                            <span>{district || 'Выберите район'}</span>
                            <span className="choice-district__chevron" aria-hidden="true"></span>
                        </summary>
                        {isOpenList && (
                            <div className="choice-district__options">
                                {DISTRICTS.map((d) => (
                                    <button key={d} className="choice-district__option" type="button"
                                        onClick={() => { setDistrict(d); setIsOpenList(false) }}>
                                        {d}
                                    </button>
                                ))}
                            </div>
                        )}
                    </details>
                </div>

                <footer className="choice-district__footer">
                    <button
                        className="choice-district__upload"
                        type="button"
                        disabled={!district || isDownloading}
                        style={(!district || isDownloading) ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
                        onClick={downloadCsv}>
                        {isDownloading ? 'Скачивание…' : 'Загрузить CSV'}
                    </button>
                    <button className="choice-district__open" type="button"
                        disabled={!district}
                        style={!district ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
                        onClick={() => { console.log('Открыт район:', district); onClose() }}>
                        Открыть данные по району
                    </button>
                </footer>
            </section>

            {isDeleteOpen && (
                <div className="delete-panel is-visible">
                    <div className="delete-panel__header">Удаление данных по району</div>
                    <div className="delete-panel__body">
                        <label className="delete-panel__district">
                            <input type="checkbox" name="district" value="Сегодня" />
                            <span>Сегодня</span>
                        </label>
                        <label className="delete-panel__district">
                            <input type="checkbox" name="district" value="Предыдущие дни" />
                            <span>Предыдущие дни</span>
                        </label>
                    </div>
                    {/* 🔌 БЭКЕНД: сам вызов deleteDistrictData(district, period) из '../../api/districts'
                        логичнее делать после подтверждения ниже (кнопка "Удалить" в delete-confirm),
                        а не здесь — тут пока только переключение панелей */}
                    <button className="delete-panel__button" type="button"
                        onClick={() => { setIsDeleteOpen(false); setIsConfirmOpen(true) }}>
                        Удалить
                    </button>
                </div>
            )}

            {isConfirmOpen && (
                <div className="delete-confirm is-visible">
                    <div className="delete-confirm__title">ПОДТВЕРЖДЕНИЕ</div>
                    <p className="delete-confirm__text">Вы уверены, что хотите удалить данные?</p>
                    <div className="delete-confirm__actions">
                        {/* 🔌 БЭКЕНД: здесь заменить onClose() на await deleteDistrictData(district, period)
                            и только потом onClose() — period нужно будет собрать из чекбоксов выше
                            (сейчас они ничего не читают, это тоже добавить) */}
                        <button className="delete-confirm__delete" type="button"
                            onClick={() => { setIsConfirmOpen(false); onClose() }}>Удалить</button>
                        <button className="delete-confirm__cancel" type="button"
                            onClick={() => setIsConfirmOpen(false)}>Отмена</button>
                    </div>
                </div>
            )}
        </main>,
        document.body
    )
}

export default ChoiceDistrictModal