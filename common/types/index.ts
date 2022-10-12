export type UserData = {
  id: string
  name: string
}
export type UserPaymentData = {
  id: string
  name: string
  email: string
  amount: 223323
  userStatus: {
    status: string
    lastLogin: string
  }
  paymentStatus: {
    status: string
    paymentDate: string
  }
}
