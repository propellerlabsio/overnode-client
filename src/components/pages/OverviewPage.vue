<template>
  <div>
    <!-- Overview tiles -->
    <div class="columns is-multiline">
      <div class="column">
        <overview-tile title="Node"
          component-type="node-info" />
      </div>
      <div class="column">
        <overview-tile title="Mempool"
          class="is-unselectable" component-type="mempool-speedo" />
      </div>
      <div class="column">
        <overview-tile title="Block Times" class="is-unselectable"
          component-type="blocks-graph"/>
      </div>
      <div class="column">
        <overview-tile title="Peers"
          class="is-unselectable" component-type="peers-map" />
      </div>
      <div class="column">
        <overview-tile title="Recent Blocks"
          component-type="recent-blocks" />
      </div>
    </div>
    <p v-if="connectedClientCount" class="connected-client-info has-text-centered is-size-7">
      There are {{ connectedClientCount }} client(s) currently monitoring this node
    </p>
  </div>
</template>

<script>
import OverviewTile from './OverviewPage/OverviewTile';

export default {
  name: 'overview-page',
  components: {
    OverviewTile,
  },
  computed: {
    connectedClientCount() {
      return this.$store.state.server.status.overnode.clients;
    },
  },
};
</script>

<style>
  .connected-client-info {
    margin-top: 50px;
  }
</style>

