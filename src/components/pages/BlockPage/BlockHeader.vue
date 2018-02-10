<template>
  <div>
    <!-- Hash -->
    <div class="columns">
      <div :class="labelClasses">
        Hash
      </div>
      <div :class="dataClasses">
        <formatted-hash :hash='block.hash' :short='false'/>
      </div>
    </div>

    <!-- Time -->
    <div class="columns">
      <div :class="labelClasses">
        Mined on
      </div>
      <div :class="dataClasses">
        <formatted-unix-time :time="block.time" />
      </div>
    </div>

    <!-- Confirmations -->
    <div class="columns">
      <div :class="labelClasses">
        Confirmations
      </div>
      <div :class="dataClasses">
        {{ block.confirmations }}
      </div>
    </div>

    <!-- Size -->
    <div class="columns">
      <div :class="labelClasses">
        Size
      </div>
      <div :class="dataClasses">
        {{ block.size }}
      </div>
    </div>

    <!-- Interval -->
    <div class="columns">
      <div :class="labelClasses">
        Time since previous block
      </div>
      <div :class="dataClasses">
        <formatted-block-interval :interval="block.summary.interval" :humanize="false" />
      </div>
    </div>

    <!-- Number of transactions -->
    <div class="columns">
      <div :class="labelClasses">
        Number of transactions
      </div>
      <div :class="dataClasses">
        {{ block.summary.tx_count }}
      </div>
    </div>
  </div>
</template>

<script>
import FormattedBlockInterval from '../../formatters/FormattedBlockInterval';
import FormattedHash from '../../formatters/FormattedHash';
import FormattedUnixTime from '../../formatters/FormattedUnixTime';

export default {
  name: 'block-header',
  props: {
    block: Object,
  },
  components: {
    FormattedBlockInterval,
    FormattedHash,
    FormattedUnixTime,
  },
  data() {
    return {
      dataClasses: [
        'block',
        'column',
        'is-clipped',
      ],
      labelClasses: [
        'block',
        'column',
        'is-one-quarter',
        'has-text-right-tablet',
        'label',
      ],
    };
  },
};
</script>

<style scoped>
  .block.column {
    padding-bottom: 0.25rem;
    padding-top: 0.25rem;
    /* margin-top: .25rem; */
    margin-bottom: .25rem;
  }
</style>
