<template>
  <v-app class="scellooLight black">
    <v-main class="scellooLight">
      <v-container class="my-10">
        <LayoutHeaderVue />

        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LayoutHeaderVue from '~/components/LayoutHeader.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    LayoutHeaderVue,
  },
  setup() {
    return {}
  },
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
.v-application {
  font-family: 'Inter';
}
</style>
