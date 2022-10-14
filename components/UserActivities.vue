<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="userActivities"
      class="pa-4 font-weight-medium scellooLight scellooDark--text"
      hide-default-footer
    >
      <template v-slot:item.date="{ item }">
        <v-layout column class="py-2">
          <span class="font-weight-medium">
            {{ item.date }}
          </span>
        </v-layout>
      </template>

      <template v-slot:item.userActivity="{ item }">
        <v-layout align-center class="py-2">
          <span class="font-weight-medium">
            {{ item.userActivity }}
          </span>
        </v-layout>
      </template>

      <template v-slot:item.details="{ item }">
        <v-layout align-start column colspan="4">
          <span class="font-weight-medium">
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
      {
        text: 'DATE',
        align: 'right',
        sortable: false,
        value: 'date',
        class: 'text-body-2 font-weight-medium scellooDarkGrey--text',
      },
      {
        text: 'USER ACTIVITY',
        value: 'userActivity',
        sortable: false,
        class: 'text-body-2 font-weight-medium scellooDarkGrey--text',
      },
      {
        text: 'DETAILS',
        value: 'details',
        sortable: false,
        class: 'text-body-2 font-weight-medium scellooDarkGrey--text',
      },
    ])

    return {
      headers,
    }
  },
})
</script>

<style scoped></style>
