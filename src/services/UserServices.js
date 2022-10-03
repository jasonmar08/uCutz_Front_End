import Client from './api'

export const GetUserById = async (userId) => {
  try {
    const res = await Client.get(`/users/${userId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetUser = async (userId) => {
  try {
    const res = await Client.get('/users')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetAllUsers = async () => {
  try {
    const res = await Client.get('/users/all')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetAppointmentsByUserId = async (userId) => {
  try {
    const res = await Client.get(`/users/appointments/${userId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateUserProfileById = async (userId, body) => {
  try {
    const user = await Client.put(`/users/${userId}`, {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      city: body.city,
      state: body.state,
      zip_code: body.zip_code,
      user_image: body.user_image
    })
    return user.data
  } catch (error) {
    throw error
  }
}

export const CreateAppointment = async (data) => {
  try {
    const res = await Client.post('/users/appointments', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteUserAccount = async (userId) => {
  try {
    const res = await Client.delete(`users/${userId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CreateBarbershopReview = async (data) => {
  try {
    const res = await Client.post('/barbershop_reviews/', data)
    return res.data
  } catch (error) {
    throw error
  }
}
