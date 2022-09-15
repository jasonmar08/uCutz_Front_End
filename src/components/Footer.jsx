import { NavLink } from "react-router-dom"

const Footer = () => {

  return (
    <section className="footer-container">
      <NavLink to='/' className='logo'><img className='logo-nav' src='./assets/uCutz_nav_logo.png' alt='logo' /></NavLink>
      <NavLink to='/' className='nav-link'>Home</NavLink>
      <NavLink to='/user/register' className='nav-link'>Need a cut? Sign Up!</NavLink>
      <NavLink to='/barber/register' className='nav-link'>Are you a barber?</NavLink>
    </section>
  )
}

export default Footer