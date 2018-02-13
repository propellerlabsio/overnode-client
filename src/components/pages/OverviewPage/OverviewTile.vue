<template>
  <div class="columns">
    <div class="column">
      <div class="row">
        <h2 class="subtitle has-text-centered">
          <router-link v-if="titleLink" :to="titleLink">
            {{ this.title }}
          </router-link>
          <span v-else>
            {{ this.title }}
          </span>
        </h2>
      </div>
      <div class="row tile-content has-text-centered">
        <component :is="componentType"></component>
      </div>
    </div>
  </div>
</template>

<script>
import BlocksGraph from './BlocksGraph';
import MempoolSpeedo from './MempoolSpeedo';
import NodeInfo from './NodeInfo';
import PeersGraph from './PeersGraph';
import PeerLocations from './PeerLocations';
import RecentBlocks from './RecentBlocks';

export default {
  name: 'overview-tile',
  props: {
    title: {
      type: String,
      required: true,
    },
    componentType: {
      type: String,
      required: true,
    },
    titleLink: {
      type: String,
      required: false,
    },
  },
  components: {
    BlocksGraph,
    MempoolSpeedo,
    NodeInfo,
    PeerLocations,
    PeersGraph,
    RecentBlocks,
  },
};
</script>

<style scoped>
  .tile-content {
    display: block;
    height: 200px;
    min-width: 200px;
    overflow: hidden;
    margin-top: 15px;
  }
</style>

