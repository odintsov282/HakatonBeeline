import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const authRequest = async (data) => {
    const  response = await axios.post (`${API_URL}/auth`, data) // Заменить /api/auth на реальный эндпоинт
    return response.data
}