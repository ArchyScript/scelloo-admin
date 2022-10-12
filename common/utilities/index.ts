//
export const formatDateAndTime = (createAt: string) => {
  const created_date = new Date(createAt)

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const fullMonthsTexts = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const year = created_date.getFullYear()
  const month = months[created_date.getMonth()]
  const fullMonthsText = fullMonthsTexts[created_date.getMonth()]
  let date: any = created_date.getDate()
  let hours: any = created_date.getHours()
  let minutes: any = created_date.getMinutes()
  let seconds: any = created_date.getSeconds()

  // am or pm format
  const am_or_pm = hours >= 12 ? 'pm' : 'am'
  // hours format
  hours %= 12
  hours = hours || 12

  date = date <= 9 ? `0${date}` : date
  hours = hours <= 9 ? `0${hours}` : hours
  minutes = minutes <= 9 ? `0${minutes}` : minutes
  seconds = seconds <= 9 ? `0${seconds}` : seconds

  const formattedDate = `${month} ${date}, '${year.toString().slice(2)}`
  const formattedFullDate = `${fullMonthsText} ${date}, ${year}`
  const formattedTime = `${hours}:${minutes} ${am_or_pm}`

  return { formattedDate, formattedTime, formattedFullDate }
}
