import Client from './api'

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/auth_user/login', data)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const SignInBarber = async (data) => {
  try {
    const res = await Client.post('/auth_barber/login', data)
    return res.data.barber
  } catch (error) {
    throw error
  }
}

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/auth_user/register', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const RegisterBarber = async (data) => {
  try {
    const res = await Client.post('/auth_barber/register', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSessionUser = async () => {
  try {
    const res = await Client.get('/auth_user/session')
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSessionBarber = async () => {
  try {
    const res = await Client.get('/auth_barber/session')
    return res.data
  } catch (error) {
    throw error
  }
}
