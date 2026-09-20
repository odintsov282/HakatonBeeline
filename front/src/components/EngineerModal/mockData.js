export const engineerDetails = {
    id: 1,
    name: 'Иван Петров',
    role: 'Инженер-монтажник',
    transport: 'Автомобиль',
    status: 'На смене',
    shift: '08:00 – 17:00',
    location: 'Тверская ул. (в пути)',
    requests: [
        { id: 8921, address: 'Тверская 12', status: 'В процессе (ETA 09:40)', state: 'active' },
        { id: 8925, address: 'Лесная 4', status: 'Ожидает (13:00 - 15:00)', state: 'waiting' },
        { id: 8930, address: 'Арбат 18', status: 'Ожидает (15:30 - 17:00)', state: 'waiting' },
    ],
    equipment: [
        { id: 1, title: 'Router Beeline Wi-Fi 6 Pro', sn: '9842-AAAA-8812', condition: 'Новое', qty: 1 },
        { id: 2, title: 'ONT-терминал Huawei HG8120H', sn: 'HW-7721-0092-X', condition: 'Новое', qty: 2 },
    ],
}