import UserLoginForm from '../components/UserLoginForm'

const UserLogin = ({
  setUser,
  toggleAuthenticated,
  toggleProfileDropdown,
  setDisplayProfileDropdown,
  setCurrentUser,
  loginToView,
  toggleLoginToView,
  barberSelectedId
}) => {
  return (
    <div className="user-login-page">
      <div className="forms-overlay"></div>
      <h1>User Login Page</h1>
      {loginToView === true ? (
        <h3 id="login-to-view">Please login to view barber's availability</h3>
      ) : (
        toggleLoginToView(false)
      )}
      <UserLoginForm
        setUser={setUser}
        toggleAuthenticated={toggleAuthenticated}
        setDisplayProfileDropdown={setDisplayProfileDropdown}
        setCurrentUser={setCurrentUser}
        loginToView={loginToView}
        toggleLoginToView={toggleLoginToView}
        barberSelectedId={barberSelectedId}
      />
    </div>
  )
}

export default UserLogin
