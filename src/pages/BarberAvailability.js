import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const BarberAvailability = ({
  getBarberAvailDates,
  barberAvailabilityDates,
  barbersInBarbershop,
  getBarberServices,
  barberServices
}) => {
  const navigate = useNavigate()
  const { barberId } = useParams()

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
          <div className="barber-avail-dates">
            {barberAvailabilityDates &&
              barberAvailabilityDates.map(
                ({ id, day, date, AvailabilityTimes }) => (
                  <div key={id}>
                    <div className="avail-dates">
                      <h4>{day}</h4>
                      <h5>({date})</h5>
                    </div>
                    <div className="avail-times">
                      {AvailabilityTimes.map(({ id, time }) => (
                        <div className="times">
                          <h5 key={id}>{time}</h5>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
          </div>
          <div className="barber-services-dropdown">
            <select>
              {barberServices.map(({ id, service_name, service_price }) => (
                <option key={id}>
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
      <button className="book-appt-btn">Book Appointment</button>
    </div>
  ) : (
    <div>
      <h2>Barber Availability</h2>
      <div className="barber-avail-container">
        <div className="barber-avail-pic">
          <img src={barber_image} alt="barber image" />
        </div>
        <div>
          <h3 className="no-avail">Barber Has No Availability</h3>
        </div>
      </div>
      <button className="go-back" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  )
}

export default BarberAvailability
