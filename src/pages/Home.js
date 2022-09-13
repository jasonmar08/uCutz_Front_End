import BarbershopHomeCard from '../components/BarbershopHomeCard'
import AppointmentCard from '../components/AppointmentCard'

const Home = ({
  barbershops,
  user,
  authenticated,
  getUserAppointments,
  userAppointments
}) => {
  // console.log(barbershops)

  return user && authenticated ? (
    <div className="home-page-container">
      <h1>Home</h1>
      <section>
        <h2>Upcoming Appointments:</h2>
        <div>
          <AppointmentCard
            getUserAppointments={getUserAppointments}
            userAppointments={userAppointments}
            userId={user.id}
          />
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
                id={id}
              />
            )
          )}
        </div>
      </section>
    </div>
  ) : (
    <div className="home-page-container">
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
                id={id}
              />
            )
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
