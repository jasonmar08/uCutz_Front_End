import BarberRegisterForm from '../components/BarberRegisterForm'

const BarberRegister = ({ barbershops }) => {
  return (
    <div className="barber-register-page">
      <div className="forms-overlay"></div>
      <h2>Barber Register Page</h2>
      <BarberRegisterForm barbershops={barbershops} />
    </div>
  )
}

export default BarberRegister
