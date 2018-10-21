<template>
  <table
    class="table is-fullwidth is-striped is-hoverable">
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
        <th class="is-narrow">
          <!-- Nav icon -->
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="inputs.length" v-for="(input, index) in inputs" :key="index"
          @click="navToTransactionInput(input)">
        <td>
          <formatted-hash :hash="input.transaction_id"/>
        </td>
        <td>
          {{ input.input_number }}
        </td>
        <td>
          {{ input.value }}
        </td>
        <td class="has-text-centered is-narrow">
          <span class="icon">
            <i class="fa fa-chevron-right"></i>
          </span>
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
import FormattedHash from '../../formatters/FormattedHash';

export default {
  name: 'spent-table',
  components: {
    FormattedHash,
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
    /**
     * Nav to a transaction input
     */
    navToTransactionInput(input) {
      // TODO nav direct to input number
      this.$router.push({
        name: 'Transaction',
        params: {
          transactionId: input.transaction_id,
        },
      });
    },
  },
};
</script>

