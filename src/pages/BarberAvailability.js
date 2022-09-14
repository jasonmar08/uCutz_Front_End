import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { GetBarberById } from '../services/BarberServices'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const BarberAvailability = ({
  getBarberAvailDates,
  barberAvailabilityDates,
  getBarberServices,
  barberServices,
  createNewAppointment,
  newAppointment,
  user
}) => {
  const navigate = useNavigate()
  const { barberId } = useParams()

  const [barbershop, setBarbershop] = useState([])

  const [dates, setDates] = useState([])
  const [times, setTimes] = useState([])

  const [formValues, setFormValues] = useState({
    specialRequest: '',
    inspoImage: 'https://i.postimg.cc/sXk4hQkQ/8830286-512.png',
    appt_day: '',
    appt_date: '',
    appt_time: '',
    service: '',
    userId: user?.id,
    barberId: parseInt(barberId)
  })

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setFormValues((prevstate) => ({
      ...prevstate,
      service: e.target.value
    }))
  }
  console.log('FORM VALL', formValues)
  const handleSubmit = async (e) => {
    await createNewAppointment({
      specialRequest: '',
      inspoImage: 'https://i.postimg.cc/sXk4hQkQ/8830286-512.png',
      appt_day: formValues.appt_day,
      appt_date: formValues.appt_date,
      appt_time: formValues.appt_time,
      service: formValues.service.split(' - ')[0],
      userId: user?.id,
      barberId: parseInt(barberId)
    })
    setFormValues({
      specialRequest: '',
      inspoImage: 'https://i.postimg.cc/sXk4hQkQ/8830286-512.png',
      appt_day: '',
      appt_date: '',
      appt_time: '',
      service: '',
      userId: user?.id,
      barberId: parseInt(barberId)
    })

    navigate('/')
    console.log('CREATED APPOINTMENT')
  }

  const chooseTime = (time, day, date) => {
    setFormValues((prevstate) => ({
      ...prevstate,
      appt_day: day,
      appt_date: date,
      appt_time: time
    }))
  }

  useEffect(() => {
    const getBarbershop = async (id) => {
      const res = await GetBarberById(id)
      console.log('RES', res)
      setBarbershop(res?.[0])
    }
    getBarbershop(barberId)

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

  console.log('BARBERSHOP', barbershop)
  if (!barbershop.barber_image) {
    return <div>Barber Not Found</div>
  }

  return barberAvailabilityDates[0] ? (
    <div className="barber-avail-page">
      <h2>Barber Availability</h2>
      <div className="barber-avail-container">
        <div className="barber-avail-pic">
          <img src={barbershop.barber_image} alt="barber image" />
        </div>
        <div className="dates-services-grid">
          <form onSubmit={handleSubmit}>
            <div className="barber-avail-dates">
              {barberAvailabilityDates &&
                barberAvailabilityDates.map(
                  ({ id, day, date, AvailabilityTimes }) => (
                    <div key={id}>
                      <div className="avail-dates">
                        <h4 name="day" value={formValues.day}>
                          {day}
                        </h4>
                        <h5 name="date" value={formValues.date}>
                          ({date})
                        </h5>
                      </div>
                      <div className="avail-times">
                        {AvailabilityTimes.map(({ id, time, dateId }) => (
                          <div className="times">
                            <h5
                              onClick={() => chooseTime(time, day, date)}
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
            <select onChange={handleChange} value={formValues.service}>
              {barberServices.map(({ id, service_name, service_price }) => (
                <option
                  name="service"
                  key={id}
                  value={`${service_name} - ${service_price}`}
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
        <h6>Date: {formValues?.appt_date}</h6>
        <h6>Time: {formValues?.appt_time}</h6>
        <h6>Service: {formValues?.service.split(' - ')[0]}</h6>
        <h6>Price: {formValues?.service.split(' - ')[1]}</h6>
      </div>
      <button onClick={() => handleSubmit()} className="book-appt-btn">
        Book Appointment
      </button>
    </div>
  ) : (
    <div className="barber-avail-page">
      <h2>Barber Availability</h2>
      <div className="barber-avail-container">
        <div className="barber-avail-pic">
          <img src={barbershop?.barber_image} alt="barber image" />
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
