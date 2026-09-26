import { useEffect, useRef, useState } from 'react'
import { replacementCandidates } from '../../components/EngineerReplacementModal/mockData'
import { unallocatedRequests as initialRequests } from './mockData'
import PageHeader from '../../components/PageHeader/PageHeader'
import WorkStagesFooter from '../../components/WorkStagesFooter/WorkStagesFooter'
import ReassignModal from '../../components/ReassignModal/ReassignModal'
import ChoiceDistrictModal from '../../components/ChoiceDistrictModal/ChoiceDistrictModal'
import EngineerReplacementModal from '../../components/EngineerReplacementModal/EngineerReplacementModal'
import EngineerMenuModal from '../../components/EngineerMenuModal/EngineerMenuModal'
import EngineerFormModal from '../../components/EngineerFormModal/EngineerFormModal'
import UrgentRequestModal from '../../components/UrgentRequestModal/UrgentRequestModal'
import ReplanningEventCard from './ReplanningEventCard'
import UnallocatedCard from './UnallocatedCard'
import { masters as initialMasters, stats, replanningEvents, unallocatedRequests, distributedRequests, incomingRequestTemplates, incomingAddresses } from './mockData'
import IncomingRequestToast from '../../components/IncomingRequestToast/IncomingRequestToast'
// 🔌 БЭКЕНД (когда будет готов): импорты выше (masters, stats, replanningEvents,
// unallocatedRequests, distributedRequests) заменить на функции из '../../api/dispatcher':
// getMasters, getStats, getReplanningEvents, getUnallocatedRequests, getDistributedRequests.
// Их нужно вызвать в useEffect при монтировании страницы и положить результат в useState
// (сейчас useState уже стоит везде, просто начальное значение — mock, а не пусто/[]).
// Подробный контракт всех этих эндпоинтов — в src/api/dispatcher.js и BACKEND_INTEGRATION.md.

