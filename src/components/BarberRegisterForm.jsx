const BarberRegisterForm = () => {

  return (
    <div>
      <h2>Barber Register</h2>
      <form>
        <input type="text" placeholder="First Name"></input>
        <input type="text" placeholder="Last Name"></input>
        <input type="text" placeholder="Mobile Number"></input>
        <input type="text" placeholder="Email"></input>
        <input type="text" placeholder="Password"></input>
        <input type="text" placeholder="Confirm Password"></input>
        <label>Service Location:</label>
        <input type="text" placeholder="City"></input>
        <input type="text" placeholder="State"></input>
        <input type="text" placeholder="Zip Code"></input>
        <label>Are you mobile?:</label>
          <input type="checkbox"></input>
        <button type="submit">Create Account</button>
      </form>
    </div>
  )
}

export default BarberRegisterForm