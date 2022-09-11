import BarbershopHomeCard from '../components/BarbershopHomeCard'
import AppointmentCard from '../components/AppointmentCard'

const Home = ({ barbershops, user, authenticated }) => {
  return user && authenticated ? (
    <div>
      <h1>Home</h1>
      <section className="home-appointments">
        <h2>Upcoming Appointments:</h2>
        <div className="home-appts-container">
          <AppointmentCard />
        </div>
      </section>
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
  ) : (
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
