import BarbershopHomeCard from '../components/BarbershopHomeCard'

const Home = ({ barbershops }) => {
  return (
    <div>
      <h1>Home</h1>
      <section className="page" id="barbershop-list">
        <h2>Barbershops</h2>
        <div className="flex-items">
          {barbershops.map(
            ({ id, business_name, city, state, business_image }) => (
              <BarbershopHomeCard
                key={id}
                name={business_name}
                city={city}
                state={state}
                thumbnail={business_image}
              />
            )
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
