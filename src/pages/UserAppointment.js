import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const UserAppointment = ({
  user,
  authenticated,
  getUserAppointments,
  userAppointments
}) => {
  const navigate = useNavigate()
  const { userId } = useParams()

  useEffect(() => {
    const getAppointments = async (userId) => {
      await getUserAppointments(userId)
    }
    if (userId) {
      getAppointments(userId)
    }
  }, [])

  return (
    <div>
      <h2>User Appointments Page</h2>
      <div className="home-appts-container">
        {userAppointments &&
          userAppointments.map(
            ({ id, inspoImage, appt_day, appt_date, appt_time }) => (
              <div className="home-appts-card" key={id}>
                <div className="appt-thumbnail">
                  <img src={inspoImage} alt="appointment" />
                </div>
                <div>
                  <h4>
                    {appt_day}, {appt_date}
                  </h4>
                  <h5>{appt_time}</h5>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  )
}

export default UserAppointment
