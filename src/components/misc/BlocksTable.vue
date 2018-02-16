<template>
  <table class="table is-striped is-hoverable is-fullwidth"
    :class="{ 'is-narrow': isNarrow }">
    <thead>
      <tr>
        <th class="has-text-centered">
          Height
        </th>
        <th class="has-text-centered is-hidden-touch">
          Hash
        </th>
        <th class="has-text-centered">
          Mined
        </th>
        <th class="is-hidden-touch is-hidden-desktop-only has-text-centered">
          Interval
        </th>
        <th class="has-text-centered">
          Tx
        </th>
        <th class="has-text-centered">
          Mb
        </th>
        <th>
          <!-- Nav to block -->
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
        <td class="is-hidden-touch has-text-centered">
          <formatted-hash :hash="block.hash"/>
        </td>
        <td class="has-text-centered is-hidden-widescreen">
          {{ block.humanizedTime }}
        </td>
        <td v-if="!compact" class="is-hidden-touch is-hidden-desktop-only has-text-centered">
          <formatted-unix-time :time="block.time"/>
          (<span class="is-size-7">{{ block.humanizedTime }}</span>)
        </td>
        <td class="is-hidden-touch is-hidden-desktop-only has-text-centered">
          <formatted-block-interval :interval="block.interval"/>
        </td>
        <td class="has-text-right">
          {{ block.tx_count }}
        </td>
        <td class="has-text-right">
          {{ (block.size / 1000000).toFixed(3) }}
        </td>
        <td class="has-text-centered">
          <a class="button is-white is-small">
            <span class="icon">
              <i class="fa fa-chevron-right"></i>
            </span>
          </a>
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
    isNarrow: Boolean,
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
