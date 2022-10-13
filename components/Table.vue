<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="usersData"
      color="#F4F2FF"
      :single-expand="singleExpand"
      :single-select="false"
      show-select
      show-expand
      :loading="loading"
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
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              @click="changeAccountStatus({ type: 'activate', id: item.id })"
              link
              color="#F4F2FF"
              class="green--text"
            >
              Activate User
            </v-list-item>

            <v-list-item
              @click="changeAccountStatus({ type: 'deactivate', id: item.id })"
              link
              color="#F4F2FF"
            >
              Deactivate User
            </v-list-item>

            <v-list-item
              @click="changeAccountStatus({ type: 'delete', id: item.id })"
              link
              color="#F4F2FF"
              class="red--text"
            >
              Delete User
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

<script lang="ts">
import IconsVue from '~/components/Icons.vue'
import UserActivitiesVue from './UserActivities.vue'

export default {
  name: 'TableComponent',
  components: { IconsVue, UserActivitiesVue },
  data: () => ({
    selected: [],
    singleExpand: true,
    loading: false,
    radioGroup: 1,
    radioGroup2: 1,
    id: '',
    headers: [
      { text: 'NAME', align: 'start', sortable: false, value: 'firstName' },
      { text: 'USER STATUS', value: 'userStatus', sortable: false },
      { text: 'PAYMENT STATUS', value: 'paymentStatus', sortable: false },
      { text: 'AMOUNT', value: 'amountInCents', sortable: false },
      { text: '', value: 'actions', sortable: false },
    ],
  }),

  computed: {
    usersData() {
      return this.$store.state.filteredUsers
    },
  },

  methods: {
    async getAllUsersData() {
      this.loading = true

      try {
        await this.$store.dispatch('getAllUsersData')
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
  },

  //
  mounted() {
    this.getAllUsersData()
  },
}
</script>
