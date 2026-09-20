import { useState } from 'react'
import cn from 'classnames'
import EngineerModal from '../../components/EngineerModal/EngineerModal'
import { engineerDetails } from '../../components/EngineerModal/mockData'
import SidebarLayout from '../../components/SidebarLayout/SidebarLayout'
import AppHeader from '../../components/AppHeader/AppHeader'
import StageButtons from '../../components/StageButtons/StageButtons'
import UrgentRequestModal from '../../components/UrgentRequestModal/UrgentRequestModal'
import MasterCard from './MasterCard'
import UnallocatedCard from './UnallocatedCard'
import { masters, unallocatedRequests, distributedRequests } from './mockData'
import './DispatcherPage.css'

const DispatcherPage = () => {
    const [tab, setTab] = useState('unallocated')
    const [isUrgentOpen, setIsUrgentOpen] = useState(false)
    const [isEngineerOpen, setIsEngineerOpen] = useState(false)
    const totalRequests = unallocatedRequests.length + distributedRequests.length

    return (
        <SidebarLayout>
            <AppHeader />

            <main className="menu__main">
                <div className="menu__container">
                    <div className="menu__buttons">
                        <button className="menu__button-opt">Оптимизировать</button>
                        <button className="menu__button-plan">Базовый план</button>
                        <button className="menu__button-request" onClick={() => setIsUrgentOpen(true)}>
                            + Срочная заявка
                        </button>
                    </div>

                    <div className="menu__masters">
                        <div className="menu__masters--info">
                            <h2 className="menu__masters-title">МАСТЕРА ({masters.length})</h2>
                            <button className="menu__masters-button">+ Добавить</button>
                        </div>
                        <div className="menu__masters-cards">
                            {masters.map((m) => (
                                <MasterCard key={m.id} {...m} onClick={() => setIsEngineerOpen(true)}/>
                            ))}
                        </div>
                    </div>

                    <div className="menu__applications">
                        <h2 className="menu__applications-title">ЗАЯВКИ ({totalRequests})</h2>

                        <div className="menu__applications-buttons-choice">
                            <div className="menu__unallocated-applications-buttons">
                                <button
                                    className={cn('menu__unallocated-applications-button', {
                                        'menu__no-active-applications-button': tab !== 'unallocated',
                                    })}
                                    onClick={() => setTab('unallocated')}
                                >
                                    Не распределённые
                                </button>
                                <p className="menu__unallocated-applications-quantity">
                                    {unallocatedRequests.length}
                                </p>
                            </div>
                            <div className="menu__distributed-applications-buttons">
                                <button
                                    className={cn('menu__distributed-applications-button', {
                                        'menu__no-active-applications-button': tab !== 'distributed',
                                    })}
                                    onClick={() => setTab('distributed')}
                                >
                                    Распределённые
                                </button>
                                <p className="menu__distributed-applications-quantity">
                                    {distributedRequests.length}
                                </p>
                            </div>
                        </div>

                        {tab === 'unallocated' && (
                            <div className="menu__unallocated-cards">
                                {unallocatedRequests.map((r) => (
                                    <UnallocatedCard
                                        key={r.id}
                                        request={r}
                                        onConfirm={(id) => console.log('утвердить', id)}
                                        onChange={(id) => console.log('изменить мастера', id)}
                                    />
                                ))}
                            </div>
                        )}

                        {tab === 'distributed' && (
                            <div className="menu__distributed-cards">
                                {distributedRequests.map((r) => (
                                    <article key={r.id} className="menu__distributed-card">
                                        <div className="menu__distributed-card-info">
                                            <h3 className="menu__distributed-card-title">Заявка #{r.id}</h3>
                                            <p className="menu__distributed-card-description">
                                                {r.when} | {r.address}
                                            </p>
                                        </div>
                                        <p className="menu__distributed-card-status">{r.status}</p>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                    <StageButtons />
                </div>
            </main>
            <EngineerModal
                isOpen={isEngineerOpen}
                onClose={() => setIsEngineerOpen(false)}
                engineer={engineerDetails}
            />
            <UrgentRequestModal
                isOpen={isUrgentOpen}
                onClose={() => setIsUrgentOpen(false)}
                onSubmit={(form) => console.log('срочная заявка', form)}
            />
        </SidebarLayout>
    )
}

export default DispatcherPage