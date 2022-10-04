import { SignInBarber } from "../services/Auth"
import { useState } from "react"
import { useNavigate, NavLink } from "react-router-dom"

const BarberLoginForm = ({ setBarber, toggleAuthenticatedBarber, setCurrentBarber, setDisplayBarberProfileDropdown }) => {
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

    const payload = await SignInBarber(formValues)

    setFormValues({
      email: '',
      password: ''
    })

    setBarber(payload)
    setCurrentBarber(payload)
    toggleAuthenticatedBarber(true)

    navigate('/')
    setDisplayBarberProfileDropdown(false)
  }

  return (
    <div className="barber-login-container">
      <h2>Barber Login</h2>
      <form onSubmit={handleSubmit} className="barber-login-form">
        <input onChange={handleChange} type="email" name='email' placeholder="Email" value={formValues.email} required></input>
        <input onChange={handleChange} type="password" name='password' placeholder="Password" value={formValues.password}></input>
        <button disabled={!formValues.email || !formValues.password}>Login</button>
        <span>Don't have an account? <NavLink to='/barber/register'>Sign Up</NavLink></span>
      </form>
    </div>
  )
}

export default BarberLoginForm