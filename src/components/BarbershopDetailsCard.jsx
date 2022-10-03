import { GetAllBarbershopReviews } from '../services/BarberServices'
import { CreateBarbershopReview } from '../services/UserServices'
import { formatPhone, formatRating } from '../utilities/formatForm'
import { FaStar } from 'react-icons/fa'
import { useParams, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../services/api'
import axios from 'axios'

const BarbershopDetailsCard = ({ user, authenticated, barbershops, barbersInBarbershop, setBarbersInBarbershop, allUsers }) => {
  const navigate = useNavigate()
  const { barbershopId } = useParams()
  const [allReviews, setAllReviews] = useState([])
  const [rating, setRating] = useState(null)
  const [hoverRating, setHoverRating] = useState(null)
  let userName = ''
  const [reviewFormValues, setReviewFormValues] = useState({
    rating: null,
    caption: '',
    comment: '',
    review_image: '',
    userId: user?.id,
    barbershopId: parseInt(barbershopId)
  })

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

  const barbershop = barbershops.find(e => e.id === parseInt(barbershopId))
  if (!barbershop) {
    return <div>Barbershop Not Found</div>
  }
  const { id, business_image, business_name, address, city, state, zip_code, phoneNumber, business_site, fb_link, ig_link } = barbershop

  // FILTERING REVIEWS TO SHOW ONLY MATCHING BARBERSHOPID
  const reviews = allReviews.filter((e) => e.barbershopId === parseInt(barbershopId))
  let total = 0
  reviews.forEach(review => {
    total += review.rating
  
    // FILTERING ALL USERS BY REVIEW.USERID AND USER.ID TO SHOW FIRSTNAME
    const userReview = allUsers.filter(e => e.id === parseInt(review.userId))

    userReview.forEach((user) => {
      if (user.id === parseInt(review.userId)){
        return userName = user.firstName
      }
    })
  })
  
  // CALCULATING BARBERSHOP RATING AVERAGE
  let barbershopRating = ''
  let averageRating
  if (reviews.length === 1) {
    averageRating = total
    averageRating = Number(averageRating).toFixed(1)
    barbershopRating = averageRating + ' out of 5'
  } else if (reviews.length < 1) {
    averageRating = 'No reviews. Be the first to rate us!'
    barbershopRating = averageRating
  } else {
    averageRating = total / reviews.length
    averageRating = Number(averageRating).toFixed(1)
    barbershopRating = averageRating + ' out of 5'
  }

  // VALUE FOR EACH STAR INPUT
  const starButtons = () => {
    return [...Array(5)].map((star, i) => {
      const ratingValue = i + 1
  
      return (
        <label>
          <input
            type="radio"
            name="rating"
            value={ratingValue}
            onClick={() => setRating(ratingValue)}
            onChange={handleChange}
            required
            id="star-radios"
          ></input>
          <FaStar
            className={ratingValue <= (hoverRating || rating) ? 'yellow-star-btn' : 'gray-star-btn'}
            onMouseEnter={() => setHoverRating(ratingValue)}
            onMouseLeave={() => setHoverRating(null)} />
        </label>
      )
    })
  }

  // CREATING NEW BARBERSHOP REVIEW
  const handleChange = (e) => {
    setReviewFormValues((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await CreateBarbershopReview({
      rating: reviewFormValues.rating,
      caption: reviewFormValues.caption,
      comment: reviewFormValues.comment,
      review_image: reviewFormValues.review_image,
      userId: user.id,
      barbershopId: parseInt(barbershopId)
    })
    setReviewFormValues({
      rating: null,
      caption: '',
      comment: '',
      review_image: '',
      userId: user.id,
      barbershopId: parseInt(barbershopId)
    })

    navigate('/')
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
      <div className='barbershop-reviews-container'>
        <div className='rate-barbershop'>
          <h3>Rate Your Experience:</h3>
          <h3>{starButtons()}</h3>
          <p>Your Rating: {rating}</p>
          <input onChange={handleChange} type='text' name='caption' placeholder='Caption' value={reviewFormValues.caption} required></input>
          <textarea onChange={handleChange} type='text' name="comment" placeholder='Comments' value={reviewFormValues.comment} required></textarea>
          <input onChange={handleChange} type='text' name='review_image' placeholder='Photo (Optional)' value={reviewFormValues.review_image}></input>
          <button onClick={handleSubmit}>Submit Review</button>
        </div>
        <h3>Avg. Rating: {formatRating(averageRating)} {barbershopRating}</h3>
        <div className='barbershop-reviews'>
          {
            reviews && reviews.map(({ id, rating, caption, comment, review_image, userId }) => (
              <div key={id} className='barbershop-review-card'>
                <h3>{formatRating(rating)}</h3>
                <h4>{userName} ({userId}) - {caption}</h4>
                {review_image ? <img src={review_image} alt='review'/> : ''}
                <p>{comment}</p>
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
        <h3>Avg. Rating: {formatRating(averageRating)} {barbershopRating}</h3>
        <div className='rate-barbershop-unauth'>
          <span><NavLink to='/user/login'>Sign In</NavLink> To Write A Review</span>
        </div>
        <div className='barbershop-reviews'>
          {
            reviews && reviews.map(({ id, rating, caption, comment, review_image, userId }) => (
              <div key={id} className='barbershop-review-card'>
                <h3>{formatRating(rating)}</h3>
                <h4>{userName} ({userId}) - {caption}</h4>
                {review_image ? <img src={review_image} alt='review'/> : ''}
                <p>{comment}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default BarbershopDetailsCard