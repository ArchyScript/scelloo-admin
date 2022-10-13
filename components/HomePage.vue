<template>
  <div>
    <v-layout class="justify-space-between px-2">
      <div md5 class="d-flex">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              height="48"
              v-on="on"
              outlined
              color="#C6C2DE"
            >
              <v-icon large left color="#8B83BA">
                mdi-filter
              </v-icon>

              <span class="filter font-weight-bold">Filter</span>
            </v-btn>
          </template>

          <v-list width="250px" class="px-2" dense>
            <v-list-item>
              <div>
                <span class="d-block text-h6 mt-2 px-1">Sort by:</span>

                <div class="mt-n3 px-n2" style="width: 100% !important;">
                  <v-radio-group v-model="filterOption1">
                    <v-radio
                      v-for="(filterOption, index) in filterOptions1"
                      :key="`${filterOption.title}_${index}`"
                      :label="filterOption.title"
                      :value="filterOption.title"
                      dense
                      @click="$store.commit(filterOption.mutationCommitType)"
                    ></v-radio>
                  </v-radio-group>
                </div>
              </div>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <div>
                <span class="d-block text-h6 mt-2 px-1">Sort by:</span>

                <div class="mt-n3 px-n2" style="width: 100% !important;">
                  <v-radio-group v-model="filterOption2">
                    <v-radio
                      v-for="(filterOption, index) in filterOptions2"
                      :key="`${filterOption.title}_${index}`"
                      :label="filterOption.title"
                      :value="filterOption.title.toLowerCase()"
                      dense
                      @click="filterData('user_status')"
                    ></v-radio>
                  </v-radio-group>
                </div>
              </div>
            </v-list-item>
          </v-list>
        </v-menu>

        <div class="d-flex">
          <v-text-field
            solo
            flat
            color="#8B83BA"
            background-color="#F4F2FF"
            height="48"
            class="ml-6 pr-10"
            v-model="search"
            placeholder="Search users by name, email or date"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </div>
      </div>

      <v-btn
        depressed
        :loading="processingUserPayment"
        height="40px"
        class="white--text"
        color="#6D5BD0"
        :disabled="selected.length < 1 ? true : false"
        @click="updateUserPaymentStatus"
      >
        PAY DUES
      </v-btn>
    </v-layout>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="usersData"
      color="#F4F2FF"
      :single-expand="singleExpand"
      :single-select="singleSelect"
      show-select
      show-expand
      :loading="loading"
      :search="search"
    >
      <template v-slot:item.firstName="{ item }">
        <v-layout column class="py-2">
          <span class="font-weight-bold">
            {{ item.firstName }} {{ item.lastName }}
          </span>
          <span class="email">
            {{ item.email }}
          </span>
        </v-layout>
      </template>

      <template v-slot:item.userStatus="{ item }">
        <v-layout align-start column>
          <v-chip
            small
            class="font-weight-bold text-capitalize bg-light-purple mb-1"
            :text-color="
              item.userStatus == 'active' ? 'blue darken-1' : 'grey darken-1'
            "
            :color="
              item.userStatus == 'active' ? 'blue lighten-5' : 'grey lighten-3'
            "
          >
            {{ item.userStatus }}
          </v-chip>

          <span class="email">Last login: {{ item.lastLogin }}</span>
        </v-layout>
      </template>

      <template v-slot:item.paymentStatus="{ item }">
        <v-layout align-start column>
          <v-chip
            small
            class="font-weight-bold text-capitalize mb-1"
            :color="
              item.paymentStatus == 'paid'
                ? '#B9F6CA'
                : item.paymentStatus == 'unpaid'
                ? '#FFECCC'
                : '#FFCDD2'
            "
            :text-color="
              item.paymentStatus == 'paid'
                ? '#007F00'
                : item.paymentStatus == 'unpaid'
                ? '#CAA566 '
                : '#D30000'
            "
          >
            <svg
              width="6"
              height="6"
              viewBox="0 0 6 6"
              fill="currentColor"
              class="mr-1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="3" cy="3" r="3" />
            </svg>

            {{ item.paymentStatus }}
          </v-chip>

          <span class="paid">
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
        <span class="font-weight-bold">
          ${{ item.amountInCents.toLocaleString() }}
        </span>
        <span class="d-block">
          USD
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

          <v-list>
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
  </div>
</template>

<script>
import UserActivitiesVue from './UserActivities.vue'

export default {
  name: 'TableComponent',
  components: { UserActivitiesVue },
  data: () => ({
    selected: [],
    singleSelect: true,
    singleExpand: true,
    loading: false,
    processingUserPayment: false,
    id: '',
    search: '',
    filterOption1: 'default',
    filterOption2: 'all',
    loading: false,
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
      { text: 'NAME', align: 'start', sortable: false, value: 'firstName' },
      { text: 'USER STATUS', value: 'userStatus', sortable: false },
      { text: 'PAYMENT STATUS', value: 'paymentStatus', sortable: false },
      { text: 'AMOUNT', value: 'amountInCents', sortable: false },
      { text: '', value: 'actions', sortable: false },
    ],
    acountUpdateActions: [
      { action: 'activate', bgColor: '#F4F2FF', textColor: 'green--text' },
      { action: 'deactivate', bgColor: '#F4F2FF', textColor: 'purple-text' },
      { action: 'delete', bgColor: '#F4F2FF', textColor: 'red--text' },
    ],
  }),

  computed: {
    usersData() {
      return this.$store.state.filteredUsers
    },
  },

  methods: {
    async filterData(type) {
      const filterQuery = {
        type,
        value: this.filterOption2,
      }

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
        await this.getAllUsersData()
        this.processingUserPayment = false
      } catch (error) {
        this.processingUserPayment = false
        console.log(error)
      }
    },

    async updateUserStatus(updateParams) {
      this.loading = true

      try {
        await this.$store.dispatch('updateUserStatus', updateParams)
        await this.getAllUsersData()
        this.loading = false

        console.log(this.selected)
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
  },

  //
  mounted() {
    this.getAllUsersData()
  },
}
</script>
