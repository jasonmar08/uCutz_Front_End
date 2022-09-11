import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import BarbershopDetails from './pages/BarbershopDetails'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import UserProfile from './pages/UserProfile'
import BarberRegisterLogin from './pages/BarberRegisterLogin'
import BarberProfile from './pages/BarberProfile'
import ReviewBarber from './pages/ReviewBarber'
import ReviewBarbershop from './pages/ReviewBarbershop'
import UserAppointment from './pages/UserAppointment'
import { CheckSessionUser } from './services/Auth'
import { GetAppointmentsByUserId } from './services/UserServices'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from './services/api'
import './App.css'

const App = () => {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [barber, setBarber] = useState(null)

  const [barbershops, setBarbershops] = useState([])
  const [userAppointments, setUserAppointments] = useState([])
  const [displayLoginDropdown, setDisplayLoginDropdown] = useState(false)
  const [displayProfileDropdown, setDisplayProfileDropdown] = useState(false)

  const checkToken = async () => {
    const user = await CheckSessionUser()
    setUser(user)
    toggleAuthenticated(true)
  }

  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     checkToken()
  //   }
  // }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }

    const getBarbershops = async () => {
      const res = await axios.get(`${BASE_URL}/barbershops/all`)
      setBarbershops(res.data)
    }
    getBarbershops()
  }, [])

  // const getUserAppointments = async () => {
  //   const res = await GetAppointmentsByUserId()
  //   console.log(user)
  //   setUserAppointments(res.data)
  // }
  // getUserAppointments()

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
              />
            }
          />
          <Route
            path="/barbershops/:barbershopId"
            element={<BarbershopDetails />}
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
          <Route path="/user/appointments" element={<UserAppointment />} />
          <Route path="/user/profile/:userId" element={<UserProfile />} />
          <Route path="/barber/login" element={<BarberRegisterLogin />} />
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
