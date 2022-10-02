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
import BarberAppointment from './pages/BarberAppointment'
import ReviewBarber from './pages/ReviewBarber'
import ReviewBarbershop from './pages/ReviewBarbershop'
import BarberAvailability from './pages/BarberAvailability'
import UserAppointment from './pages/UserAppointment'
import { CheckSessionUser, CheckSessionBarber } from './services/Auth'
import {
  GetBarberAvailabilityDates,
  GetBarberServicesById,
  GetBarber,
  GetAppointmentsByBarberId,
  GetReviewsByBarbershopId
} from './services/BarberServices'
import {
  GetAppointmentsByUserId,
  GetUserById,
  GetUser,
  GetAllUsers,
  CreateAppointment
} from './services/UserServices'
import ScrollToTop from './components/ScrollToTop'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from './services/api'
import './App.css'

const App = () => {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [authenticatedBarber, toggleAuthenticatedBarber] = useState(false)
  const [user, setUser] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [allUsers, setAllUsers] = useState([])
  const [currentBarber, setCurrentBarber] = useState(null)
  const [barber, setBarber] = useState(null)

  const [barbershops, setBarbershops] = useState([])
  const [barbershopReviews, setBarbershopReviews] = useState([])
  const [barbersInBarbershop, setBarbersInBarbershop] = useState([])
  const [newAppointment, setNewAppointment] = useState([])
  const [userAppointments, setUserAppointments] = useState([])
  const [barberAppointments, setBarberAppointments] = useState([])
  const [displayLoginDropdown, setDisplayLoginDropdown] = useState(false)
  const [displayProfileDropdown, setDisplayProfileDropdown] = useState(false)
  const [displayBarberProfileDropdown, setDisplayBarberProfileDropdown] =
    useState(false)
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

  console.log('CCCUURRREE ', currentUser, currentBarber)
  // GETTING CURRENTLY LOGGED IN USER //
  const getCurrentUser = async (userId) => {
    const user = await GetUser()
    console.log('User?? Maybe?? ', user)
    if (user) {
      setCurrentUser(user)
      setUser(user)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  // GETTING CURRENTLY LOGGED IN BARBER //
  const getCurrentBarber = async (barberId) => {
    const barber = await GetBarber()
    console.log('CURRENT BARBER maybe:', barber)
    if (barber) {
      setCurrentBarber(barber)
      setBarber(barber)
    }
  }

  useEffect(() => {
    getCurrentBarber()
  }, [])

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

  // GETTING BARBER'S UPCOMING APPOINTMENTS FOR APPOINTMENT PAGE //
  const getBarberAppointments = async (id) => {
    const appointments = await GetAppointmentsByBarberId(id)
    setBarberAppointments(appointments)
  }

  // GETTING LIST OF BARBERSHOPS FOR HOMEPAGE //
  useEffect(() => {
    const getBarbershops = async () => {
      const res = await axios.get(`${BASE_URL}/barbershops/all`)
      setBarbershops(res.data)
    }
    getBarbershops()
  }, [])

  // GETTING BARBERSHOP REVIEWS BY THEIR ID //
  const getBarbershopReviews = async () => {
    const reviews = await GetReviewsByBarbershopId()
    setBarbershopReviews(reviews)
  }
  console.log('REVIEWSSSS', barbershopReviews)

  // GETTING ALL USERS //
  useEffect(() => {
    const getUsers = async () => {
      const users = await GetAllUsers()
      setAllUsers(users)
    }
    getUsers()
  }, [])
  console.log('ALL USERS: ', allUsers)

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

  const toggleBarberProfileDropdown = () => {
    displayBarberProfileDropdown === false
      ? setDisplayBarberProfileDropdown(true)
      : setDisplayBarberProfileDropdown(false)
  }

  console.log('CCUU ', currentUser)

  return (
    <div className="App">
      <ScrollToTop />
      <header>
        <NavBar
          displayLoginDropdown={displayLoginDropdown}
          setDisplayLoginDropdown={setDisplayLoginDropdown}
          displayBarberProfileDropdown={displayBarberProfileDropdown}
          setDisplayBarberProfileDropdown={setDisplayBarberProfileDropdown}
          toggleDropdown={toggleDropdown}
          setUser={setUser}
          toggleAuthenticated={toggleAuthenticated}
          user={user}
          barber={barber}
          setBarber={setBarber}
          toggleAuthenticatedBarber={toggleAuthenticatedBarber}
          authenticated={authenticated}
          authenticatedBarber={authenticatedBarber}
          toggleProfileDropdown={toggleProfileDropdown}
          toggleBarberProfileDropdown={toggleBarberProfileDropdown}
          displayProfileDropdown={displayProfileDropdown}
          setDisplayProfileDropdown={setDisplayProfileDropdown}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          currentBarber={currentBarber}
          setCurrentBarber={setCurrentBarber}
        />
      </header>
      <main>
        <Routes>
          <Route
            index
            element={
              <Home
                barbershops={barbershops}
                barbershopReviews={barbershopReviews}
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
                allUsers={allUsers}
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
                setCurrentUser={setCurrentUser}
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
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
          <Route
            path="/barber/appointments/:barberId"
            element={
              <BarberAppointment
                getBarberAppointments={getBarberAppointments}
                barberAppointments={barberAppointments}
              />
            }
          />
          <Route
            path="/barber/register"
            element={<BarberRegister barbershops={barbershops} />}
          />
          <Route
            path="/barber/login"
            element={
              <BarberLogin
                setBarber={setBarber}
                toggleAuthenticatedBarber={toggleAuthenticatedBarber}
                setCurrentBarber={setCurrentBarber}
                setDisplayBarberProfileDropdown={
                  setDisplayBarberProfileDropdown
                }
              />
            }
          />
          <Route
            path="/barber/profile/:barberId"
            element={
              <BarberProfile
                setCurrentBarber={setCurrentBarber}
                setBarber={setBarber}
                toggleAuthenticatedBarber={toggleAuthenticatedBarber}
                getCurrentBarber={getCurrentBarber}
                currentBarber={currentBarber}
              />
            }
          />
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
