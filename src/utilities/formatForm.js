import { FaStar } from 'react-icons/fa'

export const formatPhone = (num) => {
  return `(${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6)}`
}

export const formatTime = (time) => {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time
  ]

  if (time.length > 1) {
    time = time.slice(1)
    time[5] = +time[0] < 12 ? 'AM' : 'PM'
    time[0] = +time[0] % 12 || 12
  }
  let timeBegin = time.join('').slice(0, 5)
  let timeEnd = time.join('').slice(5)

  if (timeBegin[4] === ':') {
    timeBegin = timeBegin.slice(0, 4)
  } else {
    timeBegin = timeBegin
  }

  if (timeEnd[0] === ':') {
    timeEnd = timeEnd.slice(3)
  } else {
    timeEnd = timeEnd.slice(2)
  }

  return timeBegin.concat(timeEnd)
}

export const formatDate = (date) => {
  let month = date.slice(5, 7)
  let day = date.slice(8, 10)
  let year = date.slice(0, 4)

  if (month === '01') {
    month = 'Jan'
  } else if (month === '02') {
    month = 'Feb'
  } else if (month === '03') {
    month = 'Mar'
  } else if (month === '04') {
    month = 'Apr'
  } else if (month === '05') {
    month = 'May'
  } else if (month === '06') {
    month = 'Jun'
  } else if (month === '07') {
    month = 'Jul'
  } else if (month === '08') {
    month = 'Aug'
  } else if (month === '09') {
    month = 'Sep'
  } else if (month === '10') {
    month = 'Oct'
  } else if (month === '11') {
    month = 'Nov'
  } else if (month === '12') {
    month = 'Dec'
  }

  return `${month} ${day}, ${year}`
}

// export const formatRating = (rating) => {
//   if (rating === 1) {
//     return [...Array(5)].map((star, i) => {
//       return <FaStar className={i <= 0 ? 'yellow-star' : 'gray-star'} />
//     })
//   } else if (rating === 2) {
//     return [...Array(5)].map((star, i) => {
//       return <FaStar className={i <= 1 ? 'yellow-star' : 'gray-star'} />
//     })
//   } else if (rating === 3) {
//     return [...Array(5)].map((star, i) => {
//       return <FaStar className={i <= 2 ? 'yellow-star' : 'gray-star'} />
//     })
//   } else if (rating === 4) {
//     return [...Array(5)].map((star, i) => {
//       return <FaStar className={i <= 3 ? 'yellow-star' : 'gray-star'} />
//     })
//   } else if (rating >= 5) {
//     return [...Array(5)].map((star, i) => {
//       return <FaStar className={i <= 4 ? 'yellow-star' : 'gray-star'} />
//     })
//   } else if (rating > 4 && rating < 5) {
//     return [...Array(5)].map((star, i) => {
//       return <FaStar className={i < 4 ? 'yellow-star' : 'gray-star'} />
//     })
//   } else if (rating === 'No Reviews Yet') {
//     return 'No Reviews'
//   }
// }

export const formatRating = (rating) => {
  const starPercentage = (rating / 5) * 100
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`
  // document.querySelector(`.stars-inner`).style.width = starPercentageRounded

  return (
    <div className="stars-outer">
      <div
        style={{ width: starPercentageRounded }}
        className="stars-inner"
      ></div>
    </div>
  )
}