// Страница диспетчера: список мастеров, события перепланирования (когда что-то пошло
// не по плану — авария, недоступность инженера) и заявки (нераспределённые/распределённые).
// Вся модальная логика (назначение, замена, создание инженера, срочная заявка) живёт тут же
// и пробрасывается вниз в соответствующие модалки как пропсы onXxx.
const DispatcherPage = () => {
    const [reassignRequest, setReassignRequest] = useState(null)   // ReassignModal
    const [isDistrictOpen, setIsDistrictOpen] = useState(false)    // ChoiceDistrictModal
    const [replaceRequest, setReplaceRequest] = useState(null)     // EngineerReplacementModal
    const [menuEngineerId, setMenuEngineerId] = useState(null)     // EngineerMenuModal
    const [isUrgentOpen, setIsUrgentOpen] = useState(false)
    const [tab, setTab] = useState('unallocated')
    const [requests, setRequests] = useState(initialRequests)
    const [masters, setMasters] = useState(initialMasters)
    const [isCreateOpen, setIsCreateOpen] = useState(false)   // EngineerFormModal (создание)
    const [incoming, setIncoming] = useState([])               // входящие заявки (тосты)
    const incomingCounter = useRef(8950)

    // Симуляция прихода заявок из апплета (пока нет бэкенда/WebSocket)
    // 🔌 БЭКЕНД: этот блок целиком — временная заглушка. Когда будет реальный канал
    // (WebSocket или Server-Sent Events, уточнить у бэкендера, что проще ему поднять),
    // вместо setInterval с рандомными данными сюда нужно подписаться на события сервера
    // и в обработчике вызывать тот же setIncoming((prev) => [...prev, новаяЗаявка]).
    // Форма объекта заявки (id, priority, address, service, window) можно оставить такой же —
    // главное, чтобы бэкенд присылал такие же поля.
    useEffect(() => {
        const pushRequest = () => {
            const id = String(incomingCounter.current++)
            const tpl = incomingRequestTemplates[Math.floor(Math.random() * incomingRequestTemplates.length)]
            const address = incomingAddresses[Math.floor(Math.random() * incomingAddresses.length)]
            const hour = 9 + Math.floor(Math.random() * 8)
            setIncoming((prev) => [...prev, {
                id, priority: tpl.priority, address, service: tpl.service,
                window: `${String(hour).padStart(2, '0')}:00 — ${String(hour + 2).padStart(2, '0')}:00`,
            }])
        }
        const first = setTimeout(pushRequest, 5000)
        const interval = setInterval(pushRequest, 25000)
        return () => { clearTimeout(first); clearInterval(interval) }
    }, [])

    const acceptIncoming = (id) => {
        const toast = incoming.find((t) => t.id === id)
        if (toast) {
            setRequests((prev) => [...prev, {
                id: toast.id, date: '8 сентября 2026', window: toast.window,
                address: toast.address, service: toast.service,
                suggested: null,
            }])
        }
        setIncoming((prev) => prev.filter((t) => t.id !== id))
    }

    const dismissIncoming = (id) => setIncoming((prev) => prev.filter((t) => t.id !== id))

    const openReassign = (event) => setReassignRequest({
        id: event.requestId,
        address: event.description.replace('Адрес: ', '').split(' | ')[0] || 'ул. Ленина 45, кв. 12',
        service: 'Подключение XGS-PON',
        equipmentNote: 'Роутер Wi-Fi 6 Pro (1 шт)',
        reason: event.title,
        sla: '12:00',
    })

    return (
        <main className="main">
            <section className="section menu__section">
                <div className="menu__container">
                    <PageHeader />
                    <main className="menu__main">
                        <div className="menu__container">
                            <div className="menu__buttons">
                                <button className="menu__button-opt">Распределить заявки</button>
                                <button className="menu__button-plan" onClick={() => setIsDistrictOpen(true)}>
                                    Сменить район
                                </button>
                                <button className="menu__button-request" onClick={() => setIsUrgentOpen(true)}>
                                    + Срочная заявка
                                </button>
                            </div>

                            <div className="menu__masters-info">
                                <div className="menu__masters-online">
                                    <p className="menu__masters-online-title">Мастера в сети</p>
                                    <p className="menu__master-online-description">{stats.online}</p>
                                </div>
                                <div className="menu__masters-mileage">
                                    <p className="menu__masters-mileage-title">Пробег сети</p>
                                    <div className="menu__masters-mileage-descriptions">
                                        <p className="menu__master-mileage-description">{stats.mileage}</p>
                                        <p className="menu__master-mileage-description-percent">{stats.mileageDelta}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="menu__masters">
                                <div className="menu__masters--info">
                                    <h2 className="menu__masters-title">МАСТЕРА ({masters.length})</h2>
                                    <button className="menu__masters-button" onClick={() => setIsCreateOpen(true)}>+ Добавить</button>
                                </div>
                                <div className="menu__masters-cards">
                                    {masters.map((m) => (
                                        <article key={m.id}
                                            className={m.online ? 'menu__masters-card' : 'menu__masters-card--disabled'}
                                            onClick={() => setMenuEngineerId(m.id)}
                                            style={{ cursor: 'pointer' }}>
                                            <h3 className={m.online ? 'menu__masters-card-title'
                                                : 'menu__masters-card-title menu__masters-card-title--disabled'}>
                                                {m.name} ({m.mode})
                                            </h3>
                                            <p className={m.online ? 'menu__masters-card-description'
                                                : 'menu__masters-card-description menu__masters-card-description--disabled'}>
                                                Смена: {m.shift} | Заявок: {m.requests}
                                            </p>
                                        </article>
                                    ))}
                                </div>
                            </div>

                            <h2 className="menu__events-title">СОБЫТИЯ ПЕРЕПЛАНИРОВАНИЯ ({replanningEvents.length})</h2>
                            <div className="menu__events-cards">
                                {replanningEvents.map((e) => (
                                    <ReplanningEventCard key={e.id} event={e}
                                        onReschedule={openReassign}
                                        onDetails={(ev) => setMenuEngineerId(ev.engineerId || masters[0].id)} />
                                ))}
                            </div>

                            <div className="menu__applications">
                                <h2 className="menu__applications-title">ЗАЯВКИ ({unallocatedRequests.length + distributedRequests.length})</h2>
                                <div className="menu__applications-buttons-choice">
                                    <div className="menu__unallocated-applications-buttons">
                                        <button className={tab === 'unallocated'
                                            ? 'menu__unallocated-applications-button'
                                            : 'menu__unallocated-applications-button menu__no-active-applications-button'}
                                            onClick={() => setTab('unallocated')}>
                                            Не распределённые
                                        </button>
                                        <p className="menu__unallocated-applications-quantity">{requests.length}</p>
                                    </div>
                                    <div className="menu__distributed-applications-buttons">
                                        <button className={tab === 'distributed'
                                            ? 'menu__distributed-applications-button'
                                            : 'menu__distributed-applications-button menu__no-active-applications-button'}
                                            onClick={() => setTab('distributed')}>
                                            Распределённые
                                        </button>
                                        <p className="menu__distributed-applications-quantity">{distributedRequests.length}</p>
                                    </div>
                                </div>

                                {tab === 'unallocated' && (
                                    <div className="menu__unallocated-cards">
                                        {requests.map((r) => (
                                            <UnallocatedCard key={r.id} request={r}
                                                // 🔌 БЭКЕНД: заменить console.log на confirmRequest(id) из '../../api/dispatcher'
                                                // (не забыть await/try-catch, как в handleAuth в AuthPage.jsx)
                                                onConfirm={(id) => console.log('Утверждена', id)}
                                                onChangeMaster={setReplaceRequest} />
                                        ))}
                                    </div>
                                )}

                                {tab === 'distributed' && (
                                    <div className="menu__distributed-cards">
                                        {distributedRequests.map((r) => (
                                            <article key={r.id} className="menu__distributed-card">
                                                <div className="menu__distributed-card-info">
                                                    <h3 className="menu__distributed-card-title">Заявка #{r.id}</h3>
                                                    <p className="menu__distributed-card-description">{r.description}</p>
                                                </div>
                                                <p className="menu__distributed-card-status">{r.status}</p>
                                            </article>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <WorkStagesFooter />
                        </div>
                    </main>
                </div>
            </section>

            {/* 🔌 БЭКЕНД: три console.log ниже — заменить на вызовы assignRequest / returnRequestToPool /
                autoAssignRequest из '../../api/dispatcher' (все три уже готовы и принимают ровно
                такие же аргументы rid/eid). setReassignRequest(null) после успешного ответа оставляем. */}
            <ReassignModal isOpen={!!reassignRequest} request={reassignRequest}
                onClose={() => setReassignRequest(null)}
                onAssign={(rid, eid) => { console.log('Назначен', eid, 'на', rid); setReassignRequest(null) }}
                onReturnToPool={(rid) => { console.log('В пул', rid); setReassignRequest(null) }}
                onAutoAssign={(rid) => { console.log('Авто', rid); setReassignRequest(null) }} />

            <ChoiceDistrictModal isOpen={isDistrictOpen} onClose={() => setIsDistrictOpen(false)} />
            <EngineerReplacementModal
                isOpen={!!replaceRequest}
                request={replaceRequest}
                onClose={() => setReplaceRequest(null)}
                onAssign={(reqId, engId) => {
                    // 🔌 БЭКЕНД: заменить весь блок на await assignRequest(reqId, engId) из
                    // '../../api/dispatcher', а eng.name для карточки брать из ответа сервера
                    // (или просто перезапросить getUnallocatedRequests()/getDistributedRequests()
                    // заново — как будет проще).
                    const eng = replacementCandidates.find((c) => c.id === engId)
                    setRequests((prev) => prev.map((r) => r.id === reqId
                        ? { ...r, suggested: { name: eng.name, info: '(Выбран вручную)' } }
                        : r))
                    setReplaceRequest(null)
                }}
            />
            <EngineerMenuModal isOpen={!!menuEngineerId} engineerId={menuEngineerId}
                onClose={() => setMenuEngineerId(null)} />
            {/* 🔌 БЭКЕНД: заменить console.log на await createUrgentRequest(data) из '../../api/dispatcher' */}
            <UrgentRequestModal isOpen={isUrgentOpen} onClose={() => setIsUrgentOpen(false)}
                onSubmit={(data) => { console.log('Срочная заявка', data); setIsUrgentOpen(false) }} />

            <EngineerFormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}
                onSubmit={(data) => {
                    // TODO: заменить на await createEngineer(data) из '../../api/dispatcher'.
                    // Бэкенд наверняка сам сгенерирует id и вернёт готовый объект инженера —
                    // тогда блок ниже (ручная сборка mode/id) не нужен, просто
                    // setMasters((prev) => [...prev, ответСервера]).
                    const mode = data.transport === 'Автомобиль' ? 'Авто'
                        : data.transport === 'Велосипед' ? 'Вело' : 'Пеший'
                    setMasters((prev) => [...prev, {
                        id: `ENG-${104 + prev.length}`,
                        name: data.fio,
                        mode,
                        shift: '08:00–17:00',
                        requests: 0,
                        online: true,
                    }])
                }} />
            <IncomingRequestToast toasts={incoming}
                onAccept={acceptIncoming}
                onDismiss={dismissIncoming} />
        </main>
    )
}

export default DispatcherPage