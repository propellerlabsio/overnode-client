<template>
  <div class="columns">
    <div class="column">
      <div class="row tile-content has-text-centered">
        <component :is="componentType"></component>
      </div>
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
    </div>
  </div>
</template>

<script>
import BlocksGraph from './BlocksGraph';
import MempoolSpeedo from './MempoolSpeedo';
import NodeInfo from './NodeInfo';
import PeersGraph from './PeersGraph';

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
    PeersGraph,
  },
};
</script>

<style scoped>
  .tile-content {
    display: block;
    height: 200px;
    min-width: 200px;
    overflow: hidden;
    margin-bottom: 10px;
  }
</style>

