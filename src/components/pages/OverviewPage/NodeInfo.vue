<template>
  <table class="table is-striped is-narrow is-fullwidth">
    <tbody>
      <tr>
        <td>Fork:</td>
        <td v-if="node.fork === 'Bitcoin Cash'" class="cash-logo">
          <img src="../../../assets/BitcoinCashLogo.png">
        </td>
        <td v-else>{{ node.fork }}</td>
      </tr>
      <tr>
        <td>Network:</td>
        <td>{{ node.testnet ? 'testnet' : 'mainnet' }}</td>
      </tr>
      <tr>
        <td>Server:</td>
        <td>{{ host.hostname }}</td>
      </tr>
      <tr>
        <td>Platform:</td>
        <td>{{ host.platform }}</td>
      </tr>
      <tr>
        <td>Hardware:</td>
        <td>{{ host.cpus.length }} cpus / {{ Math.floor(host.totalmem / 1000000000) }} mb</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'node-info',
  computed: {
    host() {
      return this.$store.state.server.host;
    },
    node() {
      return this.$store.state.server.node;
    },
  },
};
</script>

<style scoped>
  img {
    width: 52px;
    align-self: center;
    padding: 0px;
  }
  td.cash-logo {
    padding-top: 0px;
    padding-bottom: 0px;
  }
</style>

