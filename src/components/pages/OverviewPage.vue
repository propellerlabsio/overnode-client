<template>
  <div>
    <!-- Hero -->
    <hero-banner />

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
  </div>
</template>

<script>

import HeroBanner from './OverviewPage/HeroBanner';
import OverviewTile from './OverviewPage/OverviewTile';

export default {
  name: 'overview-page',
  components: {
    HeroBanner,
    OverviewTile,
  },
};
</script>

<style scoped>
  .level {
    margin-top: 48px;
    margin-bottom: 12px;
  }
</style>

