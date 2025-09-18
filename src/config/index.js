export default {
    J2DOWN_SECRET: import.meta.env.VITE_J2DOWN_SECRET,
    BASE_URL: process.env.NODE_ENV === 'production' ? 'https://tk-down.vercel.app/' : 'http://localhost:4002',
    API_URL: process.env.NODE_ENV === 'production' ? 'https://api.tk-down.vercel.app/v1/' : 'http://localhost:4002/v1/',
    API_URL_DOWNLOAD: process.env.NODE_ENV === 'production' ? 'https://api.tk-down.vercel.app/download/?url=' : 'http://localhost:4002/download/?url=',
    SOCKET_ENDPOINT: process.env.NODE_ENV === 'production' ? 'https://socket.tk-down.vercel.app/' : 'https://socket.j2download.com/',
}
