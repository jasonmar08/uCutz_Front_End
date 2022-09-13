import { NavLink } from "react-router-dom"

const BarberRegisterForm = () => {

  return (
    <div className="barber-register-container">
      <h2>Barber Register</h2>
      <form className="barber-register-form">
        <input type="text" placeholder="First Name"></input>
        <input type="text" placeholder="Last Name"></input>
        <input type="text" placeholder="Mobile Number"></input>
        <input type="text" placeholder="Email"></input>
        <input type="text" placeholder="Password"></input>
        <input type="text" placeholder="Confirm Password"></input>
        <label>Service Location:</label>
        <input type="text" placeholder="City"></input>
        <input type="text" placeholder="State"></input>
        <input type="text" placeholder="Zip Code"></input>
        <div className="barber-form-check-ctn">
          <label>Are you mobile?</label>
            <input type="checkbox"></input>
        </div>
        <button type="submit">Create Account</button>
        <span>Already have an account? <NavLink to='/barber/login'>Sign In</NavLink></span>
      </form>
    </div>
  )
}

export default BarberRegisterForm