import BarberLoginForm from '../components/BarberLoginForm'

const BarberLogin = ({
  setBarber,
  toggleAuthenticatedBarber,
  setCurrentBarber,
  setDisplayBarberProfileDropdown
}) => {
  return (
    <div className="barber-login-page">
      <h2>Barber Login Page</h2>
      <BarberLoginForm
        setBarber={setBarber}
        toggleAuthenticatedBarber={toggleAuthenticatedBarber}
        setCurrentBarber={setCurrentBarber}
        setDisplayBarberProfileDropdown={setDisplayBarberProfileDropdown}
      />
    </div>
  )
}

export default BarberLogin
