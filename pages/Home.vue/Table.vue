<template>
  <div>
    <!-- @input="filterTableData(id)" -->

    <v-data-table :headers="headers" color="#F4F2FF" :items="all_users">
      <!--
      show-select
      v-model="selected"
      :single-select="true"
      :loading="loading"
      :items-per-page="100"
      show-expand
         :single-expand="singleExpand"
      :expanded.sync="expanded" -->
      <template v-slot:item.firstName="{ item }">
        <v-layout column class="py-2">
          <span class="font-weight-bold">
            {{ item.firstName }} {{ item.lastName }}
            <!-- James Milner -->
          </span>
          <span class="email">
            <!-- Script@gmail.com -->
            {{ item.email }}
          </span>
        </v-layout>
      </template>

      <template v-slot:item.userStatus="{ item }">
        <v-layout align-start column>
          <v-chip
            small
            :class="
              item.userStatus == 'inactive'
                ? 'bg-light-grey'
                : 'bg-light-purple'
            "
            class="font-weight-bold text-capitalize bg-light-purple mb-1"
            :text-color="item.userStatus == 'inactive' ? '#6E6893' : '#4A4AFF'"
          >
            <img
              :src="
                item.userStatus == 'inactive'
                  ? require('~/static/inactive.svg')
                  : require('~/static/Ellipse 2.svg')
              "
              class="mr-1"
              alt=""
            />

            {{ item.userStatus }}
          </v-chip>
          <span class="email">Last login: {{ item.lastLogin }}</span>
        </v-layout>
      </template>

      <template v-slot:item.paymentStatus="{ item }">
        <v-layout align-start column>
          <v-chip
            small
            class="font-weight-bold text-capitalize bg-light-purple mb-1"
          >
            <!-- :class="paymentClass(item.paymentStatus)" -->
            <!-- :text-color="paymentColor(item.paymentStatus)" -->
            <svg
              width="6"
              height="6"
              viewBox="0 0 6 6"
              fill="none"
              class="mr-1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="3" cy="3" r="3" />
              <!-- :fill="paymentColor(item.paymentStatus)" -->
            </svg>
            Lorem, ipsum.
            <!-- {{ item.paymentStatus }} -->
          </v-chip>
          <span class="paid">Paid on: 34/343/4334</span>
        </v-layout>
      </template>

      <!-- <template v-slot:item.amountInCents="{ item }">
        <span class="font-weight-bold">${{ item.amountInCents }}</span>
        <span class="d-block">USD</span>
      </template> -->

      <!-- <template v-slot:item.actions="{ item }">
        <v-menu offset-y :close-on-click="false">
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
      </template> -->

      <!-- <template v-slot:expanded-item="{ headers, item }">
        <th :colspan="headers.length">
          {{ item.activities }}
        </th>
      </template> -->
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

defineComponent
export default defineComponent({
  name: 'indexPage',
  components: {},
  setup() {
    const selected = ref([])
    const singleExpand = ref(true)
    const expanded = ref([])
    const loading = ref(false)
    const search = ref('')
    const id = ref('')

    const all_users = ref([
      {
        id: 'tyghnjkmls',
        firstName: 'Danei',
        email: 'script@gmail.com',
        lastName: 'Scro',
        userStatus: 'active',
        lastLogin: 'ghjk/87/8899',
        paymentStatus: 'paid',
        amountInCents: 2366,
        actions: true,
        activities: 'djsjh',
      },
      {
        id: 'tyghnjkmls',
        firstName: 'Scrit',
        lastName: 'Scro',
        email: 'script@gmail.com',
        userStatus: 'active',
        lastLogin: 'ghjk/87/8899',
        paymentStatus: 'paid',
        amountInCents: 2366,
        actions: true,
        activities: 'djsjh',
      },
    ])

    const headers = ref([
      {
        text: 'NAME',
        align: 'start',
        sortable: false,
        value: 'firstName',
      },
      { text: 'USER STATUS', value: 'userStatus', sortable: false },
      { text: 'PAYMENT STATUS', value: 'paymentStatus', sortable: false },
      { text: 'AMOUNT', value: 'amountInCents', sortable: false },
      { text: '', value: 'actions', sortable: false },
    ])

    const filterTableData = (type: string) => {
      console.log(type)
    }

    return {
      filterTableData,
      headers,
      all_users,
      selected,
      singleExpand,
      expanded,
      loading,
      search,
      id,
    }
  },
})
</script>
