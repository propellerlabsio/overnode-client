<template>
  <div>
    <h1 class="title">Overview</h1>
    <div class="columns">
      <div class="column">
        <overview-tile title="Block Times (mins)" component-type="block-times" />
      </div>
      <div class="column">
        <overview-tile title="Second graph test" component-type="block-times" />
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
