<template>
  <article class="message is-danger"
    v-if="syncing">
    <div class="message-header">
      <p>
        <span class="icon">
          <i class="fa fa-wrench"></i>
        </span>
        Server is currently syncing with the blockchain.
        Not all features will work reliably until this is complete.
      </p>
    </div>
  </article>
</template>

<script>
export default {
  name: 'server-sync-status',
  computed: {
    syncing() {
      const status = this.$store.state.server.status;
      const diffOvernodeBitcoind = Math.abs(status.height.overnode - status.height.bitcoind);
      const diffBitcoindPeers = Math.abs(status.height.bitcoind - status.height.peers);

      // Ingore 1 block differences which will be quickly resolved
      return diffOvernodeBitcoind > 1 || diffBitcoindPeers > 1;
    },
  },
};
</script>
