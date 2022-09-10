const BarberLoginForm = () => {

  return (
    <div className="barber-login-form">
      <h2>Barber Login</h2>
      <form>
        <input type="text" placeholder="Email"></input>
        <input type="text" placeholder="Password"></input>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default BarberLoginForm