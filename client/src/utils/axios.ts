import axois from 'axios'

const instance = axois.create({
    baseURL: `http://localhost:3001/api`,
})

instance.interceptors.request.use(config => {
    config.headers.AccessControlAllowOrigin = "*"
    return config
})

export default instance