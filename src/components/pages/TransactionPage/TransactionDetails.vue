<template>
  <!-- Transaction details -->
  <table v-if="transaction" class="table">
    <tbody>
      <tr>
        <th>
          Time
        </th>
        <td>
          <formatted-unix-time :time="transaction.time"/>
        </td>
      </tr>
      <tr>
        <th>
          Block
        </th>
        <td>
          <block-link :height="transaction.block_height"
            :transaction-index="transaction.transaction_index"/>
        </td>
      </tr>
      <tr>
        <th>
          Size
        </th>
        <td>
          {{ transaction.size }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import BlockLink from '../../links/BlockLink';
import FormattedUnixTime from '../../formatters/FormattedUnixTime';

export default {
  name: 'transaction-details',
  components: {
    BlockLink,
    FormattedUnixTime,
  },
  computed: {
    transaction() {
      return this.$store.state.transaction.selected;
    },
  },
};
</script>
