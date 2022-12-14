import { SignInUser } from '../services/Auth'
import { useState } from "react"
import { useNavigate, NavLink } from 'react-router-dom'

const UserLoginForm = ({ setUser, toggleAuthenticated, setDisplayProfileDropdown, setCurrentUser, loginToView, toggleLoginToView, barberSelectedId }) => {
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

    loginToView === true ? navigate(`/barbershops/barbers/${barberSelectedId}/availability`) : navigate('/')
    setDisplayProfileDropdown(false)
    toggleLoginToView(false)
  }

  return (
    <div className="user-login-container">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit} className="user-login-form">
        <input onChange={handleChange} type="email" name='email' placeholder="Email" value={formValues.email} required></input>
        <input onChange={handleChange} type="password" name='password' placeholder="Password" value={formValues.password} required></input>
        <button disabled={!formValues.email || !formValues.password}>Sign In</button>
        <span onClick={() => toggleLoginToView(false)}>Don't have an account? <NavLink to='/user/register'>Sign Up</NavLink></span>
      </form>
    </div>
  )
}

export default UserLoginForm