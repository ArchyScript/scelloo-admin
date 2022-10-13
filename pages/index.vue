<template>
  <div>
    <v-row>
      <v-col cols="12" sm="8" md="12">
        <v-card class="my-4 py-8 px-4">
          <HomePageVue />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HomePageVue from '~/components/HomePage.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { HomePageVue },
  setup() {
    return {}
  },
})
</script>
