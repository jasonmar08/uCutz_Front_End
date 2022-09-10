import UserDropdownLoginForm from './UserDropdownLoginForm'
import { NavLink } from 'react-router-dom'

const NavBar = ({ toggleDropdown, displayLoginDropdown, setDisplayLoginDropdown }) => {
  const handleClickedDropdown = () => {
    if (displayLoginDropdown === true) {
      return (
        <UserDropdownLoginForm
          // userLoggedIn={userLoggedIn}
          // setUserLoggedIn={setUserLoggedIn}
          toggleDropdown={toggleDropdown}
        />
      )
    }
  }

  return (
    <nav>
      <div className='navbar'>
        <NavLink to='/' className='logo'><h1>uCutz ✄</h1></NavLink>
        <div className='nav-labels'>
          <NavLink to='/barber/login' onClick={() => setDisplayLoginDropdown(false)} className='nav-link'>Are you a barber?</NavLink>
          <NavLink to='/' onClick={() => setDisplayLoginDropdown(false)} className='nav-link'>Home</NavLink>
          <a onClick={() => toggleDropdown()} className='nav-link'>Sign In</a>
        </div>
      </div>
      {handleClickedDropdown()}
    </nav>
  )
}

export default NavBar