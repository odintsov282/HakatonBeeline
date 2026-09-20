export const masters = [
    { id: 1, name: 'Иван Петров', transport: 'Авто', shift: '08:00–17:00', ordersCount: 3, isActive: true },
    { id: 2, name: 'Алексей Смирнов', transport: 'Пеший', shift: '09:00–18:00', ordersCount: 2, isActive: false },
]

export const unallocatedRequests = [
    {
        id: 8921,
        date: '8 сентября 2026',
        window: '09:00 — 12:00',
        address: 'Тверская 12',
        service: 'Подключение интернета',
        suggested: { name: 'Иван Петров', note: 'Оптимален, +2.1 км' },
    },
]

export const distributedRequests = [
    { id: 8922, when: '8 сентября (12:00–15:00)', address: 'Ленинский пр. 45', status: 'В очереди' },
    { id: 8923, when: '8 сентября (15:00–17:00)', address: 'Арбат 18', status: 'В очереди' },
]