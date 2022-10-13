<template>
  <v-layout class="justify-space-between px-2">
    <div md5 class="d-flex">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" height="48" v-on="on" outlined color="#C6C2DE">
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
                    :value="filterOption.value"
                    dense
                    @click="filterData('user_details')"
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
      :loading="loading"
      height="40px"
      class="white--text"
      color="#6D5BD0"
    >
      PAY DUES
    </v-btn>
  </v-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'indexPage',
  data: () => ({
    search: '',
    filterOption1: 'default',
    filterOption2: 'all',
    loading: false,
    filterOptions1: [
      { title: 'Default', value: 'default' },
      { title: 'First name', value: 'first_name' },
      { title: 'Last name', value: 'last_name' },
      { title: 'Due date', value: 'due_date' },
      { title: 'Last Login', value: 'last_login' },
    ],
    filterOptions2: [
      { title: 'All' },
      { title: 'Active' },
      { title: 'Inactive' },
    ],
  }),
  methods: {
    async filterData(type) {
      const filter_query_value =
        type === 'user_details' ? this.filterOption1 : this.filterOption2

      const filterQuery = {
        type,
        value: filter_query_value,
      }

      await this.$store.dispatch('filterUsers', filterQuery)
    },
  },
})
</script>

<style scoped>
.filter {
  color: #25213b !important;
}
</style>
