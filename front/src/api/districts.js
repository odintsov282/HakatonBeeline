import http from './http'

// Доп. запросы для ChoiceDistrictModal.jsx.
// Скачивание CSV (GET /districts/export) уже сделано прямо в компоненте через fetch
// (см. ChoiceDistrictModal.jsx, константа EXPORT_URL) — это специально не через http.js,
// потому что там нужен файл (blob), а не JSON, и это уже рабочий, готовый к бэкенду код.
// Здесь — то, чего пока не хватает: список районов (сейчас захардкожен в DISTRICTS)
// и подтверждённое удаление данных.

// GET /districts -> [{ id, name }]
export const getDistrictsList = async () => {
    const { data } = await http.get('/districts')
    return data
}

// DELETE /districts/:district/data?period=today|previous
// period соответствует чекбоксам "Сегодня" / "Предыдущие дни" в панели удаления
export const deleteDistrictData = async (district, period) => {
    const response = await http.delete(`/districts/${encodeURIComponent(district)}/data`, { params: { period } })
    return response.data
}
