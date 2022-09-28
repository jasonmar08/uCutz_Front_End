import { formatTime, formatDate } from '../utilities/formatForm'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const AppointmentCard = ({ getUserAppointments, userAppointments, userId }) => {
  

  useEffect(() => {
    const getAppointments = async (userId) => {
      await getUserAppointments(userId)
    }
    if (userId) {
      getAppointments(userId)
    }
  }, [])

  console.log('APPT USER ID:', userId)

  return (
    <div className='home-appts-container'>
      {
        userAppointments && userAppointments.map(({ id, inspoImage, appt_day, appt_date, appt_time }) => (
          <div className='home-appts-card' key={id}>
            <div className='appt-thumbnail'>
              <NavLink to={`/user/appointments/${userId}`}><img src={inspoImage} alt='appointment' /></NavLink>
            </div>
            <div>
              <h4>{appt_day}, {formatDate(appt_date)}</h4>
              <h5>{formatTime(appt_time)}</h5>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default AppointmentCard