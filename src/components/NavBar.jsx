import UserDropdownLoginForm from './UserDropdownLoginForm'
import { NavLink } from 'react-router-dom'

const NavBar = ({ toggleDropdown, displayLoginDropdown, setDisplayLoginDropdown, setUser, toggleAuthenticated, user, authenticated, toggleProfileDropdown, displayProfileDropdown, setDisplayProfileDropdown, currentUser, barber, setBarber, toggleAuthenticatedBarber, displayBarberProfileDropdown, setDisplayBarberProfileDropdown, authenticatedBarber, currentBarber, toggleBarberProfileDropdown }) => {
  const handleClickLoginDropdown = () => {
    if (displayLoginDropdown === true) {
      return (
        <UserDropdownLoginForm toggleDropdown={toggleDropdown} setUser={setUser} toggleAuthenticated={toggleAuthenticated} setDisplayProfileDropdown={setDisplayProfileDropdown}
        />
      )
    }
  }

  const handleClickBarberLogOut = () => {
    setBarber(null)
    toggleAuthenticatedBarber(false)
    localStorage.clear()
  }

  const handleClickLogOut = () => {
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const handleClickBarberProfilePic = () => {
    if (displayBarberProfileDropdown === true) {
    return (
      <div className='profile-dropdown'>
        <NavLink to={`/barber/profile/${barber.id}`} onClick={() => setDisplayBarberProfileDropdown(false)}>Profile</NavLink>
        <NavLink to='/' onClick={() => {handleClickBarberLogOut()}}>Log Out</NavLink>
      </div>
    )}
  }

  const handleClickProfilePic = () => {
    if (displayProfileDropdown === true) {
    return (
      <div className='profile-dropdown'>
        <NavLink to={`/user/profile/${user.id}`} onClick={() => setDisplayProfileDropdown(false)}>Profile</NavLink>
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
          <NavLink to={`/user/appointments/${user.id}`} onClick={() => setDisplayProfileDropdown(false)} className='nav-link'>Appointments</NavLink>
          <img src={currentUser.user_image} onClick={() => toggleProfileDropdown()} alt='profile picture' />
        </div>
      </div>
      {handleClickProfilePic()}
    </nav>
  ) : (
    <nav>
      <div className='navbar'>
        <NavLink to='/' onClick={() => setDisplayLoginDropdown(false)} className='logo'><h1>uCutz ✄</h1></NavLink>
        <div className='nav-labels'>
          <NavLink to='/barber/register' onClick={() => setDisplayLoginDropdown(false)} className='nav-link'>Are you a barber?</NavLink>
          <NavLink to='/' onClick={() => setDisplayLoginDropdown(false)} className='nav-link'>Home</NavLink>
          <a onClick={() => toggleDropdown()} className='nav-link'>Sign In</a>
        </div>
      </div>
      {handleClickLoginDropdown()}
    </nav>
  )
  //   ||
  // barber && authenticatedBarber ? (
  //   <nav>
  //     <div className='navbar'>
  //       <NavLink to='/' onClick={() => setDisplayBarberProfileDropdown(false)} className='logo'><h1>uCutz ✄</h1></NavLink>
  //       <div className='nav-labels'>
  //         <NavLink to='/' onClick={() => setDisplayBarberProfileDropdown(false)} className='nav-link'>Home</NavLink>
  //         <NavLink to={`/barber/appointments/${barber.id}`} onClick={() => setDisplayBarberProfileDropdown(false)} className='nav-link'>Appointments</NavLink>
  //         <img src={currentBarber.barber} onClick={() => toggleBarberProfileDropdown()} alt='profile picture' />
  //       </div>
  //     </div>
  //     {handleClickBarberProfilePic()}
  //   </nav>
  // ) : (
  //   <nav>
  //     <div className='navbar'>
  //       <NavLink to='/' onClick={() => setDisplayLoginDropdown(false)} className='logo'><h1>uCutz ✄</h1></NavLink>
  //       <div className='nav-labels'>
  //         <NavLink to='/barber/register' onClick={() => setDisplayLoginDropdown(false)} className='nav-link'>Are you a barber?</NavLink>
  //         <NavLink to='/' onClick={() => setDisplayLoginDropdown(false)} className='nav-link'>Home</NavLink>
  //         <a onClick={() => toggleDropdown()} className='nav-link'>Sign In</a>
  //       </div>
  //     </div>
  //     {handleClickLoginDropdown()}
  //   </nav>
  // )
}

export default NavBar