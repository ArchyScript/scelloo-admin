export const state = () => ({
  allUsersData: [],
  filteredUsers: [],
  candidateId: '6j855Hjtnom7pa2',
})

//
export const getters = {
  // calculates the total payable amount
  getTotalPayableAmount: (state) => {
    let totalPayableAmount = 0

    // loop through all users
    // check if is paymentStatus is NOT "paid" and add together
    state.allUsersData.forEach((eachUserData) => {
      if (eachUserData.paymentStatus !== 'paid') {
        totalPayableAmount += +eachUserData.amountInCents
      }
    })

    // return calculated amount
    return totalPayableAmount
  },
}

//
export const actions = {
  //
  async getAllUsersData({ commit, state }) {
    const response = await this.$axios.$get(`/users/${state.candidateId}`)
    const { data } = response

    commit('SET_ALL_USERS_DATA', data)
  },

  //
  async sortUsersData({ commit }, param) {
    if (param === 'default') return commit('SORT_AND_UPDATE_BY_DEFAULT')
    if (param === 'first_name') return commit('SORT_AND_UPDATE_BY_FIRST_NAME')
    if (param === 'last_name') return commit('SORT_AND_UPDATE_BY_LAST_NAME')
    if (param === 'due_date') return commit('SORT_AND_UPDATE_BY_DUE_DATE')
    if (param === 'last_login') return commit('SORT_AND_UPDATE_BY_LAST_LOGIN')
  },

  //
  async updateUserPaymentStatus({ commit }, params) {
    const { id, paymentStatus } = params

    // return if payment status is "overdue"
    if (paymentStatus === 'overdue') return

    // if payment status is "paid", send "unpaid" request
    if (paymentStatus === 'paid')
      return await this.$axios.$patch(`/mark-unpaid/${id}`)

    // if payment status is "unpaid", send "paid" request
    if (paymentStatus === 'unpaid')
      return await this.$axios.$patch(`/mark-paid/${id}`)
  },

  // filter user data
  async filterUsers({ commit, state }, filterQuery) {
    const { type, value } = filterQuery
    let data = []

    // sort by payment status
    if (type === 'payment_status') {
      if (value === 'all') {
        data = state.allUsersData
      } else {
        data = state.allUsersData.filter((eachUserData) => {
          return eachUserData.paymentStatus === value
        })
      }
    }

    // sort by user status
    if (type === 'user_status') {
      if (value === 'all') {
        data = state.allUsersData
      } else {
        data = state.allUsersData.filter((eachUserData) => {
          return eachUserData.userStatus === value
        })
      }
    }

    commit('SET_FILTERED_USERS', data)
  },

  //
  async updateUserStatus({ commit }, updateParams) {
    const { action, id } = updateParams

    // activate user status
    if (action == 'activate')
      return await this.$axios.$patch(`/activate-user/${id}`)

    // deactivate user status
    if (action == 'deactivate')
      return await this.$axios.$patch(`/deactivate-user/${id}`)

    // remove user status
    if (action == 'delete')
      return await this.$axios.$delete(`/remove-user/${id}`)
  },
}

//
export const mutations = {
  // update all users data
  SET_ALL_USERS_DATA(state, data) {
    if (!data) return

    state.allUsersData = data
    return (state.filteredUsers = data)
  },
  // update filtered users data
  SET_FILTERED_USERS(state, data) {
    return (state.filteredUsers = data)
  },
  //
  SORT_AND_UPDATE_BY_DEFAULT(state) {
    state.allUsersData.sort((user1Data, user2Data) => {
      if (user1Data.id === user2Data.id) return 0
      return user2Data.id > user1Data.id ? 1 : -1
    })
  },
  //
  SORT_AND_UPDATE_BY_FIRST_NAME(state) {
    state.allUsersData.sort((user1Data, user2Data) => {
      if (user1Data.firstName === user2Data.firstName) return 0
      return user1Data.firstName > user2Data.firstName ? 1 : -1
    })
  },
  //
  SORT_AND_UPDATE_BY_LAST_NAME(state) {
    state.allUsersData.sort((user1Data, user2Data) => {
      if (user1Data.lastName === user2Data.lastName) return 0
      return user1Data.lastName > user2Data.lastName ? 1 : -1
    })
  },
  //
  SORT_AND_UPDATE_BY_DUE_DATE(state) {
    state.allUsersData.sort((user1Data, user2Data) => {
      user1Data = new Date(user1Data.paidOn)
      user2Data = new Date(user2Data.paidOn)
      return user2Data - user1Data
    })
  },
  //
  SORT_AND_UPDATE_BY_LAST_LOGIN(state) {
    state.allUsersData.sort((user1Data, user2Data) => {
      user1Data = new Date(user1Data.lastLogin)
      user2Data = new Date(user2Data.lastLogin)
      return user2Data - user1Data
    })
  },
}
