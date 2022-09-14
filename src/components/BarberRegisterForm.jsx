import { RegisterBarber } from "../services/Auth"
import { useNavigate, NavLink } from "react-router-dom"
import { useState } from "react"

const BarberRegisterForm = () => {
  let navigate = useNavigate()

  const [checked, setChecked] = useState(false)

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    state: '',
    zip_code: '',
    phoneNumber: '',
    // mobile: false,
    barber_image: '../../assets/barber_profile_pic.png'
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await RegisterBarber({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      city: formValues.city,
      state: formValues.state,
      zip_code: formValues.zip_code,
      phoneNumber: formValues.phoneNumber,
      // mobile: formValues.mobile,
      barber_image: '../../assets/barber_profile_pic.png'
    })

    setFormValues({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      city: '',
      state: '',
      zip_code: '',
      phoneNumber: '',
      // mobile: false,
      barber_image: '../../assets/barber_profile_pic.png'
    })

    // const handleCheckbox = async () => {
    //   if ( formValues.mobile === false ) {
    //     checked = false
    //     setChecked(true)
    //   } else {
    //     setChecked(false)
    //   }
    // }

    navigate('/barber/login')
    console.log(`Created barber, ${formValues.firstName}`)
  }

  return (
    <div className="barber-register-container">
      <h2>Barber Register</h2>
      <form onSubmit={handleSubmit} className="barber-register-form">
        <input onChange={handleChange} type="text" name='firstName' placeholder="First Name" value={formValues.firstName} required></input>
        <input onChange={handleChange} type="text" name='lastName' placeholder="Last Name" value={formValues.lastName} required></input>
        <input onChange={handleChange} type="text" name='phoneNumber' placeholder="Mobile Number" value={formValues.phoneNumber} required></input>
        <input onChange={handleChange} type="text" name='email' placeholder="Email" value={formValues.email} required></input>
        <input onChange={handleChange} type="text" name='password' placeholder="Password" value={formValues.password} required></input>
        <input onChange={handleChange} type="text" name='confirmPassword' placeholder="Confirm Password" value={formValues.confirmPassword} required></input>
        <label>Service Location:</label>
        <input onChange={handleChange} type="text" name='city' placeholder="City" value={formValues.city} required></input>
        <input onChange={handleChange} type="text" name='state' placeholder="State" value={formValues.state} required></input>
        <input onChange={handleChange} type="text" name='zip_code' placeholder="Zip Code" value={formValues.zip_code} required></input>
        {/* <div className="barber-form-check-ctn">
          <label>Are you mobile?</label>
            <input type="checkbox" name='mobile' value={formValues.mobile} required></input>
        </div> */}
        <button disabled={!formValues.email || (!formValues.password && formValues.confirmPassword === formValues.password)}>Create Account</button>
        <span>Already have an account? <NavLink to='/barber/login'>Sign In</NavLink></span>
      </form>
    </div>
  )
}

export default BarberRegisterForm