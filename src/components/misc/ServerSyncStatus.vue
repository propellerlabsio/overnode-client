<template>
  <article class="message is-warning" v-if="syncing">
    <div class="message-header" @click="showDetails = !showDetails">
      <p>
        <span class="icon">
          <i class="fa fa-wrench"></i>
        </span>
        Overnode is syncing.  Not all data is available yet.
      </p>
      <button class="button is-small is-warning is-pulled-right" aria-label="details" >
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
              Overnode coverage:
            </div>
            <div class="column">
              <router-link :to="{ name: 'Block', params: { height: height.overnode.from } }">
                {{ height.overnode.from }}
              </router-link>
              -
              <router-link :to="{ name: 'Block', params: { height: height.overnode.to } }">
                {{ height.overnode.to }}
              </router-link>
              ({{ coveragePercent }}%)
            </div>
          </div>
        </div>
        <div class="column">
          <div class="columns is-mobile">
            <div class="column has-text-right">
              Sync errors:
            </div>
            <div class="column">
              {{ syncInErrorCount }}
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
    coveragePercent() {
      const numBlocks = this.height.overnode.to - this.height.overnode.from;
      return ((numBlocks / this.height.bitcoind) * 100).toPrecision(2);
    },
    height() {
      return this.$store.state.server.status.height;
    },
    syncing() {
      // Check if we are still syncing backwards (ie don't have full history)
      const backSyncing = this.height.overnode.from !== 0;

      // Check if blockchain is ahead or behind of our overnode database
      const diffOvernodeBitcoind = Math.abs(this.height.overnode.to - this.height.bitcoind);

      // Check if peers are head of us
      const diffBitcoindPeers = this.height.peers - this.height.bitcoind;

      // Return true if anything is not full synced
      // (Ingore 1 block differences which will be quickly resolved)
      return backSyncing || diffOvernodeBitcoind > 1 || diffBitcoindPeers > 1;
    },
    syncInErrorCount() {
      return this.$store.state.server.status.syncInErrorCount;
    },
  },
};
</script>
