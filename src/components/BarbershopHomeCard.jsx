import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { GetAllBarbershopReviews } from "../services/BarberServices"
import { formatRating } from "../utilities/formatForm"

const BarbershopHomeCard = ({ name, city, state, thumbnail, id, barbershopReviews }) => {
  const barbershopId = id
  const [allReviews, setAllReviews] = useState([])

  useEffect(() => {
    const getAllBarbershopReviews = async () => {
      const res = await GetAllBarbershopReviews()
      setAllReviews(res)
    }
    getAllBarbershopReviews()
  }, [])

  const reviews = allReviews.filter((e) => e.barbershopId === parseInt(barbershopId))
  let total = 0
  reviews.forEach(review => {
    total += review.rating

  })
  
  let averageRating
  if (reviews.length === 1) {
    averageRating = total
  } else if (reviews.length < 1) {
    averageRating = 'No Reviews Yet'
  } else {
    averageRating = total / reviews.length
  }

  // if (!reviews) {
  //   return <p>✩✩✩✩✩</p>
  // }
  const { rating } = reviews

  // const averageRating = () => {
  //   e
  // }

  // console.log('ALL RATINGS: ', reviews)

  return (
    <div>
      <div className="barbershop-card">
        <div className="thumbnail">
          <NavLink to={`/barbershops/${id}`}><img src={thumbnail} alt={name} /></NavLink>
        </div>
        <h3>{name}</h3>
        <div>{formatRating(averageRating)} ({reviews.length})</div>
        <h5>{city}, {state}</h5>
      </div>
    </div>
  )
}

export default BarbershopHomeCard