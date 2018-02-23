<template>
  <article class="message is-warning" v-if="syncing">
    <div class="message-header">
      <p>
        <span class="icon">
          <i class="fa fa-wrench"></i>
        </span>
        The server is syncing with the blockchain.
        Not all features will work until this has completed.
      </p>
      <button class="button is-small is-warning is-pulled-right" aria-label="details"
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
              Peers height:
            </div>
            <div class="column">
              {{ height.peers }}
            </div>
          </div>
        </div>
        <div class="column">
          <div class="columns is-mobile">
            <div class="column has-text-right">
              Node height:
            </div>
            <div class="column">
              {{ height.bitcoind }}
            </div>
          </div>
        </div>
        <div class="column">
          <div class="columns is-mobile">
            <div class="column has-text-right">
              Overnode height:
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
      // Check if blockchain is ahead or behind of our overnode database
      const diffOvernodeBitcoind = Math.abs(this.height.overnode - this.height.bitcoind);

      // Check if peers are head of us
      const diffBitcoindPeers = this.height.peers - this.height.bitcoind;

      // Ingore 1 block differences which will be quickly resolved
      return diffOvernodeBitcoind > 1 || diffBitcoindPeers > 1;
    },
  },
};
</script>
