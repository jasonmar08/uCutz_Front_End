import Client from './api'

export const GetUserById = async (id) => {
  try {
    const res = await Client.get(`/users/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetAppointmentsByUserId = async (user_id) => {
  try {
    const res = await Client.get(`users/appointments/${user_id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
