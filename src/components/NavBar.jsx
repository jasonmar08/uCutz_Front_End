import { NavLink } from 'react-router-dom'

const NavBar = () => {

  return (
    <nav>
      <h1>uCutz ✄</h1>
      <div className='navbar'>
        <NavLink to='/barbers' className='nav-link'>Are you a barber?</NavLink>
        <NavLink to='/home' className='nav-link'>Home</NavLink>
        <NavLink to='/barbershops' className='nav-link'>Barbershops</NavLink>
        <NavLink to='/account' className='nav-link'>Register/Login</NavLink>
      </div>
    </nav>
  )
}

export default NavBar