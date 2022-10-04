import { formatRating } from "../utilities/formatForm"

const BarbershopTopRating = ({ averageRating, reviews }) => {

  return (
    <div className="barbershop-top-rating">
      <h1>{reviews.length >= 1 ? averageRating : ''}</h1>
      <h3>{formatRating(averageRating)}</h3>
      <a href={'#reviews-scroll'}>{reviews.length} Reviews</a>
    </div>
  )
}

export default BarbershopTopRating