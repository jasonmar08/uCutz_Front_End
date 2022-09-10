const BarbershopHomeCard = ({ name, city, state, thumbnail }) => {

  return (
    <div>
      <div className="barbershop-card">
        <div className="thumbnail">
          <img src={thumbnail} alt={name} />
        </div>
        <h3>{name}</h3>
        <h5>{city}, {state}</h5>
      </div>
    </div>
  )
}

export default BarbershopHomeCard