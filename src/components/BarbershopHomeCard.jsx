import { NavLink } from "react-router-dom"

const BarbershopHomeCard = ({ name, city, state, thumbnail, id }) => {

  return (
    <div>
      <div className="barbershop-card">
        <div className="thumbnail">
          <NavLink to={`/barbershops/${id}`}><img src={thumbnail} alt={name} /></NavLink>
        </div>
        <h3>{name}</h3>
        <h5>{city}, {state}</h5>
      </div>
    </div>
  )
}

export default BarbershopHomeCard