<template>
  <div>
    <div class="columns">
      <div class="column">
        <overview-tile title="Block Times (mins)" component-type="block-times" />
      </div>
      <div class="column">
        <overview-tile title="Mempool"
          component-type="transaction-rate" />
      </div>
      <div class="column">
        <overview-tile title="Peers"
          component-type="peers" />
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
