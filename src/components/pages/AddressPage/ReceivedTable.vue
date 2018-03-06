<template>
  <table
    class="table is-fullwidth">
    <thead>
      <tr>
        <th>
          From
        </th>
        <th>
          Transaction
        </th>
        <th class="is-hidden-mobile">
          Output
        </th>
        <th>
          Value
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="outputs.length" v-for="(output, index) in outputs" :key="index">
        <td v-if="output.addresses[0] === selected.address">
          This address
        </td>
        <td v-else>
          <formatted-address class="is-hidden-desktop" :address='output.addresses[0]'
            :shorten="true"/>
          <formatted-address class="is-hidden-touch" :address='output.addresses[0]'
            :shorten="false"/>
        </td>
        <td>
          <formatted-hash :hash="output.transaction_id"/>
        </td>
        <td class="is-hidden-mobile">
          {{ output.output_number }}
        </td>
        <td>
          {{ output.value }}
        </td>
      </tr>
      <tr v-if="!outputs.length">
        <td colspan="10">
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
import FormattedAddress from '../../formatters/FormattedAddress';
import FormattedHash from '../../formatters/FormattedHash';

export default {
  name: 'address-page',
  components: {
    FormattedAddress,
    FormattedHash,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    selected() {
      return this.$store.state.addresses.selected;
    },
    outputs() {
      return this.$store.state.addresses.selected.received;
    },
    maybeMore() {
      return this.$store.state.addresses.control.received.maybeMore;
    },
  },
  methods: {
    async getMore() {
      if (this.isLoading) {
        // Prevent button mashing / spamming the server
        return;
      }
      const beforeCount = this.outputs.length;
      this.isLoading = true;
      await this.$store.dispatch('addresses/addMoreReceived');
      this.isLoading = false;

      // Turns out there wasn't more - happens because we
      // don't know how many total inputs/outputs there are to the
      // address before we start hitting the database, we can only
      // infer that there may be more from previous reads
      if (beforeCount === this.outputs.length) {
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

