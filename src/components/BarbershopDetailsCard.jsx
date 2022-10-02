import { GetAllBarbershopReviews } from '../services/BarberServices'
import { formatPhone, starReview } from '../utilities/formatForm'
import { useParams, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../services/api'
import axios from 'axios'

const BarbershopDetailsCard = ({ user, authenticated, barbershops, barbersInBarbershop, setBarbersInBarbershop, allUsers }) => {
  const [allReviews, setAllReviews] = useState([])
  let userName = ''

  useEffect(() => {
    const getBarbersByBarbershop = async () => {
      const res = await axios.get(`${BASE_URL}/barbershops/${barbershopId}/barbers`)
      setBarbersInBarbershop(res.data)
    }
    getBarbersByBarbershop()
  }, [])

  useEffect(() => {
    const getAllBarbershopReviews = async () => {
      const res = await GetAllBarbershopReviews()
      setAllReviews(res)
    }
    getAllBarbershopReviews()
  }, [])

  const { barbershopId } = useParams()
  console.log(barbershopId)

  const barbershop = barbershops.find(e => e.id === parseInt(barbershopId))
  if (!barbershop) {
    return <div>Barbershop Not Found</div>
  }
  const { id, business_image, business_name, address, city, state, zip_code, phoneNumber, business_site, fb_link, ig_link } = barbershop

  const reviews = allReviews.filter((e) => e.barbershopId === parseInt(barbershopId))
  let total = 0
  reviews.forEach(review => {
    total += review.rating
  
    const userReview = allUsers.filter(e => e.id === parseInt(review.userId))

    userReview.forEach((user) => {
      return userName = user.firstName
    })
  })
  
  let averageRating 
  if (reviews.length === 1) {
    averageRating = total
  } else if (reviews.length < 1) {
    averageRating = 'No Reviews Yet'
  } else {
    averageRating = total / reviews.length
  }


  return user && authenticated ? (
    <div>
      <div className='barbershop-details-page'>
        <h1>{business_name}</h1>
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
              <p>{phoneNumber ? formatPhone(phoneNumber) : 'No Phone'}</p>
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
          barbersInBarbershop.map(({ id, barber_image, firstName }) => (
              <div className="barbershop-barbers-card" key={id}>
                <div className="thumbnail-round">
                  <NavLink to={`/barbershops/barbers/${id}/availability`}><img src={barber_image} alt='barber' /></NavLink>
                </div>
                <h3>{firstName}</h3>
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
              <p>{phoneNumber ? formatPhone(phoneNumber) : 'No Phone'}</p>
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
          barbersInBarbershop.map(({ id, barber_image, firstName }) => (
              <div className="barbershop-barbers-card" key={id}>
                <div className="thumbnail-round">
                  <NavLink to='/user/login'><img src={barber_image} alt='barber' /></NavLink>
                </div>
                <h3>{firstName}</h3>
                {/* <h4>Book With Me!</h4> */}
              </div>
          ))
        }
        </div>
      </div>
      <div className='barbershop-reviews-container'>
      <div className='rate-barbershop'>
        <h4>Rate Your Experience:</h4>
        <h3>☆☆☆☆☆</h3>
        <input name='caption' placeholder='Caption'></input>
        <textarea name="comment" id="" placeholder='Comments'></textarea>
        <input name='review_image' placeholder='Photo (Optional)'></input>
        <button>Submit Review</button>
      </div>
        <h3>Avg. Rating: {starReview(averageRating)} {averageRating.toFixed(1)}</h3>
        <div className='barbershop-reviews'>
          {
            reviews && reviews.map(({ id, rating, caption, comment, review_image, userId }) => (
              <div key={id} className='barbershop-review-card'>
                <h3>{starReview(rating)}</h3>
                <h4>{userName} ({userId}) - {caption}</h4>
                {review_image ? <img src={review_image} alt='review'/> : ''}
                <h4>{comment}</h4>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default BarbershopDetailsCard