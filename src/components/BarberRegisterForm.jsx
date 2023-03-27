import { RegisterBarber } from '../services/Auth'
import { CreateBarbershop } from '../services/BarberServices'
import { useNavigate, NavLink } from 'react-router-dom'
import { useState } from 'react'

const BarberRegisterForm = ({ barbershops }) => {
  let navigate = useNavigate()

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
    barber_image: '/assets/barber_profile_pic.png',
    barbershopId: ''
  })

  const [formValuesBarbershop, setFormValuesBarbershop] = useState({
    business_name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    phoneNumber: '',
    business_image: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleChangeBarbershop = (e) => {
    setFormValuesBarbershop({
      ...formValuesBarbershop,
      [e.target.name]: e.target.value
    })

    setFormValues({
      ...formValues,
      city: formValuesBarbershop.city,
      state: formValuesBarbershop.state,
      zip_code: formValuesBarbershop.zip_code
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await RegisterBarber({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      // city: formValues.city,
      // state: formValues.state,
      // zip_code: formValues.zip_code,
      phoneNumber: formValues.phoneNumber,
      // mobile: formValues.mobile,
      barber_image: '/assets/barber_profile_pic.png',
      barbershopId: formValues.barbershopId
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
      barber_image: '/assets/barber_profile_pic.png',
      barbershopId: ''
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
  }

  const handleSubmitWithBarbershop = async (e) => {
    e.preventDefault()

    const newBarbershop = await CreateBarbershop({
      business_name: formValuesBarbershop.business_name,
      address: formValuesBarbershop.address,
      city: formValuesBarbershop.city,
      state: formValuesBarbershop.state,
      zip_code: formValuesBarbershop.zip_code,
      phoneNumber: formValuesBarbershop.phoneNumber,
      business_image: formValuesBarbershop.business_image
    })

    await RegisterBarber({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      city: formValuesBarbershop.city,
      state: formValuesBarbershop.state,
      zip_code: formValuesBarbershop.zip_code,
      phoneNumber: formValues.phoneNumber,
      // mobile: formValues.mobile,
      barber_image: '/assets/barber_profile_pic.png',
      barbershopId: newBarbershop.id
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
      barber_image: '/assets/barber_profile_pic.png',
      barbershopId: ''
    })

    setFormValuesBarbershop({
      business_name: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
      phoneNumber: '',
      business_image: ''
    })

    navigate('/barber/login')
  }

  return formValues.barbershopId === 'Not Listed' ? (
    <div className="barber-register-container-barbershop">
      <h2>Barber Register</h2>
      <form
        onSubmit={handleSubmitWithBarbershop}
        className="barber-register-form"
      >
        <input
          onChange={handleChange}
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formValues.firstName}
          required
        ></input>
        <input
          onChange={handleChange}
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formValues.lastName}
          required
        ></input>
        <input
          onChange={handleChange}
          type="tel"
          name="phoneNumber"
          placeholder="Mobile Number"
          value={formValues.phoneNumber}
          required
        ></input>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          required
        ></input>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password}
          required
        ></input>
        <input
          onChange={handleChange}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formValues.confirmPassword}
          required
        ></input>
        <select
          onChange={handleChange}
          name="barbershopId"
          value={formValues.barbershopId}
          required
          className="barber-dropdown"
        >
          <option value="" disabled>
            Choose Affiliated Barbershop
          </option>
          {barbershops.map(({ id, business_name }) => (
            <option key={business_name} value={id}>
              {business_name}
            </option>
          ))}
          <option value={'Not Listed'}>Not Listed</option>
        </select>
        <label>Barbershop Info:</label>
        {/* <div className="barber-form-check-ctn">
          <label>Are you mobile?</label>
          <input type="checkbox" name='mobile' value={formValues.mobile} required></input>
        </div> */}
        <input
          onChange={handleChangeBarbershop}
          type="text"
          name="business_name"
          placeholder="Barbershop Name"
          value={formValuesBarbershop.business_name}
          required
        ></input>
        <input
          onChange={handleChangeBarbershop}
          type="text"
          name="address"
          placeholder="Address"
          value={formValuesBarbershop.address}
          required
        ></input>
        <input
          onChange={handleChangeBarbershop}
          type="text"
          name="city"
          placeholder="City"
          value={formValuesBarbershop.city}
          required
        ></input>
        <input
          onChange={handleChangeBarbershop}
          type="text"
          name="state"
          placeholder="State"
          value={formValuesBarbershop.state}
          required
        ></input>
        <input
          onChange={handleChangeBarbershop}
          type="text"
          name="zip_code"
          placeholder="Zip Code"
          value={formValuesBarbershop.zip_code}
          required
        ></input>
        <input
          onChange={handleChangeBarbershop}
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formValuesBarbershop.phoneNumber}
          required
        ></input>
        <input
          onChange={handleChangeBarbershop}
          type="text"
          name="business_image"
          placeholder="Business Image"
          value={formValuesBarbershop.business_image}
          required
        ></input>
        <button
          disabled={
            !formValues.email ||
            (!formValues.password &&
              formValues.confirmPassword === formValues.password)
          }
        >
          Create Account
        </button>
        <span>
          Already have an account? <NavLink to="/barber/login">Sign In</NavLink>
        </span>
      </form>
    </div>
  ) : (
    <div className="barber-register-container">
      <h2>Barber Register</h2>
      <form onSubmit={handleSubmit} className="barber-register-form">
        <input
          onChange={handleChange}
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formValues.firstName}
          required
        ></input>
        <input
          onChange={handleChange}
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formValues.lastName}
          required
        ></input>
        <input
          onChange={handleChange}
          type="tel"
          name="phoneNumber"
          placeholder="Mobile Number"
          value={formValues.phoneNumber}
          required
        ></input>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          required
        ></input>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password}
          required
        ></input>
        <input
          onChange={handleChange}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formValues.confirmPassword}
          required
        ></input>
        {/* <label>Service Location:</label> */}
        <select
          onChange={handleChange}
          name="barbershopId"
          value={formValues.barbershopId}
          required
          className="barber-dropdown"
        >
          <option value="" disabled>
            Choose Affiliated Barbershop
          </option>
          {barbershops.map(({ id, business_name }) => (
            <option key={business_name} value={id}>
              {business_name}
            </option>
          ))}
          <option value={'Not Listed'}>Not Listed</option>
        </select>
        {/* <input onChange={handleChange} type="text" name='city' placeholder="City" value={formValues.city} required></input>
        <input onChange={handleChange} type="text" name='state' placeholder="State" value={formValues.state} required></input>
        <input onChange={handleChange} type="text" name='zip_code' placeholder="Zip Code" value={formValues.zip_code} required></input> */}
        {/* <div className="barber-form-check-ctn">
          <label>Are you mobile?</label>
            <input type="checkbox" name='mobile' value={formValues.mobile} required></input>
        </div> */}
        <button
          disabled={
            !formValues.email ||
            (!formValues.password &&
              formValues.confirmPassword === formValues.password)
          }
        >
          Create Account
        </button>
        <span>
          Already have an account? <NavLink to="/barber/login">Sign In</NavLink>
        </span>
      </form>
    </div>
  )
}

export default BarberRegisterForm
