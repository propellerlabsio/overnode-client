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
        <overview-tile title="Blocks" class="is-unselectable"
          component-type="blocks-graph"/>
      </div>
      <div class="column">
        <overview-tile title="Peers"
          class="is-unselectable" component-type="peers-graph" />
      </div>
    </div>

    <!-- Recent blocks -->
    <div class="level is-mobile">
      <div class="level-left">
        <h2 class="level-item subtitle recent-blocks-title">Recent blocks</h2>
      </div>
      <div class="level-right">
          <h2 class="level-item subtitle recent-blocks-title link">
            <router-link to="/blocks">more...</router-link>
          </h2>
      </div>
    </div>
    <blocks-table :blocks="blocks"/>
  </div>
</template>

<script>

import BlocksTable from '../misc/BlocksTable';
import HeroBanner from './OverviewPage/HeroBanner';
import OverviewTile from './OverviewPage/OverviewTile';

export default {
  name: 'overview-page',
  components: {
    BlocksTable,
    HeroBanner,
    OverviewTile,
  },
  created() {
    this.$store.dispatch('blocks/gotoBlocksPage', 1);
  },
  computed: {
    blocks() {
      return this.$store.state.blocks.blocksPage.blocks.slice(0, 6);
    },
  },
};
</script>

<style scoped>
  .level {
    margin-top: 48px;
    margin-bottom: 12px;
  }
</style>

