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
  let day = date.slice(8)
  let year = date.slice(0, 4)

  return `${month}-${day}-${year}`
}

export const starReview = (rating) => {
  if (rating === 1) {
    return '★☆☆☆☆'
  } else if (rating === 2) {
    return '★★☆☆☆'
  } else if (rating === 3) {
    return '★★★☆☆'
  } else if (rating === 4) {
    return '★★★★☆'
  } else if (rating === 5) {
    return '★★★★★'
  } else if (rating > 4 && rating < 5) {
    return '★★★★☆'
  } else if (rating === 'No Reviews Yet') {
    return 'No Reviews'
  }
}
