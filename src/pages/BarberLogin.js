import BarberLoginForm from '../components/BarberLoginForm'

const BarberLogin = ({ setBarber, toggleAuthenticatedBarber }) => {
  return (
    <div className="barber-login-page">
      <h2>Barber Login Page</h2>
      <BarberLoginForm
        setBarber={setBarber}
        toggleAuthenticatedBarber={toggleAuthenticatedBarber}
      />
    </div>
  )
}

export default BarberLogin
