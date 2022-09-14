import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import BarbershopDetails from './pages/BarbershopDetails'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import UserProfile from './pages/UserProfile'
import BarberRegister from './pages/BarberRegister'
import BarberLogin from './pages/BarberLogin'
import BarberProfile from './pages/BarberProfile'
import ReviewBarber from './pages/ReviewBarber'
import ReviewBarbershop from './pages/ReviewBarbershop'
import BarberAvailability from './pages/BarberAvailability'
import UserAppointment from './pages/UserAppointment'
import { CheckSessionUser, CheckSessionBarber } from './services/Auth'
import {
  GetBarberAvailabilityDates,
  GetBarberServicesById
} from './services/BarberServices'
import {
  GetAppointmentsByUserId,
  GetUserById,
  CreateAppointment
} from './services/UserServices'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from './services/api'
import './App.css'

const App = () => {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [authenticatedBarber, toggleAuthenticatedBarber] = useState(false)
  const [user, setUser] = useState(null)
  const [currentUser, setCurrentUser] = useState([])
  const [barber, setBarber] = useState(null)

  const [barbershops, setBarbershops] = useState([])
  const [barbersInBarbershop, setBarbersInBarbershop] = useState([])
  const [newAppointment, setNewAppointment] = useState([])
  const [userAppointments, setUserAppointments] = useState([])
  const [displayLoginDropdown, setDisplayLoginDropdown] = useState(false)
  const [displayProfileDropdown, setDisplayProfileDropdown] = useState(false)
  const [barberAvailabilityDates, setBarberAvailabilityDates] = useState([])
  const [barberServices, setBarberServices] = useState([])

  const checkTokenUser = async () => {
    const user = await CheckSessionUser()
    setUser(user)
    toggleAuthenticated(true)
  }

  const checkTokenBarber = async () => {
    const barber = await CheckSessionBarber()
    setBarber(barber)
    toggleAuthenticatedBarber(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkTokenUser()
      checkTokenBarber()
    }
  }, [])

  // GETTING CURRENTLY LOGGED IN USER //
  const getCurrentUser = async (userId) => {
    const user = await GetUserById(userId)
    console.log('CURRENT USER:', user)
    setCurrentUser(user)
  }

  // GETTING BARBER'S AVAILABLE DATES WITH TIMES JOINED //
  const getBarberAvailDates = async (id) => {
    console.log('ID', id)
    const dates = await GetBarberAvailabilityDates(id)
    console.log('DATES', dates)
    setBarberAvailabilityDates(dates)
  }
  console.log('avail dates', barberAvailabilityDates)

  // GETTING EACH BARBER'S SERVICES //
  const getBarberServices = async (barberId) => {
    const services = await GetBarberServicesById(barberId)
    setBarberServices(services)
  }

  // USER CREATING NEW APPOINTMENT //
  const createNewAppointment = async (body) => {
    const appointment = await CreateAppointment(body)
    setNewAppointment(appointment)
  }

  // GETTING USER'S UPCOMING APPOINTMENTS FOR HOMEPAGE //
  const getUserAppointments = async (id) => {
    console.log('USER ID', id)
    const appointments = await GetAppointmentsByUserId(id)
    setUserAppointments(appointments)
  }

  // GETTING LIST OF BARBERSHOPS FOR HOMEPAGE //
  useEffect(() => {
    const getBarbershops = async () => {
      const res = await axios.get(`${BASE_URL}/barbershops/all`)
      setBarbershops(res.data)
    }
    getBarbershops()
  }, [])

  const toggleDropdown = () => {
    displayLoginDropdown === false
      ? setDisplayLoginDropdown(true)
      : setDisplayLoginDropdown(false)
  }

  const toggleProfileDropdown = () => {
    displayProfileDropdown === false
      ? setDisplayProfileDropdown(true)
      : setDisplayProfileDropdown(false)
  }

  return (
    <div className="App">
      <header>
        <NavBar
          displayLoginDropdown={displayLoginDropdown}
          setDisplayLoginDropdown={setDisplayLoginDropdown}
          toggleDropdown={toggleDropdown}
          setUser={setUser}
          toggleAuthenticated={toggleAuthenticated}
          user={user}
          authenticated={authenticated}
          toggleProfileDropdown={toggleProfileDropdown}
          displayProfileDropdown={displayProfileDropdown}
          setDisplayProfileDropdown={setDisplayProfileDropdown}
          currentUser={currentUser}
        />
      </header>
      <main>
        <Routes>
          <Route
            index
            element={
              <Home
                barbershops={barbershops}
                user={user}
                authenticated={authenticated}
                getUserAppointments={getUserAppointments}
                userAppointments={userAppointments}
              />
            }
          />
          <Route
            path="/barbershops/:barbershopId"
            element={
              <BarbershopDetails
                user={user}
                authenticated={authenticated}
                barbershops={barbershops}
                barbersInBarbershop={barbersInBarbershop}
                setBarbersInBarbershop={setBarbersInBarbershop}
              />
            }
          />
          <Route
            path="/barbershops/barbers/:barberId/availability"
            element={
              <BarberAvailability
                getBarberAvailDates={getBarberAvailDates}
                barberAvailabilityDates={barberAvailabilityDates}
                barbersInBarbershop={barbersInBarbershop}
                getBarberServices={getBarberServices}
                barberServices={barberServices}
                createNewAppointment={createNewAppointment}
                newAppointment={newAppointment}
                user={user}
              />
            }
          />
          <Route path="/user/register" element={<UserRegister />} />
          <Route
            path="/user/login"
            element={
              <UserLogin
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
                setDisplayProfileDropdown={setDisplayProfileDropdown}
              />
            }
          />
          <Route
            path="/user/appointments/:userId"
            element={
              <UserAppointment
                user={user}
                authenticated={authenticated}
                getUserAppointments={getUserAppointments}
                userAppointments={userAppointments}
              />
            }
          />
          <Route
            path="/user/profile/:userId"
            element={
              <UserProfile
                user={user}
                authenticated={authenticated}
                getCurrentUser={getCurrentUser}
                currentUser={currentUser}
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
          <Route path="/barber/register" element={<BarberRegister />} />
          <Route
            path="/barber/login"
            element={
              <BarberLogin
                setBarber={setBarber}
                toggleAuthenticatedBarber={toggleAuthenticatedBarber}
              />
            }
          />
          <Route path="/barber/profile/:barberId" element={<BarberProfile />} />
          <Route path="/barbers/:barberId/review" element={<ReviewBarber />} />
          <Route
            path="/barbershops/:barbershopId/review"
            element={<ReviewBarbershop />}
          />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
