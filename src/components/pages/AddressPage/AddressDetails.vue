<template>
  <table v-if="selected" class="table">
    <tbody>
      <tr>
        <th>
          Balance
        </th>
        <td>
          {{ balance }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'address-details',
  computed: {
    selected() {
      return this.$store.state.addresses.selected;
    },
    balance() {
      return this.selected.totals.received -
        this.selected.totals.spent;
    },
  },
};
</script>
