import Client from './api'

export const GetBarberAvailabilityDates = async (barberId) => {
  try {
    console.log('BBID', barberId)
    const res = await Client.get(`barbers/availability/dates/${barberId}`)
    console.log('RES DATA', res.data)
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
