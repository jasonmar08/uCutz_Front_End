import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const BarberAvailability = ({
  getBarberAvailDates,
  barberAvailabilityDates,
  barbersInBarbershop,
  getBarberServices,
  barberServices,
  createNewAppointment,
  newAppointment,
  user
}) => {
  const navigate = useNavigate()
  const { barberId } = useParams()

  const [formValues, setFormValues] = useState({
    specialRequest: '',
    inspoImage: 'https://i.postimg.cc/sXk4hQkQ/8830286-512.png',
    appt_day: '',
    appt_date: '',
    appt_time: '',
    service: '',
    userId: user.id,
    barberId: barberId
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await createNewAppointment({
      specialRequest: '',
      inspoImage: 'https://i.postimg.cc/sXk4hQkQ/8830286-512.png',
      appt_day: formValues.day,
      appt_date: formValues.date,
      appt_time: formValues.time,
      service: formValues.service,
      userId: user.id,
      barberId: barberId
    })

    setFormValues({
      specialRequest: '',
      inspoImage: 'https://i.postimg.cc/sXk4hQkQ/8830286-512.png',
      appt_day: '',
      appt_date: '',
      appt_time: '',
      service: '',
      userId: user.id,
      barberId: barberId
    })

    navigate('/')
    console.log('CREATED APPOINTMENT')
  }

  const submitForm = () => {
    handleSubmit()
  }

  useEffect(() => {
    const getDates = async (barberId) => {
      await getBarberAvailDates(barberId)
    }
    if (barberId) {
      getDates(barberId)
    }

    const getServices = async (barberId) => {
      await getBarberServices(barberId)
    }
    if (barberId) {
      getServices(barberId)
    }
  }, [])

  const { barber_image } = barbersInBarbershop.find(
    (barber) => barber.id === parseInt(barberId)
  )
  if (!barber_image) {
    return <div>Barber Not Found</div>
  }

  return barberAvailabilityDates[0] ? (
    <div className="barber-avail-page">
      <h2>Barber Availability</h2>
      <div className="barber-avail-container">
        <div className="barber-avail-pic">
          <img src={barber_image} alt="barber image" />
        </div>
        <div className="dates-services-grid">
          <form onSubmit={handleSubmit}>
            <div className="barber-avail-dates">
              {barberAvailabilityDates &&
                barberAvailabilityDates.map(
                  ({ id, day, date, AvailabilityTimes }) => (
                    <div key={id}>
                      <div className="avail-dates">
                        <h4
                          onChange={handleChange}
                          name="day"
                          value={formValues.day}
                        >
                          {day}
                        </h4>
                        <h5
                          onChange={handleChange}
                          name="date"
                          value={formValues.date}
                        >
                          ({date})
                        </h5>
                      </div>
                      <div className="avail-times">
                        {AvailabilityTimes.map(({ id, time }) => (
                          <div className="times">
                            <h5
                              onChange={handleChange}
                              name="time"
                              value={formValues.time}
                              key={id}
                            >
                              {time}
                            </h5>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
            </div>
          </form>
          <div className="barber-services-dropdown">
            <select>
              {barberServices.map(({ id, service_name, service_price }) => (
                <option
                  onChange={handleChange}
                  name="service"
                  value={formValues.service}
                  key={id}
                >
                  {service_name} - {service_price}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="appt-info">
        <h5>Appointment Details:</h5>
        <h6>Date: </h6>
        <h6>Time: </h6>
        <h6>Service: </h6>
        <h6>Price: </h6>
      </div>
      <button onClick={() => submitForm()} className="book-appt-btn">
        Book Appointment
      </button>
    </div>
  ) : (
    <div className="barber-avail-page">
      <h2>Barber Availability</h2>
      <div className="barber-avail-container">
        <div className="barber-avail-pic">
          <img src={barber_image} alt="barber image" />
        </div>
        <div>
          <h3 className="no-avail">Barber Has No Current Availabilities</h3>
        </div>
      </div>
      <button className="go-back" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  )
}

export default BarberAvailability
