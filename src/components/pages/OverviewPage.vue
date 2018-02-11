<template>
  <div>
    <hero-banner />
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
        <overview-tile title="Blocks" class="is-unselectable"
          component-type="blocks-graph"
          title-link="/blocks"/>
      </div>
      <div class="column">
        <overview-tile title="Peers"
          class="is-unselectable" component-type="peers-graph" />
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
