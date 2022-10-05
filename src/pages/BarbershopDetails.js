import BarbershopDetailsCard from '../components/BarbershopDetailsCard'

const BarbershopDetails = ({
  user,
  authenticated,
  barbershops,
  barbersInBarbershop,
  setBarbersInBarbershop,
  allUsers,
  toggleLoginToView,
  handleBarberImageClick,
  setBarberSelectedId
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
        allUsers={allUsers}
        toggleLoginToView={toggleLoginToView}
        handleBarberImageClick={handleBarberImageClick}
        setBarberSelectedId={setBarberSelectedId}
      />
    </div>
  )
}

export default BarbershopDetails
