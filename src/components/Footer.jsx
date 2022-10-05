import { NavLink } from "react-router-dom"

const Footer = ({ setDisplayLoginDropdown, toggleLoginToView }) => {

  return (
    <section className="footer-container">
      <NavLink to='/' className='logo'><img className='logo-nav' src='/assets/uCutz_nav_logo.png' onClick={() => {toggleLoginToView(false); setDisplayLoginDropdown(false);}} alt='logo' /></NavLink>
      <NavLink to='/' className='nav-link' onClick={() => {toggleLoginToView(false); setDisplayLoginDropdown(false);}}>Home</NavLink>
      <NavLink to='/user/register' className='nav-link' onClick={() => {toggleLoginToView(false); setDisplayLoginDropdown(false);}}>Need a cut? Sign Up!</NavLink>
      <NavLink to='/barber/register' className='nav-link' onClick={() => {toggleLoginToView(false); setDisplayLoginDropdown(false);}}>Are you a barber?</NavLink>
    </section>
  )
}

export default Footer