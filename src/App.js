import NavBar from './components/NavBar'
import Home from './pages/Home'
import BarbershopDetails from './pages/BarbershopDetails'
import UserRegisterLogin from './pages/UserRegisterLogin'
import UserProfile from './pages/UserProfile'
import BarberRegisterLogin from './pages/BarberRegisterLogin'
import BarberProfile from './pages/BarberProfile'
import ReviewBarber from './pages/ReviewBarber'
import ReviewBarbershop from './pages/ReviewBarbershop'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from './globals'
import './App.css'

const App = () => {
  const [barbershops, setBarbershops] = useState([])

  useEffect(() => {
    const getBarbershops = async () => {
      const res = await axios.get(`${BASE_URL}/barbershops/all`)
      setBarbershops(res.data)
    }
    getBarbershops()
  }, [])

  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route index element={<Home barbershops={barbershops} />} />
          <Route
            path="/barbershops/:barbershopId"
            element={<BarbershopDetails />}
          />
          <Route path="/user/login" element={<UserRegisterLogin />} />
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
    </div>
  )
}

export default App
