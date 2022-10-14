<template>
  <div>
    <v-layout
      class="header-layout d-flex align-start justify-space-between px-6"
    >
      <div class="search-and-filter-layout d-flex pb-n8">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              outlined
              height="44px"
              color="scellooGrey"
              class="d-flex align-center"
            >
              <SvgIcons name="filter" class="mr-2 mb-n1" />

              <span class="font-weight-bold py-3">
                Filter
              </span>
            </v-btn>
          </template>

          <v-list width="240px" class="px-1">
            <v-list-item>
              <div class="filter-section">
                <span
                  class="scellooDarkGrey--text d-block text-body-1 font-weight-light text-uppercase mt-3 px-1"
                >
                  Sort by:
                </span>

                <div class="mt-n3 px-n2">
                  <v-radio-group v-model="filterOption1">
                    <label
                      v-for="(filterOption, index) in filterOptions1"
                      :key="`${filterOption.title}_${index}`"
                      class="filter-section-label d-flex pa-1 mb-1 cursor-pointer items-center justify-space-between"
                    >
                      <span>
                        {{ filterOption.title }}
                      </span>

                      <v-radio
                        @click="$store.commit(filterOption.mutationCommitType)"
                        :value="filterOption.title"
                        dense
                      ></v-radio>
                    </label>
                  </v-radio-group>
                </div>
              </div>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <div class="filter-section">
                <span
                  class="scellooDarkGrey--text d-block text-body-1 font-weight-light text-uppercase mt-3 px-1"
                >
                  Users:
                </span>

                <div class="mt-n3 px-n2">
                  <v-radio-group v-model="filterOption2">
                    <label
                      v-for="(filterOption, index) in filterOptions2"
                      :key="`${filterOption.title}_${index}`"
                      class="filter-section-label d-flex pa-1 mb-1 cursor-pointer items-center justify-space-between"
                    >
                      <span>
                        {{ filterOption.title }}
                      </span>

                      <v-radio
                        @click="filterData('user_status')"
                        :value="filterOption.title"
                        dense
                      ></v-radio>
                    </label>
                  </v-radio-group>
                </div>
              </div>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-text-field
          solo
          flat
          color="scellooPrimary"
          background-color="scellooLight"
          height="44px"
          class="ml-8 mr-16"
          v-model="search"
          placeholder="Search Users by Name, Email or Date"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </div>

      <div>
        <v-btn
          depressed
          :loading="processingUserPayment"
          height="44px"
          class="white--text font-weight-bold"
          color="scellooGrey"
          @click="updateUserPaymentStatus"
        >
          PAY DUES
        </v-btn>
      </div>
    </v-layout>

    <section>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="usersData"
        :single-expand="singleExpand"
        :single-select="singleSelect"
        show-select
        show-expand
        :loading="loading"
        :search="search"
        :items-per-page="20"
        class="font-weight-bold scellooPrimary--text"
        checkbox-color="scellooPrimary"
      >
        <!-- BUG:: changes expand icon but not functional -->
        <!-- <template v-slot:item.data-table-expand="{ item }">
          <v-btn icon>
            <v-icon>
              mdi-arrow-down-thin-circle-outline
            </v-icon>
          </v-btn>
        </template> -->

        <template v-slot:item.firstName="{ item }">
          <v-layout column class="py-2">
            <span class="font-weight-bold scellooDark--text">
              {{ item.firstName }} {{ item.lastName }}
            </span>

            <span class="scellooDarkGrey--text font-weight-semibold">
              {{ item.email }}
            </span>
          </v-layout>
        </template>

        <template v-slot:item.userStatus="{ item }">
          <v-layout align-start column>
            <v-chip
              small
              class="font-weight-bold text-capitalize mb-1"
              :text-color="
                item.userStatus == 'active' ? 'scellooBlue' : 'scellooDarkGrey'
              "
              :color="
                item.userStatus == 'active'
                  ? 'blue lighten-5'
                  : 'grey lighten-3'
              "
            >
              <SvgIconsVue :name="'active'" />
              {{ item.userStatus }}
            </v-chip>

            <span class="scellooDarkGrey--text font-weight-semibold">
              Last login: {{ item.lastLogin }}
            </span>
          </v-layout>
        </template>

        <template v-slot:item.paymentStatus="{ item }">
          <v-layout align-start column>
            <v-chip
              small
              class="font-weight-bold text-capitalize mb-1"
              :color="
                item.paymentStatus == 'paid'
                  ? '#CDFFCD'
                  : item.paymentStatus == 'unpaid'
                  ? '#FFECCC'
                  : '#FFE0E0'
              "
              :text-color="
                item.paymentStatus == 'paid'
                  ? 'scellooGreen'
                  : item.paymentStatus == 'unpaid'
                  ? '#965E00 '
                  : 'scellooRed'
              "
            >
              <SvgIconsVue :name="'active'" />

              {{ item.paymentStatus }}
            </v-chip>

            <span
              class="scellooPurple--text font-weight-semibold scellooDark--text"
            >
              {{
                item.paymentStatus === 'paid'
                  ? 'Paid on: '
                  : item.paymentStatus === 'unpaid'
                  ? 'Dues on: '
                  : 'Dued on: '
              }}

              {{ item.paymentStatus === 'paid' ? item.paidOn : 'Unavailable' }}
            </span>
          </v-layout>
        </template>

        <template v-slot:item.amountInCents="{ item }">
          <span class="font-weight-bold scellooDark--text">
            ${{ item.amountInCents.toLocaleString() }}
          </span>
          <span class="d-block font-weight-semibold scellooDarkGrey--text">
            USD
          </span>
        </template>

        <template v-slot:item.id="{ item }">
          <span class="font-weight-semibold view-more scellooDarkGrey--text">
            view more
          </span>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-menu offset-y :close-on-click="true">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon>
                <v-icon>
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </template>

            <v-list class="pa-1">
              <v-list-item
                v-for="acountUpdateAction in acountUpdateActions"
                :key="acountUpdateAction.action"
                link
                @click="
                  updateUserStatus({
                    action: acountUpdateAction.action,
                    id: item.id,
                  })
                "
                :color="acountUpdateAction.bgColor"
                :class="acountUpdateAction.textColor"
                class="text-capitalize"
              >
                {{ acountUpdateAction.action }} user
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="pa-0">
            <UserActivitiesVue :userActivities="item.activities" />
          </td>
        </template>
      </v-data-table>
    </section>
  </div>
