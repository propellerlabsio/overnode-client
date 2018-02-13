<template>
  <table class="table is-striped is-hoverable is-fullwidth"
    :class="{ 'is-narrow': this.compact }">
    <thead>
      <tr>
        <th class="has-text-centered">
          Height
        </th>
        <th class="has-text-centered is-hidden-mobile">
          Hash
        </th>
        <th class="has-text-centered">
          Mined
        </th>
        <th v-if="!compact" class="is-hidden-mobile has-text-centered">
          Interval
        </th>
        <th class="has-text-centered">
          Tx
        </th>
        <th class="has-text-centered">
          Mb
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="block in blocks" v-bind:key="block.hash"
        @click="$router.push(`/block/${block.height}`)">
        <td class="has-text-centered">
          <router-link :to="`/block/${block.height}`">
            {{ block.height }}
          </router-link>
        </td>
        <td class="is-hidden-mobile has-text-centered">
          <formatted-hash :hash="block.hash"/>
        </td>
        <td class="has-text-centered" :class="{ 'is-hidden-tablet': !compact }">
          {{ block.humanizedTime }}
        </td>
        <td v-if="!compact" class="is-hidden-mobile has-text-centered">
          <formatted-unix-time :time="block.time"/>
          (<span class="is-size-7">{{ block.humanizedTime }}</span>)
        </td>
        <td v-if="!compact" class="is-hidden-mobile has-text-centered">
          <formatted-block-interval :interval="block.interval"/>
        </td>
        <td class="has-text-right">
          {{ block.tx_count }}
        </td>
        <td class="has-text-right">
          {{ (block.size / 1000000).toFixed(3) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import FormattedHash from '../formatters/FormattedHash';
import FormattedUnixTime from '../formatters/FormattedUnixTime';
import FormattedBlockInterval from '../formatters/FormattedBlockInterval';

export default {
  name: 'blocks-table',
  components: {
    FormattedHash,
    FormattedUnixTime,
    FormattedBlockInterval,
  },
  props: {
    blocks: Array,
    loading: {
      type: Boolean,
      default: false,
    },
    compact: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
