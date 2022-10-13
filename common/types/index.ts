export type UserActivities = {
  date: string
  userActivity: string
  details: string
}

export type UserData = {
  id: string
  email: string
  firstName: string
  lastName: string
  lastLogin: string
  userStatus: string
  paymentStatus: string
  amountInCents: string
  activities: UserActivities[]
}