</template>

<script>
import SvgIconsVue from './SvgIcons.vue'
import UserActivitiesVue from './UserActivities.vue'

export default {
  name: 'HomePage',
  components: {
    UserActivitiesVue,
    SvgIconsVue,
  },
  data: () => ({
    selected: [],
    singleSelect: true,
    singleExpand: true,
    loading: true,
    processingUserPayment: false,
    search: '',
    filterOption1: 'default',
    filterOption2: 'all',
    filterOptions1: [
      {
        title: 'Default',
        mutationCommitType: 'SORT_AND_UPDATE_BY_DEFAULT',
      },
      {
        title: 'First name',
        mutationCommitType: 'SORT_AND_UPDATE_BY_FIRST_NAME',
      },
      {
        title: 'Last name',
        mutationCommitType: 'SORT_AND_UPDATE_BY_LAST_NAME',
      },
      { title: 'Due date', mutationCommitType: 'SORT_AND_UPDATE_BY_DUE_DATE' },
      {
        title: 'Last Login',
        mutationCommitType: 'SORT_AND_UPDATE_BY_LAST_LOGIN',
      },
    ],
    filterOptions2: [
      { title: 'All' },
      { title: 'Active' },
      { title: 'Inactive' },
    ],
    headers: [
      {
        text: 'NAME',
        align: 'start',
        sortable: false,
        value: 'firstName',
        class: 'text-body-2 font-weight-medium scellooDarkGrey--text',
      },
      {
        text: 'USER STATUS',
        value: 'userStatus',
        sortable: false,
        class: 'text-body-2 font-weight-medium scellooDarkGrey--text',
      },
      {
        text: 'PAYMENT STATUS',
        value: 'paymentStatus',
        sortable: false,
        class: 'text-body-2 font-weight-medium scellooDarkGrey--text',
      },
      {
        text: 'AMOUNT',
        value: 'amountInCents',
        sortable: false,
        class: 'text-body-2 font-weight-medium scellooDarkGrey--text',
      },
      {
        text: '',
        value: 'id',
        sortable: false,
        class: 'text-body-2 font-weight-medium scellooDarkGrey--text',
      },
      {
        text: '',
        value: 'actions',
        sortable: false,
        class: 'text-body-2 font-weight-medium scellooDarkGrey--text',
      },
    ],
    acountUpdateActions: [
      {
        action: 'activate',
        bgColor: '#F4F2FF',
        textColor: 'scellooGreen--text',
      },
      {
        action: 'deactivate',
        bgColor: '#F4F2FF',
        textColor: 'scellooPurple-text',
      },
      {
        action: 'delete',
        bgColor: '#F4F2FF',
        textColor: 'scellooRed--text',
      },
    ],
  }),

  computed: {
    usersData() {
      return this.$store.state.filteredUsers
    },
  },

  methods: {
    // a method to send dispatch action  to the store
    // filters user based on the type and value parameter
    async filterData(type) {
      const filterQuery = {
        type,
        value: this.filterOption2.toLowerCase(),
      }

      // dispatch action to filter data
      await this.$store.dispatch('filterUsers', filterQuery)
    },

    async getAllUsersData() {
      this.loading = true

      try {
        await this.$store.dispatch('getAllUsersData')
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },

    async updateUserPaymentStatus() {
      this.processingUserPayment = true

      if (
        this.selected.length < 1 ||
        this.selected[0].paymentStatus === 'overdue'
      ) {
        return (this.processingUserPayment = false)
      }

      const params = {
        id: this.selected[0].id,
        paymentStatus: this.selected[0].paymentStatus,
      }

      try {
        await this.$store.dispatch('updateUserPaymentStatus', params)
        // get updated user data after updating user payment status
        await this.getAllUsersData()
        this.processingUserPayment = false
        // set selected user to null or []
        this.selected = []
      } catch (error) {
        this.processingUserPayment = false
        console.log(error)
      }
    },

    async updateUserStatus(updateParams) {
      this.loading = true

      try {
        await this.$store.dispatch('updateUserStatus', updateParams)
        // get updated user data after updating user status
        await this.getAllUsersData()
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
  },

  //
  mounted() {
    // call this function to get all users data from api
    this.getAllUsersData()
  },
}
</script>

<style scoped>
.header-layout {
  column-gap: 10rem;
}
.search-and-filter-layout {
  flex: 1 1 0%;
}
.filter-section {
  width: 100%;
}
.filter-section-label {
  cursor: pointer !important;
}
.font-weight-semibold {
  font-weight: 500;
}
.view-more {
  cursor: pointer;
  opacity: 0.8;
}
.view-more:hover {
  opacity: 1;
}
</style>
