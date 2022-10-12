<template>
  <v-row>
    <v-col cols="12" sm="8" md="12">
      <v-card class="my-4 py-8 px-4">
        <!-- search layout -->
        <v-layout justify-space-between>
          <v-flex md5 class="d-flex">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  height="40px"
                  outlined
                  class="py-2"
                  color="#C6C2DE"
                >
                  <v-icon large left color="#8B83BA">mdi-filter</v-icon>
                  <span class="filter font-weight-bold">Sort</span>
                </v-btn>
              </template>

              <v-list width="220px" dense>
                <v-list-item>
                  <div class="expand-list--item">
                    <h4>Sort by:</h4>

                    <div
                      class="d-flex flex-column"
                      style="width: 100% !important;"
                    >
                      <div>
                        <v-radio-group v-model="radioGroup">
                          <v-radio
                            dense
                            @click="$store.commit('sortDefault')"
                            label="Default"
                            value="Default"
                          ></v-radio>
                          <v-radio
                            dense
                            @click="$store.commit('sortFirstName')"
                            label="First name"
                            value="First name"
                          ></v-radio>
                          <v-radio
                            dense
                            @click="$store.commit('sortLastName')"
                            label="Last name"
                            value="Last name"
                          ></v-radio>
                          <v-radio
                            dense
                            @click="$store.commit('sortDueDate')"
                            label="Due date"
                            value="Due date"
                          ></v-radio>
                          <v-radio
                            dense
                            @click="$store.commit('sortLogin')"
                            label="Last login"
                            value="Last login"
                          ></v-radio>
                        </v-radio-group>
                      </div>
                    </div>
                  </div>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-flex>
              <v-text-field
                solo
                dense
                flat
                color="#8B83BA"
                background-color="#F4F2FF"
                height="40px"
                class="ml-4"
                v-model="search"
                placeholder="Search Users by Name, Email or Date"
                prepend-inner-icon="mdi-magnify"
              ></v-text-field>
              <!-- max-width="392px" -->
            </v-flex>
          </v-flex>

          <v-btn
            depressed
            @click="change_payment_status"
            :loading="updating"
            height="40px"
            class="white--text"
            color="#6D5BD0"
          >
            PAY DUES
          </v-btn>
        </v-layout>

        <div>
          <!-- <div></div> -->
          <v-data-table
            v-model="selected"
            show-select
            :single-select="true"
            :headers="headers"
            color="#F4F2FF"
            :items="all_users"
            :loading="loading"
            :items-per-page="100"
            :search="search"
            show-expand
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            @input="get_payment_id"
          >
            <template v-slot:item.firstName="{ item }">
              <v-layout column>
                <span class="font-weight-bold">
                  {{ item.firstName }} {{ item.lastName }}
                </span>
                <span class="email">{{ item.email }}</span>
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
                  :text-color="
                    item.userStatus == 'inactive' ? '#6E6893' : '#4A4AFF'
                  "
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
                  :class="paymentClass(item.paymentStatus)"
                  class="font-weight-bold text-capitalize bg-light-purple mb-1"
                  :text-color="paymentColor(item.paymentStatus)"
                >
                  <svg
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                    class="mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="3"
                      cy="3"
                      r="3"
                      :fill="paymentColor(item.paymentStatus)"
                    />
                  </svg>
                  {{ item.paymentStatus }}
                </v-chip>
                <span class="paid">
                  Paid on: {{ formatNullValues(item.paidOn) }}
                </span>
              </v-layout>
            </template>

            <template v-slot:item.amountInCents="{ item }">
              <span class="font-weight-bold">${{ item.amountInCents }}</span>
              <span class="d-block">USD</span>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-menu offset-y :close-on-click="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    @click="
                      changeAccountStatus({ type: 'activate', id: item.id })
                    "
                    link
                    color="#F4F2FF"
                    class="green--text"
                  >
                    Activate User
                  </v-list-item>
                  <v-list-item
                    @click="
                      changeAccountStatus({ type: 'deactivate', id: item.id })
                    "
                    link
                    color="#F4F2FF"
                  >
                    Deactivate User
                  </v-list-item>
                  <v-list-item
                    @click="
                      changeAccountStatus({ type: 'delete', id: item.id })
                    "
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
              <th :colspan="headers.length">
                {{ item.activities }}
              </th>
            </template>
          </v-data-table>
        </div>
      </v-card>
    </v-col>
  </v-row>
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
    const radioGroup = ref(1)
    const radioGroup2 = ref(1)
    const id = ref('')
    const updating = ref(false)
    const url = ref('')

    /* 
    const desserts = ref([
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%',
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8%',
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16%',
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0%',
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: '2%',
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: '45%',
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: '22%',
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%',
      },
    ])
 */

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
      selected,
      singleExpand,
      expanded,
      loading,
      search,
      radioGroup,
      radioGroup2,
      id,
      updating,
      url,
    }
  },
})
</script>
