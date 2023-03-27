import BarbershopHomeCard from '../components/BarbershopHomeCard'
import AppointmentCard from '../components/AppointmentCard'
import 'aos/dist/aos.css'
import Aos from 'aos'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'

const Home = ({
  barbershops,
  barbershopReviews,
  user,
  authenticated,
  getUserAppointments,
  userAppointments
}) => {
  // console.log(barbershops)

  useEffect(() => {
    Aos.init({ duration: 1000 })
  }, [])

  return user && authenticated ? (
    <div className="home-page-container-login">
      <img src="./assets/ucutz_new_logo.png" alt="logo" />
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
                barbershopReviews={barbershopReviews}
              />
            )
          )}
        </div>
      </section>
    </div>
  ) : (
    <div className="home-page-container">
      <div className="banner-overlay"></div>
      <div className="home-header-grid">
        <img data-aos="zoom-in" src="./assets/ucutz_new_logo.png" alt="logo" />
        <h1 data-aos="zoom-in" className="header-text">
          Relax, Look Great, Feel Confident.
        </h1>
        <NavLink
          data-aos="zoom-in"
          to="/user/register"
          className="header-button"
        >
          Get Fresh Today
        </NavLink>
      </div>
      <section className="page" id="barbershop-list">
        <h2 data-aos="fade-up">Barbershops</h2>
        <div data-aos="fade-up" className="flex-items">
          {barbershops.map(
            ({ id, business_name, city, state, business_image }) => (
              <BarbershopHomeCard
                key={id}
                name={business_name}
                city={city}
                state={state}
                thumbnail={business_image}
                id={id}
                barbershopReviews={barbershopReviews}
              />
            )
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
