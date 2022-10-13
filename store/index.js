export const state = () => ({
  allUsersData: [],
  filteredUsers: [],
  candidateId: '6j855Hjtnom7pa2',
})

export const getters = {
  getTotalPayableAmount: (state) => {
    let totalPayableAmount = 0

    state.allUsersData.forEach((eachUserData) => {
      if (eachUserData !== 'overdue') {
        totalPayableAmount += +eachUserData.amountInCents
      }
    })

    return totalPayableAmount
  },
}

export const actions = {
  async getAllUsersData({ commit, state }) {
    const response = await this.$axios.$get(`/users/${state.candidateId}`)
    const { data } = response

    commit('SET_ALL_USERS_DATA', data)
  },
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

    //
    if (type === 'user_details') {
      if (value === 'default') {
        data = state.allUsersData
      } else if (value === 'first_name') {
        let stateUsersData = state.allUsersData

        data = stateUsersData.sort((x, y) => {
          if (x.firstName === y.firstName) return 0
          return x.firstName > y.firstName ? 1 : -1
        })
      }
    }

    commit('SET_FILTERED_USERS', data)
  },

  // async status_changer({ commit }, { type, id }) {
  //   if (type == "activate") {
  //     const data = await this.$axios.$patch(`/activate-user/${id}`);
  //     return data;
  //   } else if (type == "deactivate") {
  //     const data = await this.$axios.$patch(`/deactivate-user/${id}`);
  //     return data;
  //   } else if (type == "delete") {
  //     const data = await this.$axios.$delete(`/remove-user/${id}`);
  //     return data;
  //   }
  // },
}

export const mutations = {
  SET_ALL_USERS_DATA(state, data) {
    if (!data) return

    state.allUsersData = data
    return (state.filteredUsers = data)
  },
  SET_FILTERED_USERS(state, data) {
    return (state.filteredUsers = data)
  },
  // mutateFilterType(state, payload) {
  //   state.filterType = payload;
  // },
  // sortFirstName(state) {
  //   state.allUsersData.sort((x, y) => {
  //     if (x.firstName === y.firstName) return 0;
  //     return x.firstName > y.firstName ? 1 : -1;
  //   });
  // },
  // sortLastName(state) {
  //   state.allUsersData.sort((x, y) => {
  //     if (x.lastName === y.lastName) return 0;
  //     return x.lastName > y.lastName ? 1 : -1;
  //   });
  // },
  // sortDueDate(state) {
  //   state.allUsersData.sort((x, y) => {
  //       x = new Date(x.paidOn);
  //       y = new Date(y.paidOn)
  //       return y - x;
  //   });
  // },
  // sortLogin(state) {
  //   state.allUsersData.sort((x, y) => {
  //       x = new Date(x.lastLogin);
  //       y = new Date(y.lastLogin);
  //     return y - x;
  //   });
  // },
  // sortDefault(state) {
  //   state.allUsersData.sort((x, y) => {
  //     if (x.id === y.id) return 0;
  //     return x.id > y.id ? 1 : -1;
  //   });
  // },
}
