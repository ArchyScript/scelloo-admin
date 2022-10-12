<template>
  <HomePage />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HomePage from '~/pages/Home.vue'

defineComponent
export default defineComponent({
  name: 'IndexPage',
  components: { HomePage },
  setup() {
    return {}
  },
})
</script>
