import { formatPhone } from '../utilities/formatForm'
import { useParams, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../services/api'
import axios from 'axios'

const BarbershopDetailsCard = ({ user, authenticated, barbershops, barbersInBarbershop, setBarbersInBarbershop }) => {
  useEffect(() => {
    const getBarbersByBarbershop = async () => {
      const res = await axios.get(`${BASE_URL}/barbershops/${barbershopId}/barbers`)
      setBarbersInBarbershop(res.data)
    }
    getBarbersByBarbershop()
  }, [])

  const { barbershopId } = useParams()
  console.log(barbershopId)

  const barbershop = barbershops.find(e => e.id === parseInt(barbershopId))
  if (!barbershop) {
    return <div>Barbershop Not Found</div>
  }
  const { id, business_image, business_name, address, city, state, zip_code, phoneNumber, business_site, fb_link, ig_link } = barbershop

  return user && authenticated ? (
    <div>
      <div className='barbershop-details-page'>
        <h2>{business_name}</h2>
        <div className="barbershop-container" key={id}>  
          <div className="map-container">
            <img src={business_image} alt='map' />
          </div>
          <div className="barbershop-info-container">
            <div>
              <h5>Location:</h5>
              <p>{address} {city}, {state} {zip_code}</p>
            </div>
            <div>
              <h5>Phone:</h5>
              <p>{formatPhone(phoneNumber)}</p>
            </div>
            <h4><a href={business_site} target='_blank'>Website</a></h4>
            <div>
              <h3>Follow Us:</h3>
              <a href={fb_link} target='_blank'>Facebook</a>
              <a href={ig_link} target='_blank'>Instagram</a>
            </div>
          </div>
        </div>
      </div>
      <div className='barbershop-barbers-container'>
        <h3>Schedule With A Barber:</h3>
        <div className='barbershop-barbers-grid'>
        {
          barbersInBarbershop.map(({ id, barber_image, firstName, lastName }) => (
              <div className="barbershop-barbers-card" key={barber_image}>
                <div className="thumbnail-round">
                  <NavLink to={`/barbershops/barbers/${id}/availability`}><img src={barber_image} alt='barber' /></NavLink>
                </div>
                <h3>{firstName} {lastName}</h3>
                {/* <h4>Book With Me!</h4> */}
              </div>
          ))
        }
            </div>
      </div>
    </div>
  ) : (
    <div>
      <div className='barbershop-details-page'>
        <h2>{business_name}</h2>
        <div className="barbershop-container" key={id}>  
          <div className="map-container">
            <img src={business_image} alt='map' />
          </div>
          <div className="barbershop-info-container">
            <div>
              <h5>Location:</h5>
              <p>{address} {city}, {state} {zip_code}</p>
            </div>
            <div>
              <h5>Phone:</h5>
              <p>{formatPhone(phoneNumber)}</p>
            </div>
            <h4><a href={business_site} target='_blank'>Website</a></h4>
            <div>
              <h3>Follow Us:</h3>
              <a href={fb_link} target='_blank'>Facebook</a>
              <a href={ig_link} target='_blank'>Instagram</a>
            </div>
          </div>
        </div>
      </div>
      <div className='barbershop-barbers-container'>
        <h3>Schedule With A Barber:</h3>
        <div className='barbershop-barbers-grid'>
        {
          barbersInBarbershop.map(({ id, barber_image, firstName, lastName }) => (
              <div className="barbershop-barbers-card" key={barber_image}>
                <div className="thumbnail-round">
                  <NavLink to='/user/login'><img src={barber_image} alt='barber' /></NavLink>
                </div>
                <h3>{firstName} {lastName}</h3>
                {/* <h4>Book With Me!</h4> */}
              </div>
          ))
        }
            </div>
      </div>
    </div>
  )
}

export default BarbershopDetailsCard