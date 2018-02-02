<template>
  <div>
    <div class="columns">
      <div class="column">
        <overview-tile title="Blocks" class="is-unselectable" component-type="blocks" />
      </div>
      <div class="column">
        <overview-tile title="Mempool"
          class="is-unselectable" component-type="mempool" />
      </div>
      <div class="column">
        <overview-tile title="Peers"
          class="is-unselectable" component-type="peers" />
      </div>
    </div>
  </div>
</template>

<script>

import OverviewTile from './OverviewTile';

export default {
  name: 'overview-page',
  components: {
    OverviewTile,
  },
};
</script>
