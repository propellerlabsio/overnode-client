<template>
  <aside class="menu">
    <p class="menu-label" :class="{ 'is-loading': rpcLoading }">
      RPC Commands
    </p>
    <ul class="menu-list">
      <li v-for="command in rpcCommands" v-bind:key="command.name">
        <router-link
          :class="{ 'is-active': $route.params.commandName === command.name }"
          :to="`/rpc/${command.name}`">
          {{ command.name }}
        </router-link>
      </li>
      <li v-if="rpcLoading"><a>Loading...</a></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'rpc-menu',
  data() {
    return {
      rpcLoading: false,
    };
  },
  computed: {
    rpcCommands() {
      return this.$store.state.rpc.commands;
    },
  },
  created() {
    this.initRpc();
  },
  methods: {
    activeIfRoute(routeName) {
      const classes = [];
      if (this.$route.name === routeName) {
        classes.push('is-active');
      }
      return classes;
    },
    async initRpc() {
      if (!this.rpcCommands.length) {
        this.rpcLoading = true;
        await this.$store.dispatch('rpc/init');
        this.rpcLoading = false;
      }
    },
  },
};
</script>
