import UserLoginForm from '../components/UserLoginForm'

const UserLogin = ({
  setUser,
  toggleAuthenticated,
  toggleProfileDropdown,
  setDisplayProfileDropdown
}) => {
  return (
    <div className="user-login-page">
      <h1>User Login Page</h1>
      <UserLoginForm
        setUser={setUser}
        toggleAuthenticated={toggleAuthenticated}
        setDisplayProfileDropdown={setDisplayProfileDropdown}
      />
    </div>
  )
}

export default UserLogin
