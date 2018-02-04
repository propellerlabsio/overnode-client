<template>
  <div>
    <div class="columns is-multiline">
      <div class="column">
        <overview-tile title="Mempool"
          class="is-unselectable" component-type="mempool-speedo" />
      </div>
      <div class="column">
        <overview-tile title="Blocks" class="is-unselectable" component-type="blocks-graph" />
      </div>
      <div class="column">
        <overview-tile title="Peers"
          class="is-unselectable" component-type="peers-graph" />
      </div>
    </div>
  </div>
</template>

<script>

import OverviewTile from '../misc/OverviewTile';

export default {
  name: 'overview-page',
  components: {
    OverviewTile,
  },
};
</script>
