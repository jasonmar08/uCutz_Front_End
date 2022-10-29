import Axios from 'axios'

// export const BASE_URL = 'http://localhost:3001'
export const BASE_URL = 'https://ec2-44-204-41-235.compute-1.amazonaws.com:3001'

const Client = Axios.create({ baseURL: BASE_URL })

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default Client
