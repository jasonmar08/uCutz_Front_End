import UserDropdownLoginForm from './UserDropdownLoginForm'
import { NavLink } from 'react-router-dom'

const NavBar = ({ toggleDropdown, displayLoginDropdown, setDisplayLoginDropdown, setUser, toggleAuthenticated, user, authenticated, toggleProfileDropdown, displayProfileDropdown, setDisplayProfileDropdown }) => {
  const handleClickLoginDropdown = () => {
    if (displayLoginDropdown === true) {
      return (
        <UserDropdownLoginForm toggleDropdown={toggleDropdown} setUser={setUser} toggleAuthenticated={toggleAuthenticated} setDisplayProfileDropdown={setDisplayProfileDropdown}
        />
      )
    }
  }

  const handleClickLogOut = () => {
    setUser(null)
    toggleAuthenticated(false)
  }

  const handleClickProfilePic = () => {
    if (displayProfileDropdown === true) {
    return (
      <div className='profile-dropdown'>
        <NavLink to='/user/profile/:userId' onClick={() => setDisplayProfileDropdown(false)}>Profile</NavLink>
        <NavLink to='/' onClick={() => {handleClickLogOut()}}>Log Out</NavLink>
      </div>
    )}
  }

  return user && authenticated ? (
    <nav>
      <div className='navbar'>
        <NavLink to='/' onClick={() => setDisplayProfileDropdown(false)} className='logo'><h1>uCutz ✄</h1></NavLink>
        <div className='nav-labels'>
          <NavLink to='/' onClick={() => setDisplayProfileDropdown(false)} className='nav-link'>Home</NavLink>
          <NavLink to='/user/appointments' onClick={() => setDisplayProfileDropdown(false)} className='nav-link'>Appointments</NavLink>
          <img src='../../assets/profile_pic_icon.png' onClick={() => toggleProfileDropdown()} alt='profile picture' />
        </div>
      </div>
      {handleClickProfilePic()}
    </nav>
  ) : (
    <nav>
      <div className='navbar'>
        <NavLink to='/' onClick={() => setDisplayLoginDropdown(false)} className='logo'><h1>uCutz ✄</h1></NavLink>
        <div className='nav-labels'>
          <NavLink to='/barber/login' onClick={() => setDisplayLoginDropdown(false)} className='nav-link'>Are you a barber?</NavLink>
          <NavLink to='/' onClick={() => setDisplayLoginDropdown(false)} className='nav-link'>Home</NavLink>
          <a onClick={() => toggleDropdown()} className='nav-link'>Sign In</a>
        </div>
      </div>
      {handleClickLoginDropdown()}
    </nav>
  )
}

export default NavBar