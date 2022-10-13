<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="userActivities"
      hide-default-footer
      color="#F4F2FF"
      class="pa-4"
    >
      <template v-slot:item.date="{ item }">
        <v-layout column class="py-3" style="width: 100%;">
          <span class="font-weight-bold">
            {{ item.date }}
          </span>
        </v-layout>
      </template>

      <template v-slot:item.userActivity="{ item }">
        <v-layout align-start column>
          <span>
            {{ item.userActivity }}
          </span>
        </v-layout>
      </template>

      <template v-slot:item.details="{ item }">
        <v-layout align-start column colspan="4">
          <span class="paid">
            {{ item.details }}
          </span>
        </v-layout>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { PropType } from 'vue/types/umd'
import { UserActivities } from '~/common/types'

export default defineComponent({
  name: 'UserActivities',
  props: {
    userActivities: {
      type: Array as PropType<UserActivities[]>,
      required: true,
    },
  },
  setup() {
    const headers = ref([
      { text: 'DATE', sortable: false, value: 'date' },
      { text: 'USER ACTIVITY', value: 'userActivity', sortable: false },
      { text: 'DETAILS', value: 'details', sortable: false },
    ])

    return {
      headers,
    }
  },
 
})
</script>
