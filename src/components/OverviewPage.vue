<template>
  <div>
    <div class="columns">
      <div class="column">
        <overview-tile title="Blocks" class="is-unselectable" component-type="block-times" />
      </div>
      <div class="column">
        <overview-tile title="Mempool"
          class="is-unselectable" component-type="transaction-rate" />
      </div>
      <div class="column">
        <overview-tile title="Peers"
          class="is-unselectable" component-type="peers" />
      </div>
    </div>
  </div>
</template>

<script>

import OverviewTile from './overview/OverviewTile';

export default {
  name: 'overview-page',
  components: {
    OverviewTile,
  },
};
</script>
