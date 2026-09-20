import SidebarLayout from '../../components/SidebarLayout/SidebarLayout'
import AppHeader from '../../components/AppHeader/AppHeader'
import StageButtons from '../../components/StageButtons/StageButtons'
import OpenRequestCard from './OpenRequestCard'
import QueuedRequestCard from './QueuedRequestCard'
import { openRequest, queuedRequests } from './mockData'
import './EngineerPage.css'

const EngineerPage = () => {
    return (
        <SidebarLayout>
            <AppHeader />

            <main className="menu__main">
                <div className="menu__container">
                    <div className="menu__applications">
                        <div className="menu__applications-info">
                            <h2 className="menu__applications-title">ВХОДЯЩИЕ ЗАЯВКИ ИЗ АППЛЕТА</h2>
                            <button
                                className="menu__applications-button"
                                onClick={() => console.log('показать все заявки')}
                            >
                                Показать все заявки
                            </button>
                        </div>

                        <div className="menu__applications-cards">
                            <OpenRequestCard request={openRequest} />
                            {queuedRequests.map((r) => (
                                <QueuedRequestCard key={r.id} request={r} />
                            ))}
                        </div>
                    </div>

                    <StageButtons />
                </div>
            </main>
        </SidebarLayout>
    )
}

export default EngineerPage