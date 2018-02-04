<template>
  <div class="columns">
    <div class="column">
      <div class="row graph-widget has-text-centered">
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
import BlocksGraph from '../graphs/BlocksGraph';
import MempoolSpeedo from '../graphs/MempoolSpeedo';
import PeersGraph from '../graphs/PeersGraph';

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
    PeersGraph,
  },
};
</script>

<style scoped>
  .graph-widget {
    display: block;
    height: 200px;
    min-width: 200px;
    overflow: hidden;
  }
</style>

