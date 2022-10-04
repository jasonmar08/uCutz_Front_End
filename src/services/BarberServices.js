import Client from './api'

export const CreateBarbershop = async (data) => {
  try {
    const res = await Client.post('/barbershops/', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetBarberAvailabilityDates = async (barberId) => {
  try {
    const res = await Client.get(`barbers/availability/dates/${barberId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetBarber = async (barberId) => {
  try {
    const res = await Client.get('/barbers')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetBarberAvailabilityTimes = async (dateId) => {
  try {
    const res = await Client.get(`barbers/availability/dates/times/${dateId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetBarberServicesById = async (barberId) => {
  try {
    const res = await Client.get(`barbers/services/${barberId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetBarberById = async (barberId) => {
  try {
    const res = await Client.get(`barbers/${barberId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetAppointmentsByBarberId = async (barberId) => {
  try {
    const res = await Client.get(`/barbers/appointments/${barberId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateBarberProfileById = async (barberId, body) => {
  try {
    const barber = await Client.put(`/barbers/${barberId}`, {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      city: body.city,
      state: body.state,
      zip_code: body.zip_code,
      phoneNumber: body.phoneNumber,
      barber_image: body.barber_image
    })
    return barber.data
  } catch (error) {
    throw error
  }
}

export const DeleteBarberAccount = async (barberId) => {
  try {
    const res = await Client.delete(`barbers/${barberId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetAllBarbershopReviews = async () => {
  try {
    const res = await Client.get(`barbershop_reviews/all`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetReviewsByBarbershopId = async (barbershopId) => {
  try {
    const res = await Client.get(`barbershop_reviews/${barbershopId}`)
    return res.data
  } catch (error) {
    throw error
  }
}
