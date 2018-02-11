<template>
  <table class="table is-bordered is-striped is-narrow">
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
