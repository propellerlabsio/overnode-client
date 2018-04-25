<template>
  <aside class="menu">
    <p class="menu-label">
      Monitor
    </p>
    <ul class="menu-list">
      <li><router-link to="/admin/sync-errors">Sync errors</router-link></li>
    </ul>
    <p class="menu-label">
      Tools
    </p>
    <ul class="menu-list">
      <li><router-link to="/admin/transaction-tool">Transaction</router-link></li>
    </ul>
    <p class="menu-label">
      Session
    </p>
    <ul class="menu-list">
      <li @click="signout"><a>Sign out</a></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'admin-menu',
  methods: {
    async signout() {
      await this.$store.dispatch('session/end');
      this.$store.commit('toasts/add', {
        message: 'Signed out',
        timeoutSecs: 5,
        type: 'success',
      });
    },
  },
};
</script>
