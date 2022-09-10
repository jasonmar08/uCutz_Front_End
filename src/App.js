import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import BarbershopDetails from './pages/BarbershopDetails'
import UserRegister from './pages/UserRegister'
import UserProfile from './pages/UserProfile'
import BarberRegisterLogin from './pages/BarberRegisterLogin'
import BarberProfile from './pages/BarberProfile'
import ReviewBarber from './pages/ReviewBarber'
import ReviewBarbershop from './pages/ReviewBarbershop'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from './services/api'
import './App.css'

const App = () => {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const [barbershops, setBarbershops] = useState([])
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [displayLoginDropdown, setDisplayLoginDropdown] = useState(false)

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

  return (
    <div className="App">
      <header>
        <NavBar
          displayLoginDropdown={displayLoginDropdown}
          setDisplayLoginDropdown={setDisplayLoginDropdown}
          toggleDropdown={toggleDropdown}
        />
      </header>
      <main>
        <Routes>
          <Route
            index
            element={
              <Home
                barbershops={barbershops}
                userLoggedIn={userLoggedIn}
                setUserLoggedIn={setUserLoggedIn}
                displayLoginDropdown={displayLoginDropdown}
              />
            }
          />
          <Route
            path="/barbershops/:barbershopId"
            element={<BarbershopDetails />}
          />
          <Route
            path="/user/register"
            element={<UserRegister toggleDropdown={toggleDropdown} />}
          />
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
