import { SignInUser } from '../services/Auth'
import { useState } from 'react'
import { useNavigate, NavLink } from "react-router-dom"

const UserDropdownLoginForm = ({ toggleDropdown, setUser, toggleAuthenticated, setDisplayProfileDropdown, setCurrentUser }) => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = await SignInUser(formValues)

    setFormValues({
      email: '',
      password: ''
    })

    setUser(payload)
    setCurrentUser(payload)
    toggleAuthenticated(true)

    navigate('/')
    toggleDropdown()
    setDisplayProfileDropdown(false)
  }

  return (
    <div className="login-dropdown">
      <h3>User Sign In</h3>
      <form onSubmit={handleSubmit} className="dropdown-form">
        <input onChange={handleChange} type="email" name='email' placeholder="Email" value={formValues.email} required></input>
        <input onChange={handleChange} type="password" name='password' placeholder="Password" value={formValues.password} required></input>
        <button disabled={!formValues.email || !formValues.password}>Sign In</button>
      </form>
      <span>Not a Member? <NavLink to='/user/register' onClick={() => {toggleDropdown()}}>Sign Up</NavLink></span>
    </div>
  )
}

export default UserDropdownLoginForm