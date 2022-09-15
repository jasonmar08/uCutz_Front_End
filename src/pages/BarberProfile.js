import {
  UpdateBarberProfileById,
  DeleteBarberAccount
} from '../services/BarberServices'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const BarberProfile = ({
  setBarber,
  toggleAuthenticatedBarber,
  getCurrentBarber,
  setCurrentBarber,
  currentBarber
}) => {
  const navigate = useNavigate()
  const [deletedBarber, setDeletedBarber] = useState([])
  const { barberId } = useParams()
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    zip_code: '',
    phoneNumber: '',
    barber_image: '../../assets/barber_profile_pic.png'
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {
      firstName,
      lastName,
      email,
      city,
      state,
      zip_code,
      phoneNumber,
      barber_image,
      id
    } = formState
    const response = await UpdateBarberProfileById(id, {
      firstName,
      lastName,
      email,
      city,
      state,
      zip_code,
      phoneNumber,
      barber_image
    })

    if (response.length > 1) {
      let barbers = response[1]
      if (barbers.length > 0) {
        let updatedBarber = barbers[0]
        setCurrentBarber(updatedBarber)
      }
    }

    navigate('/')
    console.log('FORMSTATE:', formState)
  }

  const handleSubmitDeleteBarber = async (barberId) => {
    const barber = await DeleteBarberAccount(barberId)
    setDeletedBarber(barber)
    if (barberId) {
      handleSubmitDeleteBarber(barberId)
      setBarber(null)
      toggleAuthenticatedBarber(false)
      localStorage.clear()
      navigate('/')
      // console.log('DELETED USER!')
    }
  }

  useEffect(() => {
    if (currentBarber) {
      setFormState(currentBarber)
    }
  }, [currentBarber])

  useEffect(() => {
    const getBarber = async (barberId) => {
      await getCurrentBarber(barberId)
    }
    if (barberId) {
      getBarber(barberId)
    }
    if (currentBarber) {
      setFormState(currentBarber)
    }
  }, [])

  return (
    <div>
      <h2>Hi, {formState.firstName}!</h2>
      <div className="user-profile-container">
        <div className="profile-img-grid">
          <img src={formState.barber_image} alt="user image" />
          <h4>Add your photo to allow your clients to better recognize you</h4>
        </div>
        <form onSubmit={handleSubmit} className="user-profile-form">
          <h4>Profile Photo:</h4>
          <input
            onChange={handleChange}
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formState.firstName}
            required
          ></input>
          <input
            onChange={handleChange}
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formState.lastName}
            required
          ></input>
          <input
            onChange={handleChange}
            type="text"
            name="phoneNumber"
            placeholder="Mobile Number"
            value={formState.phoneNumber}
            required
          ></input>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            placeholder="Email"
            value={formState.email}
            required
          ></input>
          <label>Service Location:</label>
          <input
            onChange={handleChange}
            type="text"
            name="city"
            placeholder="City"
            value={formState.city}
            required
          ></input>
          <input
            onChange={handleChange}
            type="text"
            name="state"
            placeholder="State"
            value={formState.state}
            required
          ></input>
          <input
            onChange={handleChange}
            type="text"
            name="zip_code"
            placeholder="Zip Code"
            value={formState.zip_code}
            required
          ></input>
          <input
            onChange={handleChange}
            type="text"
            name="barber_image"
            placeholder="Profile Photo"
            value={formState.barber_image}
            required
          ></input>
          <button>Update Profile</button>
        </form>
      </div>
      <button
        onClick={() => handleSubmitDeleteBarber(barberId)}
        className="delete-acc"
      >
        Delete Account
      </button>
    </div>
  )
}

export default BarberProfile
