import { useState } from "react"
// import { useNavigate } from 'react-router-dom'

const UserLoginForm = ({ toggleDropdown }) => {
  // let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await RegisterUser({
      email: formValues.email,
      password: formValues.password
    })

    setFormValues({
      email: '',
      password: ''
    })

    // navigate(`/user/profile/${user_id}`)
    console.log(`Signed in with user, ${formValues.email}`)
  }

  return (
    <div className="user-register-container">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit} className="user-register-form">
        <input onChange={handleChange} type="email" name='email' placeholder="Email" value={formValues.email} required></input>
        <input onChange={handleChange} type="password" name='password' placeholder="Password" value={formValues.password} required></input>
        <button>Create Account</button>
      </form>
    </div>
  )
}

export default UserLoginForm