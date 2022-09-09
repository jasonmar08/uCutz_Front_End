import { NavLink } from 'react-router-dom'

const NavBar = () => {

  return (
    <nav>
      <h1>uCutz ✄</h1>
      <div className='navbar'>
        <NavLink to='/barber/login' className='nav-link'>Are you a barber?</NavLink>
        <NavLink to='/' className='nav-link'>Home</NavLink>
        <NavLink to='/user/login' className='nav-link'>Login</NavLink>
      </div>
    </nav>
  )
}

export default NavBar