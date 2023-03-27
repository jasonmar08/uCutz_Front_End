import BarbershopTopRating from './BarbershopTopRating'
import ReviewImageFullScreen from './ReviewImageFullScreen'
import { GetReviewsByBarbershopId } from '../services/BarberServices'
import { CreateBarbershopReview } from '../services/UserServices'
import { formatPhone, formatRating, formatDate } from '../utilities/formatForm'
import { FaStar } from 'react-icons/fa'
import { useParams, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../services/api'
import axios from 'axios'
import { isDisabled } from '@testing-library/user-event/dist/utils'

const BarbershopDetailsCard = ({
  user,
  authenticated,
  barbershops,
  barbersInBarbershop,
  setBarbersInBarbershop,
  allUsers,
  toggleLoginToView,
  handleBarberImageClick,
  setBarberSelectedId
}) => {
  const navigate = useNavigate()
  const { barbershopId } = useParams()
  const [allReviews, setAllReviews] = useState([])
  const [rating, setRating] = useState(null)
  const [hoverRating, setHoverRating] = useState(null)
  const [fullImage, toggleFullImage] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
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
      const res = await axios.get(
        `${BASE_URL}/barbershops/${barbershopId}/barbers`
      )
      setBarbersInBarbershop(res.data)
    }
    getBarbersByBarbershop()
  }, [])

  useEffect(() => {
    const getAllBarbershopReviews = async (barbershopId) => {
      const res = await GetReviewsByBarbershopId(barbershopId)
      setAllReviews(res)
    }
    getAllBarbershopReviews(barbershopId)
  }, [])

  const barbershop = barbershops.find((e) => e.id === parseInt(barbershopId))
  if (!barbershop) {
    return <div>Barbershop Not Found</div>
  }
  const {
    id,
    business_image,
    business_name,
    address,
    city,
    state,
    zip_code,
    phoneNumber,
    business_site,
    fb_link,
    ig_link
  } = barbershop

  // FILTERING REVIEWS TO SHOW ONLY MATCHING BARBERSHOPID
  const reviews = allReviews.filter(
    (e) => e.barbershopId === parseInt(barbershopId)
  )
  let total = 0
  reviews.forEach((review) => {
    total += review.rating

    // FILTERING ALL USERS BY REVIEW.USERID AND USER.ID TO SHOW FIRSTNAME
    // const userReview = allUsers.filter(e => e.id === parseInt(review.userId))

    // userReview.forEach((user) => {

    //   if (user.id === parseInt(review.userId)){
    //     return userName = user.firstName
    //   }
    // })
    // console.log('USER REVIEW', userReview)
  })

  // CALCULATING BARBERSHOP AVERAGE RATING
  let barbershopRating = ''
  let averageRating

  if (reviews.length === 1) {
    averageRating = total
    averageRating = Number(averageRating).toFixed(1)
  } else if (reviews.length < 1) {
    averageRating = 'No reviews yet. Be the first to rate us!'
    barbershopRating = averageRating
  } else {
    averageRating = total / reviews.length
    averageRating = Number(averageRating).toFixed(1)
  }
  const displayAvgRating = () => {
    if (reviews.length === 1) {
      return (
        <h3>
          Avg. Rating: {formatRating(averageRating)} {averageRating} out of 5
        </h3>
      )
    } else if (reviews.length < 1) {
      return <h3>{barbershopRating}</h3>
    } else {
      return (
        <h3>
          Avg. Rating: {formatRating(averageRating)} {averageRating} out of 5
        </h3>
      )
    }
  }

  // VALUE FOR EACH STAR INPUT
  const starButtons = () => {
    return [...Array(5)].map((star, i) => {
      const ratingValue = i + 1

      return (
        <label key={i}>
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
            className={
              ratingValue <= (hoverRating || rating)
                ? 'yellow-star-btn'
                : 'gray-star-btn'
            }
            onMouseEnter={() => setHoverRating(ratingValue)}
            onMouseLeave={() => setHoverRating(null)}
          />
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

  // OPEN REVIEW IMAGE ON FULL SCREEN DIV
  const handleReviewImageClick = (review_image) => {
    if (fullImage === false) {
      setSelectedImage(review_image)
      toggleFullImage(true)
    } else {
      toggleFullImage(false)
      setSelectedImage('')
    }
  }

  // PROMPT USER LOGIN TO VIEW BARBER AVAILABILITY
  const handleBarberClick = (id) => {
    toggleLoginToView(true)
    setBarberSelectedId(id)
  }

  return user && authenticated ? (
    <div>
      <div className="barbershop-details-page">
        <h1>{business_name}</h1>
        <div className="barbershop-container" key={id}>
          <div className="map-container">
            <img src={business_image} alt="map" />
          </div>
          <BarbershopTopRating
            averageRating={averageRating}
            reviews={reviews}
          />
          <div className="barbershop-info-container">
            <div>
              <h5>Location:</h5>
              <p>
                {address} {city}, {state} {zip_code}
              </p>
            </div>
            <div>
              <h5>Phone:</h5>
              <p>{phoneNumber ? formatPhone(phoneNumber) : 'No Phone'}</p>
            </div>
            <h4>
              <a href={business_site} target="_blank">
                Website
              </a>
            </h4>
            <div>
              <h3>Follow Us:</h3>
              <div className="socials">
                <a href={fb_link} target="_blank">
                  Facebook
                </a>
                <a href={ig_link} target="_blank">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="barbershop-barbers-container">
        <h3>Schedule With A Barber:</h3>
        <div className="barbershop-barbers-grid">
          {barbersInBarbershop.map(({ id, barber_image, firstName }) => (
            <div className="barbershop-barbers-card" key={id}>
              <div className="thumbnail-round">
                <NavLink to={`/barbershops/barbers/${id}/availability`}>
                  <img src={barber_image} alt="barber" />
                </NavLink>
              </div>
              <h3 id="reviews-scroll">{firstName}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="barbershop-reviews-container">
        <div className="rate-barbershop">
          <h3>Rate Your Experience:</h3>
          <h3>{starButtons()}</h3>
          <p>Your Rating: {rating} out of 5</p>
          <input
            onChange={handleChange}
            type="text"
            name="caption"
            placeholder="Caption"
            value={reviewFormValues.caption}
            required
          ></input>
          <textarea
            onChange={handleChange}
            type="text"
            name="comment"
            placeholder="Comments"
            value={reviewFormValues.comment}
            required
          ></textarea>
          <input
            onChange={handleChange}
            type="text"
            name="review_image"
            placeholder="Photo (Optional)"
            value={reviewFormValues.review_image}
          ></input>
          <button onClick={handleSubmit}>Submit Review</button>
        </div>
        {displayAvgRating()}
        <div className="review-image-grid">
          {reviews.map(({ id, review_image }) => (
            <div key={id}>
              {review_image ? (
                <div
                  className="review-image"
                  onClick={() => handleReviewImageClick(review_image)}
                >
                  <img src={review_image} alt="review" />
                </div>
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
        <div className="barbershop-reviews">
          {reviews &&
            reviews.map(
              ({
                id,
                rating,
                caption,
                comment,
                review_image,
                createdAt,
                User
              }) => {
                const { firstName, user_image } = User
                return (
                  <div key={id} className="barbershop-review-card">
                    {fullImage === true ? (
                      <ReviewImageFullScreen
                        handleReviewImageClick={handleReviewImageClick}
                        selectedImage={selectedImage}
                      />
                    ) : (
                      ''
                    )}
                    <div className="user-review-info">
                      <div className="user-rating">
                        <div className="user-personal-info">
                          {user_image ? (
                            <img src={user_image} alt="user" />
                          ) : (
                            ''
                          )}
                          <div className="review-date">
                            <h4>{firstName}</h4>
                            <p>{formatDate(createdAt)}</p>
                          </div>
                        </div>
                        <h3>{formatRating(rating)}</h3>
                      </div>
                      <div className="user-caption">
                        <h4>{caption}</h4>
                      </div>
                    </div>
                    {review_image ? (
                      <div className="image-comment-review">
                        <div
                          className="review-image-card"
                          onClick={() => handleReviewImageClick(review_image)}
                        >
                          <img src={review_image} alt="review" />
                        </div>
                        <p>{comment}</p>
                      </div>
                    ) : (
                      <p>{comment}</p>
                    )}
                  </div>
                )
              }
            )}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="barbershop-details-page">
        <h2>{business_name}</h2>
        <div className="barbershop-container" key={id}>
          <div className="map-container">
            <img src={business_image} alt="map" />
          </div>
          <BarbershopTopRating
            averageRating={averageRating}
            reviews={reviews}
          />
          <div className="barbershop-info-container">
            <div>
              <h5>Address:</h5>
              <p>
                {address} {city}, {state} {zip_code}
              </p>
            </div>
            <div>
              <h5>Phone:</h5>
              <p>{phoneNumber ? formatPhone(phoneNumber) : 'No Phone'}</p>
            </div>
            <h4>
              <a href={business_site} target="_blank">
                Website
              </a>
            </h4>
            <div>
              <h3>Follow Us:</h3>
              <div className="socials">
                <a href={fb_link} target="_blank">
                  Facebook
                </a>
                <a href={ig_link} target="_blank">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="barbershop-barbers-container">
        <h3>Schedule With A Barber:</h3>
        <div className="barbershop-barbers-grid">
          {barbersInBarbershop.map(({ id, barber_image, firstName }) => (
            <div className="barbershop-barbers-card" key={id}>
              <div className="thumbnail-round">
                <NavLink to="/user/login">
                  <img
                    src={barber_image}
                    onClick={() => handleBarberClick(id)}
                    alt="barber"
                  />
                </NavLink>
              </div>
              <h3 id="reviews-scroll">{firstName}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="barbershop-reviews-container">
        <div className="rate-barbershop-unauth">
          <span>
            <NavLink to="/user/login">Sign In</NavLink>To Write A Review
          </span>
        </div>
        {displayAvgRating()}
        <div className="review-image-grid">
          {reviews.map(({ id, review_image }) => (
            <div key={id}>
              {review_image ? (
                <div
                  className="review-image"
                  onClick={() => handleReviewImageClick(review_image)}
                >
                  <img src={review_image} alt="review" />
                </div>
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
        <div className="barbershop-reviews">
          {reviews &&
            reviews.map(
              ({
                id,
                rating,
                caption,
                comment,
                review_image,
                createdAt,
                User
              }) => {
                const { firstName, user_image } = User
                return (
                  <div key={id} className="barbershop-review-card">
                    {fullImage === true ? (
                      <ReviewImageFullScreen
                        handleReviewImageClick={handleReviewImageClick}
                        selectedImage={selectedImage}
                      />
                    ) : (
                      ''
                    )}
                    <div className="user-review-info">
                      <div className="user-rating">
                        <div className="user-personal-info">
                          {user_image ? (
                            <img src={user_image} alt="user" />
                          ) : (
                            ''
                          )}
                          <div className="review-date">
                            <h4>{firstName}</h4>
                            <p>{formatDate(createdAt)}</p>
                          </div>
                        </div>
                        <h3>{formatRating(rating)}</h3>
                      </div>
                      <div className="user-caption">
                        <h4>{caption}</h4>
                      </div>
                    </div>
                    {review_image ? (
                      <div className="image-comment-review">
                        <div
                          className="review-image-card"
                          onClick={() => handleReviewImageClick(review_image)}
                        >
                          <img src={review_image} alt="review" />
                        </div>
                        <p>{comment}</p>
                      </div>
                    ) : (
                      <p>{comment}</p>
                    )}
                  </div>
                )
              }
            )}
        </div>
      </div>
    </div>
  )
}

export default BarbershopDetailsCard
