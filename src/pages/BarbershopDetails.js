import BarbershopDetailsCard from '../components/BarbershopDetailsCard'

const BarbershopDetails = ({
  user,
  authenticated,
  barbershops,
  barbersInBarbershop,
  setBarbersInBarbershop
}) => {
  return (
    <div>
      {/* <h1>Barbershop Details</h1> */}
      <BarbershopDetailsCard
        user={user}
        authenticated={authenticated}
        barbershops={barbershops}
        barbersInBarbershop={barbersInBarbershop}
        setBarbersInBarbershop={setBarbersInBarbershop}
      />
    </div>
  )
}

export default BarbershopDetails
