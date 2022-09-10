import { NavLink } from "react-router-dom"

const UserDropdownLoginForm = ({ userLoggedIn, setUserLoggedIn, toggleDropdown }) => {

  return (
    <div className="login-dropdown">
      <h3>User Sign In</h3>
      <form className="dropdown-form">
        <input type="email" required placeholder="Email"></input>
        <input type="password" required placeholder="Password"></input>
        <button type="submit">Sign In</button>
      </form>
      <span>Not a Member? <NavLink to='/user/register' onClick={() => {toggleDropdown()}}>Sign Up</NavLink></span>
    </div>
  )
}

export default UserDropdownLoginForm