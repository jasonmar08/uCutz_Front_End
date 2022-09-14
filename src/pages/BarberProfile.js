import {
  UpdateBarberProfileById,
  DeleteBarberAccount
} from '../services/BarberServices'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const BarberProfile = () => {
  return (
    <div>
      <h2>Hi, {formState.firstName}!</h2>
      <div className="user-profile-container">
        <div className="profile-img-grid">
          <img src={formState.barber_image} alt="user image" />
          <h4>Add your photo to allow your barber to better serve you</h4>
        </div>
        <form onSubmit={handleSubmit} className="user-profile-form">
          <h4>Profile Photo:</h4>
          <input
            onChange={handleChange}
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formValues.firstName}
            required
          ></input>
          <input
            onChange={handleChange}
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formValues.lastName}
            required
          ></input>
          <input
            onChange={handleChange}
            type="text"
            name="phoneNumber"
            placeholder="Mobile Number"
            value={formValues.phoneNumber}
            required
          ></input>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            placeholder="Email"
            value={formValues.email}
            required
          ></input>
          <input
            onChange={handleChange}
            type="text"
            name="password"
            placeholder="Password"
            value={formValues.password}
            required
          ></input>
          <input
            onChange={handleChange}
            type="text"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formValues.confirmPassword}
            required
          ></input>
          <label>Service Location:</label>
          <input
            onChange={handleChange}
            type="text"
            name="city"
            placeholder="City"
            value={formValues.city}
            required
          ></input>
          <input
            onChange={handleChange}
            type="text"
            name="state"
            placeholder="State"
            value={formValues.state}
            required
          ></input>
          <input
            onChange={handleChange}
            type="text"
            name="zip_code"
            placeholder="Zip Code"
            value={formValues.zip_code}
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

export default BarberProfile
