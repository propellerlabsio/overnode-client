<template>
  <table
    class="table is-fullwidth">
    <thead>
      <tr>
        <th>
          Transaction
        </th>
        <th>
          Input
        </th>
        <th>
          Value
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="inputs.length" v-for="(input, index) in inputs" :key="index">
        <td>
          <transaction-link :transaction-id="input.transaction_id"/>
        </td>
        <td>
          {{ input.input_number }}
        </td>
        <td>
          {{ input.output_value }}
        </td>
      </tr>
      <tr v-if="!inputs.length">
        <td colspan="3">
          Nothing found.
        </td>
      </tr>
      <tr v-if="maybeMore">
        <td colspan="10">
          <button @click="getMore" class="button pull-right is-text"
            :class="{ 'is-loading': isLoading }">
            more...
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import TransactionLink from '../../links/TransactionLink';

export default {
  name: 'address-page',
  components: {
    TransactionLink,
  },
  computed: {
    inputs() {
      return this.$store.state.addresses.selected.spent;
    },
    isLoading() {
      return this.$store.state.addresses.control.spent.loading;
    },
    maybeMore() {
      return this.$store.state.addresses.control.spent.maybeMore;
    },
  },
  methods: {
    async getMore() {
      if (this.isLoading) {
        // Prevent button mashing / spamming the server
        return;
      }
      const beforeCount = this.inputs.length;
      await this.$store.dispatch('addresses/addMoreSpent');

      // Turns out there wasn't more - happens because we
      // don't know how many total inputs/outputs there are to the
      // address before we start hitting the database, we can only
      // infer that there may be more from previous reads
      if (beforeCount === this.inputs.length) {
        this.$store.commit('toasts/add', {
          message: 'No more records found',
          timeoutSecs: 3,
          type: 'info',
        });
      }
    },
  },
};
</script>

