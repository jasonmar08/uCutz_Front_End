import Axios from 'axios'

// export const BASE_URL = 'http://localhost:3001'
// export const BASE_URL = 'http://ec2-100-25-200-94.compute-1.amazonaws.com:3001'
export const BASE_URL = 'https://ill-erin-nightingale-cap.cyclic.app'

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
