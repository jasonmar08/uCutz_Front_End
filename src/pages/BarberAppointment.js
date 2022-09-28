import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { formatTime, formatDate } from '../utilities/formatForm'

const BarberAppointment = ({ getBarberAppointments, barberAppointments }) => {
  const { barberId } = useParams()

  useEffect(() => {
    const getAppointments = async (barberId) => {
      await getBarberAppointments(barberId)
    }
    if (barberId) {
      getAppointments(barberId)
    }
  }, [])

  const appointment = barberAppointments.find(
    (e) => e.barberId === parseInt(barberId)
  )
  if (!appointment) {
    return <div>No Curent Appointments</div>
  }
  const { appt_day, appt_date, appt_time, service } = appointment

  return (
    <div className="barber-appts-page">
      <h2>Upcoming Clients</h2>
      <div className="barber-appts-container">
        {barberAppointments &&
          barberAppointments.map(
            ({ id, inspoImage, appt_day, appt_date, appt_time, service }) => (
              <div className="barber-appts-card" key={id}>
                <div className="barber-appt-thumbnail">
                  <img src={inspoImage} alt="appointment" />
                </div>
                <div>
                  <h2>Appointment Details:</h2>
                  <h4>
                    Date: {appt_day}, {formatDate(appt_date)}
                  </h4>
                  <h4>Time: {formatTime(appt_time)}</h4>
                  <h4>Service: {service}</h4>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  )
}

export default BarberAppointment
