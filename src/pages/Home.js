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
      <img src="./assets/uCutz_logo.png" alt="logo" />
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
      <img src="./assets/uCutz_logo.png" alt="logo" />
      <img
        className="colorss"
        src="https://cdn.iconfinder.com/icons/4360445/4831702/512/raster.png?token=1663207387-YJpt%2FyPOcXTBgVChWJ9yGo0uIhuWNsvtvnNepj%2BOF%2Fc%3D"
        alt="logo"
      />
      <img
        className="colorss2"
        src="https://cdn.iconfinder.com/icons/4360445/4831702/512/raster.png?token=1663207387-YJpt%2FyPOcXTBgVChWJ9yGo0uIhuWNsvtvnNepj%2BOF%2Fc%3D"
        alt="logo"
      />
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
