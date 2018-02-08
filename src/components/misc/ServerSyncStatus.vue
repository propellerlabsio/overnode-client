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
      <button class="button is-small is-danger is-pulled-right" aria-label="details"
        @click="showDetails = !showDetails">
        <span class="icon">
          <i class="fa" :class="{ 'fa-chevron-down': !showDetails,
            'fa-chevron-up': showDetails }"></i>
        </span>
      </button>
    </div>
    <div v-if="showDetails" class="message-body">
      <div class="columns">
        <div class="column">
          <div class="columns is-mobile">
            <div class="column has-text-right">
              Peers Height:
            </div>
            <div class="column">
              {{ height.peers }}
            </div>
          </div>
        </div>
        <div class="column">
          <div class="columns is-mobile">
            <div class="column has-text-right">
              Node Height:
            </div>
            <div class="column">
              {{ height.bitcoind }}
            </div>
          </div>
        </div>
        <div class="column">
          <div class="columns is-mobile">
            <div class="column has-text-right">
              Overnode Height:
            </div>
            <div class="column">
              {{ height.overnode }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'server-sync-status',
  data() {
    return {
      showDetails: false,
    };
  },
  computed: {
    height() {
      return this.$store.state.server.status.height;
    },
    syncing() {
      const diffOvernodeBitcoind = Math.abs(this.height.overnode - this.height.bitcoind);
      const diffBitcoindPeers = Math.abs(this.height.bitcoind - this.height.peers);

      // Ingore 1 block differences which will be quickly resolved
      return diffOvernodeBitcoind > 1 || diffBitcoindPeers > 1;
    },
  },
};
</script>
