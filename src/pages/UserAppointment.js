import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { formatTime } from '../utilities/formatForm'

const UserAppointment = ({
  user,
  authenticated,
  getUserAppointments,
  userAppointments
}) => {
  const { userId } = useParams()

  // const [apptClicked, setApptClicked] = useState(false)

  useEffect(() => {
    const getAppointments = async (userId) => {
      await getUserAppointments(userId)
    }
    if (userId) {
      getAppointments(userId)
    }
  }, [])

  const appointment = userAppointments.find(
    (e) => e.userId === parseInt(userId)
  )
  if (!appointment) {
    return <div>Appointment Not Found</div>
  }
  const { appt_day, appt_date, appt_time, service } = appointment

  // const handleApptClick = async () => {
  //   return apptClicked === false
  //     ? toggleApptClicked(true)
  //     : toggleApptClicked(false)
  // }

  // const showApptDetails = async () => {
  //   if (apptClicked === true) {
  //     return (
  //       <div>
  //         <h2>Appointment Details:</h2>
  //         <h4>
  //           Date: {appt_day}, {appt_date}
  //         </h4>
  //         <h4>Time: {appt_time}</h4>
  //         <h4>Service: {service}</h4>
  //       </div>
  //     )
  //   }
  // }

  // const handleApptClick = async () => {
  //   return apptClicked === false ? setApptClicked(true) : setApptClicked(false)
  // }

  // const showApptDetails = async () => {
  //   if (apptClicked === true) {
  //     return (
  //       <div>
  //         <h2>Appointment Details:</h2>
  //         <h4>
  //           Date: {appt_day}, {appt_date}
  //         </h4>
  //         <h4>Time: {appt_time}</h4>
  //         <h4>Service: {service}</h4>
  //       </div>
  //     )
  //   }
  // }

  return (
    <div className="user-appts-page">
      <h2>Your Upcoming Appointments</h2>
      <div className="user-appts-container">
        {userAppointments &&
          userAppointments.map(
            ({ id, inspoImage, appt_day, appt_date, appt_time, service }) => (
              <div className="user-appts-card" key={id}>
                <div className="user-appt-thumbnail">
                  <img src={inspoImage} alt="appointment" />
                </div>
                <div>
                  <h2>Appointment Details:</h2>
                  <h4>
                    Date: {appt_day}, {appt_date}
                  </h4>
                  <h4>Time: {formatTime(appt_time)}</h4>
                  <h4>Service: {service}</h4>
                </div>
              </div>
            )
          )}
      </div>
      {/* <div>
        <h2>Appointment Details:</h2>
        <h4>Date: {appt_date}</h4>
        <h4>Time: </h4>
        <h4>Service: </h4>
        <h4>Price: </h4>
      </div> */}
    </div>
  )
}

export default UserAppointment
