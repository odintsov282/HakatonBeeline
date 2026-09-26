export const setSession = (user) => localStorage.setItem('user', JSON.stringify(user))

export const getSession = () => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
}