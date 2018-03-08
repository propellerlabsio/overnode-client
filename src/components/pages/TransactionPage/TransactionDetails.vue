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
          <router-link :to="{ name: 'Block', params: { height: transaction.block_height } }">
            {{ transaction.block_height }}
          </router-link>
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
import FormattedUnixTime from '../../formatters/FormattedUnixTime';

export default {
  name: 'transaction-details',
  components: {
    FormattedUnixTime,
  },
  computed: {
    transaction() {
      return this.$store.state.transaction.selected;
    },
  },
};
</script>
