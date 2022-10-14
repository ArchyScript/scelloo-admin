<template>
  <div>
    <span v-if="name === 'filter'" class="d-inline">
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 12L20 4V0H0V4L8 12V20L12 16V12Z" fill="currentColor" />
      </svg>
    </span>

    <span v-if="name === 'active'">
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="currentColor"
        class="mr-1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="3" cy="3" r="3" />
      </svg>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SvgIcons',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
