import http from './http'

// Все запросы для страницы диспетчера (src/pages/DispatcherPage/DispatcherPage.jsx).
// Страница сейчас работает на моках из ./../pages/DispatcherPage/mockData.js —
// функции ниже написаны так, чтобы завтра просто заменить импорт мока на вызов
// нужной функции (в DispatcherPage.jsx на местах импорта и хендлеров стоят пометки
// "🔌 БЭКЕНД" — что именно и на что менять).
//
// ДЛЯ БЭКЕНДЕРА: пути и формы ответов ниже — это то, что ожидает фронт исходя из
// текущей вёрстки и моков (см. также BACKEND_INTEGRATION.md в корне проекта).
// Если в свагере что-то будет называться иначе — правим только этот файл,
// компоненты страницы трогать не придётся.

// GET /dispatcher/stats -> { online: string, mileage: string, mileageDelta: string }
export const getStats = async () => {
    const { data } = await http.get('/dispatcher/stats')
    return data
}

// GET /dispatcher/masters -> [{ id, name, mode, shift, requests, online }]
export const getMasters = async () => {
    const { data } = await http.get('/dispatcher/masters')
    return data
}

// GET /dispatcher/replanning-events -> [{ id, requestId, time, title, description, reason, engineerId }]
export const getReplanningEvents = async () => {
    const { data } = await http.get('/dispatcher/replanning-events')
    return data
}

// GET /dispatcher/requests?status=unallocated -> [{ id, date, window, address, service, suggested }]
export const getUnallocatedRequests = async () => {
    const { data } = await http.get('/dispatcher/requests', { params: { status: 'unallocated' } })
    return data
}

// GET /dispatcher/requests?status=distributed -> [{ id, description, status }]
export const getDistributedRequests = async () => {
    const { data } = await http.get('/dispatcher/requests', { params: { status: 'distributed' } })
    return data
}

// POST /engineers — создание инженера (EngineerFormModal в режиме "Создание")
// body: { fio, birthDate, skills, phone, transport }
export const createEngineer = async (data) => {
    const response = await http.post('/engineers', data)
    return response.data
}

// PATCH /engineers/:id — сохранение изменений инженера (EngineerFormModal в режиме "Изменение")
export const updateEngineer = async (id, data) => {
    const response = await http.patch(`/engineers/${id}`, data)
    return response.data
}

// POST /engineers/:id/remove-from-shift — кнопка "Снять со смены" (EngineerMenuModal)
export const removeEngineerFromShift = async (id) => {
    const response = await http.post(`/engineers/${id}/remove-from-shift`)
    return response.data
}

// POST /requests/:requestId/assign — назначить заявку конкретному инженеру.
// Используется и в ReassignModal (перепланирование), и в EngineerReplacementModal (замена мастера).
export const assignRequest = async (requestId, engineerId) => {
    const response = await http.post(`/requests/${requestId}/assign`, { engineerId })
    return response.data
}

// POST /requests/:requestId/return-to-pool — "Вернуть заявку в пул" (ReassignModal)
export const returnRequestToPool = async (requestId) => {
    const response = await http.post(`/requests/${requestId}/return-to-pool`)
    return response.data
}

// POST /requests/:requestId/auto-assign — "⚡ Авто-распределение" (ReassignModal)
export const autoAssignRequest = async (requestId) => {
    const response = await http.post(`/requests/${requestId}/auto-assign`)
    return response.data
}

// POST /requests/:requestId/confirm — "Утвердить" нераспределённую заявку (UnallocatedCard)
export const confirmRequest = async (requestId) => {
    const response = await http.post(`/requests/${requestId}/confirm`)
    return response.data
}

// POST /requests/urgent — создание срочной заявки (UrgentRequestModal)
// body: { client, phone, address, fault, when, priority }
export const createUrgentRequest = async (data) => {
    const response = await http.post('/requests/urgent', data)
    return response.data
}
