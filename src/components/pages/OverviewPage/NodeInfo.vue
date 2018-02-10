<template>
  <table class="table is-bordered">
    <tbody>
      <tr>
        <td>Server:</td>
        <td>{{ host.hostname }}</td>
      </tr>
      <tr>
        <td>Platform:</td>
        <td>{{ host.platform }}</td>
      </tr>
      <tr>
        <td>CPUs:</td>
        <td>{{ host.cpus.length }}</td>
      </tr>
      <tr>
        <td>RAM:</td>
        <td>{{ Math.round(host.totalmem / 1000000) }} mb</td>
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
  },
};
</script>

<style scoped>
  table.table {
    width: 300px;
    height: 200px;
    margin: 0 auto;
  }
</style>
