<template>
  <div>
    <v-row class="rounded-card">
      <v-col cols="12" sm="8" md="12" class="scellooLight">
        <v-card class="my-4 py-8">
          <HomePageVue />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomePageVue from '~/components/HomePage.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { HomePageVue },
  setup() {
    return {}
  },
})
</script>
