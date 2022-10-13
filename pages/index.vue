<template>
  <div>
    <v-row>
      <v-col cols="12" sm="8" md="12">
        <v-card class="my-4 py-8 px-4">
          <HeaderVue />
          <TableVue />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HeaderVue from '~/components/Header.vue'
import TableVue from '~/components/Table.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { HeaderVue, TableVue },
  setup() {
    return {}
  },
})
</script>
