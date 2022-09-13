import { NavLink } from "react-router-dom"

const BarberLoginForm = () => {

  return (
    <div className="barber-login-container">
      <h2>Barber Login</h2>
      <form className="barber-login-form">
        <input type="text" placeholder="Email"></input>
        <input type="text" placeholder="Password"></input>
        <button type="submit">Login</button>
        <span>Don't have an account? <NavLink to='/barber/register'>Sign Up</NavLink></span>
      </form>
    </div>
  )
}

export default BarberLoginForm