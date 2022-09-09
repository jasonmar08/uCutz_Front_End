const BarbershopHomeCard = ({ name, city, state, thumbnail }) => {

  return (
    <div>
      <span className="barbershop-card">
        <img src={thumbnail} />
        <h3>{name}</h3>
        <h5>{city}, {state}</h5>
      </span>
    </div>
  )
}

export default BarbershopHomeCard