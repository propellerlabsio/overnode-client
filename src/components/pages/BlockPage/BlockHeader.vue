<template>
  <div>
    <!-- Loading message -->
    <loading-message v-if="isLoading"/>

    <div v-else class="block-header">
      <!-- Hash -->
      <div class="columns">
        <div class="column no-padding-bottom is-2">
          <div :class="labelClasses">
            Hash
          </div>
        </div>
        <div class="column">
          <div :class="dataClasses">
            <formatted-hash :hash="block.hash" :shorten="false"/>
          </div>
        </div>
      </div>

      <!-- Time -->
      <div class="columns">
        <div class="column no-padding-bottom is-2">
          <div :class="labelClasses">
            Mined on
          </div>
        </div>
        <div class="column">
          <div :class="dataClasses">
            <formatted-unix-time :time="block.time" />
          </div>
        </div>
      </div>

      <!-- Confirmations -->
      <div class="columns">
        <div class="column no-padding-bottom is-2">
          <div :class="labelClasses">
            Confirmations
          </div>
        </div>
        <div class="column">
          <div :class="dataClasses">
            {{ block.confirmations }}
          </div>
        </div>
      </div>

      <!-- Size -->
      <div class="columns">
        <div class="column no-padding-bottom is-2">
          <div :class="labelClasses">
            Size
          </div>
        </div>
        <div class="column">
          <div :class="dataClasses">
            {{ block.size }}
          </div>
        </div>
      </div>

      <!-- Interval -->
      <div class="columns">
        <div class="column no-padding-bottom is-2">
          <div :class="labelClasses">
            Time since previous block
          </div>
        </div>
        <div class="column">
          <div :class="dataClasses">
            <formatted-block-interval :interval="block.interval" :humanize="false" />
          </div>
        </div>
      </div>

      <!-- Number of transactions -->
      <div class="columns">
        <div class="column no-padding-bottom is-2">
          <div :class="labelClasses">
            Number of transactions
          </div>
        </div>
        <div class="column">
          <div :class="dataClasses">
            {{ block.tx_count }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormattedBlockInterval from '../../formatters/FormattedBlockInterval';
import FormattedHash from '../../formatters/FormattedHash';
import FormattedUnixTime from '../../formatters/FormattedUnixTime';
import LoadingMessage from '../../misc/LoadingMessage';

export default {
  name: 'block-header',
  props: {
    block: Object,
    isLoading: true,
  },
  components: {
    FormattedBlockInterval,
    FormattedHash,
    FormattedUnixTime,
    LoadingMessage,
  },
  data() {
    return {
      dataClasses: [
        'is-clipped',
      ],
      labelClasses: [
        'has-text-right-tablet',
        'label',
      ],
    };
  },
};
</script>

<style scoped>

  .block-header {
    margin-bottom: 15px;
  }

  .no-padding-bottom {
    padding-bottom: 0;
  }

</style>
