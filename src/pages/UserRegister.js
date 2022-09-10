import UserRegisterForm from '../components/UserRegisterForm'

const UserRegister = ({ toggleDropdown }) => {
  return (
    <div className="user-register-page">
      <h1>User Register Page</h1>
      <UserRegisterForm toggleDropdown={toggleDropdown} />
    </div>
  )
}

export default UserRegister
