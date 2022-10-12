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

        <v-list width="250px" dense>
          <v-list-item>
            <div class="expand-list--item">
              <h4>Sort by:</h4>

              <div class="d-flex flex-column" style="width: 100% !important;">
                <v-radio-group class="px-4" v-model="filterOption1">
                  <v-radio
                    v-for="(filterOption, index) in filterOptions1"
                    :key="`${filterOption.title}_${index}`"
                    :label="filterOption.title"
                    :value="filterOption.value"
                    dense
                    @click="filterTableData(filterOption1)"
                  ></v-radio>
                </v-radio-group>

                <v-divider></v-divider>
                <v-radio-group v-model="filterOption2">
                  <v-radio
                    v-for="(filterOption, index) in filterOptions2"
                    :key="`${filterOption.title}_${index}`"
                    :label="filterOption.title"
                    :value="filterOption.value"
                    dense
                    @click="filterTableData(filterOption2)"
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
      @click="change_payment_status"
      :loading="loading"
      height="40px"
      class="white--text"
      color="#6D5BD0"
    >
      PAY DUES
    </v-btn>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

defineComponent
export default defineComponent({
  name: 'indexPage',
  components: {},
  setup() {
    const search = ref('')
    const filterOption1 = ref(1)
    const filterOption2 = ref(1)
    const loading = ref(false)
    const filterOptions1 = ref([
      { title: 'Default', value: 'default' },
      { title: 'First name', value: 'first_name' },
      { title: 'Last name', value: 'last_name' },
      { title: 'Due date', value: 'due_date' },
      { title: 'Last Login', value: 'last_login' },
    ])
    const filterOptions2 = ref([
      { title: 'all' },
      { title: 'active' },
      { title: 'inactive' },
    ])

    const filterTableData = (type: string) => {
      console.log(type)
      console.log(filterOption1.value)
    }

    return {
      filterTableData,
      filterOption1,
      filterOptions1,
      filterOption2,
      filterOptions2,
      search,
      loading,
    }
  },
})
</script>

<style scoped>
.filter {
  color: #25213b !important;
}
.expand-list--item {
  max-width: 200px !important;
  width: 100% !important;
}
</style>
