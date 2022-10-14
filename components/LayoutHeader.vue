<template>
  <div class="data__table mb-4">
    <h3
      class="header-title font-weight-bold mb-3 text-uppercase scellooDarkGrey--text text-subtitile-1"
    >
      Table Heading
    </h3>

    <v-layout class="tab-layout pa-0 justify-space-between align-end">
      <div>
        <v-tabs background-color="transparent">
          <v-tab
            v-for="tab in tabs"
            :key="tab.title"
            class="text-capitalize pa-0 cellooDarkGrey--text font-weight-bold"
            @click="filterData(tab.title)"
          >
            {{ tab.title }}
          </v-tab>
        </v-tabs>
      </div>

      <div class="mb-1 d-flex align-end">
        <span class="text-body-1 scellooGrey--text">
          Total payable amount:
        </span>

        <span class="text-h5 font-weight-bold scellooGrey--text mx-1">
          {{ `$${totalPayableAmount.toLocaleString()}` }}
        </span>

        <span class="font-weight-thin text-h6 text-uppercase scellooGrey--text">
          USD
        </span>
      </div>
    </v-layout>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutHeader',
  data: () => ({
    tabs: [
      { title: 'all' },
      { title: 'paid' },
      { title: 'unpaid' },
      { title: 'overdue' },
    ],
  }),

  computed: {
    totalPayableAmount() {
      return this.$store.getters.getTotalPayableAmount
    },
  },

  methods: {
    async filterData(filter_query_value) {
      const filterQuery = {
        type: 'payment_status',
        value: filter_query_value,
      }

      await this.$store.dispatch('filterUsers', filterQuery)
    },
  },
})
</script>

<style scoped>
.header-title {
  letter-spacing: 0.1rem;
}

.v-tab--active {
  color: #25213b !important;
  border-bottom: 3px solid #25213b;
}

.tab-layout {
  border-bottom: 2px solid #c6c2de;
}
</style>
