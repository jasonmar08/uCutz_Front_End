import { RegisterUser } from '../services/Auth'
import { useState } from "react"
import { useNavigate, NavLink } from 'react-router-dom'

const UserRegisterForm = () => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    state: '',
    zip_code: '',
    user_image: '../../assets/profile_pic_icon.png'
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await RegisterUser({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      city: formValues.city,
      state: formValues.state,
      zip_code: formValues.zip_code,
      user_image: '../../assets/profile_pic_icon.png'
    })

    setFormValues({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      city: '',
      state: '',
      zip_code: '',
      user_image: '../../assets/profile_pic_icon.png'
    })

    navigate('/user/login')
    console.log(`Created user, ${formValues.firstName}`)
  }

  return (
    <div className="user-register-container">
      <h2>User Register</h2>
      <form onSubmit={handleSubmit} className="user-register-form">
        <input onChange={handleChange} type="text" name="firstName" placeholder="First Name" value={formValues.firstName} required></input>
        <input onChange={handleChange} type="text" name='lastName' placeholder="Last Name" value={formValues.lastName} required></input>
        <input onChange={handleChange} type="email" name='email' placeholder="Email" value={formValues.email} required></input>
        <input onChange={handleChange} type="password" name='password' placeholder="Password" value={formValues.password} required></input>
        <input onChange={handleChange} type="password" name="confirmPassword" placeholder="Confirm Password" value={formValues.confirmPassword} required></input>
        <input onChange={handleChange} type="text" name='city' placeholder="City" value={formValues.city} required></input>
        <input onChange={handleChange} type="text" name='state' placeholder="State" value={formValues.state} required></input>
        <input onChange={handleChange} type="text" name='zip_code' placeholder="Zip Code" value={formValues.zip_code} required></input>
        <button disabled={!formValues.email || (!formValues.password && formValues.confirmPassword === formValues.password)}>Create Account</button>
        <span>Already have an account? <NavLink to='/user/login'>Sign In</NavLink></span>
      </form>
    </div>
  )
}

export default UserRegisterForm