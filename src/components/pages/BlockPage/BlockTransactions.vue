<template>
  <table class="table">
    <thead>
      <tr>
        <th>
          Id
        </th>
        <th>
          Inputs
        </th>
        <th>
          Outputs
        </th>
        <th>
          Size
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="transaction in transactions" :key="transaction.txid">
        <td>
          <formatted-hash class="is-hidden-tablet" :hash='transaction.txid' :shorten="true"/>
          <formatted-hash class="is-hidden-mobile" :hash='transaction.txid' :shorten="false"/>
        </td>
        <td class="has-text-right">
          {{ transaction.inputs.length }}
        </td>
        <td class="has-text-right">
          {{ transaction.outputs.length }}
        </td>
        <td class="has-text-right">
          {{ transaction.size }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import FormattedHash from '../../formatters/FormattedHash';

export default {
  name: 'block-transactions',
  components: {
    FormattedHash,
  },
  computed: {
    transactions() {
      return this.$store.state.blocks.selected.transactions;
    },
  },
};
</script>
