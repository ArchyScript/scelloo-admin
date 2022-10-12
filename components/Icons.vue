<template>
  <div class="">
    <span v-if="name === 'filter'">
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 12L20 4V0H0V4L8 12V20L12 16V12Z" fill="#8B83BA" />
      </svg>
    </span>

    <span v-if="name === 'chevron-down'">
      <svg
        class="-mr-1 ml-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </span>

    <span v-if="name === ''"></span>

    <span v-if="name === 'chevron-down'"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavBar',
  props: {
    name: String,
  },
  setup() {
    return {}
  },
})
</script>
