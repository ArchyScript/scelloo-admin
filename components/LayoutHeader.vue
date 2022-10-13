<template>
  <div class="data__table mb-4">
    <div class="data__table-header mb-3">
      <h3>Table Heading</h3>
    </div>

    <v-layout class="tab-layout pa-0 justify-space-between align-end">
      <div>
        <v-tabs background-color="transparent">
          <v-tab @click="filterData('all')">
            All
          </v-tab>

          <v-tab @click="filterData('paid')">
            Paid
          </v-tab>

          <v-tab @click="filterData('unpaid')">
            Unpaid
          </v-tab>

          <v-tab @click="filterData('overdue')">
            Overdue
          </v-tab>
        </v-tabs>
      </div>

      <div class="mb-1 d-inline-flex align-end">
        <span class="font-weight-normal">
          Total payable amount:
        </span>

        <span class="total-amount font-weight-bold mx-1">
          {{ totalPayableAmount.toLocaleString() }}
        </span>

        <span class="font-weight-normal">
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
  data: () => ({}),

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
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

.v-tab {
  text-transform: capitalize !important;
  font-weight: bold;
  font-size: 0.9rem !important;
  color: #6e6893 !important;
  padding: 0;
}

.data__table-header {
  font-family: 'Inter';
  font-weight: 800;
  margin-bottom: 0.9rem;
  font-style: normal;
  font-size: 0.9rem;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: #6e6893;
  line-height: 1rem;
}
.v-tab--active,
.v-tabs-slider {
  color: #25213b !important;
  padding: 0;
  margin: 0;
  border-bottom: 3px solid #25213b;
}

.v-tabs-slider {
  width: 90% !important;
  display: flex;
  align-items: center;
  justify-items: center;
}

.tab-layout {
  border-bottom: 2px solid #c6c2de !important;
}

.total-amount {
  font-size: 1.2rem;
  color: #6e6893;
}
</style>
