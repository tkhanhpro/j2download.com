export default {
    J2DOWN_SECRET: import.meta.env.VITE_J2DOWN_SECRET,

    BASE_URL: process.env.NODE_ENV === 'production' ? 'https://j2download.com/' : 'http://localhost:4002',
    API_URL: process.env.NODE_ENV === 'production' ? 'https://api.j2download.com/v1/' : 'http://localhost:4002/v1/',
    API_URL_DOWNLOAD: process.env.NODE_ENV === 'production' ? 'https://api.j2download.com/download/?url=' : 'http://localhost:4002/download/?url=',
    SOCKET_ENDPOINT: process.env.NODE_ENV === 'production' ? 'https://socket.j2download.com/' : 'https://socket.j2download.com/',
}