import UserLoginForm from '../components/UserLoginForm'

const UserLogin = ({
  setUser,
  toggleAuthenticated,
  toggleProfileDropdown,
  setDisplayProfileDropdown,
  setCurrentUser
}) => {
  return (
    <div className="user-login-page">
      <h1>User Login Page</h1>
      <UserLoginForm
        setUser={setUser}
        toggleAuthenticated={toggleAuthenticated}
        setDisplayProfileDropdown={setDisplayProfileDropdown}
        setCurrentUser={setCurrentUser}
      />
    </div>
  )
}

export default UserLogin
