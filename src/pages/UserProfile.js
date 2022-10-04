import {
  UpdateUserProfileById,
  DeleteUserAccount
} from '../services/UserServices'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UserProfile = ({
  setUser,
  toggleAuthenticated,
  user,
  authenticated,
  getCurrentUser,
  setCurrentUser,
  currentUser
}) => {
  const navigate = useNavigate()
  const [deletedUser, setDeletedUser] = useState([])
  const { userId } = useParams()
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    zip_code: '',
    user_image: '../../assets/profile_pic_icon.png'
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
      user_image,
      id
    } = formState
    const response = await UpdateUserProfileById(id, {
      firstName,
      lastName,
      email,
      city,
      state,
      zip_code,
      user_image
    })

    if (response.length > 1) {
      let users = response[1]
      if (users.length > 0) {
        let updatedUser = users[0]
        setCurrentUser(updatedUser)
      }
    }

    navigate('/')
  }

  const handleSubmitDeleteUser = async (userId) => {
    const user = await DeleteUserAccount(userId)
    setDeletedUser(user)
    if (userId) {
      handleSubmitDeleteUser(userId)
      setUser(null)
      toggleAuthenticated(false)
      localStorage.clear()
      navigate('/')
    }
  }

  useEffect(() => {
    if (currentUser) {
      setFormState(currentUser)
    }
  }, [currentUser])

  useEffect(() => {
    const getUser = async (userId) => {
      await getCurrentUser(userId)
    }
    if (userId) {
      getUser(userId)
    }
    if (currentUser) {
      setFormState(currentUser)
    }
  }, [])

  return (
    <div>
      <h2>Hi, {formState.firstName}!</h2>
      <div className="user-profile-container">
        <div className="profile-img-grid">
          <img src={formState.user_image} alt="user image" />
          <h4>Add your photo to allow your barber to better serve you</h4>
        </div>
        <form onSubmit={handleSubmit} className="user-profile-form">
          <h4>Profile Photo:</h4>
          <input
            onChange={handleChange}
            type="text"
            name="user_image"
            placeholder="Profile Photo"
            value={formState.user_image}
          ></input>
          <h4>First Name:</h4>
          <input
            onChange={handleChange}
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formState.firstName}
            required
          ></input>
          <h4>Last Name:</h4>
          <input
            onChange={handleChange}
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formState.lastName}
            required
          ></input>
          <h4>Email:</h4>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            value={formState.email}
            required
          ></input>
          <h4>City:</h4>
          <input
            onChange={handleChange}
            type="text"
            name="city"
            placeholder="City"
            value={formState.city}
            required
          ></input>
          <h4>State:</h4>
          <input
            onChange={handleChange}
            type="text"
            name="state"
            placeholder="State"
            value={formState.state}
            required
          ></input>
          <h4>Zip Code:</h4>
          <input
            onChange={handleChange}
            type="text"
            name="zip_code"
            placeholder="Zip Code"
            value={formState.zip_code}
            required
          ></input>
          <button>Update Profile</button>
        </form>
      </div>
      <button
        onClick={() => handleSubmitDeleteUser(userId)}
        className="delete-acc"
      >
        Delete Account
      </button>
    </div>
  )
}

export default UserProfile
